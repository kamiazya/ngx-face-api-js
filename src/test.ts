// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { NgxFaceApiJsModule } from 'ngx-face-api-js';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

beforeEach(() => {
  getTestBed().configureTestingModule({
    imports: [
      NgxFaceApiJsModule.forRoot({
        modelsUrl:
          'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights',
      }),
    ],
  });
});

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
