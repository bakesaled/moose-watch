import { Injectable } from '@angular/core';

/**
 * Work-around for loss of dragData using ng2-dnd between modules.
 * Issue: https://github.com/akserg/ng2-dnd/issues/173
 */
@Injectable()
export class DndInterModuleCommService {
  public dragDropEventData: any;
}
