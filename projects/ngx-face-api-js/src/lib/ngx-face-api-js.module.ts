import { NgModule, Provider } from '@angular/core';
import { NgxFaceApiJsComponent } from './ngx-face-api-js.component';
import { ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as faceapi from 'face-api.js';
import { ModelsUrl, FaceDetectionOptions } from './tokens';
import { ModelLoaderService } from './services/model-loader.service';
import { FaceDetectorService } from './services/face-detector.service';

@NgModule({
  declarations: [NgxFaceApiJsComponent],
  imports: [
    BrowserModule,
  ],
  exports: [NgxFaceApiJsComponent]
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
        deps: [ModelsUrl],
      },
      {
        provide: FaceDetectorService,
        useClass: FaceDetectorService,
        deps: [ModelsUrl, ModelLoaderService],
      }
    );
    return { ngModule: NgxFaceApiJsModule, providers };
  }
}
