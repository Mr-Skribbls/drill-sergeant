import React from 'react';

import './workouts.css';

const Workouts = (props) => {
  const {workouts, openEditWorkoutPage} = props;

  const editWorkout = (workout) => () => openEditWorkoutPage(workout);

  return (
    <div id="workouts-list">
      {workouts.map((workout, key) => <div key={key} onClick={editWorkout(workout)}>{workout.name}</div>)}
      <div onClick={editWorkout()}>Add Workout</div>
    </div>
  );
};

export default Workouts;