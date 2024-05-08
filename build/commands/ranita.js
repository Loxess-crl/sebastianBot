"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ranitaCommand = void 0;
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
exports.ranitaCommand = {
    name: 'ranita',
    description: 'Ranita',
    alias: ['rana'],
    execute({ message }) {
        const embed = new builders_1.EmbedBuilder()
            .setTitle('Ranita Nalgona')
            .setImage('https://cdn.discordapp.com/attachments/927441457445502996/928778131911868487/unknown.png')
            .setColor(discord_js_1.Colors.DarkNavy)
            .setDescription('Mamaguevos la imagen ya no funciona pongan otra')
            .setTimestamp();
        message.channel.send({ embeds: [embed] });
        return;
    },
};
