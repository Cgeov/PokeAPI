import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-title-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './title-header.component.html',
  styleUrl: './title-header.component.scss',
})
export class TitleHeaderComponent{
  //Importing Services
  protected router = inject(Router);
  protected titleSelected: any = {};
  private accountService = inject(AccountService);

  //Variable creation
  titles: any = {
    configuration: {
      title: '<h1>¡Hola!</h1> <span>Configuremos tu perfil</span>',
      subtitle: 'Queremos conocerte mejor.',
    },
    selection: {
      title: '<h1>¡Ya casi términamos!<h1>',
      subtitle: 'Revisa la información, y completa lo solicitado.',
    },
    summary: {
      title: `<h1>¡Hola ${this.accountService
        .getAccountStorage()
        ?.name?.split(' ')
        .at(0)}!<span> `,
    },
  };

  //We get the current path.
  constructor(){
    this.titleSelected = this.titles[this.router.url.split('/')[1]];
  }
}
