import {
  Rule,
  SchematicContext,
  Tree,
  SchematicsException,
} from '@angular-devkit/schematics';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { getLatestNodeVersion, NpmRegistryPackage } from './npmjs';
export function addDependencies({
  packageName,
  version = 'latest',
  type = NodeDependencyType.Default,
  overwrite = false,
}: {
  packageName: string;
  version?: string;
  type?: NodeDependencyType;
  overwrite?: boolean;
}): Rule {
  return (host: Tree, context: SchematicContext) => {
    const buf = host.read('package.json');
    if (!buf) {
      throw new SchematicsException('cannot find package.json');
    }
    return of(packageName).pipe(
      concatMap(async name => {
        if (version === 'latest') {
          return getLatestNodeVersion(name);
        }
        return { name, version };
      }),
      map((npmRegistryPackage: NpmRegistryPackage) => {
        const nodeDependency: NodeDependency = {
          type,
          overwrite,
          name: npmRegistryPackage.name,
          version: npmRegistryPackage.version,
        };
        addPackageJsonDependency(host, nodeDependency);
        context.logger.info(
          `✅️ Added dependency: ${npmRegistryPackage.name}@${
            npmRegistryPackage.version
          }`,
        );
        return host;
      }),
    );
  };
}
