import { TestBed } from '@angular/core/testing';

import { BroadCastService } from './broad-cast.service';

describe('BroadCastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BroadCastService = TestBed.get(BroadCastService);
    expect(service).toBeTruthy();
  });
});
