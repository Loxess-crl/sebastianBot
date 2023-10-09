import { ActivityType, Client, Events, PresenceUpdateStatus } from 'discord.js';

export const onReady = (client: Client) => {
  const presence = () => {
    client.user?.setPresence({
      status: PresenceUpdateStatus.Online,
      activities: [{ name: 'Furry Porn Hard', type: ActivityType.Watching }],
    });
  };
  client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user?.username}!`);

    presence();
  });
};
