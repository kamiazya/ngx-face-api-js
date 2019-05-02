import { TestBed } from '@angular/core/testing';

import { FaceDetectorService } from './face-detector.service';
import { NgxFaceApiJsModule } from '../ngx-face-api-js.module';

describe('FaceDetectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      NgxFaceApiJsModule.forRoot({ modelsUrl: '/' }),
    ],
  }));

  it('should be created', () => {
    const service: FaceDetectorService = TestBed.get(FaceDetectorService);
    expect(service).toBeTruthy();
  });
});
