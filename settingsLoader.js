
const path = require('path');

function loadSettings(config) {
  config = config.blackMagic || config;
  const actionTemplate = config.actionTemplate || process.env.ACTION_TEMPLATE || path.resolve(__dirname + '/templates/actions.js');
  const reducerTemplate = config.reducerTemplate || process.env.REDUCER_TEMPLATE || path.resolve(__dirname + '/templates/reducers.js');
  const actionsFolder = config.actionsFolder || process.env.ACTIONS_FOLDER;
  const reducersFolder = config.reducersFolder || process.env.REDUCERS_FOLDER;
  return { actionTemplate, reducerTemplate, actionsFolder, reducersFolder };
}

module.exports = loadSettings;
