/* globals
canvas,
ui
*/
"use strict";

import { getSetting, SETTINGS } from "./settings.js";

 /*
  * Override Ruler.prototype._computeDistance.
  * Function to measure the Manhattan distance between two points on the 2D canvas.
  * @param {boolean} gridSpaces    Base distance on the number of grid spaces moved?
  * @return {Number} The distance of the segment.
  */
export function _computeDistanceRuler(wrapper, gridSpaces) { // eslint-disable-line no-unused-vars
  if ( getSetting(SETTINGS.ADD_CONTROL) ) {
    const token_controls = ui.controls.controls.find(elem => elem.name === "token");
    const manhattan_control = token_controls.tools.find(elem => elem.name === "manhattan-distance");
    if ( !manhattan_control.active ) return wrapper(gridSpaces);
  }

  const { size, distance } = canvas.scene.dimensions;
  const gridConversion = distance / size;
  let totalDistance = 0;
  const ln = this.segments.length;
  var carry = 0;
  for ( let i = 0; i < ln; i += 1 ) {
    const s = this.segments[i];
    const pixel_distanceX = Math.abs(s.ray.A.x - s.ray.B.x);
    const pixel_distanceY = Math.abs(s.ray.A.y - s.ray.B.y);
    const gridDistanceX = pixel_distanceX / size; 
    const gridDistanceY = pixel_distanceY / size;
    const gridDistance = Math.floor(1.5*(Math.min(gridDistanceX, gridDistanceY)+.5*carry) + Math.abs(gridDistanceX - gridDistanceY));
    const d = gridDistance * distance;

    carry = (Math.min(gridDistanceX, gridDistanceY)+carry) % 2;

    s.last = i === (ln - 1);
    s.distance = d;
    totalDistance += d;
    s.text = this._getSegmentLabel(s, totalDistance);
  }
}
