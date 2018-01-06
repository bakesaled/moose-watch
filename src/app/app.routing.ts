import { RouterModule, Routes } from '@angular/router';
import { LayoutViewerComponent } from './layout-viewer/layout-viewer.component';
import { LayoutEditorComponent } from './layout-editor';
import { LandingComponent } from './landing/landing.component';

const APP_ROUTES: Routes = [
  { path: '', component: LandingComponent },
  { path: 'layout-viewer/:id', component: LayoutViewerComponent },
  { path: 'layout-editor/:id', component: LayoutEditorComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
