import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Book } from './book.interface';

@Component({
  standalone: true,
  selector: 'book',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-2">
      <h2 class="text-xl font-bold">{{ book().title }}</h2>
      <h3 class="italic">{{ book().author }}</h3>
      <p>{{ book().description }}</p>
    </div>
  `,
})
export class BookComponent {
  book = input.required<Book>();
}
