import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  template: `
    <main class="p-6">
      <h1 class="text-xl font-bold mb-4">05 - Fun with Signals!</h1>
      <section>
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
})
export class AppComponent {}
