import { TestBed } from '@angular/core/testing';

import { FileValidatorService } from './file-validator.service';

describe('FileValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileValidatorService = TestBed.get(FileValidatorService);
    expect(service).toBeTruthy();
  });
});
