const storage = require('electron-json-storage');

const storageKey = 'workouts';

const isWorkout = (id) => (workout) => workout.id === id;

const addWorkout = (workout) => new Promise((resolve, reject) => {
  if(!workout) reject('Must supply a workout');
  storage.get(storageKey, (err, workouts = []) => {
    if(err) reject(err);
    if(!Array.isArray(workouts)) workouts = [];

    workout.id = Date.now();

    workouts = [...workouts, workout];

    storage.set(storageKey, workouts, (err) => {
      if(err) reject(err);
      resolve(workout);
    });
  });
});

// const removeWorkout = (workoutName) => new Promise((resolve, reject) => {
//   if(!workoutName) reject('Must supply a workout name');
//   storage.get(storageKey, (err, workouts = []) => {
//     if(err) reject(err);

//     workouts = workouts.filter(isWorkout(workoutName));

//     storage.set(storageKey, workouts, (err) => {
//       if(err) reject(err);
//       resolve(workouts);
//     });
//   });
// });

const getWorkout = (id) => new Promise((resolve, reject) => {
  storage.get(storageKey, (err, workouts) => {
    if(!Array.isArray(workouts)) workouts = [];
    if(err) reject(err);
    resolve(workouts.find(isWorkout(id)));
  });
});

const getWorkouts = () => new Promise((resolve, reject) => {
  storage.get(storageKey, (err, workouts) => {
    if(err) reject(err);
    if(!Array.isArray(workouts)) workouts = [];
    resolve(workouts);
  });
});

const updateWorkout = (workout) => new Promise((resolve, reject) => {
  storage.get(storageKey, (err, workouts = []) => {
    const initialWorkout = workouts.find(isWorkout(workout.id));

    if(!initialWorkout) reject('The given workout is not found');

    const idx = workouts.indexOf(initialWorkout);
    workouts[idx] = workout;

    storage.set(storageKey, workouts, (err) => {
      if(err) reject(err);
      resolve(workout);
    });
  });
});

// const createWorkout = (name, description = '', steps = []) => ({
//   name,
//   description,
//   steps,
// });

module.exports = {
  addWorkout,
  // removeWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
  // createWorkout,
};