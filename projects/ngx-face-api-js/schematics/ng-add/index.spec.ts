import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { getFileContent } from '@schematics/angular/utility/test';
import * as path from 'path';
import { getWorkspace } from '@schematics/angular/utility/config';
import {
  getProjectFromWorkspace,
  getProjectStyleFile,
  getProjectMainFile,
} from '@angular/cdk/schematics';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { take } from 'rxjs/operators';

const collectionPath = path.join(__dirname, '../collection.json');

async function createTestApp(appOptions: any = {}): Promise<UnitTestTree> {
  const baseRunner = new SchematicTestRunner('schematics', collectionPath);

  const workspaceTree = await baseRunner
    .runExternalSchematicAsync('@schematics/angular', 'workspace', {
      name: 'workspace',
      version: '7.1.2',
      newProjectRoot: 'projects',
    })
    .pipe(take(1))
    .toPromise();

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

describe('ngx-face-api-js-schematics ng-add', () => {
  it('addDependencies works face-api.js', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync('ng-add', {}, await createTestApp())
      .toPromise();

    expect(tree.files).toContain('/package.json');

    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
    expect(packageJson.dependencies['face-api.js']).toBe('~0.20.0');
  });

  it('addDependencies works @angular/cdk', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync('ng-add', {}, await createTestApp())
      .toPromise();

    expect(tree.files).toContain('/package.json');

    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));
    expect(Object.keys(packageJson.devDependencies)).toContain('@angular/cdk');
  });

  it('addBrowserIgnorePackageSetting works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync('ng-add', {}, await createTestApp())
      .toPromise();

    expect(tree.files).toContain('/package.json');

    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));

    expect(packageJson.browser.fs).toBe(false);
    expect(packageJson.browser.crypto).toBe(false);
  });

  it('addCdkOverlayPrebuiltCssToAppStyles works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync('ng-add', {}, await createTestApp())
      .toPromise();

    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);
    const styleFilePath = getProjectStyleFile(project);
    if (styleFilePath) {
      const stylesScss = getFileContent(tree, styleFilePath);
      expect(stylesScss).toMatch(
        `@import '~@angular/cdk/overlay-prebuilt.css'`,
      );
    }
  });

  it('addNgxFaceApiJsModule works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync('ng-add', {}, await createTestApp())
      .toPromise();

    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);
    const appModulePath = getAppModulePath(tree, getProjectMainFile(project));

    if (appModulePath) {
      const appModuleContent = getFileContent(tree, appModulePath);
      expect(appModuleContent).toMatch('NgxFaceApiJsModule.forRoot');
    }
  });
});
