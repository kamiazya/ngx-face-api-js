import { InjectionToken } from '@angular/core';
import * as faceapi from 'face-api.js';

export const FaceDetectionOptions = new InjectionToken<
  faceapi.FaceDetectionOptions
>('ngx-face-api-js.face-detection-options');
