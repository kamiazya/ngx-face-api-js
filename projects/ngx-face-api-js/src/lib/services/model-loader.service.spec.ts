import { TestBed } from '@angular/core/testing';

import { ModelLoaderService } from './model-loader.service';

describe('ModelLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelLoaderService = TestBed.get(ModelLoaderService);
    expect(service).toBeTruthy();
  });
});
