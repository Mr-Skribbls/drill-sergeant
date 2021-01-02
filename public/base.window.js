const {BrowserWindow, Menu} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const createWindow = (options) => {
  const defaultOptions = {
    width: 800,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    frame: false,
    backgroundColor: '#242429',
  };

  let win = new BrowserWindow(Object.assign(defaultOptions, options));

  win.loadURL(isDev ? 'http://localhost:3000/' : `file://${path.join(__dirname, '../build/index.html')}`);

  win.on('closed', () => win = null);

  return win;
};

const setMenu = (menuTemplate) => {
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};

const window = (menu, DEBUG) => {
  let win;
  return (options) => {
    win = createWindow(options);

    if(DEBUG) win.webContents.openDevTools();

    if(menu) setMenu(menu(DEBUG));

    return win;
  };
};

module.exports = {
  window,
  setMenu,
};