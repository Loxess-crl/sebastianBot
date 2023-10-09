import { Client, GatewayIntentBits } from 'discord.js';
import { onMessageCreate, onReady } from './listeners';
import { TOKEN } from './config';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildScheduledEvents,
  ],
});

onReady(client);
onMessageCreate(client);

client.login(TOKEN);
