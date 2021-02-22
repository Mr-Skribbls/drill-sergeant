const add = {
  seconds: (time, seconds) => {
    const t = new Date(time.valueOf());
    t.setSeconds(t.getSeconds() + seconds);
    return t;
  },
  minutes: (time, minutes) => add.seconds(time, 60*minutes),
  hours: (time, hours) => add.minutes(time, 60*hours),
  days: (time, days) => add.hours(time, 24*days),
  weeks: (time, weeks) => add.days(time, 7*weeks),
};

const toMs = {
  seconds: (ms) => 1000*ms,
  minutes: (ms) => 60*toMs.seconds(ms),
  hours: (ms) => 60*toMs.minutes(ms),
  days: (ms) => 24*toMs.hours(ms),
  weeks: (ms) => 7*toMs.days(ms),
};

const msTo = {
  seconds: (ms) => ms/1000,
  minutes: (ms) => msTo.seconds(ms)/60,
  hours: (ms) => msTo.minutes(ms)/60,
  days: (ms) => msTo.hours(ms)/24,
  weeks: (ms) => msTo.days(ms)/7,
};

const time = {
  add,
  toMs,
  msTo,
};

export default time;