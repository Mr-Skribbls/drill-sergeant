import React, {useState} from 'react';

import Input from '../input/input.component';

import './editWorkout.css';

const AddWorkout = (props) => {
  
  const [workout, setWorkout] = useState(props.workout || {
    name: '',
    description: '',
    steps: [],
  });

  const assign = (prop) => (value) => {
    const w = Object.assign({}, workout);
    if(!w.hasOwnProperty(prop)) return;
    w[prop] = value;
    setWorkout(w);
  };

  const editStep = (idx) => (changeValue) => {
    const w = Object.assign({}, workout);
    if(!w.steps) return;
    if(!w.steps.length > idx+1) return;
    w.steps[idx] = changeValue;
    setWorkout(w);
  };

  const addStep = () => {
    const w = Object.assign({}, workout);
    if(!w.steps) return;
    w.steps.push('');
    setWorkout(w);
  };

  const removeStep = (idx) => () => {
    const w = Object.assign({}, workout);
    if(!w.steps) return;
    w.steps.splice(idx, 1);
    setWorkout(w);
  };

  const save = () => {
    props.saveWorkout(workout);
  };

  return (
    <div id="add-workout">
      <Input
        value={workout.name}
        label={'Name'}
        name={'name'}
        onChange={assign('name')}></Input>
      <Input
        value={workout.description}
        label={'Description'}
        name={'description'}
        onChange={assign('description')}></Input>
      {workout.steps.map((step, i) => (
        <div className="step" key={i}>
          <Input
            className="step-input"
            value={step}
            label={`Step ${i+1}`}
            name={`step${i+1}`}
            onChange={editStep(i)}></Input>
          <button onClick={removeStep(i)}>Remove</button>
        </div>
      ))}
      <button onClick={addStep}>Add Step</button>
      <button onClick={save}>Save Workout</button>
    </div>
  );
};

export default AddWorkout;