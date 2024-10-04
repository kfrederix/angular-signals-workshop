import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of, type Observable } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { PokemonCard } from '../entities/pokemon-card.interface';
import { ApiCallState } from './api-call-state.interface';

// Learn more about this Api?
// see: https://docs.pokemontcg.io/
const apiBaseUrl = 'https://api.pokemontcg.io/v2';
const pageSize = 10;

interface CardsResult {
  count: number;
  data: PokemonCard[];
  page: number;
  pageSize: number;
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class PokemonApiService {
  private readonly http = inject(HttpClient);

  searchCardsByName(name: string): Observable<ApiCallState<PokemonCard[]>> {
    const query = `supertype:Pokémon name:"*${name}*"`;
    const orderBy = `-set.releaseDate,number`;
    return this.http.get<CardsResult>(`${apiBaseUrl}/cards?q=${query}&pageSize=${pageSize}&orderBy=${orderBy}`).pipe(
      map((result) => ({ status: 'loaded' as const, result: result.data })),
      startWith({ status: 'loading' as const, result: [] }),
      catchError((err) => of({ status: 'error' as const, error: err })),
    );
  }
}
