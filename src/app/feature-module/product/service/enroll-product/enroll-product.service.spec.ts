import { TestBed } from '@angular/core/testing';

import { EnrollProductService } from './enroll-product.service';

describe('EnrollProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnrollProductService = TestBed.get(EnrollProductService);
    expect(service).toBeTruthy();
  });
});
