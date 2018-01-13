import { Command } from '../enums';
import { Message } from '../interfaces/message';

export class ToolPanelMessage implements Message {
  command: Command;
  data: any;
}
