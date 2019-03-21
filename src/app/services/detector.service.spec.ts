import { TestBed } from '@angular/core/testing';

import { DetectorService } from './detector.service';

describe('DetectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetectorService = TestBed.get(DetectorService);
    expect(service).toBeTruthy();
  });
});
