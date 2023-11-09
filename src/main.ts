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
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildPresences,
  ],
});

onReady(client);
onMessageCreate(client);

client.login(TOKEN);
