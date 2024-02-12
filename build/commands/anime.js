"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animeCommand = void 0;
const builders_1 = require("@discordjs/builders");
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
const util_functions_1 = require("../utils/util-functions");
exports.animeCommand = {
    name: 'anime',
    description: 'anime',
    alias: ['anime'],
    execute: ({ message, content }) => __awaiter(void 0, void 0, void 0, function* () {
        const titulo = content;
        if (!titulo) {
            message.reply('Debes ingresar un título');
            return;
        }
        const messageNotFound = `Anime no encontrado: **'${titulo}'**`;
        axios_1.default
            .get(`https://api.jikan.moe/v4/anime?q=${titulo}&limit=1`)
            .then((res) => {
            const anime = res.data.data[0];
            if (!anime) {
                message.reply(messageNotFound);
                return;
            }
            const estado = anime.airing ? 'En emisión' : 'Finalizado';
            const embed = new builders_1.EmbedBuilder()
                .setTitle(anime.title)
                .setDescription(anime.synopsis)
                .addFields({
                name: 'Episodios: ',
                value: anime.episodes.toString(),
                inline: true,
            }, { name: 'Score: ', value: anime.score.toString(), inline: true }, { name: 'Tipo:', value: anime.type, inline: true }, { name: 'Estado: ', value: estado, inline: true }, {
                name: 'Transmitido: ',
                value: `Desde ${(0, util_functions_1.convertDateToString)(anime.aired.from)}, hasta ${(0, util_functions_1.convertDateToString)(anime.aired.to)}`,
            })
                .setThumbnail(anime.images.jpg.image_url)
                .setColor(discord_js_1.Colors.DarkNavy)
                .setTimestamp()
                .setFooter({ text: 'Pedido por: ' + message.author.username });
            message.reply({ embeds: [embed] });
        })
            .catch((err) => {
            console.error('ERR', err);
            message.reply('Ocurrió un error:( vuelve a intentarlo');
        });
        return;
    }),
};
