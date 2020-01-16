import { TestBed } from '@angular/core/testing';

import { ComponentMapperService } from './component-mapper.service';

describe('ComponentMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentMapperService = TestBed.get(ComponentMapperService);
    expect(service).toBeTruthy();
  });
});
