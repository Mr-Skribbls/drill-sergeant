// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, {useState, useEffect} from 'react';

import Title from './components/title/title.component';
import Config from './components/config/config.component';
import Main from './components/main/main.component';
import Workouts from './components/workouts/workouts.components';
import EditWorkout from './components/editWorkout/editWorkout.component';

import './App.css';

const App = () => {
  // ----- Load ----- //
  const [config, setConfig] = useState({});
  const [workouts, setWorkouts] = useState([]);

  const loadConfig = () => _loadConfig().then((config) => setConfig(config));
  const loadWorkouts = () => _loadWorkouts().then((workouts) => setWorkouts(workouts));

  useEffect(() => {
    loadConfig();
    loadWorkouts();
  }, []);

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

    loadWorkouts();

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

  return(
    <React.Fragment>
      <Title menu={menu}></Title>
      {currentPage.page === 'main' && <Main></Main>}
      {currentPage.page === 'config' && <Config config={config} setConfig={setConfig}></Config>}
      {currentPage.page === 'workouts' && <Workouts workouts={workouts} openEditWorkoutPage={openEditWorkoutPage}></Workouts>}
      {currentPage.page === 'editWorkout' && <EditWorkout workout={currentPage.args?.workout} saveWorkout={saveWorkout}></EditWorkout>}
    </React.Fragment>
  );
};

export default App;