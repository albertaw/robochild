import React from 'react';

export default class Robot extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentState: null,
			states: null,
			inputs: null,
			transitions: null,
			hungerLevel: null,
			rustLevel: null,
			foodLevel: null,
			oilLevel: null
		}
	}

	feed() {
		this.state.states[this.state.currentState].feed(this);
	}

	oil() {
		this.state.states[this.state.currentState].oil(this);
	}

	sleep() {
		this.state.states[this.state.currentState].sleep(this);
	}

	reset() {
		this.state.states[this.state.currentState].reset(this);
	}

	onHungry() {

	}

	onRusty() {

	}

	render() {
		 return (
		 	<div>
		 		<h2>Robo Child</h2>
		 		<h4>Oil: {this.state.oilLevel}</h4>
		 		<h4>Energy: {this.state.foodLevel}</h4>
		 		<h4>Current State: {this.state.currentState}</h4>
		 		<button onclick={()=>this.feed()}>Feed</button>
		 		<button onclick={()=>this.oil()}>Oil</button>
		 		<button onClick={()=>this.sleep()}>Sleep</button>
		 	</div> 
		)
	}
} 