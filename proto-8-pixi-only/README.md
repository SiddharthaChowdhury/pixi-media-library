We are using Yarn because we are using **yarn workspace** which is specifically designed to share node_modules and install shared dependencies in the root directory, that each one of out packages can use

## HOW this monorepo created

1. In the root of the project `yarn init` and install lerna -> `yarn add -D lerna`;
2. next we need to initialise lerna `npx lerna init` and it will create a new `lerna.json` file for us
3. Open > `lerna.json` file and make sure following are added `"npmClient": "yarn"`, `"packages": [ "packages/*" ]` and `"useWorkspaces": true`.
4. Next we want to make sure that the root `./package.json` file has `"private": true` and `"workspaces": ["packages/*"]` which is gonna tell yarn where our packages/workspaces are.

NOTE: For `yarn` anything inside the `./packages` dir is a **"workspace"** and for `lerna` the same is a **"package"**

5. Then link dependency package to main package like `lerna add <dependency-package-name> --scope=<main-package-name>`
6. Make sure the dependency package's `package.json` file has `"main": "./build/index.js",` or similar entry to point the main-entry of the package
