import { Pipe, PipeTransform } from '@angular/core';
import { types } from '../../models/pokemon.interface';

@Pipe({
  name: 'typePokemon',
  standalone: true
})
export class TypePokemonPipe implements PipeTransform {

  transform(value: Array<types> | undefined): string {
    const result = value?.map((type) => type.type.name).join('/') || '';

    return result;
}

}
