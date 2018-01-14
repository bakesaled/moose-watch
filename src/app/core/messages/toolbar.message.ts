import { Command } from '../enums';
import { Message } from '../interfaces/message';

export class ToolbarMessage implements Message {
  command: Command;
  data: any;
}
