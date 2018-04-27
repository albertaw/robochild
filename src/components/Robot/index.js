import React from 'react';
import IdleState from './State/IdleState';
import HungryState from './State/HungryState';
import RustyState from './State/RustyState';
import DeadState from './State/DeadState';
import Audio from './Audio';
import Health from './Health';
import Messages from './Messages';
import Bot from './Bot';
import Controls from './Controls';
import Clock from '../Clock';

export default class Robot extends React.Component {
	constructor(props) {
		super(props);
		this.clock = new Clock();
		this.names = {'IDLE': 0, 'HUNGRY': 1, 'RUSTY': 2, 'DEAD': 3};
		this.states = [new IdleState(), new HungryState(), new RustyState(), new DeadState()];
		this.inputs = {'CHARGE': 0, 'OIL': 1, 'SLEEP': 2, 'ON_HUNGRY': 3, 'ON_RUSTY': 4, 'RESET': 5};
		this.transitions = [
		//charge              	oil              sleep            onHungry          onRusty           reset
			[this.names.IDLE,	this.names.IDLE,	this.names.IDLE, 	this.names.HUNGRY,this.names.RUSTY,	this.names.IDLE],
			[this.names.IDLE, this.names.HUNGRY,this.names.HUNGRY,this.names.HUNGRY,this.names.DEAD,	this.names.IDLE], 
			[this.names.RUSTY,this.names.IDLE,	this.names.RUSTY,	this.names.DEAD,	this.names.RUSTY,	this.names.IDLE],
			[this.names.DEAD,	this.names.DEAD,	this.names.DEAD,	this.names.DEAD,	this.names.DEAD,	this.names.IDLE]
		];
		
		this.ekg = null;
		this.flatline = null;
		this.state = {
			currentState: this.names.IDLE,
			energy: 100,
			condition: 100,
			electricity: 100,
			oil: 100
		};
	}

	charge() {
		this.states[this.state.currentState].charge(this);
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
		const currentState = this.transitions[this.state.currentState][this.inputs.ON_HUNGRY];
		this.setState({
			currentState: currentState
		});
	}

	onRusty() {
		const currentState = this.transitions[this.state.currentState][this.inputs.ON_RUSTY];
		this.setState({
			currentState: currentState
		});
	}

	updateEnergy() {
		const energy = (this.state.energy) === 0 ? 0 : this.state.energy - 1;
		this.ekg.play();

		this.setState({
			energy: energy,
		});
		
		if (this.state.energy < 50) {
			this.onHungry();

		}

		if (this.state.currentState === this.names.DEAD) {
			this.clock.cleanup();
			this.ekg.pause();
			this.flatline.volume = .1;
			this.flatline.play();
		}

	}

	updateCondition() {
		const condition = (this.state.condition) === 0 ? 0 : this.state.condition - 1;

		this.setState({
			condition: condition
		});

		if (this.state.condition < 50) {
			this.onRusty();
		}

		if (this.state.currentState === this.names.DEAD) {
			this.clock.cleanup();
			this.ekg.pause();
			this.flatline.play()
		}
	}

	componentDidMount() {
		this.clock.update(this);
	}

	componentWillMount() {
		this.clock.cleanup();
	}

	render() {
		 return (
		 	<div className="container">
		 		<Audio 
		 			ekg={ekg=>{this.ekg=ekg}}
		 			flatline={flatline=>{this.flatline=flatline}} />
		 		<Health 
		 			energy={this.state.energy}
		 			condition={this.state.condition} />
		 		<Messages
		 			electricity={this.state.electricity}
		 			oil={this.state.oil}
		 			currentState={this.state.currentState}
		 			names={this.names} />
		 		<Bot
		 			currentState={this.state.currentState}
		 			deadState={this.names.DEAD} />
		 		<Controls
		 			reset={()=>this.reset()}
		 			charge={()=>this.charge()}
		 			oil={()=>this.oil()}
		 			sleep={()=>this.sleep()} />
			</div>
		)
	}
}