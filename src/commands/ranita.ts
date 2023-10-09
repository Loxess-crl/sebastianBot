import { EmbedBuilder } from '@discordjs/builders';
import { Colors } from 'discord.js';
import { Command } from '../interfaces/command.interface';

export const ranitaCommand: Command = {
  name: 'ranita',
  description: 'Ranita',
  alias: ['rana'],
  execute({ message }) {
    const embed = new EmbedBuilder()
      .setTitle('Ranita Nalgona')
      .setImage(
        'https://cdn.discordapp.com/attachments/927441457445502996/928778131911868487/unknown.png'
      )
      .setColor(Colors.DarkNavy)
      .setDescription('Mamaguevos la imagen ya no funciona pongan otra')
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
    return;
  },
};
