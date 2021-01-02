const {contextBridge} = require('electron');
const configAPI = require('./api/config.api');
const workoutsAPI = require('./api/workouts.api');
const menuAPI = require('./api/menu.api');

contextBridge.exposeInMainWorld(
  'api', 
  {
    configAPI,
    workoutsAPI,
    menuAPI,
  },
);