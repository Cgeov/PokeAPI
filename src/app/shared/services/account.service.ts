import { Injectable, signal } from '@angular/core';
import { Account } from '../../models/account.interface';
import { Pokemon } from '../../models/pokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private account = signal<Account | null>({age: 0,"name":"dsdsdsd dssd","hobby":"futbol","birthday":"2024-10-09","identification":"","photo":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyNCAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzMwXzU3NCkiPgo8cGF0aCBkPSJNMC4wMDgzMDA3OCAyMC4zMTM0VjIzLjc1MjZDMC4wMDgzMDA3OCAyNC4xNjY3IDAuMzQ0MDc2IDI0LjUwMjYgMC43NTgzMDEgMjQuNTAyNkg0LjIwNDk2QzQuNDAzODcgMjQuNTAyNiA0LjU5NDY0IDI0LjQyMzUgNC43MzUzIDI0LjI4M0wxOC45MDY5IDEwLjExMTNMMTQuNDA1OSA1LjYxMDM1TDAuMjI4MDY2IDE5Ljc4MjhDMC4wODczNTEgMTkuOTIzNSAwLjAwODMwMDc4IDIwLjExNDMgMC4wMDgzMDA3OCAyMC4zMTM0WiIgZmlsbD0iI0JBQzREMCIvPgo8cGF0aCBkPSJNMTYuMjYzOSAzLjc1MjgxTDIwLjc2NDcgOC4yNTM0M0wyMi45NTUgNi4wNjMwN0MyMy41NDA3IDUuNDc3MjkgMjMuNTQwNyA0LjUyNzUzIDIyLjk1NSAzLjk0MTc1TDIwLjU3NjEgMS41NjI4N0MxOS45OTA0IDAuOTc3MTY3IDE5LjA0MDcgMC45NzcwNzcgMTguNDU1IDEuNTYyNjhMMTYuMjYzOSAzLjc1MjgxWiIgZmlsbD0iI0JBQzREMCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzMwXzU3NCI+CjxyZWN0IHdpZHRoPSIyMy40IiBoZWlnaHQ9IjI0IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAwLjc1NjEwNCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K"})//null);
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
