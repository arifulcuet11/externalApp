/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EnrolDependentService } from './enrol-dependent.service';

describe('Service: EnrolDependent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnrolDependentService]
    });
  });

  it('should ...', inject([EnrolDependentService], (service: EnrolDependentService) => {
    expect(service).toBeTruthy();
  }));
});
