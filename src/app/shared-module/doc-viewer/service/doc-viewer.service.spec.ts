import { TestBed } from '@angular/core/testing';

import { DocViewerService } from './doc-viewer.service';

describe('DocViewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocViewerService = TestBed.get(DocViewerService);
    expect(service).toBeTruthy();
  });
});
