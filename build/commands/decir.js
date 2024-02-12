"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decirCommand = void 0;
exports.decirCommand = {
    name: 'decir',
    alias: ['decir', 'diga', 'di'],
    description: 'Decir algo',
    execute: ({ message, content }) => {
        if (!content) {
            message.channel.send('Datos incompletos, la forma correcta de usar el comando es \n```+decir Mensaje ```');
            return;
        }
        message.channel.send(content);
        message.delete();
        return;
    },
};
