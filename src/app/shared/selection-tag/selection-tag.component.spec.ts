import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionTagComponent } from './selection-tag.component';
import { SelectionTagModule } from './selection-tag.module';
import { Component } from '@angular/core';

@Component({
  template: `
    <div class="parentElem" style="height: 32px; width: 64px">
      <mw-selection-tag [icon]="icon">red</mw-selection-tag>
    </div>
  `
})
class SelectionTagTestComponent {
  icon: string;
}

describe('SelectionTagComponent', () => {
  let component: SelectionTagTestComponent;
  let fixture: ComponentFixture<SelectionTagTestComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SelectionTagTestComponent],
        imports: [SelectionTagModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionTagTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content', () => {
    const elem = fixture.nativeElement.querySelector('.mw-selection-tag');
    expect(elem.textContent).toContain('red');
  });

  it('should render icon and text', () => {
    component.icon = 'delete';
    fixture.detectChanges();
    const elem = fixture.nativeElement.querySelector('.mw-selection-tag');
    expect(elem.textContent).toContain('red');
    const icon = fixture.nativeElement.querySelector('mat-icon');
    expect(icon.textContent).toContain('delete');
  });

  it('should show/hide on mouse enter/leave', () => {
    let elem = fixture.nativeElement.querySelector('.mw-selection-tag');
    let styles = getComputedStyle(elem);
    expect(styles.display).toContain('none');

    let event = new Event('mouseenter');
    const parentElem = fixture.nativeElement.querySelector('.parentElem');
    parentElem.dispatchEvent(event);
    fixture.detectChanges();

    elem = fixture.nativeElement.querySelector('.mw-selection-tag');
    styles = getComputedStyle(elem);
    expect(styles.display).toContain('block');

    event = new Event('mouseleave');
    parentElem.dispatchEvent(event);
    fixture.detectChanges();

    elem = fixture.nativeElement.querySelector('.mw-selection-tag');
    styles = getComputedStyle(elem);
    expect(styles.display).toContain('none');
  });
});
