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
exports.translateCommand = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
exports.translateCommand = {
    name: 'translate',
    alias: ['traducir', 'ts', 'trans'],
    description: 'traduce un texto de un idioma a otro',
    execute: ({ message, args }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const lang = (_a = args[0]) !== null && _a !== void 0 ? _a : 'es';
        if (!lang) {
            message.reply('Debes proporcionar un idioma de destino.');
            return;
        }
        // Verificar si el mensaje tiene una respuesta
        if (message.reference && message.reference.messageId) {
            // Obtener el mensaje al que se está respondiendo
            const repliedMessage = yield message.channel.messages.fetch(message.reference.messageId);
            // Traducir el texto del mensaje original
            const translation = yield translateText(lang, repliedMessage.content);
            // Enviar la traducción al canal
            message.reply(translation);
        }
        else if (args.length > 1) {
            const text = args.slice(1).join(' ');
            const translation = yield translateText(lang, text);
            message.reply(translation);
        }
        else {
            message.reply('Wn qliao responde un mensaje o escribe un texto para traducir.');
        }
        function translateText(targetLang, text) {
            return __awaiter(this, void 0, void 0, function* () {
                const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${config_1.TRANSLATE_API}`;
                const requestBody = {
                    q: text,
                    target: targetLang,
                };
                try {
                    const response = yield axios_1.default.post(apiUrl, requestBody);
                    return response.data.data.translations[0].translatedText;
                }
                catch (error) {
                    const errorText = handleTranslationError(error);
                    return errorText;
                }
            });
        }
        function handleTranslationError(error) {
            if (!axios_1.default.isAxiosError(error))
                return '**Wn q escriba bien, no entendí ni pincho (En realidad ocurrió un error, pudo ser cualquier cosa)**';
            if (error.response) {
                // El servidor respondió con un código de estado diferente de 2xx
                if (error.response.status === 400) {
                    return 'Mamaguevo especifica bien el idioma: https://cloud.google.com/translate/docs/languages';
                }
                return 'Ocurrió un error al intentar traducir el mensaje. Por favor, inténtalo de nuevo más tarde.';
            }
            else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                return 'Ocurrió un error al intentar comunicarse con el servidor de traducción. Por favor, inténtalo de nuevo más tarde.';
            }
            else {
                // Algo ocurrió en la configuración de la solicitud que generó un error
                return '**Wn q escriba bien, no entendí ni pincho (En realidad ocurrió un error, pudo ser cualquier cosa)**';
            }
        }
    }),
};
