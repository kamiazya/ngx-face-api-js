import { Rule, SchematicContext, Tree, SchematicsException, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {getWorkspace} from '@schematics/angular/utility/config';
import {
  getProjectFromWorkspace,
  getProjectStyleFile,
} from '@angular/cdk/schematics';
import { Schema } from './Schema';
import { red, italic } from '@angular-devkit/core/src/terminal';
// import { WorkspaceProject, WorkspaceSchema } from '@angular-devkit/core/src/workspace';
// import { red, yellow, bold } from '@angular-devkit/core/src/terminal';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(options: Schema): Rule {
  return chain([
    addDevDependencies(),
    addCdkOverlayPrebuiltCssToAppStyles(options),
  ]);
}

export function addDevDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {

    const buf = host.read('package.json');
    if (!buf) {
      throw new SchematicsException('cannot find package.json');
    }
    const content = JSON.parse(buf.toString('utf-8'));
    content.devDependencies = {
      ...content.devDependencies,
      '@angular/cdk': 'latest',
    };
    host.overwrite('package.json', JSON.stringify(content, null, 2));


    context.addTask(new NodePackageInstallTask());
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
