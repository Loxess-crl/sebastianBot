import { Command } from '../interfaces/command.interface';
import { animeCommand } from './anime';
import { convertCommand } from './convert';
import { decirCommand } from './decir';
import { putosCommand } from './putos';
import { ranitaCommand } from './ranita';
import { robotCommand } from './robot';

export const prefixCommands: Command[] = [
  animeCommand,
  convertCommand,
  decirCommand,
  putosCommand,
  ranitaCommand,
  robotCommand,
];
