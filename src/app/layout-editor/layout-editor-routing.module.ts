import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutEditorComponent } from './layout-editor.component';

const layoutEditorRoutes: Routes = [
  {
    path: '',
    component: LayoutEditorComponent
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(layoutEditorRoutes)],
  exports: [RouterModule]
})
export class LayoutEditorRoutingModule {}
