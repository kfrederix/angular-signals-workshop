import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { injectQueryParams } from 'ngxtension/inject-query-params';
import { switchMap, tap } from 'rxjs/operators';
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

      @if (isLoading()) {
        <div class="p-2"><loading-indicator /></div>
      } @else {
        <pokemon-cards-grid [cards]="cards() ?? []" />
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

  // derived state
  protected readonly cards = toSignal(
    toObservable(this.searchParam).pipe(
      tap(() => this.isLoading.set(true)),
      switchMap((searchQuery) => this.pokemonApiService.searchCardsByName(searchQuery ?? '')),
      tap(() => this.isLoading.set(false)),
    ),
  );

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
