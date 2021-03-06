import { Rule, chain } from '@angular-devkit/schematics';
import { Schema } from './Schema';
import { NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { addDependencies } from '../util/addDependencies';
import { installDependencies } from '../util/installDependencies';
import { addBrowserIgnorePackageSetting } from './addBrowserIgnorePackageSetting';
import { addNgxFaceApiJsModule } from './addNgxFaceApiJsModule';
import { addCdkOverlayPrebuiltCssToAppStyles } from './addCdkOverlayPrebuiltCssToAppStyles';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(options: Schema): Rule {
  return chain([
    addDependencies({
      packageName: 'face-api.js',
      version: '~0.20.0',
    }),
    addDependencies({
      packageName: '@angular/cdk',
      type: NodeDependencyType.Dev,
    }),
    installDependencies(),
    addBrowserIgnorePackageSetting(),
    addCdkOverlayPrebuiltCssToAppStyles(options),
    addNgxFaceApiJsModule(options),
  ]);
}
