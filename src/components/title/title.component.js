import React from 'react';
// import PropTypes from 'prop-types';

import './title.css';
import closeBtn from  '../../content/icons/close-18dp.svg';
import minBtn from '../../content/icons/remove-18dp.svg';


const Title = (props) => {
  const {menu} = props;
  
  const close = () => window.api.menuAPI.close();
  const minimize = () => window.api.menuAPI.minimize();

  return (
    <div id="title-bar">
      <div className="menu-bar">
        {menu.map((m, i) => <div key={i} onClick={m.click}>{m.label}</div>)}
      </div>
      <div className="drag-bar"></div>
      <div className="action-bar hide">
        <div id="min-btn" className="title-item action-item" onClick={minimize}>
          <img src={minBtn} alt="minimize" />
        </div>
        <div id="close-btn" className="title-item action-item" onClick={close}>
          <img src={closeBtn} alt="close" />
        </div>
      </div>
    </div>
  );

};

Title.propTypes = {

};

export default Title;