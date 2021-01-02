const {ipcRenderer} = require('electron');

const asyncIpc = async (sendChannel, responseChannel, args = []) => {
  let result;

    ipcRenderer.send(sendChannel, ...args);
    
    const p = new Promise((resolve, reject) => {
      ipcRenderer.on(responseChannel, (e, res) => {
        resolve(res);
      });
    });

    p.catch((err) => {
      throw err;
    });

    await p.then((res) => result = res);

    return result;
};

module.exports = asyncIpc;