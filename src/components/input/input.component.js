import React from 'react';
import PropTypes from 'prop-types';

import './input.css';

const Input = (props) => {
  const {label, value, name, placeholder, onChange} = props;

  return (
    <label>
      {label}: <input 
        name={name}
        placeholder={placeholder}
        value={value} 
        onChange={(event) => {
          onChange(event.target.value);
        }}>
      </input>
    </label>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Input;