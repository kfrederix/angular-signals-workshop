import { Routes } from '@angular/router';
import { PokemonCardsSearchComponent } from './pokemon-cards-search/cards-search.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cards',
    pathMatch: 'full',
  },
  {
    path: 'cards',
    component: PokemonCardsSearchComponent,
  },
];
