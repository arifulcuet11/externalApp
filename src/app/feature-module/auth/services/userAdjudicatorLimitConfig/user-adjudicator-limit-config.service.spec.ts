import { TestBed } from '@angular/core/testing';

import { UserAdjudicatorLimitConfigService } from './user-adjudicator-limit-config.service';

describe('UserAdjudicatorLimitConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserAdjudicatorLimitConfigService = TestBed.get(UserAdjudicatorLimitConfigService);
    expect(service).toBeTruthy();
  });
});
