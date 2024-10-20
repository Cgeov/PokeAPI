import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';
import { BarStatsComponent } from './components/bar-stats/bar-stats.component';
import { HttpClient } from '@angular/common/http';
import { TypePokemonPipe } from '../../shared/pipes/type-pokemon.pipe';
import { ProfileCardComponent } from '../../shared/components/profile-card/profile-card.component';
import { RouterModule } from '@angular/router';
import { TitleHeaderComponent } from '../../shared/components/title-header/title-header.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    BarStatsComponent,
    TypePokemonPipe,
    ProfileCardComponent,
    RouterModule,
    TitleHeaderComponent,
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  //Importing Services
  protected accountService = inject(AccountService);
  private http = inject(HttpClient);

  //Variable creation
  colors: Array<string> = [];

  ngOnInit(): void {
    //If there are saved Pokémon, they will be set in the variables
    const pokemons = this.accountService.getPokemonsStorage();
    if (pokemons) {
      //We iterate through the saved Pokémon to obtain more information about them
      for (const pokemon of pokemons) {
        const detailsSubscription = this.http
          .get<any>(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
          .subscribe({
            next: (result) => {
              //The Pokémon colors are saved to be used later in the graphic bars.
              this.colors.push(result.color.name);
            },
            error: (error) => {
              console.warn('ERROR-->', error);
            },
            complete: () => {
              detailsSubscription.unsubscribe();
            },
          });
      }
    }
  }
}
