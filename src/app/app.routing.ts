import { RouterModule, Routes } from '@angular/router';
import { LayoutViewerComponent } from './layout-viewer/layout-viewer.component';
import { LayoutEditorComponent } from './layout-editor';
import { LandingComponent } from './landing/landing.component';
import { NgModule } from '@angular/core';
import { LayoutPreLoadResolver } from './core/resolvers/layout-pre-load.resolver';

const APP_ROUTES: Routes = [
  {
    path: '',
    component: LandingComponent,
    resolve: { loaded: LayoutPreLoadResolver }
  },
  {
    path: 'layout-viewer/:id',
    component: LayoutViewerComponent,
    resolve: { loaded: LayoutPreLoadResolver }
  },
  { path: 'layout-editor/:id', component: LayoutEditorComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
  providers: [LayoutPreLoadResolver]
})
export class AppRoutingModule {}
