import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[aswTextInput]',
  standalone: true,
})
export class AswTextInputDirective {
  @HostBinding('class')
  protected tailwindClasses = 'py-2 px-4 border border-gray-600 rounded';
}
