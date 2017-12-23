import { MwComponentModel } from '../interfaces';

export class TextModel implements MwComponentModel {
  constructor(
    public id: string = 'NONE',
    public value: string = ''
  ) {}

  public static get empty(): TextModel {
    return new TextModel();
  }
}

