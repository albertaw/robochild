import React from 'react';
import IdleState from './IdleState';
import HungryState from './HungryState';
import RustyState from './RustyState';
import DeadState from './DeadState';

export default class Robot extends React.Component {
	constructor(props) {
		super(props);
		this.names = {'IDLE': 0, 'HUNGRY': 1, 'RUSTY': 2, 'DEAD': 3};
		this.states = [new IdleState(), new HungryState(), new RustyState(), new DeadState()];
		this.inputs = {'FEED': 0, 'OIL': 1, 'SLEEP': 2, 'RESET': 3};
		this.transitions = [
		//feed              	oil              sleep            onHungry          onRusty            
			[this.names.IDLE,	this.names.IDLE,	this.names.IDLE, 	this.names.HUNGRY,this.names.RUSTY],
			[this.names.IDLE, this.names.HUNGRY,this.names.HUNGRY,this.names.HUNGRY,this.names.DEAD], 
			[this.names.RUSTY,this.names.IDLE,	this.names.RUSTY,	this.names.DEAD,	this.names.RUSTY],
			[this.names.DEAD,	this.names.DEAD,	this.names.DEAD,	this.names.DEAD,	this.names.DEAD]
		];

		this.state = {
			currentState: this.names.HUNGRY,
			hungerLevel: 50,
			rustLevel: 0,
			foodLevel: 100,
			oilLevel: 100
		};

		this.hungryEvent = new Event('onHungry');
		this.rustyEvent = new Event('onRusty');
		this.onHungry = this.onHungry.bind(this);
		this.onRusty = this.onRusty.bind(this);
	}

	feed() {
		this.states[this.state.currentState].feed(this);
	}

	oil() {
		this.states[this.state.currentState].oil(this);
	}

	sleep() {
		this.states[this.state.currentState].sleep(this);
	}

	reset() {
		this.states[this.state.currentState].reset(this);
	}

	onHungry() {

		console.log('Hungry event listenter added.');
	}

	onRusty() {
		console.log('Rusty event listener addded');
	}

	render() {
		 return (
		 	<div ref={elem => this.context = elem}>
		 		<h2>Robo Child</h2>
		 		<h4>Oil: {this.state.oilLevel}</h4>
		 		<h4>Electricity: {this.state.foodLevel}</h4>
		 		<h4>Current State: {Object.keys(this.names)[this.state.currentState]}</h4>
		 		<button onClick={()=>this.feed()}>Feed</button>
		 		<button onClick={()=>this.oil()}>Oil</button>
		 		<button onClick={()=>this.sleep()}>Sleep</button>
		 	</div> 
		)
	}
} 