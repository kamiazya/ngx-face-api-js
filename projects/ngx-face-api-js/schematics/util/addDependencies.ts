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
import { Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { getLatestNodeVersion, NpmRegistryPackage } from './npmjs';
export function addDependencies({
  packageName,
  version = 'latest',
  type = NodeDependencyType.Default,
}: {
  packageName: string;
  version?: string;
  type?: NodeDependencyType;
}): Rule {
  return (host: Tree, context: SchematicContext): Observable<Tree> => {
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
          name: npmRegistryPackage.name,
          version: npmRegistryPackage.version,
          overwrite: false,
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
