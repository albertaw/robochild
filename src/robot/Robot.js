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
			oilLevel: 100,
			timeRemaining: 0
		};

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

	onClockTicked() {

	}

	render() {
		 return (
		 	<div ref={elem => this.context = elem} class="robot container">
		 		<h2 class="text-center">Robo Child</h2>
		 		<div class="row">
			 		<p class="col-3">Oil</p>
			 		<div class="col-9">
				 		<div class="progress">
						  <div class="progress-bar progress-bar-striped progress-bar-animated" style={{width: this.state.oilLevel + '%'}}>{this.state.oilLevel + '%'}</div>
						</div>
					</div>
				</div>
				<div class="row">
			 		<p class="col-3">Electricity</p>
			 		<div class="col-9">
				 		<div class="progress">
						  <div class="progress-bar progress-bar-striped progress-bar-animated" style={{width: this.state.foodLevel + '%'}}>{this.state.foodLevel + '%'}</div>
						</div>
					</div>
				</div>
				<div class="row justify-content-center">
		 			<p>Current State: {Object.keys(this.names)[this.state.currentState]}</p>
		 		</div>
			 	<div class="row justify-content-center">
			 		<div class="btn-group">
			 			<button class="btn btn-success btn-lg" onClick={()=>this.feed()}>Feed</button>
				 		<button class="btn btn-warning btn-lg" onClick={()=>this.oil()}>Oil</button>
				 		<button class="btn btn-dark btn-lg" onClick={()=>this.sleep()}>Sleep</button>
				 	</div>
				</div>

		 	</div> 
		)
	}
} 