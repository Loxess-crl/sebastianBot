import { Client, Events } from 'discord.js';
import { prefixCommands } from '../commands';
import { getRandomNumber } from '../utils/util-functions';
// import { BOT_ID } from '../config';

const prefix = 's!';

export const onMessageCreate = async (client: Client) => {
  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    // const mencionado = message.mentions.users.first();

    // if (mencionado && mencionado.id === BOT_ID) {
    //   const respuestas = [
    //     'Q CHUCHA QUIERES MONGOL DE MRD',
    //     'tu vieja',
    //     'a!nuke',
    //     'Ok color cartón',
    //     'Q chucha pasa',
    //     'o calla ps ramdon que ni conosco',
    //     'aea',
    //     'Aquí está tu vieja idi0ta mira como me la kacho Ooo tome señora tome',
    //     'Tamare oe quien pcta le dio dr0ga a la llama csm miren cómo está hablando idi0ta de mrd',
    //     'el que lo dice lo es',
    //     'fue mi pene',
    //     'calla perra',
    //     'ag esta chola se enamoro de mi mirando mi foto que asco chola de mierda',
    //     'mocosos de mrd y la ptamare',
    //     'callate ctmre nadie te quiere escuchar oe paisano',
    //     'oh wachi rctmr chibolo ctmr que chucha hablas',
    //     'oh desahuevate rctmr ya anda duerme imbecil no todo es clase carajo',
    //     'quien chucha eres tu webon',
    //     'callate tu d0wn de mrd idi0ta solo peru es la mejor gastronomia preguntale a los a los extranjeros hijo de p3rr4',
    //     'oe mrd corre bañate crj lee un libro y has algo por la vida',
    //     'que xuxa vienes a hablar como pendejo rctmre ah vienes a awebar a la gente tu rctmre',
    //     'o no jodan',
    //     'chibolo mongol te meto un galletazo ctmre te desahuevo mongol de mierda dotero',
    //     'oh mongol por que hablas asi? te apuesto a que si nos encontramos en la calle te hago correr oh chibolo baboso te quito todo lo que tienes oh recontra imbecil',
    //     'que re mil pucta me mencionas a mi oe mongol de mierda',
    //   ];

    //   await message.reply(
    //     respuestas[getRandomNumber(0, respuestas.length - 1)]
    //   );
    //   return;
    // }

    if (
      message.content.toLowerCase().includes('hona') ||
      message.content.toLowerCase().includes('hoña')
    ) {
      const responses = [
        'Hola Grupo\nGrupo contesten',
        'logs pe chato',
        'ma ma masivo',
        'o calla ps ramdon que ni conosco',
        'zu zu zumba',
        'o no jodan',
        'tetas',
        `Ok ${getRandomNumber(100, 250)}.${getRandomNumber(
          0,
          255
        )}.${getRandomNumber(0, 255)}.${getRandomNumber(10, 100)}`,
      ];
      message.channel.send(responses[getRandomNumber(0, responses.length - 1)]);
      return;
    }

    if (message.content.toLowerCase().includes('gei')) {
      message.channel.send('axaim');
      return;
    }

    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift()?.toLowerCase() || '';
    const content = commandBody.slice(command.length).trim();

    const cmd = prefixCommands.find(
      (c) => c.name === command || (c.alias && c.alias.includes(command))
    );
    if (cmd) {
      cmd.execute({ client, message, args, content });
    } else {
      message.reply(`Wn qliao escribe bien el comando`);
    }
  });
};
