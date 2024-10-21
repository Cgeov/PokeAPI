import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';

export const informationGuard: CanActivateFn = (route, state) => {
  //Importing Services
  const accountService = inject(AccountService);
  const router = inject(Router)

  // If no account is found, redirect to the configuration page
  if(!accountService.getAccountStorage()){
    router.navigate(['/configuration']);
    return false
  }

  return true;
};
