import { Injectable, Optional, Inject } from '@angular/core';
import * as faceapi from 'face-api.js';
import { Observable, of, fromEvent, interval } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';

import { ModelLoaderService } from './model-loader.service';
import { DetectTask } from '../classes';
import { FaceDetectionOptions } from '../tokens';

@Injectable()
export class FaceDetectorService {

  constructor(
    private modelLoader: ModelLoaderService,
    @Optional()
    @Inject(FaceDetectionOptions)
    private option?: faceapi.FaceDetectionOptions,
  ) { }

  public detect(task: DetectTask): Observable<any> {
    if (task.realtime === true) {
      return of(task)
        .pipe(
          switchMap(async (t) => (await t.target)),
          switchMap((video) => fromEvent(video, 'loadeddata')),
          switchMap(() => this.modelLoader.loadForFeature(task.tokens)),
          switchMap(() => interval(300)),
          switchMap(() => task.detect(this.option)),
          shareReplay(1),
        );
    }
    return of(task)
      .pipe(
        switchMap(async (t) => (await t.target)),
        switchMap((image) => fromEvent(image, 'load')),
        switchMap(async () => await this.modelLoader.loadForFeature(task.tokens)),
        switchMap(() => task.detect(this.option)),
        shareReplay(1),
      );
  }

}
