import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideTabsComponent } from './slide-tabs.component';
import { TabBodyComponent } from './tab-body/tab-body.component';
import { TabHeaderComponent } from './tab-header/tab-header.component';
import { Component, ViewChild } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  template: `
    <mw-slide-tabs>
      <mw-tab label="tab1">tab1 content</mw-tab>
      <mw-tab label="tab2">tab2 content</mw-tab>
    </mw-slide-tabs>
  `
})
class TestSlideTabsComponent {
  @ViewChild(SlideTabsComponent) slideTabsComponent: SlideTabsComponent;
}

describe('SlideTabsComponent', () => {
  let component: TestSlideTabsComponent;
  let fixture: ComponentFixture<TestSlideTabsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SlideTabsComponent,
          TabBodyComponent,
          TabHeaderComponent,
          TabComponent,
          TestSlideTabsComponent
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSlideTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedIndex when tab is clicked', () => {
    expect(component.slideTabsComponent.selectedIndex).toBeUndefined();
    const tabLabelEl = fixture.nativeElement.querySelectorAll(
      '.mw-tab-label'
    )[0] as HTMLElement;
    tabLabelEl.click();

    expect(component.slideTabsComponent.selectedIndex).toBe(0);
  });

  it('should set selectedIndex to undefined if a selected tab is clicked', () => {
    component.slideTabsComponent.selectedIndex = 0;
    const tabLabelEl = fixture.nativeElement.querySelectorAll(
      '.mw-tab-label'
    )[0] as HTMLElement;
    tabLabelEl.click();

    expect(component.slideTabsComponent.selectedIndex).toBeUndefined();
  });
});
