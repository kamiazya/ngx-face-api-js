import { TestBed } from '@angular/core/testing';

import { NgxFaceApiJsService } from './ngx-face-api-js.service';

describe('NgxFaceApiJsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFaceApiJsService = TestBed.get(NgxFaceApiJsService);
    expect(service).toBeTruthy();
  });
});
