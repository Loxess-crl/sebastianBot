import { EmbedBuilder } from '@discordjs/builders';
import { Command } from '../interfaces/command.interface';
import { Colors } from 'discord.js';

export const robotCommand: Command = {
  name: 'robot',
  alias: ['rob'],
  description: 'Robot de axaim ns',
  execute: ({ message }) => {
    const embed = new EmbedBuilder()
      .setTitle('Roboñin')
      .setImage(
        'https://media.discordapp.net/attachments/918657656380608593/931748379195760640/Mi_video1.gif?width=418&height=418'
      )
      .setColor(Colors.DarkerGrey)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
    return;
  },
};
