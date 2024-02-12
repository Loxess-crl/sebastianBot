"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.robotCommand = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
exports.robotCommand = {
    name: 'robot',
    alias: ['rob'],
    description: 'Robot de axaim ns',
    execute: ({ message }) => {
        const embed = new builders_1.EmbedBuilder()
            .setTitle('Roboñin')
            .setImage('https://media.discordapp.net/attachments/918657656380608593/931748379195760640/Mi_video1.gif?width=418&height=418')
            .setColor(discord_js_1.Colors.DarkerGrey)
            .setTimestamp();
        message.channel.send({ embeds: [embed] });
        return;
    },
};
