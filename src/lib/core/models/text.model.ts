export class TextModel {
  constructor(
    public id: string = 'NONE',
    public value: string = ''
  ) {}

  public static get empty(): TextModel {
    return new TextModel();
  }
}

