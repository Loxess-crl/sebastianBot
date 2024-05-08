import { Client, GatewayIntentBits } from 'discord.js';
import { onMessageCreate, onReady } from './listeners';
import { TOKEN } from './config';
import { openAiChat } from './listeners/on-chatbot';

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

openAiChat(client);
onReady(client);
onMessageCreate(client);

client.login(TOKEN);
