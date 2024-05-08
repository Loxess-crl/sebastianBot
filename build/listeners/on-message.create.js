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
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessageCreate = void 0;
const discord_js_1 = require("discord.js");
const commands_1 = require("../commands");
const util_functions_1 = require("../utils/util-functions");
const config_1 = require("../config");
const prefix = 's!';
const onMessageCreate = (client) => __awaiter(void 0, void 0, void 0, function* () {
    client.on(discord_js_1.Events.MessageCreate, (message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (message.author.bot)
            return;
        const mencionado = message.mentions.users.first();
        if (mencionado && mencionado.id === config_1.BOT_ID) {
            const respuestas = [
                'Q CHUCHA QUIERES MONGOL DE MRD',
                'tu vieja',
                'a!nuke',
                'Ok color cartón',
                'Q chucha pasa',
                'o calla ps ramdon que ni conosco',
                'aea',
                'Aquí está tu vieja idi0ta mira como me la kacho Ooo tome señora tome',
                'Tamare oe quien pcta le dio dr0ga a la llama csm miren cómo está hablando idi0ta de mrd',
                'el que lo dice lo es',
                'fue mi pene',
                'calla perra',
                'ag esta chola se enamoro de mi mirando mi foto que asco chola de mierda',
                'mocosos de mrd y la ptamare',
                'callate ctmre nadie te quiere escuchar oe paisano',
                'oh wachi rctmr chibolo ctmr que chucha hablas',
                'oh desahuevate rctmr ya anda duerme imbecil no todo es clase carajo',
                'quien chucha eres tu webon',
                'callate tu d0wn de mrd idi0ta solo peru es la mejor gastronomia preguntale a los a los extranjeros hijo de p3rr4',
                'oe mrd corre bañate crj lee un libro y has algo por la vida',
                'que xuxa vienes a hablar como pendejo rctmre ah vienes a awebar a la gente tu rctmre',
                'chibolo mongol te meto un galletazo ctmre te desahuevo mongol de mierda dotero',
                'oh mongol por que hablas asi? te apuesto a que si nos encontramos en la calle te hago correr oh chibolo baboso te quito todo lo que tienes oh recontra imbecil',
                'que re mil pucta me mencionas a mi oe mongol de mierda',
            ];
            yield message.reply(respuestas[(0, util_functions_1.getRandomNumber)(0, respuestas.length - 1)]);
            return;
        }
        if (message.content.toLowerCase().includes('hona') ||
            message.content.toLowerCase().includes('hoña')) {
            const responses = [
                'Hola Grupo\nGrupo contesten',
                'logs pe chato',
                'ma ma masivo',
                'o calla ps ramdon que ni conosco',
                'zu zu zumba',
                'tetas',
                `Ok ${(0, util_functions_1.getRandomNumber)(100, 250)}.${(0, util_functions_1.getRandomNumber)(0, 255)}.${(0, util_functions_1.getRandomNumber)(0, 255)}.${(0, util_functions_1.getRandomNumber)(10, 100)}`,
            ];
            message.channel.send(responses[(0, util_functions_1.getRandomNumber)(0, responses.length - 1)]);
            return;
        }
        if (message.content.toLowerCase().includes('gei')) {
            message.channel.send('axaim');
            return;
        }
        if (message.content.toLowerCase() === `${prefix}teleton`) {
            message.channel.send(`🤸
      🦽🏌️`);
            return;
        }
        if (!message.content.toLowerCase().startsWith(prefix))
            return;
        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        const command = ((_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
        const content = commandBody.slice(command.length).trim();
        const cmd = commands_1.prefixCommands.find((c) => c.name === command || (c.alias && c.alias.includes(command)));
        if (cmd) {
            cmd.execute({ client, message, args, content });
        }
        else {
            message.reply(`Wn qliao escribe bien el comando`);
        }
    }));
});
exports.onMessageCreate = onMessageCreate;
