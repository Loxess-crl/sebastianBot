"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GEMINI_TOKEN = exports.BOT_ID = exports.TRANSLATE_API = exports.EXCHANGE_API = exports.GUILD_ID = exports.APPLICATION_ID = exports.TOKEN = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.TOKEN = process.env.TOKEN || '';
exports.APPLICATION_ID = process.env.APPLICATION_ID || '';
exports.GUILD_ID = process.env.GUILD_ID || '';
exports.EXCHANGE_API = process.env.EXCHANGE_API || '';
exports.TRANSLATE_API = process.env.TRANSLATE_API || '';
exports.BOT_ID = '928458055224537128';
exports.GEMINI_TOKEN = process.env.GEMINI_TOKEN || '';
