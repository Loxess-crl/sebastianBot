"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const listeners_1 = require("./listeners");
const config_1 = require("./config");
const on_chatbot_1 = require("./listeners/on-chatbot");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildScheduledEvents,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.GuildEmojisAndStickers,
        discord_js_1.GatewayIntentBits.GuildMessageTyping,
        discord_js_1.GatewayIntentBits.GuildPresences,
    ],
});
(0, on_chatbot_1.openAiChat)(client);
(0, listeners_1.onReady)(client);
(0, listeners_1.onMessageCreate)(client);
client.login(config_1.TOKEN);
