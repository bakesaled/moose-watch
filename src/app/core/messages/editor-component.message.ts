import { Message } from '../interfaces/message';
import { Command } from '../enums';

export class EditorComponentMessage implements Message {
  command: Command;
  data: any;
}
