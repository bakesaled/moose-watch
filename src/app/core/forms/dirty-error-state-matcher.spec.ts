import { DirtyErrorStateMatcher } from './dirty-error-state-matcher';
import { FormControl, Validators } from '@angular/forms';

describe('DirtyErrorStateMatcher', () => {
  let matcher;
  beforeEach(() => {
    matcher = new DirtyErrorStateMatcher();
  });

  it('should create', () => {
    expect(matcher).toBeDefined();
  });

  it('should return false by default', () => {
    expect(matcher.isErrorState()).toBeFalsy();
  });

  it('should return true if invalid and touched', () => {
    const control = new FormControl('1', [Validators.required]);
    control.setValue('');
    control.markAsTouched();
    expect(matcher.isErrorState(control)).toBeTruthy();
  });
});
