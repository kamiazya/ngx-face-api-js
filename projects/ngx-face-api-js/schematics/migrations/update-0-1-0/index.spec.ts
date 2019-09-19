import * as path from 'path';
import {
  UnitTestTree,
  SchematicTestRunner,
} from '@angular-devkit/schematics/testing';
import {
  addPackageJsonDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { getFileContent } from '@schematics/angular/utility/test';
import { take } from 'rxjs/operators';

const migrationPath = path.join(__dirname, '../migration.json');

async function createTestApp(appOptions: any = {}): Promise<UnitTestTree> {
  const baseRunner = new SchematicTestRunner('schematics', migrationPath);

  const workspaceTree = await baseRunner
    .runExternalSchematicAsync('@schematics/angular', 'workspace', {
      name: 'workspace',
      version: '7.1.2',
      newProjectRoot: 'projects',
    })
    .pipe(take(1))
    .toPromise();
  addPackageJsonDependency(workspaceTree, {
    name: 'face-api.js',
    version: '^0.19.0',
    type: NodeDependencyType.Default,
  });

  return baseRunner
    .runExternalSchematicAsync(
      '@schematics/angular',
      'application',
      {
        ...appOptions,
        name: 'example-app',
      },
      workspaceTree,
    )
    .pipe(take(1))
    .toPromise();
}

describe('ngx-face-api-js-schematics migrations update-0-1-0', () => {
  it('update addDependencies works face-api.js', async () => {
    const runner = new SchematicTestRunner('schematics', migrationPath);
    const tree = await runner
      .runSchematicAsync('update-0-1-0', {}, await createTestApp())
      .toPromise();

    expect(tree.files).toContain('/package.json');

    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
    expect(packageJson.dependencies['face-api.js']).toBe('~0.20.0');
  });
});
