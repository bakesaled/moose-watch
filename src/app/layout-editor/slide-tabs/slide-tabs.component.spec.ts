import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideTabsComponent } from './slide-tabs.component';
import { TabBodyComponent } from './tab-body/tab-body.component';
import { TabHeaderComponent } from './tab-header/tab-header.component';
import { Component, ViewChild } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  template: `
    <mw-slide-tabs [selectedIndex]="0">
      <mw-tab label="tab1">tab1 content</mw-tab>
      <mw-tab label="tab2">tab2 content</mw-tab>
    </mw-slide-tabs>
  `
})
class TestSlideTabsInitalSelectionComponent {
  @ViewChild(SlideTabsComponent) slideTabsComponent: SlideTabsComponent;
}

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
  describe('Default', () => {
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
  describe('Initial Selection', () => {
    let component: TestSlideTabsInitalSelectionComponent;
    let fixture: ComponentFixture<TestSlideTabsInitalSelectionComponent>;
    let selectedIndexChangeEmitSpy;

    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          declarations: [
            SlideTabsComponent,
            TabBodyComponent,
            TabHeaderComponent,
            TabComponent,
            TestSlideTabsInitalSelectionComponent
          ]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSlideTabsInitalSelectionComponent);
      component = fixture.componentInstance;

      selectedIndexChangeEmitSpy = spyOn(
        component.slideTabsComponent.selectedIndexChange,
        'emit'
      );
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should emit event if selectedIndex is set', () => {
      expect(selectedIndexChangeEmitSpy).toHaveBeenCalledWith(0);
    });
  });
});
