import React, {useState, useEffect} from 'react';

import Title from './components/title/title.component';
import Config from './components/config/config.component';
import Main from './components/main/main.component';
import Workouts from './components/workouts/workouts.components';
import EditWorkout from './components/editWorkout/editWorkout.component';

import CommanderGenerator from './modules/commanderGenerator';
import './App.css';

import time from './modules/time';

const App = () => {
  const commander = CommanderGenerator();
  
  // ----- Load ----- //
  const [config, setConfig] = useState({});
  const [workouts, setWorkouts] = useState({});
  const [command, setCommand] = useState({});
  const [minsRemaining, setMinsRemaining] = useState(0);
  const [secsRemaining, setSecsRemaining] = useState(0);
  
  const loadConfig = async () => {
    const p = _loadConfig();
    p.catch((err) => console.log(err));
    return await p;
  };
  const loadWorkouts = async () => {
    const p = _loadWorkouts();
    p.catch((err) => console.log(err));
    return await p;
  };

  useEffect(() => {
    if(loadConfig && loadWorkouts) {
      const wp = loadWorkouts();
      const cp = loadConfig();
      Promise.all([wp, cp]).then(([workouts, config]) => {
        setWorkouts(workouts);
        setConfig(config);

        setCommand(commander.getNextCommand(config, workouts));
      });
    } 
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if(!command || !command.time || !command.workout) return;
      const minsFloat = time.msTo.minutes(command.time - Date.now());
      if(minsFloat > 0) {
        const minsFloor = Math.floor(minsFloat);
        const seconds = Math.floor((minsFloat - minsFloor) * 60);
        
        setMinsRemaining(minsFloor);
        setSecsRemaining(seconds);
      } else {
        // notify
        sendNotification(command.workout.name, command.workout.description);

        // create new command
        setCommand(commander.getNextCommand(config, workouts));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [command]);

  // ----- Config Methods ----- //
  const _loadConfig = async () => {
    const p = window.api.configAPI.getConfig();
    p.catch((err) => console.error(err));
    await p;

    return p;
  };

  // ----- Workout Methods ----- //
  const _loadWorkouts = async () => {
    const p = window.api.workoutsAPI.getWorkouts();
    p.catch((err) => console.log(err));
    await p;

    return p;
  };

  const _setWorkout = async (workout) => {
    const p = window.api.workoutsAPI.setWorkout(workout);
    p.catch((err) => console.error(err));
    await p;

    return p;
  };

  const saveWorkout = async (workout) => {
    let savedWorkout = null;
    const p = _setWorkout(workout);
    p.catch((err) => console.error(err));
    p.then((w) => savedWorkout = w);

    await p;

    const w = await loadWorkouts();
    setWorkouts(w);

    return savedWorkout;
  };

  // ----- Menu ----- //
  const [currentPage, setCurrentPage] = useState({
    page: 'main',
    args: {},
  });
  const menu = [
    { // Main
      label: 'Main',
      click: () => setCurrentPage({
        page: 'main',
        args: {},
      }),
    },
    { // Configure
      label: 'Configure',
      click: () => setCurrentPage({
        page: 'config',
        args: {},
      }),
    },
    { // Workouts
      label: 'Workouts',
      click: () => setCurrentPage({
        page: 'workouts',
        args: {},
      }),
    }
  ];

  const openEditWorkoutPage = (workout) => setCurrentPage({
    page: 'editWorkout',
    args: {
      workout,
    },
  });

  const sendNotification = (title, message) => {
    new Notification(title, {
      body: message,
      requireInteraction: true,
    });
  };

  return(
    <React.Fragment>
      <Title menu={menu}></Title>
      {currentPage.page === 'main' && <Main minsRemaining={minsRemaining} secsRemaining={secsRemaining}></Main>}
      {currentPage.page === 'config' && <Config config={config} setConfig={setConfig}></Config>}
      {currentPage.page === 'workouts' && <Workouts workouts={workouts} openEditWorkoutPage={openEditWorkoutPage}></Workouts>}
      {currentPage.page === 'editWorkout' && <EditWorkout workout={currentPage.args?.workout} saveWorkout={saveWorkout}></EditWorkout>}
    </React.Fragment>
  );
};

export default App;