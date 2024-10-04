export interface CardImage {
  small: string;
  large: string;
}

// The API returns more info than this.
// Feel free to extend it as you please.
export interface Set {
  id: string;
  name: string;
  releaseDate: string;
}

// The API returns much more info than this.
// Feel free to extend it as you please.
export interface PokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  number: string;
  images: CardImage;
  set: Set;
}
