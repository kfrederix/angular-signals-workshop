import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[aswButton]',
  standalone: true,
})
export class AswButtonDirective {
  @HostBinding('class')
  protected tailwindClasses = 'bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-500';
}
