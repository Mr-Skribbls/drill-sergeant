const asyncIpc = require('./asyncIpc');

const getWorkouts = () => asyncIpc('workouts:all', 'workouts:all:response');

const setWorkout = (workout) => {
  return asyncIpc('workout:set', 'workout:set:response', [workout]);
};

module.exports = {
  getWorkouts,
  setWorkout,
};