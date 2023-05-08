import React from 'react';

const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box">
        <h1 style={{ color: 'black' }}>約克夏愛你!!!</h1>
        <h1 style={{ color: 'black' }}>回合:{props.turns}</h1>
        <button onClick={props.shuffleCards}>新遊戲</button>
      </div>
    </div>
  );
};

export default Popup;
