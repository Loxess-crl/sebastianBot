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
exports.openAiChat = void 0;
const generative_ai_1 = require("@google/generative-ai");
const config_1 = require("../config");
const gemini_service_1 = require("../services/gemini.service");
const openAiChat = (client) => __awaiter(void 0, void 0, void 0, function* () {
    client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        if (message.author.bot || !((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.size))
            return;
        const mention = message.mentions.members.first();
        if (mention && mention.user.id === ((_b = client.user) === null || _b === void 0 ? void 0 : _b.id)) {
            if (message.content.trim() === `<@${client.user.id}>`) {
                message.reply('¡Hola! ¿En qué puedo ayudarte? B-Baka!');
            }
            else {
                try {
                    const genAI = new generative_ai_1.GoogleGenerativeAI(config_1.GEMINI_TOKEN);
                    const GeminiChatService = new gemini_service_1.GeminiChat();
                    const history = yield GeminiChatService.getConversationGemini();
                    console.log(history);
                    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
                    const chat = model.startChat({
                        history,
                        generationConfig: {
                            maxOutputTokens: 60,
                        },
                        safetySettings: [
                            {
                                category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
                                threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
                            },
                            {
                                category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                                threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
                            },
                            {
                                category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                                threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
                            },
                            {
                                category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                                threshold: generative_ai_1.HarmBlockThreshold.BLOCK_NONE,
                            },
                        ],
                    });
                    const user = message.author.username;
                    const mentionBotString = '<@842551988734263297>';
                    const prompt = `${user}: ${message.content.replace(mentionBotString, '')}`;
                    yield message.channel.sendTyping();
                    const result = yield chat.sendMessage(prompt);
                    const response = result.response;
                    const text = response.text();
                    message.reply({ content: text });
                    GeminiChatService.setConversationGemini(prompt, text);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    }));
});
exports.openAiChat = openAiChat;
