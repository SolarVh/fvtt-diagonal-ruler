/* globals
game,
Hooks
*/
"use strict";

import { registerManhattanRuler } from "./patching.js";
import { registerSettings, getSetting, SETTINGS } from "./settings.js";

export const MODULE_ID = "manhattanruler";

export function log(...args) {
  try {
    const isDebugging = game.modules.get("_dev-mode")?.api?.getPackageDebugValue(MODULE_ID);
    if (isDebugging) {
      console.log(MODULE_ID, "|", ...args);
    }
  } catch (e) {
    // empty
  }
}

Hooks.once('setup', async function() {
  registerSettings();
});

// https://github.com/League-of-Foundry-Developers/foundryvtt-devMode
Hooks.once("devModeReady", ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(MODULE_ID);
});

Hooks.once("libWrapper.Ready", async function() {
  registerManhattanRuler();
});

Hooks.on("getSceneControlButtons", (controls) => {
  if ( !getSetting(SETTINGS.ADD_CONTROL) ) return;

  const tokenTools = controls.find(c => c.name === "token");
  tokenTools.tools.push({
    name: "manhattan-distance",
    title: game.i18n.localize(`${MODULE_ID}.controls.${SETTINGS.ADD_CONTROL}.name`),
    icon: "fa-solid fa-city",
    toggle: true
  });
});
