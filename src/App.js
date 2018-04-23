import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Robot from './robot/Robot';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Robot />
      </div>
    );
  }
}

export default App;
