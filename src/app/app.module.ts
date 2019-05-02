import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxFaceApiJsModule } from 'ngx-face-api-js';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxFaceApiJsModule.forRoot({ modelsUrl: 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
