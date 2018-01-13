import { Command } from '../enums';
import { Message } from '../interfaces/message';

export class EditorCellMessage implements Message {
  command: Command;
  data: any;
}
