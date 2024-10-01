import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'book',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-2">
      <h2 class="text-xl font-bold">TODO: render book title</h2>
      <h3 class="italic">TODO: render book author</h3>
      <p>TODO: render book description</p>
    </div>
  `,
})
export class BookComponent {
  // TODO: take book data as input
}
