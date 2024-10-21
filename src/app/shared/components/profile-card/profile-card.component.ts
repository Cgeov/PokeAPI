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
  //Importing Services
  @Output() imageResult = new EventEmitter<string | null>();
  public accountService = inject(AccountService);
  protected router = inject(Router)

  //Variable creation
  editable: boolean = false;
  dragged: boolean = false;
  imageSelected: string | null = null

  ngOnInit(): void {
    //If an image is previously saved in the service, it will be stored in a variable.
    this.router.url == '/configuration' ? this.editable = true : this.editable = false

    const accountData = this.accountService.getAccountStorage()
    if(accountData){
      this.imageSelected = accountData.photo;
    }
  }

  //Detects events when an element is hovered over.
  dragOver(e: DragEvent) {
    e.preventDefault();
    this.dragged = true;
  }

  //Detects events when an element is hovered over.
  dragLeave(e: DragEvent) {
    e.preventDefault();
    this.dragged = false;
  }

  /*When a document is dropped, it will be processed,
  converted to base64, and returned to the parent component */
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

  //Function to remove the image
  removeImage():void{
    this.imageResult.emit(null);
    this.imageSelected = "";
  }
}
