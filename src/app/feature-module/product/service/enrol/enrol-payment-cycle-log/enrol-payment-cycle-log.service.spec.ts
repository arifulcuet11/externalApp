import { TestBed } from '@angular/core/testing';

import { EnrolPaymentCycleLogService } from './enrol-payment-cycle-log.service';

describe('EnrolPaymentCycleLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnrolPaymentCycleLogService = TestBed.get(EnrolPaymentCycleLogService);
    expect(service).toBeTruthy();
  });
});
