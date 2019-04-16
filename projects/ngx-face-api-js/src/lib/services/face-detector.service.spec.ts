import { TestBed } from '@angular/core/testing';

import { FaceDetectorService } from './face-detector.service';

describe('FaceDetectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FaceDetectorService = TestBed.get(FaceDetectorService);
    expect(service).toBeTruthy();
  });
});
