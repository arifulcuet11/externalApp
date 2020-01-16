import { TestBed } from '@angular/core/testing';

import { AdjudicatorLimitService } from './adjudicator-limit.service';

describe('AdjudicatorLimitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdjudicatorLimitService = TestBed.get(AdjudicatorLimitService);
    expect(service).toBeTruthy();
  });
});
