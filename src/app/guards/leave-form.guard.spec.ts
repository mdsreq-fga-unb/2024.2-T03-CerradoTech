import { TestBed } from '@angular/core/testing';

import { LeaveFormGuard } from './leave-form.guard';

describe('LeaveFormGuard', () => {
  let guard: LeaveFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LeaveFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
