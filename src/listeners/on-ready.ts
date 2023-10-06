import { Client, Events } from 'discord.js';

export const onReady = (client: Client) => {
  client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user?.username}!`);
  });
};
