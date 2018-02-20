import { EventEmitter, Injectable } from '@angular/core';
import { DragDropData } from 'ng2-dnd';

/**
 * Work-around for loss of dragData using ng2-dnd between modules.
 * Issue: https://github.com/akserg/ng2-dnd/issues/173
 */
@Injectable()
export class DndInterModuleCommService {
  public dragDropEventData: EventEmitter<DragDropData>;

  // public get dragDropEventData(): EventEmitter<DragDropData> {
  //   return this.dndEventData;
  // }
  // public set dragDropEventData(newValue: EventEmitter<DragDropData>) {
  //   this.dndEventData = newValue;
  // }
}
