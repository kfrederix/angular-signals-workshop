import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { derivedAsync } from 'ngxtension/derived-async';
import { injectQueryParams } from 'ngxtension/inject-query-params';
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

      @let apiState = searchApiState();
      @switch (apiState.status) {
        @case ('loading') {
          <div class="p-2"><loading-indicator /></div>
        }
        @case ('loaded') {
          <pokemon-cards-grid [cards]="apiState.result ?? []" />
        }
        @case ('error') {
          <p>Oops, something went wrong 💥. Please try again in a minute.</p>
        }
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

  // derived state
  protected readonly searchApiState = derivedAsync(() => this.pokemonApiService.searchCardsByName(this.searchParam() ?? ''), { requireSync: true });

  onSearch(searchValue: string): void {
    this.patchUrlSearchParam(searchValue);
  }

  /**
   * Patch the URL query param value
   * @param searchValue
   */
  private patchUrlSearchParam(searchValue: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { search: searchValue || undefined },
      queryParamsHandling: 'merge',
    });
  }
}
