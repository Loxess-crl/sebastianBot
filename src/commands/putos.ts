import { Client, Colors, Message } from 'discord.js';
import { Command } from '../interfaces/command.interface';
import { EmbedBuilder } from '@discordjs/builders';

export const putosCommand: Command = {
  name: 'putos',
  description: 'Pinches putos pendejos Pendejos putos idiotas pendejos',
  alias: ['ptos'],
  execute({ message }) {
    const embed = new EmbedBuilder()
      .setTitle('pinches putos pendejos')
      .setImage('https://i.ytimg.com/vi/xNi7wIxBEn8/maxresdefault.jpg')
      .setColor(Colors.DarkNavy)
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
