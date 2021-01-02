const storage = require('electron-json-storage');

const storageKey = 'config';
const allowedKeys = [
  'minTime',
  'maxTime',
];

const getConfig = (keys = []) => new Promise((resolve, reject) => {
  storage.get(storageKey, (err, config = {}) => {
    if(err) reject(err);

    if(keys.length === 0) resolve(config);

    const res = {};
    keys.forEach((key) => {
      if(config[key]) res[key] = config[key];
    });

    resolve(res);
  });
});

const setConfig = (key, value) => {
  if(!allowedKeys.includes(key)) return Promise.reject(`config key ${key} not supported.`);
  return new Promise((resolve, reject) => {
    storage.get(storageKey, (err, config = {}) => {
      if(err) reject(err);

      config[key] = value;

      storage.set(storageKey, config, (err) => {
        if(err) reject(err);
        resolve(config);
      });
    });
  });
};

const deleteConfig = (key) => new Promise((resolve, reject) => {
  storage.get(storageKey, (err, config = {}) => {
    if(err) reject(err);

    delete config[key];

    storage.set(storageKey, config, (err) => {
      if(err) reject(err);
      resolve(config);
    });
  });
});

module.exports = {
  getConfig,
  setConfig,
  deleteConfig
};