## Quick start

First, install [Yeoman](http://yeoman.io) and generator-umd-module-typescript
using [npm](https://www.npmjs.com/) (assuming you already have [node.js](https://nodejs.org/) pre-installed).

```bash
$ npm install -g yo
$ npm install -g generator-umd-module-typescript
```

make a new directory and `cd` into it:

```bash
$ mkdir awesome-module
$ cd awesome-module
```

and generate your new module:

```bash
$ yo umd-module-typescript
```

The generator will prompt you for:

```bash
? Your full name: mizne
? Your email address: w20054319@126.com
? Git repository url: https://github.com/mizne/awesome-module
? Your library name (kebab case): awesome-module
```

and create the following files for you:

```bash
.
├── README.MD
├── package.json
├── src
│   ├── index.ts
│   ├── core
        ├── awesome.ts
├── .gitignore
├── tsconfig.json
└── tslint.json
└── webpack.config.js
```

You can then add or edit `*.ts` files in the `src/` directory and run:

```bash
$ npm run build
```


Finally you publish your library to NPM:

```bash
$ npm publish
```