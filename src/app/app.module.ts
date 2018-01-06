import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { NavigationModule } from './navigation/navigation.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { routing } from './app.routing';
import { LayoutViewerModule } from './layout-viewer/layout-viewer.module';
import { LayoutEditorModule } from './layout-editor/layout-editor.module';
import { LandingModule } from './landing/landing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    NavigationModule,
    LayoutViewerModule,
    LayoutEditorModule,
    LandingModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
