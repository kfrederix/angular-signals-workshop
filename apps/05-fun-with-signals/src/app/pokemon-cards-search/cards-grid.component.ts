import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonCardsGridItemComponent } from './cards-grid-item.component';
import type { PokemonCard } from './entities/pokemon-card.interface';

@Component({
  standalone: true,
  selector: 'pokemon-cards-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PokemonCardsGridItemComponent],
  template: `
    @if (cards().length > 0) {
      <div class="grid grid-cols-5 gap-6 max-w-screen-2xl">
        @for (card of cards(); track card.id) {
          <pokemon-cards-grid-item [card]="card" />
        }
      </div>
    } @else {
      <p class="px-4 py-2 text-lg">No results found.</p>
    }
  `,
})
export class PokemonCardsGridComponent {
  cards = input.required<PokemonCard[]>();
}
