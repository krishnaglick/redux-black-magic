
const globby = require('globby');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

function ReactBlackMagic(config = {}) {
  if(typeof config === 'string')
    config = require(config);
  const configOptions = require('./settingsLoader')(config);
  _.forEach(Object.keys(configOptions), opt => this[opt] = path.resolve(configOptions[opt]));

  this.writeFiles = () => {
    this.generateActionList();
    this.generateReducerList();
  };
}

ReactBlackMagic.prototype.apply = function(compiler) {
  compiler.plugin('compile', this.writeFiles);
};

ReactBlackMagic.prototype.generateActionList = function() {
  const globbedActions = _.map(_.filter(globby.sync(`${this.actionsFolder}/**/*.js`), p => p.indexOf('index') === -1), p => path.resolve(p));
  const actionTemplate = fs.readFileSync(this.actionTemplate, { encoding: 'UTF8'})
    .replace(/'actionsReplace'/g, _.map(globbedActions, a => `require('.${a.split(this.actionsFolder)[1].replace(/\\/g, '/')}')`).join(',\n  '));
  const actionIndexPath = path.resolve(`${this.actionsFolder}/index.js`);
  fs.writeFileSync(actionIndexPath, actionTemplate);
};

ReactBlackMagic.prototype.generateReducerList = function() {
  const globbedReducers = _.filter(globby.sync(`${this.reducersFolder}/**/*.js`), p => p.indexOf('index') === -1);
  const reducers = _.map(globbedReducers, (reducerPath) => {
    return {
      name: _.camelCase(reducerPath.split('/').splice(-1)[0].split('.')[0]),
      fileName: reducerPath.replace(this.reducersFolder, '.')
    };
  });
  const reducerMapping = _.map(reducers, ({name, fileName}) => `${name}: require('${fileName.split(this.reducersFolder)[1]}')`).join(',\n  ');
  const reducerTemplate = fs.readFileSync(this.reducerTemplate, { encoding: 'UTF8'})
    .replace(/reducerReplacer/g, reducerMapping);
  const reducerIndexPath = path.resolve(`${this.reducersFolder}/index.js`);
  fs.writeFileSync(reducerIndexPath, reducerTemplate);
};

module.exports = ReactBlackMagic;
