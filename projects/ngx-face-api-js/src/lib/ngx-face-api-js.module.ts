import { NgModule, Provider } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import * as faceapi from 'face-api.js';
import { ModelsUrl, FaceDetectionOptions } from './tokens';
import { ModelLoaderService, FaceDetectorService } from './services';
import { DetectionResultComponent } from './components';
// tslint:disable-next-line:max-line-length
import {
  DetectAllFacesImgDirective,
  DetectSingleFaceImgDirective,
  DetectAllFacesVideoDirective,
} from './directives';

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
  imports: [BrowserModule, OverlayModule, PortalModule],
  exports: [
    DetectAllFacesImgDirective,
    DetectSingleFaceImgDirective,
    DetectAllFacesVideoDirective,
  ],
  entryComponents: [DetectionResultComponent],
})
export class NgxFaceApiJsModule {
  static createProvidersFromOptions(
    options: NgxFaceApiJsModuleOption,
  ): Provider[] {
    const providers: Provider[] = [
      {
        provide: ModelsUrl,
        useValue: options.modelsUrl,
      },
      ModelLoaderService,
      FaceDetectorService,
    ];
    if (options.faceDetectionOptions) {
      providers.push({
        provide: FaceDetectionOptions,
        useValue: options.faceDetectionOptions,
      });
    }
    return providers;
  }

  static forRoot(options: NgxFaceApiJsModuleOption): ModuleWithProviders {
    const providers = this.createProvidersFromOptions(options);
    return { ngModule: NgxFaceApiJsModule, providers };
  }
}
