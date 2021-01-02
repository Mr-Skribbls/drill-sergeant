const asyncIpc = require('./asyncIpc');

const getConfig = (key) => asyncIpc('config:get', 'config:get:response', [key]);

const setConfig = ({key, value}) => asyncIpc('config:set', 'config:set:response', [{key, value}]);

const deleteConfig = (key) => asyncIpc('config:delete', 'config:delete:response', [key]);

module.exports = {
  getConfig,
  setConfig,
  deleteConfig,
};