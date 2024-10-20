import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.interface';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/services/account.service';
import { ProfileCardComponent } from "../../shared/components/profile-card/profile-card.component";

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss',
})
export class SelectionComponent implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private accountService = inject(AccountService)

  pokemons: Array<Pokemon> = [];
  pokemonsSelected: Array<Pokemon> = [];
  disableSelection: boolean = false;

  constructor() {}

  ngOnInit(): void {
    const generalSubscription = this.http
      .get<any>('https://pokeapi.co/api/v2/pokemon?limit=18')
      .subscribe({
        next: (result) => {
          console.log(result);
          generalSubscription.unsubscribe();
          result.results.map(async (pokemon: any) => {
            const pokemonSubcription = await this.http
              .get<any>(pokemon.url)
              .subscribe({
                next: (pokemonInfo: Pokemon) => {
                  console.log(pokemonInfo);
                  this.pokemons.push(pokemonInfo);
                },
                error: (error) => {
                  console.log('ERROR --->', error);
                },
                complete: () => {
                  pokemonSubcription.unsubscribe();
                },
              });
          });
        },
      });
  }

  selectPokemon(idPokemon: number): void {
    const indexPokemonSelected = this.pokemonsSelected.findIndex((pokemon: Pokemon) => pokemon.id === idPokemon);
    const indexPokemon = this.pokemons.findIndex((pokemon: Pokemon) => pokemon.id === idPokemon);

    if (indexPokemon !== -1) {
      if (indexPokemonSelected === -1) {
        if (this.pokemonsSelected.length < 3) {
          this.pokemonsSelected.push(this.pokemons[indexPokemon]);
          this.pokemons[indexPokemon].selected = true;

          if(this.pokemonsSelected.length == 3){
            this.disableSelection = true;
          }
        } else {
          console.warn("Maximum of 3 Pokémon can be selected.");
        }
      } else {
        this.pokemonsSelected.splice(indexPokemonSelected, 1);
        this.pokemons[indexPokemon].selected = false;
        this.disableSelection = false;
      }
      console.log(this.pokemonsSelected);
    } else {
      console.error(`Pokémon with ID ${idPokemon} not found.`);
    }


  }

  savePokemons():void{
    this.accountService.updatePokemonsStorage(this.pokemonsSelected)
    this.router.navigate(['summary'])
  }
}
