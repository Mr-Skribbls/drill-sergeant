import time from './time';

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const generateCommander = () => {
  const nextCommand = {
    time: new Date(),
    workout: null,
  };

  const generateNext = (config, workouts) => {
    if(!config.minTime || !config.maxTime) return nextCommand;
    const randMin = randomBetween(Number(config.minTime), Number(config.maxTime));
    nextCommand.time = time.add.minutes(new Date(), randMin).getTime();

    const randWork = randomBetween(0, workouts.length-1);
    nextCommand.workout = workouts[randWork];

    return nextCommand;
  };

  return {
    getNextCommand: generateNext,
  };
};

export default generateCommander;