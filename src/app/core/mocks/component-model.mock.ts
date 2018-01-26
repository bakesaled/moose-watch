import { MwComponentModel } from '../../../lib/core/interfaces/mw-component.model';

export class MockComponentModel implements MwComponentModel {
  constructor(
    public id: string = 'testId',
    public type: string = '',
    public name: string = 'mock'
  ) {}
}
