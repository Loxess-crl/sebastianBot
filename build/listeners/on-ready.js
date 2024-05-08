"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onReady = void 0;
const discord_js_1 = require("discord.js");
const onReady = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const presence = () => {
        var _a;
        (_a = client.user) === null || _a === void 0 ? void 0 : _a.setPresence({
            status: discord_js_1.PresenceUpdateStatus.Online,
            activities: [{ name: 'Furry Porn Hard', type: discord_js_1.ActivityType.Watching }],
        });
    };
    client.on(discord_js_1.Events.ClientReady, () => {
        var _a;
        console.log(`Entro como ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.username}!`);
        presence();
    });
});
exports.onReady = onReady;
