import { Command } from '../interfaces/command.interface';
import { EmbedBuilder } from '@discordjs/builders';
import { prefixCommands } from '.';
import { getRandomColor } from '../utils/util-functions';

export const helpCommand: Command = {
  name: 'help',
  description:
    'Comando de ayuda, en realidad solo muestra los comandos disponibles',
  alias: ['ayuda', 'h'],
  execute({ message }) {
    let commands = `**Comandos disponibles:**\n`;
    const commandList = prefixCommands.map((command) => {
      return `- **${command.name}** - ${command.description}`;
    });

    commands += commandList.join('\n');
    const embed = new EmbedBuilder()
      .setTitle('Ayuda para mongolicos')
      .setThumbnail(
        'https://us.rule34.xxx//samples/3434/sample_03c4c9bf5f32ebb20ab5cc3cc4624342.jpg?9137637'
      )
      .setColor(getRandomColor())
      .setDescription(commands)
      .setFooter({ text: 'me van a matar causa pipipi' })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
    return;
  },
};
