#Developer Guide
###Environment Setup
1. Be sure you have ``node`` installed (at least version 8.0.0).
2. Run ``npm install -g @angular/cli`` to globally install the latest version of Angular CLI.
3. Clone the repo.
4. From the project root, run ``npm install``

####Builds
* To build in dev mode, run ``ng build``.
* To build in release mode, run ``npm run build:prod``.
* To bring up on a local server, run ``npm start``.  This will watch for changes and automatically rebuild.  The browser should also reload when changes are made.
* To build only the Moose Watch library, run ``npm run build:lib``.

####Running tests
* To run tests in watch mode, run ``npm run test:dev``.
* To run tests once with code coverage, run ``npm run test:unit:ci``.
* To run e2e tests, run ``ng e2e``.
* To run lint, run ``ng lint``.

####Prettier
Prettier helps maintain consistent code formatting across development environments.

To run prettier, run ``npm run prettier``.

####Bundle Analysis
To run the webpack bundle analyzer,
1. Run ``npm run build:prod:analyze`` to generate a build that includes the ``stats.json`` file.
2. Run ``npm run bundle-report``.  This should automatically launch a new browser tab displaying a chart that breaks down the size and composition of each webpack bundle.
