import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

/**
 * Workout for Angular shortcoming that doesn't compile custom attributes on component tags.
 * flex-layout issue: https://github.com/angular/flex-layout/issues/76
 * angular issue: https://github.com/angular/angular/issues/8785
 */
@Injectable()
export class FlexLayoutShimService {
  constructor(private sanitizer: DomSanitizer) {
  }

  getStyle(attribute: string, value: string): SafeStyle {
    switch (attribute) {
      case 'fxLayout':
        switch (value) {
          case 'row':
            return this.sanitizer.bypassSecurityTrustStyle('flex-direction: row; box-sizing: border-box; display: flex;');
        }
      case 'fxFlex':
        return this.sanitizer.bypassSecurityTrustStyle(`flex: 1 1 100%; box-sizing: border-box; max-width: ${value}%;`);
    }

    return '';
  }
}
