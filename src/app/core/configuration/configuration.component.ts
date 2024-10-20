import { Component, inject, OnInit } from '@angular/core';
import { ProfileCardComponent } from '../../shared/components/profile-card/profile-card.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../shared/services/account.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../shared/services/loading.service';
import { TitleHeaderComponent } from "../../shared/components/title-header/title-header.component";

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [
    ProfileCardComponent,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CommonModule,
    TitleHeaderComponent
],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent implements OnInit{
  //Importing Services
  private accountService = inject(AccountService);
  private router = inject(Router);
  private loaderService = inject(LoadingService);

  //Variable creation
  image: string | null = null;
  ageValid: boolean = true;
  isAdult: boolean = true;
  age: number = 0;


  //Form variable creation
  configurationsForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    hobby: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    identification: new FormControl(''),
  });

  ngOnInit(): void {
    //If the account exists, we will set the values in the form
    const accountData = this.accountService.getAccountStorage()
    if(accountData){
      const {age,photo, ...rest} = accountData
      this.configurationsForm.setValue(rest);
      this.age = age;
      this.image = photo;

      this.handleDate( {value: rest.birthday})
    }
  }

  //Function to determine if the person is an adult or not
  handleDate(e: any): void {
    const value = e.value;

    const dateBirthday = new Date(value);
    const dateNow = new Date();

    //Getting the age by subtracting the selected year from the current year in the calendar
    this.age = dateNow.getFullYear() - dateBirthday.getFullYear();

    const identificationControl = this.configurationsForm.get('identification');

    //If the age is greater than 18 years, then validations for the DUI will be applied
    if (this.age >= 18) {
      this.isAdult = true;
      identificationControl!.setValidators([
        Validators.required,
        Validators.minLength(9),
      ]);
      identificationControl!.updateValueAndValidity();
    } else {
      //Otherwise, there will be no validations on the identification field.
      this.isAdult = false;
      identificationControl!.clearValidators();
      identificationControl!.updateValueAndValidity();
    }

    /*If the selected date is greater than the current date,
    the identification field will be hidden,
    and the continue button will be disabled.*/
    if (dateBirthday > dateNow) {
      this.ageValid = false;
      this.configurationsForm.get('identification')?.setValue('');
      identificationControl!.setValidators([Validators.required]);
      identificationControl!.updateValueAndValidity();
    } else {
      this.ageValid = true;
    }
  }

  //Function to set the @Output result in a variable.
  resultImage(image: any): void {
    this.image = image;
  }

  //Set all the configured items within the signals of the service.
  setAccountInfo(): void {
    this.accountService.updateAccountStorage({
      name: this.configurationsForm.get('name')?.value!,
      hobby: this.configurationsForm.get('hobby')?.value!,
      birthday: this.configurationsForm.get('birthday')?.value!,
      identification: this.configurationsForm.get('identification')?.value!,
      photo: this.image,
      age: this.age,
    });

    //Waiting 700ms for the loading screen
    this.loaderService.showLoading();
    setTimeout(() => {
      this.loaderService.hideLoading();
      this.router.navigate(['selection']);
    }, 700);
  }
}
