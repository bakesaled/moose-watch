import { Message } from '../interfaces/message';
import { Command } from '../enums';

export class PropertyEditorMessage implements Message {
  command: Command;
  data: any;
}
