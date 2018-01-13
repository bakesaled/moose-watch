import { TestBed, inject } from '@angular/core/testing';

import { MessageService } from './message.service';
import { Command } from '../enums';
import { Message } from '../interfaces/message';
import { Subject } from 'rxjs/Subject';

class MockMessage implements Message {
  command: Command;
  data: any;
}

describe('MessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it(
    'should be created',
    inject([MessageService], (service: MessageService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should not publish if channel does not exist',
    inject([MessageService], (service: MessageService) => {
      const spy = spyOn(service['channels'], 'get');
      service.publish(MockMessage, {
        command: Command.none,
        data: ''
      });
      expect(spy).not.toHaveBeenCalled();
    })
  );

  it(
    'should return channel',
    inject([MessageService], (service: MessageService) => {
      const subj = new Subject<MockMessage>();
      const result = service.channel(MockMessage);
      expect(result).toEqual(subj.asObservable());
    })
  );
});
