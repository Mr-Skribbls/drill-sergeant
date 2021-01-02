import React, {useState, useEffect} from 'react';

import Input from '../input/input.component';

import './config.css';

const Config = (props) => {
  const {config, setConfig} = props;
  
  // ----- Config ----- //
  const _setConfig = async ({key, value}) => {
    const p = window.api.configAPI.setConfig({key, value});
    p.catch((err) => console.error(err));
    await p;

    return p;
  };

  // ----- minTime ----- //
  const [minTime, setMinTime] = useState(config.minTime);
  const changeMinTime = (value) => {
    setMinTime(value);
  };
  useEffect(() => {
    if(minTime) {
      _setConfig({key: 'minTime', value: minTime}).then((c) => {
        setConfig(c);
      });
    }
  }, [minTime, setConfig]);

  // ----- maxTime ----- //
  const [maxTime, setMaxTime] = useState(config.maxTime);
  const changeMaxTime = (value) => {
    setMaxTime(value);
  };
  useEffect(() => {
    if(maxTime) {
      _setConfig({key: 'maxTime', value: maxTime}).then((c) => {
        setConfig(c);
      });
    }
  }, [maxTime, setConfig]);

  return (
    <div id="config-container">
      <Input
        value={minTime}
        label={'Min Time'}
        name={'minTime'}
        onChange={changeMinTime}>
      </Input>
      <Input
        value={maxTime}
        label={'Max Time'}
        name={'maxTime'}
        onChange={changeMaxTime}>
      </Input>
    </div>
  );
};

export default Config;