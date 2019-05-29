import { Rule, chain } from '@angular-devkit/schematics';
import { addDependencies } from '../../util/addDependencies';
import { installDependencies } from '../../util/installDependencies';

export default function(): Rule {
  return chain([
    addDependencies({
      packageName: 'face-api.js',
      version: '~0.20.0',
      overwrite: true,
    }),
    installDependencies(),
  ]);
}
