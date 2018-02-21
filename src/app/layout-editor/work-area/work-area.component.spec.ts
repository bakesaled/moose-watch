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
import { EditorComponentMessage, WorkAreaMessage } from '../../core/messages';
import { MwEditorGridComponent } from '../grid';
import { MockEditorComponentModel } from '../../core/mocks/editor-component-model.mock';
import { Guid } from '../../core/utils';
import { EditorCellModel, EditorGridModel, EditorLayoutModel } from '../models';

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
    component.selected = true;
    const spy = spyOn(component['messageService'], 'publish');
    component['handleToolbarMessage']({
      command: Command.delete,
      data: undefined
    });
    const deletedLayout = localStorage.getItem('testId');
    expect(deletedLayout).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(WorkAreaMessage, {
      command: Command.delete
    });
  });

  it('should delete component', () => {
    const mockComponent = new MockEditorComponentModel();
    component.layoutModel.component = mockComponent;
    component['handleToolbarMessage']({
      command: Command.delete,
      data: {
        componentId: 'testId'
      }
    });
    expect(component.layoutModel.component).toBeUndefined();
  });

  it('should assign dropped grid to layout', () => {
    const dropEvent: any = {
      dragEvent: DragEvent,
      dragData: MwEditorGridComponent.name
    };
    component.handleDrop(dropEvent);
    const grid = new EditorGridModel();
    grid.cells = [
      new EditorCellModel(Guid.create(), 50),
      new EditorCellModel(Guid.create(), 50)
    ];
    expect(component.layoutModel.component.type).toBe(
      MwEditorGridComponent.name
    );
  });

  it('should be selected when clicked', () => {
    const spy = spyOn(component['messageService'], 'publish');
    expect(component.selected).toBeFalsy();
    const el: HTMLElement = fixture.nativeElement.querySelector(
      '.mw-work-area-target'
    );
    el.click();
    fixture.detectChanges();

    expect(component.selected).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(EditorComponentMessage, {
      command: Command.select,
      data: component.layoutModel
    });
  });

  it('should be unselected when already selected and clicked', () => {
    component.selected = true;
    fixture.detectChanges();
    expect(component.selected).toBeTruthy();
    const el = fixture.nativeElement.querySelector('.mw-work-area-target');
    const spy = spyOn(component['messageService'], 'publish');
    el.click();
    fixture.detectChanges();

    expect(component.selected).toBeFalsy();
    expect(spy).toHaveBeenCalledWith(EditorComponentMessage, {
      command: Command.select,
      data: undefined
    });
  });

  it('should set selected to false when a different component is selected', () => {
    component.selected = true;
    const model = new EditorLayoutModel('123');
    component['handleEditorComponentMessage']({
      command: Command.select,
      data: model
    });
    expect(component.selected).toBeFalsy();
  });

  it('should call destroy on factory component', () => {
    component.factoryComponent = <any>{
      destroyComponent() {}
    };
    expect(component.factoryComponent).toBeDefined();
    const spy = spyOn(component.factoryComponent, 'destroyComponent');

    component['destroyFactoryComponent']();
    expect(spy).toHaveBeenCalled();
  });

  it('should not be selected when child element is clicked', () => {
    const spy = spyOn(component['messageService'], 'publish');
    expect(component.selected).toBeFalsy();
    const childEl: HTMLElement = document.createElement('div');
    childEl.className = '.childEl';

    const event: any = { target: childEl };
    component.onclick(event);

    expect(component.selected).toBeFalsy();
    expect(spy).not.toHaveBeenCalledWith(EditorComponentMessage, {
      command: Command.select,
      data: component.layoutModel
    });
  });
});
