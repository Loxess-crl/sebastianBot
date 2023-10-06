import { Client } from 'discord.js';
import { onReady } from './listeners';
import { TOKEN } from './config';

const client = new Client({
  intents: ['Guilds', 'GuildMessages'],
});

onReady(client);

client.login(TOKEN);
