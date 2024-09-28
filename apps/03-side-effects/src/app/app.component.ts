import { AswButtonDirective } from '@angular-signals-workshop/shared-ng-ui/button';
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AswButtonDirective],
  template: `
    <main class="p-6">
      <h1 class="text-xl font-bold mb-4">03 - Side-Effects</h1>
      <section>
        Random sum:
        <pre>{{ term1() }} + {{ term2() }} = {{ sum() }}</pre>

        <div class="mt-8">
          <button aswButton (click)="updateSum()">Update</button>
        </div>
      </section>
    </main>
  `,
})
export class AppComponent {
  readonly term1 = signal(this.randomTerm());
  readonly term2 = signal(this.randomTerm());

  readonly sum = computed(() => this.term1() + this.term2());

  constructor() {
    effect(() => {
      // read signals
      const term1 = this.term1();
      const term2 = this.term2();
      const sum = this.sum();
      // side-effect
      console.log(`${term1} + ${term2} = ${sum}`);
    });
  }

  private randomTerm(): number {
    return Math.ceil(Math.random() * 10);
  }

  updateSum() {
    this.term1.set(this.randomTerm());
    this.term2.set(this.randomTerm());
  }
}
