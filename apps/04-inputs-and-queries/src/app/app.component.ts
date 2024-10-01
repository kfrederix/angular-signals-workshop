import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BooksCarouselComponent } from './books-carousel/books-carousel.component';
import { CarouselControlComponent } from './books-carousel/carousel-control.component';
import { books } from './books.data';

@Component({
  standalone: true,
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BooksCarouselComponent, CarouselControlComponent],
  template: `
    <main class="p-6 max-w-3xl">
      <h1 class="text-xl font-bold mb-4">04 - Inputs & Queries</h1>

      <p class="text-lg">Recommended book for you:</p>

      <div class="pt-6 pb-2">
        <carousel-control></carousel-control>
      </div>

      <!-- TODO: pass books data into the component -->
      <books-carousel></books-carousel>
    </main>
  `,
})
export class AppComponent {
  protected readonly books = books;

  // TODO: connect CarouselControlComponent to BooksCarouselComponent
}
