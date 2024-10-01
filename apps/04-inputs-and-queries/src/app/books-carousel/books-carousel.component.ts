import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { BookComponent } from './book.component';
import { Book } from './book.interface';
import { CarouselControlComponent } from './carousel-control.component';

@Component({
  standalone: true,
  selector: 'books-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookComponent],
  template: `
    <!-- TODO: useful for debugging - remove when everything is working... -->
    <p class="pt-4 font-mono">currentBookIndex: {{ currentBookIndex() }}</p>

    <book class="block mt-6 mb-8" [book]="currentBook()"></book>
  `,
})
export class BooksCarouselComponent {
  // Inputs
  books = input.required<Book[]>();

  // Private/Protected State
  protected currentBookIndex = signal(0);

  // Derived State
  private lastBookIndex = computed(() => Math.max(0, this.books().length - 1));
  protected currentBook = computed(() => this.books()[this.currentBookIndex()]);

  /**
   * A CarouselControlComponent must be connected, for the carousel to work.
   *
   * @param carouselControl
   */
  connectCarouselControl(carouselControl: CarouselControlComponent): void {
    carouselControl.prev.subscribe(() => this.goToPrev());
    carouselControl.next.subscribe(() => this.goToNext());
  }

  private goToNext(): void {
    this.currentBookIndex.update((currentIndex) => (currentIndex === this.lastBookIndex() ? 0 : currentIndex + 1));
  }

  private goToPrev(): void {
    this.currentBookIndex.update((currentIndex) => (currentIndex === 0 ? this.lastBookIndex() : currentIndex - 1));
  }
}
