import { TestBed, async, inject } from '@angular/core/testing';

import { UserSignedInGuard } from './user-signed-in.guard';

describe('UserSignedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserSignedInGuard]
    });
  });

  it('should ...', inject([UserSignedInGuard], (guard: UserSignedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
