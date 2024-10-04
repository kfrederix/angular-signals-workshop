import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { PokemonCard } from './entities/pokemon-card.interface';

@Component({
  standalone: true,
  selector: 'pokemon-cards-grid-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<img [src]="card().images.small" [alt]="cardTitle()" [title]="cardTitle()" />`,
})
export class PokemonCardsGridItemComponent {
  card = input.required<PokemonCard>();

  cardTitle = computed(() => {
    // read signals
    const card = this.card();
    // compute
    return this.getCardTitle(card);
  });

  private getCardTitle(card: PokemonCard): string {
    return `${card.name} - ${card.subtypes.join('/')} - HP: ${card.hp} - ${card.set.name}`;
  }
}
