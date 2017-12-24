import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MwTextComponent } from './text.component';

describe('TextComponent', () => {
  let component: MwTextComponent;
  let fixture: ComponentFixture<MwTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
