import axios from 'axios';
import { Command } from '../interfaces/command.interface';
import { TRANSLATE_API } from '../config';

export const translateCommand: Command = {
  name: 'translate',
  alias: ['traducir', 'ts', 'trans'],
  description: 'traduce un texto de un idioma a otro',
  execute: async ({ message, args }) => {
    const lang = args[0] ?? 'es';

    if (!lang) {
      message.reply('Debes proporcionar un idioma de destino.');
      return;
    }

    // Verificar si el mensaje tiene una respuesta
    if (message.reference && message.reference.messageId) {
      // Obtener el mensaje al que se está respondiendo
      const repliedMessage = await message.channel.messages.fetch(
        message.reference.messageId
      );

      // Traducir el texto del mensaje original
      const translation = await translateText(lang, repliedMessage.content);

      // Enviar la traducción al canal
      message.reply(translation);
    } else if (args.length > 1) {
      const text = args.slice(1).join(' ');
      const translation = await translateText(lang, text);
      message.reply(translation);
    } else {
      message.reply(
        'Wn qliao responde un mensaje o escribe un texto para traducir.'
      );
    }

    async function translateText(targetLang: string, text: string) {
      const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${TRANSLATE_API}`;

      const requestBody = {
        q: text,
        target: targetLang,
      };
      try {
        const response = await axios.post(apiUrl, requestBody);

        return response.data.data.translations[0].translatedText;
      } catch (error) {
        const errorText = handleTranslationError(error);
        return errorText;
      }
    }

    function handleTranslationError(error: unknown): string {
      if (!axios.isAxiosError(error))
        return '**Wn q escriba bien, no entendí ni pincho (En realidad ocurrió un error, pudo ser cualquier cosa)**';
      if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        if (error.response.status === 400) {
          return 'Mamaguevo especifica bien el idioma: https://cloud.google.com/translate/docs/languages';
        }
        return 'Ocurrió un error al intentar traducir el mensaje. Por favor, inténtalo de nuevo más tarde.';
      } else if (error.request) {
        // La solicitud fue hecha pero no se recibió respuesta
        return 'Ocurrió un error al intentar comunicarse con el servidor de traducción. Por favor, inténtalo de nuevo más tarde.';
      } else {
        // Algo ocurrió en la configuración de la solicitud que generó un error
        return '**Wn q escriba bien, no entendí ni pincho (En realidad ocurrió un error, pudo ser cualquier cosa)**';
      }
    }
  },
};
