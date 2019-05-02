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
import { DetectAllFacesImgDirective, DetectSingleFaceImgDirective, DetectAllFacesVideoDirective } from './directives';

@NgModule({
  declarations: [
    DetectionResultComponent,
    DetectAllFacesImgDirective,
    DetectSingleFaceImgDirective,
    DetectAllFacesVideoDirective,
  ],
  imports: [
    BrowserModule,
    OverlayModule,
    PortalModule,
  ],
  exports: [
    DetectAllFacesImgDirective,
    DetectSingleFaceImgDirective,
    DetectAllFacesVideoDirective,
  ],
  entryComponents: [
    DetectionResultComponent,
  ],
})
export class NgxFaceApiJsModule {

  static forRoot(options: {
    modelsUrl: string,
    faceDetectionOptions?: faceapi.FaceDetectionOptions,
  }): ModuleWithProviders {
    const providers: Provider[] = [
      {
        provide: ModelsUrl,
        useValue: options.modelsUrl,
      },
    ];
    if (options.faceDetectionOptions) {
      providers.push({
        provide: FaceDetectionOptions,
        useValue: options.faceDetectionOptions,
      });
    }
    providers.push(
      {
        provide: ModelLoaderService,
        useClass: ModelLoaderService,
      },
      {
        provide: FaceDetectorService,
        useClass: FaceDetectorService,
      }
    );
    return { ngModule: NgxFaceApiJsModule, providers };
  }
}
