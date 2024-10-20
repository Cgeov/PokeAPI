import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading = signal<boolean>(false)
  constructor() { }

  showLoading(){
    this.loading.set(true)
  }

  hideLoading(){
    this.loading.set(false)
  }

  loadingStatus(){
    return this.loading()
  }
}
