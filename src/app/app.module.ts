import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { LayoutViewerModule } from './layout-viewer/layout-viewer.module';
import { LandingModule } from './landing/landing.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { MainSidenavContainerModule } from './main-sidenav-container/main-sidenav-container.module';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    MainSidenavContainerModule,
    LayoutViewerModule,
    LandingModule,
    ToolbarModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
