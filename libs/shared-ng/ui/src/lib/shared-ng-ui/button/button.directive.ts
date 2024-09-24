import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[sgButton]',
  standalone: true,
})
export class SgButtonDirective {
  @HostBinding('class')
  protected buttonTailwindClasses = 'bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-500';
}
