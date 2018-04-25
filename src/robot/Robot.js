import React from 'react';
import IdleState from './IdleState';
import HungryState from './HungryState';
import RustyState from './RustyState';
import DeadState from './DeadState';
import ekgSrc from './ekg.mp3'; 
import flatlineSrc from './flatline.mp3';

export default class Robot extends React.Component {
	constructor(props) {
		super(props);
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
		this.energyInterval = null;
		this.conditionInterval = null;
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
			clearInterval(this.energyInterval);
			clearInterval(this.conditionInterval);
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
			clearInterval(this.energyInterval);
			clearInterval(this.conditionInterval);
			this.ekg.pause();
			this.flatline.play()
		}
	}

	componentDidMount() {
		this.energyInterval = setInterval(()=>{
			this.ekg = document.getElementById('ekg');
			this.flatline = document.getElementById('flatline');
			this.updateEnergy()}
			, 1000 * 1);
		

		this.conditionInterval = setInterval(()=>
			this.updateCondition(), 1000 * 2);
	}

	componentWillMount() {
		clearInterval(this.energyInterval);
		clearInterval(this.conditionInterval);
	}

	render() {
		 return (
		 	<div className="container">
		 		<audio id="ekg" loop>
		 			<source src={ekgSrc} type="audio/mpeg"/>
		 		</audio>
		 		<audio id="flatline">
		 			<source src={flatlineSrc} type="audio/mpeg"/>
		 		</audio>
		 		<section>
			 		<div className="row">
				 		<p className="col-3">Energy</p>
				 		<div className="col-9">
					 		<div className="progress">
							  <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{width: this.state.energy + '%'}}>{this.state.energy + '%'}</div>
							</div>
						</div>
					</div>
					<div className="row">
				 		<p className="col-3">Condition</p>
				 		<div className="col-9">
					 		<div className="progress">
							  <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: this.state.condition + '%'}}>{this.state.condition + '%'}</div>
							</div>
						</div>
					</div>
				</section>

				<div className="row">
					<p className="col">Electricity: {this.state.electricity}</p>
					<p className="col">Oil: {this.state.oil}</p>
		 			<p className="col">State: {Object.keys(this.names)[this.state.currentState]}</p>
		 		</div>

			 
		 		<section>
			 		<div className="row justify-content-center">
			 			<div className="v-align">
			 				<div className={(this.state.currentState === this.names.DEAD) ? "robot-body robot-dead" : "robot-body"}> 
			 				
			 				</div>
			 			</div>
			 		</div>
		 		</section>
		 		{this.state.currentState === this.names.DEAD ?
		 		<div className="row justify-content-center">
		 			<button className="btn btn-danger btn-lg btn-reset" onClick={()=>this.reset()}>New Bot</button>
			 	</div>
		 		: null}
		 		<nav className="navbar fixed-bottom navbar-dark bg-dark">
				  <div className="col">
			 			<button className="btn btn-success btn-block" onClick={()=>this.charge()}>charge</button>
			 		</div>
			 		<div className="col">
				 		<button className="btn btn-primary btn-block" onClick={()=>this.oil()}>Oil</button>
				 	</div>
				 	<div className="col">
				 		<button className="btn btn-warning btn-block" onClick={()=>this.sleep()}>Sleep</button>
				 	</div>
				</nav>
			</div>
		)
	}
}