import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { ToolbarMessage } from '../core/messages/toolbar.message';
import { Command } from '../core/enums';
import { MessageService } from '../core/services';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ToolbarComponent],
        imports: [RouterTestingModule, MatToolbarModule, MatIconModule],
        providers: [MessageService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should publish a message on delete', () => {
    const spy = spyOn(component['messageService'], 'publish');
    component.onDeleteClick();
    expect(spy).toHaveBeenCalledWith(ToolbarMessage, {
      command: Command.delete
    });
  });
});