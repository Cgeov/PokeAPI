export interface Pokemon{
  abilities: Array<abilities>,
  base_experience: number,
  cries: cries,
  forms: Array<nameURL>,
  game_indices: Array<game_indices>,
  height: number,
  held_items: Array<any>,
  id: number,
  is_default: boolean,
  location_area_encounters: string,
  moves: Array<nameURL>,
  name: string,
  order: number,
  past_abilities: Array<any>,
  past_types: Array<any>,
  species: nameURL,
  sprites: sprites,
  stats: Array<stats>,
  types: Array<types>,
  selected?: boolean,
}

interface abilities{
  ability: nameURL,
  is_hidden: boolean,
  slot: number,
}

interface nameURL{
  name: string,
  url: string
}

interface cries{
  latest: string,
  legacy: string
}

interface game_indices{
  game_index: number,
  version: nameURL
}

interface sprites{
  back_default: string | null,
  back_female: string | null,
  back_shiny: string | null,
  back_shiny_female: string | null,
  front_default: string | null,
  front_female: string | null,
  front_shiny: string | null,
  front_shiny_female: string | null,
  other: otherSprites,
  versions: any,
}

interface otherSprites{
  home: homeOtherSprites,
  [key:string]: any,
}

interface homeOtherSprites{
  front_default: string | null,
  front_female: string | null,
  front_shiny:string | null,
  front_shiny_female: string | null,
}

export interface stats{
  base_stat: number,
  effort?: number,
  stat: nameURL,
}

export interface types{
  slot: number,
  type: nameURL,
  weight: number
}
