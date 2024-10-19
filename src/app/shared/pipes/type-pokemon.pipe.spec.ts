import { TypePokemonPipe } from './type-pokemon.pipe';

describe('TypePokemonPipe', () => {
  it('create an instance', () => {
    const pipe = new TypePokemonPipe();
    expect(pipe).toBeTruthy();
  });
});
