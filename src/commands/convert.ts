import axios from 'axios';
import { Command } from '../interfaces/command.interface';
import { EXCHANGE_API } from '../config';
import { ExchangeAPIResponse } from '../interfaces/api-exchange.interface';

export const convertCommand: Command = {
  name: 'convert',
  alias: ['convertir'],
  description: 'Convertir una moneda a otra',
  execute: async ({ message, args }) => {
    if (!args[0] || !args[1] || !args[2]) {
      message.channel.send(
        'Datos incompletos, la forma correcta de usar el comando es \n```+convert Monto Moneda-inicial Moneda-final ```'
      );
      return;
    }
    const monto = parseFloat(args[0]);
    const moneda_origen = args[1].toUpperCase();
    const moneda_destino = args[2].toUpperCase();

    if (isNaN(monto)) {
      message.channel.send(
        'El monto ingresado no es un número, la forma correcta de usar el comando es \n```+convert Monto Moneda-inicial Moneda-final```'
      );
      return;
    }
    axios
      .get<ExchangeAPIResponse>(
        `http://api.exchangeratesapi.io/v1/latest?access_key=${EXCHANGE_API}&format=1`
      )
      .then((res) => {
        const rates = Object.entries(res.data.rates);
        rates.push(['EUR', 1]);
        const value_origen = rates.find((rate) => rate[0] === moneda_origen);
        const value_destino = rates.find((rate) => rate[0] === moneda_destino);
        if (!value_origen) {
          message.reply(
            `Tipo de moneda no válida: **'${moneda_origen}'** \nLas monedas deben ser en símbolos (USD, PEN, MXN, etc)`
          );
          return;
        }
        if (!value_destino) {
          message.reply(
            `Tipo de moneda no válida: **'${moneda_destino}'** \nLas monedas deben ser en símbolos (USD, PEN, MXN, etc)`
          );
          return;
        }
        const resultado = (monto * value_destino[1]) / value_origen[1];
        message.reply(
          `Actualmente, **${monto} ${moneda_origen}** es igual a **${resultado.toFixed(
            2
          )} ${moneda_destino}**`
        );
      })
      .catch((err) => {
        console.log(err);
        message.reply('Ocurrió un error xd');
      });
    return;
  },
};
