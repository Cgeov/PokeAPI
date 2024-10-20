import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../shared/services/account.service';
import { BarStatsComponent } from './components/bar-stats/bar-stats.component';
import { HttpClient } from '@angular/common/http';
import { TypePokemonPipe } from '../../shared/pipes/type-pokemon.pipe';
import { ProfileCardComponent } from "../../shared/components/profile-card/profile-card.component";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [BarStatsComponent, TypePokemonPipe, ProfileCardComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  protected accountService = inject(AccountService);
  private http = inject(HttpClient);

  colors: Array<string> = [];

  ngOnInit(): void {
    const pokemons = this.accountService.getPokemonsStorage();
    if (pokemons) {
      for (const pokemon of pokemons) {
        const detailsSubscription = this.http
          .get<any>(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
          .subscribe({
            next: (result) => {
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
