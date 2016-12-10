# Redux-Black-Magic

### tl;dr
 - npm i -D redux-black-magic
 - import black-magic into your webpack.config.js and add it as a plugin:
  ```
   const blackMagic = require('../../redux-black-magic');
   plugins: [
     new blackMagic({
      actionsFolder: path.resolve(APP_DIR + '/actions/'),
      reducersFolder: path.resolve(APP_DIR + '/reducers/')
    })
  ]
  ```
  - Import your actions `import actions from './actions/index';` and dispatch as normal!

Note: Don't edit your actions/index.js or reducers/index.js as the changes will be overwritten. If you need to change something, copy the template into the app, make your changes, and then point black-magic at the template.
Settings can be passed in as an object and it takes the following:
 - actionTemplate
 - reducerTemplate
 - actionsFolder
 - reducersFolder

The action and reudcer templates have a 'default' setting, what comes with black-magic, but the folders need to be specified. Additionally, the settings can be set with environment variables:
 - ACTION_TEMPLATE
 - REDUCER_TEMPLATE
 - ACTIONS_FOLDER
 - REDUCERS_FOLDER

A sample app can be found [here](https://github.com/krishnaglick/redux-black-magic-sample-app).
