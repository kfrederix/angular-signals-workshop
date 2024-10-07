import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { injectQueryParams } from 'ngxtension/inject-query-params';
import { lastValueFrom } from 'rxjs';
import { PokemonApiService } from './api/pokemon-api.service';
import { PokemonCardsGridComponent } from './cards-grid.component';
import { LoadingIndicatorComponent } from './loading-indicator.component';
import { PokemonSearchBarComponent } from './search-bar.component';

@Component({
  standalone: true,
  selector: 'pokemon-cards-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoadingIndicatorComponent, PokemonCardsGridComponent, PokemonSearchBarComponent],
  template: `
    <div class="mt-6 flex flex-col gap-4">
      <pokemon-search-bar [initialSearchQuery]="searchParam()" (search)="onSearch($event)" />

      @if (cardsQuery.isPending()) {
        <div class="p-2"><loading-indicator /></div>
      }

      @if (cardsQuery.isError()) {
        <p>Error: {{ cardsQuery.error().message }}</p>
      }

      @if (cardsQuery.data(); as cards) {
        <!-- We can assume by this point that status === 'success' -->
        <pokemon-cards-grid [cards]="cards" />
      }
    </div>
  `,
})
export class PokemonCardsSearchComponent {
  // injectables
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly pokemonApiService = inject(PokemonApiService);

  // inject query param
  // see: https://ngxtension.netlify.app/utilities/injectors/inject-query-params/
  protected readonly searchParam = injectQueryParams('search');

  protected isLoading = signal(false);

  protected cardsQuery = injectQuery(() => {
    const searchQuery = this.searchParam() ?? '';
    return {
      queryKey: ['searchCardsByName', searchQuery],
      queryFn: () => lastValueFrom(this.pokemonApiService.searchCardsByName(searchQuery)),
    };
  });

  onSearch(searchValue: string): void {
    this.patchUrlSearchParam(searchValue);
  }

  /**
   * Patch the URL query param value
   */
  private patchUrlSearchParam(searchValue: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: searchValue || undefined },
      queryParamsHandling: 'merge',
    });
  }
}
