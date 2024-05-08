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
exports.convertCommand = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
exports.convertCommand = {
    name: 'convert',
    alias: ['convertir'],
    description: 'Convertir una moneda a otra',
    execute: ({ message, args }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args[0] || !args[1] || !args[2]) {
            message.channel.send('Datos incompletos, la forma correcta de usar el comando es \n```+convert Monto Moneda-inicial Moneda-final ```');
            return;
        }
        const monto = parseFloat(args[0]);
        const moneda_origen = args[1].toUpperCase();
        const moneda_destino = args[2].toUpperCase();
        if (isNaN(monto)) {
            message.channel.send('El monto ingresado no es un número, la forma correcta de usar el comando es \n```+convert Monto Moneda-inicial Moneda-final```');
            return;
        }
        axios_1.default
            .get(`http://api.exchangeratesapi.io/v1/latest?access_key=${config_1.EXCHANGE_API}&format=1`)
            .then((res) => {
            const rates = Object.entries(res.data.rates);
            rates.push(['EUR', 1]);
            const value_origen = rates.find((rate) => rate[0] === moneda_origen);
            const value_destino = rates.find((rate) => rate[0] === moneda_destino);
            if (!value_origen) {
                message.reply(`Tipo de moneda no válida: **'${moneda_origen}'** \nLas monedas deben ser en símbolos (USD, PEN, MXN, etc)`);
                return;
            }
            if (!value_destino) {
                message.reply(`Tipo de moneda no válida: **'${moneda_destino}'** \nLas monedas deben ser en símbolos (USD, PEN, MXN, etc)`);
                return;
            }
            const resultado = (monto * value_destino[1]) / value_origen[1];
            message.reply(`Actualmente, **${monto} ${moneda_origen}** es igual a **${resultado.toFixed(2)} ${moneda_destino}**`);
        })
            .catch((err) => {
            console.log(err);
            message.reply('Ocurrió un error xd');
        });
        return;
    }),
};
