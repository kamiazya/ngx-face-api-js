import { Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import {
  getProjectFromWorkspace,
  hasNgModuleImport,
  addModuleImportToRootModule,
  getProjectMainFile,
} from '@angular/cdk/schematics';
import { Schema } from './Schema';
import { red, bold } from '@angular-devkit/core/src/terminal';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';

export function addNgxFaceApiJsModule(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));
    const ngxFaceApiJsModuleName = 'NgxFaceApiJsModule';
    if (hasNgModuleImport(host, appModulePath, ngxFaceApiJsModuleName)) {
      return console.warn(
        red(
          `Could not set up "${bold(ngxFaceApiJsModuleName)}" ` +
            `because "${bold(ngxFaceApiJsModuleName)}" is already imported.`,
        ),
      );
    }
    const modelsUrl =
      'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';
    addModuleImportToRootModule(
      host,
      `NgxFaceApiJsModule.forRoot({ modelsUrl: '${modelsUrl}' })`,
      'ngx-face-api-js',
      project,
    );
    return host;
  };
}
