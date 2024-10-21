import { Injectable, signal } from '@angular/core';
import { Account } from '../../models/account.interface';
import { Pokemon } from '../../models/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private account = signal<Account | null>(null);
  private pokemonsSelected = signal<Array<Pokemon> | null>(null);

  constructor() {}

  updateAccountStorage(value: Account | null) {
    this.account.set(value);
  }

  updatePokemonsStorage(value: Array<Pokemon> | null) {
    this.pokemonsSelected.set(value);
  }

  getAccountStorage() {
    return this.account();
  }

  getPokemonsStorage() {
    return this.pokemonsSelected();
  }
}
