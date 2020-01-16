import { TestBed } from '@angular/core/testing';

import { ValidateEnrolService } from './validate-enrol.service';

describe('ValidateEnrolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidateEnrolService = TestBed.get(ValidateEnrolService);
    expect(service).toBeTruthy();
  });
});
