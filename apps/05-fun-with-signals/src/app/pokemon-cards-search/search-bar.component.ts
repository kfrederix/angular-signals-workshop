import { AswTextInputDirective } from '@angular-signals-workshop/shared-ng-ui/input';
import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'pokemon-search-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, AswTextInputDirective],
  template: `
    <div>
      <input aswTextInput class="w-96" [formControl]="searchControl" placeholder="Search for a card" />
      <div class="pt-1 pl-1 text-gray-600">hint: try "venusaur", "gengar" or "charmander" (or any other Pokémon you know...)</div>
    </div>
  `,
})
export class PokemonSearchBarComponent implements OnInit {
  // Inputs
  initialSearchQuery = input<string | null>(null);

  // form control
  protected readonly searchControl = new FormControl('', { nonNullable: true });

  // Automatic output from formcontrol (debounced)
  search = outputFromObservable(this.searchControl.valueChanges.pipe(debounceTime(300)));

  ngOnInit(): void {
    // Update FormControl with initial value from query param
    // NOTE: we want do this only once, when the component loads (never while a user is typing)
    this.searchControl.patchValue(this.initialSearchQuery() ?? '');
  }
}
