import { Command } from '../enums';
import { Message } from '../interfaces/message';

export class WorkAreaMessage implements Message {
  command: Command;
  data: any;
}
