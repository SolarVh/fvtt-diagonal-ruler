/* globals
libWrapper
*/

import { MODULE_ID } from "./module.js";
import { _computeDistanceRuler } from "./segment.js";

export function registerManhattanRuler() {
  libWrapper.register(MODULE_ID, "Ruler.prototype._computeDistance", _computeDistanceRuler, libWrapper.MIXED);
}
