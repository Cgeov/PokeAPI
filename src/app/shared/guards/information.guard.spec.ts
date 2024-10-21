import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { informationGuard } from './information.guard';

describe('informationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => informationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
