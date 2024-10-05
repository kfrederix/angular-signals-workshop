import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { type Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonCard } from '../entities/pokemon-card.interface';

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

  searchCardsByName(name: string): Observable<PokemonCard[]> {
    const query = `supertype:Pokémon name:"*${name}*"`;
    const orderBy = `-set.releaseDate,number`;
    return this.http.get<CardsResult>(`${apiBaseUrl}/cards?q=${query}&pageSize=${pageSize}&orderBy=${orderBy}`).pipe(map((result) => result.data));
  }
}
