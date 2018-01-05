import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { MatListModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {
  LayoutListService,
  LocalStorageService,
  MessageService
} from '../core/services';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [NavigationComponent],
        imports: [MatListModule, HttpClientModule],
        providers: [LayoutListService, LocalStorageService, MessageService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
