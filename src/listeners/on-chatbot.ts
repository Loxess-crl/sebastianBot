import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import { Client } from 'discord.js';
import { GEMINI_TOKEN } from '../config';
import { GeminiChat } from '../services/gemini.service';
import { getRandomNumber } from '../utils/util-functions';

export const openAiChat = async (client: Client) => {
  client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.mentions.members?.size) return;
    const mention = message.mentions.members.first();

    if (mention && mention.user.id === client.user?.id) {
      if (message.content.trim() === `<@${client.user.id}>`) {
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
          'o no jodan',
          'chibolo mongol te meto un galletazo ctmre te desahuevo mongol de mierda dotero',
          'oh mongol por que hablas asi? te apuesto a que si nos encontramos en la calle te hago correr oh chibolo baboso te quito todo lo que tienes oh recontra imbecil',
          'que re mil pucta me mencionas a mi oe mongol de mierda',
        ];

        await message.reply(
          respuestas[getRandomNumber(0, respuestas.length - 1)]
        );
        return;
      } else {
        try {
          const genAI = new GoogleGenerativeAI(GEMINI_TOKEN);
          const GeminiChatService = new GeminiChat();
          const history = await GeminiChatService.getConversationGemini();
          console.log(history);

          const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
          const chat = model.startChat({
            history,
            generationConfig: {
              maxOutputTokens: 60,
            },
            safetySettings: [
              {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
              {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
              {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
              {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE,
              },
            ],
          });
          const user = message.author.username;
          const mentionBotString = '<@842551988734263297>';
          const prompt = `${user}: ${message.content.replace(
            mentionBotString,
            ''
          )}`;
          await message.channel.sendTyping();
          const result = await chat.sendMessage(prompt);
          const response = result.response;
          const text = response.text();

          message.reply({ content: text });
          GeminiChatService.setConversationGemini(prompt, text);
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
};
