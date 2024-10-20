import { Component, inject } from '@angular/core';
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
  ],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss',
})
export class ConfigurationComponent {
  private accountService = inject(AccountService);
  private router = inject(Router);

  image: string | null = null;
  ageValid: boolean = true;
  isAdult: boolean = true;
  age: number = 0

  configurationsForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    hobby: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    identification: new FormControl(''),
  });

  handleDate(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    const dateBirthday = new Date(value);
    const dateNow = new Date();

    this.age = dateNow.getFullYear() - dateBirthday.getFullYear();

    const identificationControl = this.configurationsForm.get('identification');
    if (this.age >= 18) {
      this.isAdult = true;
      identificationControl!.setValidators([
        Validators.required,
        Validators.minLength(9),
      ]);
      identificationControl!.updateValueAndValidity();
    } else {
      this.isAdult = false;
      identificationControl!.clearValidators();
      identificationControl!.updateValueAndValidity();
    }

    if (dateBirthday > dateNow) {
      this.ageValid = false;
      this.configurationsForm.get('identification')?.setValue('');
      identificationControl!.setValidators([Validators.required]);
      identificationControl!.updateValueAndValidity();
    } else {
      this.ageValid = true;
    }
  }

  resultImage(image: any): void {
    this.image = image;
  }

  setAccountInfo(): void {
    console.log('pressed');
    this.accountService.updateAccountStorage({
      name: this.configurationsForm.get('name')?.value!,
      hobby: this.configurationsForm.get('hobby')?.value!,
      birthday: this.configurationsForm.get('birthday')?.value!,
      identification: this.configurationsForm.get('identification')?.value!,
      photo: this.image,
      age: this.age
    });
    this.router.navigate(['selection']);
  }
}
