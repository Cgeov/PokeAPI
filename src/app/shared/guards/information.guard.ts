import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';

export const informationGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router)

  if(!accountService.getAccountStorage()){
    router.navigate(['/configuration']);
    return false
  }

  return true;
};
