import { RouterModule, Routes } from '@angular/router';
import { LayoutViewerComponent } from './layout-viewer/layout-viewer.component';
import { LayoutEditorComponent } from './layout-editor';

const APP_ROUTES: Routes = [
  { path: 'layout-viewer', component: LayoutViewerComponent },
  { path: 'layout-editor', component: LayoutEditorComponent },
  { path: '**', redirectTo: '/layout-viewer', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
