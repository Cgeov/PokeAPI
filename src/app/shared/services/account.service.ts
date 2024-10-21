import { Injectable, signal } from '@angular/core';
import { Account } from '../../models/account.interface';
import { Pokemon } from '../../models/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  //Variable creation
  private account = signal<Account | null>(null);
  private pokemonsSelected = signal<Array<Pokemon> | null>(null);

  //Function to set the value in the signal
  updateAccountStorage(value: Account | null) {
    this.account.set(value);
  }

  //Function to set the value in the signal
  updatePokemonsStorage(value: Array<Pokemon> | null) {
    this.pokemonsSelected.set(value);
  }

  //Function to get the value in the signal
  getAccountStorage() {
    return this.account();
  }

  //Function to get the value in the signal
  getPokemonsStorage() {
    return this.pokemonsSelected();
  }
}
