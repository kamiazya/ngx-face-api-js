import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { getFileContent } from '@schematics/angular/utility/test';
import * as path from 'path';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getProjectFromWorkspace, getProjectStyleFile, getProjectMainFile } from '@angular/cdk/schematics';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';


const collectionPath = path.join(__dirname, '../collection.json');

function createTestApp(appOptions: any = { }): UnitTestTree {
  const baseRunner = new SchematicTestRunner('schematics', collectionPath);

  const workspaceTree = baseRunner.runExternalSchematic(
    '@schematics/angular',
    'workspace',
    {
      name: 'workspace',
      version: '7.1.2',
      newProjectRoot: 'projects',
    },
  );

  return baseRunner.runExternalSchematic(
    '@schematics/angular',
    'application',
    {
      ...appOptions,
      name: 'example-app',
    },
    workspaceTree,
  );
}

describe('ngx-face-api-js-schematics', () => {
  it('addDependencies works', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('ng-add', {}, createTestApp());

    expect(tree.files).toContain('/package.json');

    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));

    expect(packageJson.devDependencies['@angular/cdk']).toBe('latest');
    expect(packageJson.dependencies['face-api.js']).toBe('^0.19.0');
  });

  it('addCdkOverlayPrebuiltCssToAppStyles works', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('ng-add', {}, createTestApp());

    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);
    const styleFilePath = getProjectStyleFile(project);
    if (styleFilePath) {
      const stylesScss = getFileContent(tree, styleFilePath);
      expect(stylesScss).toMatch('@import \'~@angular/cdk/overlay-prebuilt.css\'');
    }
  });

  it('addNgxFaceApiJsModule works', () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = runner.runSchematic('ng-add', {}, createTestApp());

    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);
    const appModulePath = getAppModulePath(tree, getProjectMainFile(project));

    if (appModulePath) {
      const appModuleContent = getFileContent(tree, appModulePath);
      expect(appModuleContent).toMatch('NgxFaceApiJsModule.forRoot');
    }
  });
});
