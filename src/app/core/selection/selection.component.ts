import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.interface';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/services/account.service';
import { ProfileCardComponent } from '../../shared/components/profile-card/profile-card.component';
import { LoadingService } from '../../shared/services/loading.service';
import { forkJoin } from 'rxjs';
import { TitleHeaderComponent } from '../../shared/components/title-header/title-header.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [ProfileCardComponent, TitleHeaderComponent, ScrollingModule],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss',
})
export class SelectionComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private accountService = inject(AccountService);
  private loaderService = inject(LoadingService);

  pokemons: Array<Pokemon> = [];
  pokemonsBackup: Array<Pokemon> = [];
  pokemonsSelected: Array<Pokemon> = [];
  disableSelection: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.getPokemons();
  }

  async getPokemons() {
    const generalSubscription = await this.http
      .get<any>('https://pokeapi.co/api/v2/pokemon?limit=18')
      .subscribe({
        next: async (result) => {
          generalSubscription.unsubscribe();

          const pokemonRequests = result.results.map((pokemon: any) =>
            this.http.get<Pokemon>(pokemon.url)
          );

          forkJoin(pokemonRequests).subscribe({
            next: (pokemonsInfo: any) => {
              this.pokemons = pokemonsInfo;
              this.pokemonsBackup = JSON.parse(JSON.stringify(this.pokemons));
              this.getCurrentSelectedPokemons();
            },
            error: (error: Error) => {
              console.log('ERROR --->', error);
            },
            complete: () => {},
          });
        },
        error: (error) => {
          console.log('ERROR-->', error);
        },
        complete: () => {},
      });
  }

  getCurrentSelectedPokemons() {
    const pokemonsSelected = this.accountService.getPokemonsStorage();
    if (pokemonsSelected) {
      this.pokemonsSelected = pokemonsSelected;

      this.pokemonsSelected.forEach((pokemon: Pokemon) => {
        const indexPokemon = pokemon.id;
        if (this.pokemons[indexPokemon]) {
          this.pokemons[indexPokemon - 1].selected = true;
        }
      });
      this.disableSelection = true;
      this.pokemonsBackup = JSON.parse(JSON.stringify(this.pokemons));
    }
  }

  selectPokemon(idPokemon: number): void {
    const indexPokemonSelected = this.pokemonsSelected.findIndex(
      (pokemon: Pokemon) => pokemon.id === idPokemon
    );
    const indexPokemon = this.pokemons.findIndex(
      (pokemon: Pokemon) => pokemon.id === idPokemon
    );

    if (indexPokemon !== -1) {
      if (indexPokemonSelected === -1) {
        if (this.pokemonsSelected.length < 3) {
          this.pokemonsSelected.push(this.pokemons[indexPokemon]);
          this.pokemons[indexPokemon].selected = true;

          if (this.pokemonsSelected.length == 3) {
            this.disableSelection = true;
          }
        } else {
          console.warn('Maximum of 3 Pokémon can be selected.');
        }
      } else {
        this.pokemonsSelected.splice(indexPokemonSelected, 1);
        this.pokemons[indexPokemon].selected = false;
        this.disableSelection = false;
      }
    } else {
      console.error(`Pokémon with ID ${idPokemon} not found.`);
    }
  }

  searchPokemon(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.pokemons = this.pokemonsBackup.filter(
      (pokemon: Pokemon) =>
        pokemon.id.toString().includes(value) ||
        pokemon.name.toLowerCase().includes(value)
    );
  }

  savePokemons(): void {
    this.accountService.updatePokemonsStorage(this.pokemonsSelected);

    this.loaderService.showLoading();

    setTimeout(() => {
      this.loaderService.hideLoading();
      this.router.navigate(['summary']);
    }, 700);
  }
}
