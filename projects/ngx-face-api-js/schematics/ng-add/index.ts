import { Rule, SchematicContext, Tree, SchematicsException, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {getWorkspace} from '@schematics/angular/utility/config';
import {
  getProjectFromWorkspace,
  getProjectStyleFile,
  hasNgModuleImport,
  addModuleImportToRootModule,
  getProjectMainFile,
} from '@angular/cdk/schematics';
import { Schema } from './Schema';
import { red, italic, bold } from '@angular-devkit/core/src/terminal';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';

// import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/workspace';
// import { red, yellow, bold } from '@angular-devkit/core/src/terminal';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(options: Schema): Rule {
  return chain([
    addDependencies(),
    addCdkOverlayPrebuiltCssToAppStyles(options),
    addNgxFaceApiJsModule(options),
  ]);
}

export function addDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {

    const buf = host.read('package.json');
    if (!buf) {
      throw new SchematicsException('cannot find package.json');
    }
    const content = JSON.parse(buf.toString('utf-8'));
    content.dependencies = {
      ...content.dependencies,
      'face-api.js': '^0.19.0',
    };
    content.devDependencies = {
      ...content.devDependencies,
      '@angular/cdk': 'latest',
    };
    host.overwrite('package.json', JSON.stringify(content, null, 2));


    context.addTask(new NodePackageInstallTask());
    return host;
  };
}

function addNgxFaceApiJsModule(options: Schema) {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    const ngxFaceApiJsModuleName = 'NgxFaceApiJsModule';

    if (hasNgModuleImport(host, appModulePath, ngxFaceApiJsModuleName)) {
      return console.warn(red(
        `Could not set up "${bold(ngxFaceApiJsModuleName)}" ` +
        `because "${bold(ngxFaceApiJsModuleName)}" is already imported.`));
    }

    const modelsUrl = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

    addModuleImportToRootModule(
      host,
      `NgxFaceApiJsModule.forRoot({ modelsUrl: '${modelsUrl}' })`,
      'ngx-face-api-js',
      project,
    );

    return host;
  };
}

export function addCdkOverlayPrebuiltCssToAppStyles(options: Schema): Rule {
  return (host: Tree, _: SchematicContext) => {

    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    const styleFilePath = getProjectStyleFile(project);
    if (!styleFilePath) {
      console.warn(red(`Could not find the default style file for this project.`));
      console.warn(red(`Please consider manually setting up the Roboto font in your CSS.`));
      return;
    }

    const buffer = host.read(styleFilePath);

    if (!buffer) {
      console.warn(red(`Could not read the default style file within the project ` +
        `(${italic(styleFilePath)})`));
      console.warn(red(`Please consider manually setting up the Robot font.`));
      return;
    }

    const content = buffer.toString();
    const insertion = '\n@import \'~@angular/cdk/overlay-prebuilt.css\';';

    if (content.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(styleFilePath);

    recorder.insertLeft(content.length, insertion);
    host.commitUpdate(recorder);

    return host;
  };
}
