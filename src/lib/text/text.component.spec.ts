import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MwTextComponent } from './text.component';
import { Component } from '@angular/core';
import { TextModel } from '../core/models/text.model';

@Component({
  template: `
    <mw-text [model]="model"></mw-text>
  `
})
class MockTextComponent {
  model: TextModel;
}

describe('TextComponent', () => {
  let component: MockTextComponent;
  let fixture: ComponentFixture<MockTextComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [MwTextComponent, MockTextComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MockTextComponent);
    component = fixture.componentInstance;
    component.model = new TextModel();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with default model', () => {
    const el = document.querySelector('.mw-text') as HTMLElement;
    expect(el).not.toBeNull();
  });

  it('should render value', () => {
    const model = new TextModel();
    model.value = 'red brick';
    component.model = model;
    fixture.detectChanges();

    const el = document.querySelector('.mw-text') as HTMLElement;
    expect(el.textContent).toContain('red brick');
  });

  it('should render italic', () => {
    const model = new TextModel();
    model.fontStyle = 'italic';
    component.model = model;
    fixture.detectChanges();

    const el = document.querySelector('.mw-text') as HTMLElement;
    const style = getComputedStyle(el);
    expect(style.fontStyle).toBe('italic');
  });

  it('should render bold', () => {
    const model = new TextModel();
    model.fontWeight = '900';
    component.model = model;
    fixture.detectChanges();

    const el = document.querySelector('.mw-text') as HTMLElement;
    const style = getComputedStyle(el);
    expect(style.fontWeight).toBe('900');
  });

  it('should render large text', () => {
    const model = new TextModel();
    model.fontSize = '20px';
    component.model = model;
    fixture.detectChanges();

    const el = document.querySelector('.mw-text') as HTMLElement;
    const style = getComputedStyle(el);
    expect(style.fontSize).toBe('20px');
  });
});
