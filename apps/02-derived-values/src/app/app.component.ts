import { AswTextInputDirective } from '@angular-signals-workshop/shared-ng-ui/input';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

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
        {{ firstName() }}
      </p>
      <p class="mt-6 text-lg">
        Your last name is:
        {{ lastName() }}
      </p>
      <p class="mt-6 text-lg">
        Your initials are:
        {{ initials() }}
      </p>
    </main>
  `,
})
export class AppComponent {
  fullName = signal('');

  private nameParts = computed(() => {
    // read signals
    const fullName = this.fullName();
    // compute
    return fullName.split(' ').filter((n) => n.length > 0);
  });

  firstName = computed(() => this.nameParts()[0] ?? '');

  lastName = computed(() => {
    // read signals
    const nameParts = this.nameParts();
    // compute
    return nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  });

  initials = computed(() => {
    // read signals
    const nameParts = this.nameParts();
    // compute
    return nameParts.map((n) => `${n[0].toUpperCase()}.`).join('');
  });

  onFullNameChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.fullName.set(target.value);
  }
}
