/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EnrolService } from './enrol.service';

describe('Service: Enrol', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnrolService]
    });
  });

  it('should ...', inject([EnrolService], (service: EnrolService) => {
    expect(service).toBeTruthy();
  }));
});
