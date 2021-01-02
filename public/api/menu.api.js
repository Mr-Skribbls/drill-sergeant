const {ipcRenderer} = require('electron');

const close = () => ipcRenderer.send('close');
const minimize = () => ipcRenderer.send('minimize');

module.exports = {
  close,
  minimize,
};