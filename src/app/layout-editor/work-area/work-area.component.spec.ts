import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwWorkAreaComponent } from './work-area.component';
import { DndModule } from 'ng2-dnd';
import {
  LayoutListService,
  MessageService,
  SaveService
} from '../../core/services';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutService } from '../../../lib/layout/layout.service';
import { HttpClientModule } from '@angular/common/http';
import { MwWorkAreaModule } from './work-area.module';
import { LayoutModel } from '../../../lib/core/models/layout.model';
import { mockLocalStorage } from '../../core/mocks/local-storage.mock';
import { LocalStorageService } from '../../../lib/core/services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Command } from '../../core/enums';
import { WorkAreaMessage } from '../../core/messages/work-area.message';

describe('MwWorkAreaComponent', () => {
  let component: MwWorkAreaComponent;
  let fixture: ComponentFixture<MwWorkAreaComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [],
        imports: [
          DndModule.forRoot(),
          RouterTestingModule,
          HttpClientModule,
          MwWorkAreaModule
        ],
        providers: [
          MessageService,
          SaveService,
          LocalStorageService,
          LayoutService,
          LayoutListService,
          {
            provide: ActivatedRoute,
            useValue: {
              data: Observable.of({
                layout: new LayoutModel('testId', 'testName')
              })
            }
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

    const layout = new LayoutModel('testId', 'testName');
    localStorage.setItem(layout.id, JSON.stringify(layout));
    fixture = TestBed.createComponent(MwWorkAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save and publish WorkAreaMessage', () => {
    const spy = spyOn(component['messageService'], 'publish');
    component['save']();
    const savedLayout = JSON.parse(localStorage.getItem('testId'));
    expect(savedLayout).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(WorkAreaMessage, {
      command: Command.edit,
      data: { id: 'testId', name: 'new-layout-0' }
    });
  });

  it('should set name to next available when layout is new', () => {
    component.layoutModel.isNew = true;
    component['save']();
    expect(component.layoutModel.name).toBe('new-layout-0');
  });

  it('should call delete and publish WorkAreaMessage', () => {
    const spy = spyOn(component['messageService'], 'publish');
    component['deleteLayout']({
      command: Command.delete,
      data: undefined
    });
    const deletedLayout = localStorage.getItem('testId');
    expect(deletedLayout).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(WorkAreaMessage, {
      command: Command.delete
    });
  });
});
