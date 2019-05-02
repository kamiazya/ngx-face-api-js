import { TestBed } from '@angular/core/testing';

import { ModelLoaderService } from './model-loader.service';
import { NgxFaceApiJsModule } from '../ngx-face-api-js.module';

describe('ModelLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      NgxFaceApiJsModule.forRoot({ modelsUrl: '/' }),
    ],
  }));

  it('should be created', () => {
    const service: ModelLoaderService = TestBed.get(ModelLoaderService);
    expect(service).toBeTruthy();
  });
});
