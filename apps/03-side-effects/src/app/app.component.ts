import { AswButtonDirective } from '@angular-signals-workshop/shared-ng-ui/button';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, AswButtonDirective],
  template: `
    <main class="p-6">
      <h1 class="text-xl font-bold mb-4">03 - Side-Effects</h1>
      <section>
        Sum:
        <pre>{{ term1$ | async }} + {{ term2$ | async }} = {{ sum$ | async }}</pre>

        <div class="mt-8">
          <button aswButton (click)="updateSum()">Update</button>
        </div>
      </section>
    </main>
  `,
})
export class AppComponent {
  private readonly term1Subject = new BehaviorSubject<number>(this.randomTerm());
  private readonly term2Subject = new BehaviorSubject<number>(this.randomTerm());

  readonly term1$ = this.term1Subject.asObservable();
  readonly term2$ = this.term2Subject.asObservable();

  readonly sum$ = combineLatest([this.term1$, this.term2$]).pipe(map(([x, y]) => x + y));

  constructor() {
    this.sum$.pipe(takeUntilDestroyed()).subscribe((sum) => {
      const term1 = this.term1Subject.getValue();
      const term2 = this.term2Subject.getValue();
      console.log(`${term1} + ${term2} = ${sum}`);
    });
  }

  private randomTerm(): number {
    return Math.ceil(Math.random() * 10);
  }

  updateSum() {
    this.term1Subject.next(this.randomTerm());
    this.term2Subject.next(this.randomTerm());
  }
}
