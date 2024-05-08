import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import { Client } from 'discord.js';
import { GEMINI_TOKEN } from '../config';
import { GeminiChat } from '../services/gemini.service';

export const openAiChat = async (client: Client) => {
  client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.mentions.members?.size) return;
    const mention = message.mentions.members.first();

    if (mention && mention.user.id === client.user?.id) {
      if (message.content.trim() === `<@${client.user.id}>`) {
        message.reply('¡Hola! ¿En qué puedo ayudarte? B-Baka!');
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
