import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import * as faceapi from 'face-api.js';
import { ModelsUrl } from './tokens/ModelsUrl';
import { FaceDetectionOptions } from './tokens/FaceDetectionOptions';
import { FaceDetectorService } from './services/face-detector.service';
import { ModelLoaderService } from './services/model-loader.service';
import { DetectionResultComponent } from './components/detection-result/detection-result.component';
import { DetectAllFacesImgDirective } from './directives/detect-all-faces-img.directive';
import { DetectSingleFaceImgDirective } from './directives/detect-dingle-face-img.directive';
import { DetectAllFacesVideoDirective } from './directives/detect-all-faces-video.directive';

export interface NgxFaceApiJsModuleOption {
  modelsUrl: string;
  faceDetectionOptions?: faceapi.FaceDetectionOptions;
}

@NgModule({
  declarations: [
    DetectionResultComponent,
    DetectAllFacesImgDirective,
    DetectSingleFaceImgDirective,
    DetectAllFacesVideoDirective,
  ],
  imports: [OverlayModule, PortalModule],
  exports: [
    DetectAllFacesImgDirective,
    DetectSingleFaceImgDirective,
    DetectAllFacesVideoDirective,
  ],
  entryComponents: [DetectionResultComponent],
})
export class NgxFaceApiJsModule {
  static forRoot(options: NgxFaceApiJsModuleOption): ModuleWithProviders {
    return {
      ngModule: NgxFaceApiJsModule,
      providers: [
        {
          provide: ModelsUrl,
          useValue: options.modelsUrl,
        },
        ModelLoaderService,
        FaceDetectorService,
        ...[
          options.faceDetectionOptions
            ? {
                provide: FaceDetectionOptions,
                useValue: options.faceDetectionOptions,
              }
            : [],
        ],
      ],
    };
  }
}
