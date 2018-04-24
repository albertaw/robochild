import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Robot from './robot/Robot';

class App extends Component {
  render() {
    return (
    	<div className="app row justify-content-center">
      	<div className="col-sm-7">
        	<Robot />
        </div>
      </div>
    );
  }
}

export default App;
