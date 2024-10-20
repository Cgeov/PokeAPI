import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent implements OnInit{
  @Output() imageResult = new EventEmitter<string | null>();
  public accountService = inject(AccountService);
  protected router = inject(Router)
  editable: boolean = false;
  dragged: boolean = false;
  imageSelected: string | null = null

  ngOnInit(): void {
    this.router.url == '/configuration' ? this.editable = true : this.editable = false

    const accountData = this.accountService.getAccountStorage()
    if(accountData){
      this.imageSelected = accountData.photo;
    }
  }


  dragOver(e: DragEvent) {
    e.preventDefault();
    this.dragged = true;
  }

  dragLeave(e: DragEvent) {
    e.preventDefault();
    this.dragged = false;
  }

  drop(e: DragEvent) {
    e.preventDefault();
    this.dragged = false;
    if (e.dataTransfer?.files && e.dataTransfer.files.length) {
      const reader = new FileReader();

      reader.readAsDataURL(e.dataTransfer?.files[0]);
      reader.onload = () => {
        this.imageSelected = reader.result!.toString()
        this.imageResult.emit(reader.result!.toString())
      };
    }
  }

  removeImage(){
    this.imageResult.emit(null);
    this.imageSelected = "";
  }
}
