import {
  Rule,
  SchematicContext,
  Tree,
  SchematicsException,
} from '@angular-devkit/schematics';
export function addBrowserIgnorePackageSetting(): Rule {
  return (host: Tree, _: SchematicContext) => {
    const buf = host.read('package.json');
    if (!buf) {
      throw new SchematicsException('cannot find package.json');
    }
    const content = JSON.parse(buf.toString('utf-8'));
    content.browser = {
      ...content.browser,
      fs: false,
      crypto: false,
    };
    host.overwrite('package.json', JSON.stringify(content, null, 2));
    return host;
  };
}
