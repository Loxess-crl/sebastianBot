"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putosCommand = void 0;
const discord_js_1 = require("discord.js");
const builders_1 = require("@discordjs/builders");
exports.putosCommand = {
    name: 'putos',
    description: 'Pinches putos pendejos Pendejos putos idiotas pendejos',
    alias: ['ptos'],
    execute({ message }) {
        const embed = new builders_1.EmbedBuilder()
            .setTitle('pinches putos pendejos')
            .setImage('https://i.ytimg.com/vi/xNi7wIxBEn8/maxresdefault.jpg')
            .setColor(discord_js_1.Colors.DarkNavy)
            .setDescription('pendejos putos idiotas pendejos')
            .addFields({
            name: 'Pinches putos pendejos',
            value: 'Pendejos putos idiotas pendejos',
        })
            .setFooter({ text: 'pinches putos pendejos' });
        message.channel.send({ embeds: [embed] });
        return;
    },
};
