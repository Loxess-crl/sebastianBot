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
exports.GeminiChat = void 0;
const messages_1 = require("./messages");
class GeminiChat {
    constructor() {
        this.initialMessage = [
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
    }
    getConversationGemini() {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = messages_1.messagesGemini;
            if (!conversation)
                return this.initialMessage;
            const messages = conversation.map((msg) => {
                return {
                    role: msg.role,
                    parts: [{ text: msg.content }],
                };
            });
            return this.initialMessage
                .concat(messages.slice(-10))
                .filter((msg) => msg.role === 'user' || msg.role === 'model');
        });
    }
    setConversationGemini(contentUser, contentModel) {
        return __awaiter(this, void 0, void 0, function* () {
            messages_1.messagesGemini.push({ role: 'user', content: contentUser });
            messages_1.messagesGemini.push({ role: 'model', content: contentModel });
        });
    }
}
exports.GeminiChat = GeminiChat;
