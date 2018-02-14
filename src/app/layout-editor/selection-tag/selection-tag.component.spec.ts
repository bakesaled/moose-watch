import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionTagComponent } from './selection-tag.component';
import { SelectionTagModule } from './selection-tag.module';
import { Component, ViewChild } from '@angular/core';

@Component({
  template: `
    <div class="parentElem" style="height: 32px; width: 64px">
      <mw-selection-tag [icon]="icon">red</mw-selection-tag>
      <div class="childElem" style="height: 32px; width: 64px"></div>
    </div>
  `
})
class SelectionTagTestComponent {
  icon: string;
  @ViewChild(SelectionTagComponent)
  selectionTagComponent: SelectionTagComponent;
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

  it('should show/hide on mouse over/out', () => {
    let elem = fixture.nativeElement.querySelector('.mw-selection-tag');
    let styles = getComputedStyle(elem);
    expect(styles.display).toContain('none');

    let event = new MouseEvent('mouseenter');
    const parentElem = fixture.nativeElement.querySelector('.parentElem');
    parentElem.dispatchEvent(event);
    fixture.detectChanges();

    elem = fixture.nativeElement.querySelector('.mw-selection-tag');
    styles = getComputedStyle(elem);
    expect(styles.display).toContain('block');

    event = new MouseEvent('mouseout');
    parentElem.dispatchEvent(event);
    fixture.detectChanges();

    elem = fixture.nativeElement.querySelector('.mw-selection-tag');
    styles = getComputedStyle(elem);
    expect(styles.display).toContain('none');
  });

  it('should not hide on mouseout when selected', () => {
    const parentElem = fixture.nativeElement.querySelector('.parentElem');
    parentElem.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    component.selectionTagComponent.selected = true;
    fixture.detectChanges();
    parentElem.dispatchEvent(new MouseEvent('mouseout'));
    fixture.detectChanges();
    expect(component.selectionTagComponent.visible).toBeTruthy();
  });

  it('should not change value of visible when selected and mouseout occurs', () => {
    expect(component.selectionTagComponent.visible).toBeUndefined();
    const parentElem = fixture.nativeElement.querySelector('.parentElem');
    component.selectionTagComponent.selected = true;
    fixture.detectChanges();
    expect(component.selectionTagComponent.visible).toBeTruthy();
    parentElem.dispatchEvent(new MouseEvent('mouseout'));
    fixture.detectChanges();
    expect(component.selectionTagComponent.visible).toBeTruthy();
  });

  it('should set value of visible to true when mouseout target is a child of the parent element', () => {
    expect(component.selectionTagComponent.visible).toBeUndefined();
    const parentElem: HTMLElement = fixture.nativeElement.querySelector(
      '.parentElem'
    );
    const childElem: HTMLElement = fixture.nativeElement.querySelector(
      '.childElem'
    );

    const event: any = { target: childElem, toElement: parentElem };
    parentElem.onmouseout(event);
    fixture.detectChanges();
    expect(component.selectionTagComponent.visible).toBeTruthy();
  });
});
