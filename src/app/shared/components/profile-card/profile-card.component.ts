import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AccountService } from '../../services/account.service';

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

  imageSelected: string | null = null

  ngOnInit(): void {
    const accountData = this.accountService.getAccountStorage()
    if(accountData){
      this.imageSelected = accountData.photo;
    }
  }


  dragOver(e: DragEvent) {
    e.preventDefault();
  }

  dragLeave(e: DragEvent) {
    e.preventDefault();
  }

  drop(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer?.files && e.dataTransfer.files.length) {
      const reader = new FileReader();

      reader.readAsDataURL(e.dataTransfer?.files[0]);
      reader.onload = () => {
        this.imageSelected = reader.result!.toString()
        this.imageResult.emit(reader.result!.toString())
      };
    }
  }
}
