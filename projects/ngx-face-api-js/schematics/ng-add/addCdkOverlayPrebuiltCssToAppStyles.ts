import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import {
  getProjectFromWorkspace,
  getProjectStyleFile,
} from '@angular/cdk/schematics';
import { Schema } from './Schema';
import { red, italic } from '@angular-devkit/core/src/terminal';
export function addCdkOverlayPrebuiltCssToAppStyles(options: Schema): Rule {
  return (host: Tree, _: SchematicContext) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const styleFilePath = getProjectStyleFile(project);
    if (!styleFilePath) {
      console.warn(
        red(`Could not find the default style file for this project.`),
      );
      console.warn(
        red(`Please consider manually setting up the Roboto font in your CSS.`),
      );
      return;
    }
    const buffer = host.read(styleFilePath);
    if (!buffer) {
      console.warn(
        red(
          `Could not read the default style file within the project ` +
            `(${italic(styleFilePath)})`,
        ),
      );
      console.warn(red(`Please consider manually setting up the Robot font.`));
      return;
    }
    const content = buffer.toString();
    const insertion = `\n@import '~@angular/cdk/overlay-prebuilt.css';`;
    if (content.includes(insertion)) {
      return;
    }
    const recorder = host.beginUpdate(styleFilePath);
    recorder.insertLeft(content.length, insertion);
    host.commitUpdate(recorder);
    return host;
  };
}
