import { Rule, SchematicContext, Tree, SchematicsException, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {getWorkspace} from '@schematics/angular/utility/config';
import {
  getProjectFromWorkspace, getProjectTargetOptions,
  // getProjectStyleFile,
  // getProjectTargetOptions,
} from '@angular/cdk/schematics';
import { Schema } from './Schema';
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
  return (tree: Tree, context: SchematicContext) => {

    const buf = tree.read('package.json');
    if (!buf) {
      throw new SchematicsException('cannot find package.json');
    }
    const content = JSON.parse(buf.toString('utf-8'));
    content.devDependencies = {
      ...content.devDependencies,
      '@angular/cdk': 'latest',
    };
    tree.overwrite('package.json', JSON.stringify(content, null, 2));


    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}

export function addCdkOverlayPrebuiltCssToAppStyles(options: Schema): Rule {
  return (tree: Tree, _: SchematicContext) => {

    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace, options.project);

    const targetOptions = getProjectTargetOptions(project, 'build');

    const stylesFile = tree.get(targetOptions.styles[0]);
    if (stylesFile) {
      tree.overwrite(stylesFile.path, [
        stylesFile.content.toString(),
        '@import \'~@angular/cdk/overlay-prebuilt.css\';',
      ].join('\n'));
    }

    return tree;
  };
}
