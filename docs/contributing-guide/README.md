# Contributing

Thanks for considering to contribute to preact-layout! For small contributions,
go right ahead and create a PR following the instructions below. For bigger
contributions, consider [creating an issue](https://github.com/download/preact-layout/issues/new)
first, so we can discuss.

## Preparing a Pull Request
Below are the general steps to create a PR:

### Fork
Fork this repo on Github, then clone the fork to your local machine and install
the dependencies:

```sh
git clone https://github.com/your-username/preact-layout.git
cd preact-layout
npm install
```

### Build and test
Before we start changing stuff, let's build everything and run the tests to make
sure that everything is still fine.

#### Build all
Running the `build` task will create both a CommonJS and a UMD build.
```sh
npm run build
```

#### Build only CommonJS
To create just a CommonJS build:
```sh
npm run build:lib
```
The result will be in the `lib` folder.

#### Build only UMD
To create just a UMD build:
```sh
npm run build:umd
npm run build:umd:min
```
The result will be in the `dist` folder.

#### Run the tests
```sh
npm run test
```
To continuously watch and run tests, run the following:
```sh
npm run test:watch
```

### Create and switch to a new branch
Before starting work, create a new branch based on `master` and switch to it.
This will greatly simplify merging the PR later.

### Write tests
It's good practice to write a (couple of) test(s) that puts your new code through the motions.

### Write the code
With your new tests in place, write the code that makes them pass.

### Write documentation
Remember, if it's not documented, it might as well not exist. Any new features
should get a section in the documentation explaining it. 

#### Installing Gitbook
To install the latest version of `gitbook` and prepare to build the documentation, run the following:
```sh
npm run docs:prepare
```

#### Building the Docs
To build the documentation, run the following:
```sh
npm run docs:build
```
To watch and rebuild documentation when changes occur, run the following:
```sh
npm run docs:watch
```
The docs will be served at [http://localhost:4000](http://localhost:4000).

#### Publishing the Docs
To publish the documentation, run the following:
```sh
npm run docs:publish
```

#### Cleaning the Docs
To remove previously built documentation, run the following:
```sh
npm run docs:clean
```

### Examples
preact-layout comes with [official examples](http://download.github.io/preact-layout/docs/introduction/Examples.html) to demonstrate various concepts and best practices.

When adding a new example, please adhere to the style and format of the existing examples, and try to reuse as much code as possible.  For example, `index.html`, `server.js`, and `webpack.config.js` can typically be reused.

#### Building and Testing the Examples
To build and test the official preact-layout examples, run the following:
```sh
npm run build:examples
npm run test:examples
```

Please visit the [Examples page](http://download.github.io/preact-layout/docs/introduction/Examples.html) for information on running individual examples.

Thanks for contributing!
