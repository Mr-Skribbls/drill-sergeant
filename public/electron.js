const {app, ipcMain} = require('electron');
// const path = require('path');

const configStorage = require('./storage/config');
const workoutStorage = require('./storage/workouts');

const {window} = require('./base.window');

const DEBUG = false;

let mainWin;

/*
| ------------------------------------------------------------------------
| Windows
| ------------------------------------------------------------------------
*/
const createMainWindow = () => mainWin = window(null, DEBUG)({
  width: 300, 
  height: 180,
  x: 0,
  y: 0,
});

/*
| ------------------------------------------------------------------------
| App Events
| ------------------------------------------------------------------------
*/
app.on('ready', () => createMainWindow());

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit();
});

/*
| ------------------------------------------------------------------------
| IPC Events
| ------------------------------------------------------------------------
*/
const throwErr = (err) => { throw err; };

// ----- Workout Events ----- //
ipcMain.on('workouts:all', (e) => {
  const p = workoutStorage.getWorkouts();
  p.then((workouts) => {
    // console.log(workouts);
    e.sender.send('workouts:all:response', workouts);
  });
  p.catch(throwErr);
});

ipcMain.on('workout:set', (e, workout) => {
  const p = workoutStorage.getWorkout(workout.id);
  p.then((w) => {
    if(w) return workoutStorage.updateWorkout(workout);
    return workoutStorage.addWorkout(workout);
  }).then((w) => {
    e.sender.send('workout:set:response', w);
  }).catch((err) => console.error(err));
});

// ipcMain.on('workouts:get', (e, workoutName) => {
//   const p = workoutStorage.getWorkout(workoutName);
//   p.then((workout) => e.sender.send('workouts:get:response', workout));
//   p.catch(throwErr);
// });

// ipcMain.on('workouts:add', (e, {name, description, steps}) => {
//   const workout = workoutStorage.createWorkout(name, description, steps);
//   const p = workoutStorage.addWorkout(workout);
  
//   p.then((workout) => e.sender.send('workouts:add:response', workout));
  
//   p.catch(throwErr);
// });

// ipcMain.on('workouts:delete', (e, workoutName) => {
//   const p = workoutStorage.removeWorkout(workoutName);

//   p.then((workouts) => e.sender.send('workout:delete:response', workouts));

//   p.catch(throwErr);
// });

// ipcMain.on('workouts:update', (e, workout) => {
//   const p = workoutStorage.updateWorkout(workout);

//   p.then((workout) => e.sender.send('workouts:update:response', workout));

//   p.catch(throwErr);
// });

// ----- Config Events ----- //
ipcMain.on('config:get', (e, keys) => {
  const p = configStorage.getConfig(keys);

  p.then((config) => {
    e.sender.send('config:get:response', config);
  });

  p.catch(throwErr);
});

ipcMain.on('config:set', (e, {key, value}) => {
  const p = configStorage.setConfig(key, value);

  p.then((config) => e.sender.send('config:set:response', config));

  p.catch(throwErr);
});

// ipcMain.on('config:delete', (e, key) => {
//   const p = configStorage.deleteConfig(key);

//   p.then((config) => e.sender.send('config:delete:response', config));

//   p.catch(throwErr);
// });

// ----- Menu Events ----- //
ipcMain.on('close', (e) => mainWin.close());
ipcMain.on('minimize', (e) => mainWin.minimize());