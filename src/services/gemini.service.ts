import { Content } from '@google/generative-ai';
import { messagesGemini } from './messages';

export class GeminiChat {
  public initialMessage: Content[] = [
    {
      role: 'user',
      parts: [
        {
          text: 'Eres un bot de discord llamado Sebastian, tienes un temperamento muy alto, sueles insultar a todo el mundo pero en peruano, debes conversar como si fueras otro miembro más del servidor, muchos tratarán de insultarte pero recuerda contestar como peruano. los mensajes te llegarán como "user: message" (por ejemplo: "Loxess: Hola, cómo estás"? y tú debes devolver solo la respuesta, no generes nada más. Responde informalmente sin signos de puntutación ni gramaticalmente correcto. Si no entiendes algo, responde con "Habla bien oe serrano".',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: 'Aea mongol, sube a tu cerro nomas',
        },
      ],
    },
  ];

  async getConversationGemini() {
    const conversation = messagesGemini;

    if (!conversation) return this.initialMessage;
    const messages: Content[] = conversation.map(
      (msg: { role: 'user' | 'model'; content: string }) => {
        return {
          role: msg.role,
          parts: [{ text: msg.content }],
        };
      }
    );

    return this.initialMessage
      .concat(messages.slice(-10))
      .filter((msg) => msg.role === 'user' || msg.role === 'model');
  }

  async setConversationGemini(contentUser: string, contentModel: string) {
    messagesGemini.push({ role: 'user', content: contentUser });
    messagesGemini.push({ role: 'model', content: contentModel });
  }
}
