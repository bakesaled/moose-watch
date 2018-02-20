import { Injectable } from '@angular/core';
import { DragDropData } from 'ng2-dnd';
import { DropEvent } from '../interfaces';

/**
 * Work-around for loss of dragData using ng2-dnd between modules.
 * Issue: https://github.com/akserg/ng2-dnd/issues/173
 */
@Injectable()
export class DndInterModuleCommService {
  public dragDropEventData: DragDropData | DropEvent;
}
