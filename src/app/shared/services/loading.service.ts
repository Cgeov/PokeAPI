import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  //Variable creation
  private loading = signal<boolean>(false)

  //Function to set the value in the signal
  showLoading(){
    this.loading.set(true)
  }

  //Function to set the value in the signal
  hideLoading(){
    this.loading.set(false)
  }

  //Function to get the value in the signal
  loadingStatus(){
    return this.loading()
  }
}
