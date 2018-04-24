import React, { Component } from 'react';
import './App.css';
import Robot from './robot/Robot';

class App extends Component {
  render() {
    return (
    	<div className="app row justify-content-center">
      	<div className="col-sm-8">
      		<h2 className="app-title text-center">Robo Child</h2>
        	<Robot />
        </div>
      </div>
    );
  }
}

export default App;
