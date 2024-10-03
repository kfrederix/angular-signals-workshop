import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="p-6">
      <h1 class="text-xl font-bold mb-4">05 - Fun with Signals!</h1>
      <section>
        <p>Let's upgrade this boring white page to a cool Pokémon search app... Have fun! 💪</p>
      </section>
    </main>
  `,
})
export class AppComponent {}
