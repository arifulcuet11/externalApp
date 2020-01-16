import { TestBed } from '@angular/core/testing';

import { EnrolDependentPaymentCycleLogService } from './enrol-dependent-payment-cycle-log.service';

describe('EnrolDependentPaymentCycleLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnrolDependentPaymentCycleLogService = TestBed.get(EnrolDependentPaymentCycleLogService);
    expect(service).toBeTruthy();
  });
});
