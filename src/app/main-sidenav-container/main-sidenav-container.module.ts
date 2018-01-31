import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainSidenavContainerComponent } from './main-sidenav-container.component';
import { NavigationModule } from '../navigation/navigation.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, SharedModule, NavigationModule, RouterModule],
  declarations: [MainSidenavContainerComponent],
  exports: [MainSidenavContainerComponent]
})
export class MainSidenavContainerModule {}
