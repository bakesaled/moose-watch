import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MwCellComponent } from '../lib/cell';
import { MwGridComponent } from '../lib/grid';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { NavigationModule } from './navigation/navigation.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { routing } from './app.routing';
import { LayoutViewerModule } from './layout-viewer/layout-viewer.module';

@NgModule({
  declarations: [
    AppComponent,
    MwCellComponent,
    MwGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    NavigationModule,
    LayoutViewerModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
