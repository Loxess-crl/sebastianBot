import { EmbedBuilder } from '@discordjs/builders';
import { Command } from '../interfaces/command.interface';
import axios from 'axios';
import { Colors } from 'discord.js';
import { animeAPIJikanResponse } from '../interfaces/api-jikan.interface';
import { convertDateToString, formatDate } from '../utils/util-functions';

export const animeCommand: Command = {
  name: 'anime',
  description: 'anime',
  alias: ['anime'],
  execute: async ({ message, content }) => {
    const titulo = content;

    if (!titulo) {
      message.reply('Debes ingresar un título');
      return;
    }
    const messageNotFound = `Anime no encontrado: **'${titulo}'**`;
    axios
      .get<animeAPIJikanResponse>(
        `https://api.jikan.moe/v4/anime?q=${titulo}&limit=1`
      )
      .then((res) => {
        const anime = res.data.data[0];
        if (!anime) {
          message.reply(messageNotFound);
          return;
        }
        const estado = anime.airing ? 'En emisión' : 'Finalizado';
        const embed = new EmbedBuilder()
          .setTitle(anime.title)
          .setDescription(anime.synopsis)
          .addFields(
            {
              name: 'Episodios: ',
              value: anime.episodes.toString(),
              inline: true,
            },
            { name: 'Score: ', value: anime.score.toString(), inline: true },
            { name: 'Tipo:', value: anime.type, inline: true },
            { name: 'Estado: ', value: estado, inline: true },
            {
              name: 'Transmitido: ',
              value: `Desde ${convertDateToString(
                anime.aired.from
              )}, hasta ${convertDateToString(anime.aired.to)}`,
            }
          )
          .setThumbnail(anime.images.jpg.image_url)
          .setColor(Colors.DarkNavy)
          .setTimestamp()
          .setFooter({ text: 'Pedido por: ' + message.author.username });
        message.reply({ embeds: [embed] });
      })
      .catch((err) => {
        console.error('ERR', err);
        message.reply('Ocurrió un error:( vuelve a intentarlo');
      });
    return;
  },
};
