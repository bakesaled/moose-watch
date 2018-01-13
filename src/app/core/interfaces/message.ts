import { Command } from '../enums';

export interface Message {
  command: Command;
  data: any;
}
