"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpCommand = void 0;
const builders_1 = require("@discordjs/builders");
const _1 = require(".");
const util_functions_1 = require("../utils/util-functions");
exports.helpCommand = {
    name: 'help',
    description: 'Comando de ayuda, en realidad solo muestra los comandos disponibles',
    alias: ['ayuda', 'h'],
    execute({ message }) {
        let commands = `**Comandos disponibles:**\n`;
        const commandList = _1.prefixCommands.map((command) => {
            return `- **${command.name}** - ${command.description}`;
        });
        commands += commandList.join('\n');
        const embed = new builders_1.EmbedBuilder()
            .setTitle('Ayuda para mongolicos')
            .setThumbnail('https://us.rule34.xxx//samples/3434/sample_03c4c9bf5f32ebb20ab5cc3cc4624342.jpg?9137637')
            .setColor((0, util_functions_1.getRandomColor)())
            .setDescription(commands)
            .setFooter({ text: 'me van a matar causa pipipi' })
            .setTimestamp();
        message.channel.send({ embeds: [embed] });
        return;
    },
};
