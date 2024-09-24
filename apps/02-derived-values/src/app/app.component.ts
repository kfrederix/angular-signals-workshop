import { AswTextInputDirective } from '@angular-signals-workshop/shared-ng-ui/input';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AswTextInputDirective],
  template: `
    <main class="p-6">
      <h1 class="text-xl font-bold mb-4">02 - Derived values</h1>

      <form class="flex flex-col gap-4 max-w-md" autocomplete="off">
        <input aswTextInput type="text" placeholder="Enter full name" (input)="onFullNameChange($event)" />
      </form>

      <p class="mt-6 text-lg">
        Your first name is:
        <!-- show first name here -->
      </p>
      <p class="mt-6 text-lg">
        Your last name is:
        <!-- show last name here -->
      </p>
      <p class="mt-6 text-lg">
        Your initials are:
        <!-- show initials here -->
      </p>
    </main>
  `,
})
export class AppComponent {
  fullName = signal('');

  onFullNameChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.fullName.set(target.value);
  }
}
