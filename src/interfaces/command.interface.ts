import { Client, Message } from 'discord.js';

export interface Command {
  name: string;
  description: string;
  alias: string[];
  execute(props: Props): Promise<void> | void;
}

interface Props {
  client: Client;
  message: Message;
  args: string[];
  content?: string;
}
