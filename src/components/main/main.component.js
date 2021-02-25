import React from 'react';

import './main.css';

const Main = (props) => {
  const {minsRemaining, secsRemaining} = props;
  
  const doubleDigit = (number) => {
    const number_string = String(number);
    return number_string.length > 1 ? number_string : '0' + number_string;
  };

  return (
    <div className="main-container">
      <span>{doubleDigit(minsRemaining)}:{doubleDigit(secsRemaining)}</span>
    </div>
  );
};

export default Main;