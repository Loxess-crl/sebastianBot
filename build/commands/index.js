"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefixCommands = void 0;
const anime_1 = require("./anime");
const convert_1 = require("./convert");
const decir_1 = require("./decir");
const help_1 = require("./help");
const putos_1 = require("./putos");
const ranita_1 = require("./ranita");
const robot_1 = require("./robot");
const translate_1 = require("./translate");
exports.prefixCommands = [
    anime_1.animeCommand,
    convert_1.convertCommand,
    decir_1.decirCommand,
    putos_1.putosCommand,
    ranita_1.ranitaCommand,
    robot_1.robotCommand,
    help_1.helpCommand,
    translate_1.translateCommand,
];
