# NgxFaceApiJs

[![Build Status](https://travis-ci.com/kamiazya/ngx-face-api-js.svg?branch=master)](https://travis-ci.com/kamiazya/ngx-face-api-js) [![codecov](https://codecov.io/gh/kamiazya/ngx-face-api-js/branch/master/graph/badge.svg)](https://codecov.io/gh/kamiazya/ngx-face-api-js) [![CodeFactor](https://www.codefactor.io/repository/github/kamiazya/ngx-face-api-js/badge)](https://www.codefactor.io/repository/github/kamiazya/ngx-face-api-js) [![Maintainability](https://api.codeclimate.com/v1/badges/92a5ffa6ed3f4ab11869/maintainability)](https://codeclimate.com/github/kamiazya/ngx-face-api-js/maintainability) [![BCH compliance](https://bettercodehub.com/edge/badge/kamiazya/ngx-face-api-js?branch=master)](https://bettercodehub.com/) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fkamiazya%2Fngx-face-api-js.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fkamiazya%2Fngx-face-api-js?ref=badge_shield) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/ngx-face-api-js.svg)](https://badge.fury.io/js/ngx-face-api-js)

Angular directives for face detection and face recognition in the browser. It is a wrapper for face-api.js, so it is not dependent on the browser implementation.

[![NPM](https://nodei.co/npm/ngx-face-api-js.png)](https://nodei.co/npm/ngx-face-api-js/)

## See

### Background

* [face-api.js](https://github.com/justadudewhohacks/face-api.js)
* [TensorFlow.js](https://github.com/tensorflow/tfjs-core)

### Demo

* [Detect Faces by Image -- StackBlitz](https://ngx-face-api-js-demo.stackblitz.io)([Editor](https://stackblitz.com/edit/ngx-face-api-js-demo?embed=1&file=src/app/app.component.html))

### Documantation

* [compodoc](https://kamiazya.github.io/ngx-face-api-js/)

## Usage

### Detect All Faces

```html
<img allFaces [src]="imageSrc" width="300px"/>
```

![Detect faces](./media/ngx-face-api-js-demo-detect-faces.png)

### Detect Face With Expressions and Landmarks

```html
<img singleFace [with]="['expressions', 'landmarks']" [src]="imageSrc" width="300px"/>

```

![Detected Face With Expressions and Landmarks](./media/ngx-face-api-js-demo-with-expressions-and-landmarks.png)

## Installation

### By `ng-add` Schematics

```bash
$ ng add ngx-face-api-js
...
UPDATE package.json (1457 bytes)
UPDATE src/styles.css (126 bytes)
UPDATE src/app/app.module.ts (497 bytes)
```

### By Manual

See [Wiki](https://github.com/kamiazya/ngx-face-api-js/wiki/Manual-Installation).

## License

MIT

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fkamiazya%2Fngx-face-api-js.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fkamiazya%2Fngx-face-api-js?ref=badge_large)
