import React from 'react';
import Board from './Board';

export default class App extends React.Component{
  render(){
    return (
      <div className='game'>
        <center>
          <Board/>
        </center>
      </div>
    );
  };
}
