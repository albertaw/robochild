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
		this.inputs = {'FEED': 0, 'OIL': 1, 'SLEEP': 2, 'ON_HUNGRY': 3, 'ON_RUSTY': 4, 'RESET': 5};
		this.transitions = [
		//feed              	oil              sleep            onHungry          onRusty           reset
			[this.names.IDLE,	this.names.IDLE,	this.names.IDLE, 	this.names.HUNGRY,this.names.RUSTY,	this.names.IDLE],
			[this.names.IDLE, this.names.HUNGRY,this.names.HUNGRY,this.names.HUNGRY,this.names.DEAD,	this.names.IDLE], 
			[this.names.RUSTY,this.names.IDLE,	this.names.RUSTY,	this.names.DEAD,	this.names.RUSTY,	this.names.IDLE],
			[this.names.DEAD,	this.names.DEAD,	this.names.DEAD,	this.names.DEAD,	this.names.DEAD,	this.names.IDLE]
		];

		this.interval = null;

		this.state = {
			currentState: this.names.IDLE,
			hungerLevel: 100,
			rustLevel: 100,
			foodLevel: 100,
			oilLevel: 100
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

	update() {
		const hungerLevel = this.state.hungerLevel === 0 ? 0 : this.state.hungerLevel - 1;
		const rustLevel = this.state.rustLevel === 0 ? 0 : this.state.rustLevel - 1;
		this.setState({
			//decrement hunger
			hungerLevel: hungerLevel,
			//decrement rust
			rustLevel: rustLevel
		});

		if (this.state.hungerLevel < 75) {
			this.onHungry();
		}

		if (this.state.rustLevel < 50) {
			this.onRusty();
		}

		if (this.state.currentState === this.names.DEAD) {
			clearInterval(this.interval);
		}
	}

	componentDidMount() {
		this.interval = setInterval(()=>
			this.update(), 1000 * 2);
	}

	componentWillMount() {
		clearInterval(this.interval);
	}

	render() {
		 return (
		 	<div className="container">
		 		<section>
			 		<div className="row">
				 		<p className="col-3">Oil</p>
				 		<div className="col-9">
					 		<div className="progress">
							  <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: this.state.oilLevel + '%'}}>{this.state.oilLevel + '%'}</div>
							</div>
						</div>
					</div>
					<div className="row">
				 		<p className="col-3">Electricity</p>
				 		<div className="col-9">
					 		<div className="progress">
							  <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: this.state.foodLevel + '%'}}>{this.state.foodLevel + '%'}</div>
							</div>
						</div>
					</div>
				</section>

				<div className="row">
					<p className="col">Hunger Level: {this.state.hungerLevel}</p>
					<p className="col">Rust Level: {this.state.rustLevel}</p>
		 			<p className="col">State: {Object.keys(this.names)[this.state.currentState]}</p>
		 		</div>

			 
		 		<section>
			 		<div className="row justify-content-center">
			 			<div className="v-align">
			 				<div className={(this.state.currentState === this.names.DEAD) ? "robot-body robot-dead" : "robot-body"} 
			 				style={{width: this.state.hungerLevel * 2 + 'px', height: this.state.hungerLevel * 2 + 'px'}}>
			 				</div>
			 			</div>
			 		</div>
		 		</section>
		 		{this.state.currentState === this.names.DEAD ?
		 		<div className="row justify-content-center">
		 			<button className="btn btn-danger btn-lg btn-reset" onClick={()=>this.reset()}>New Bot</button>
			 	</div>
		 		: null}
		 		<nav class="navbar fixed-bottom navbar-dark bg-dark">
				  <div className="col">
			 			<button className="btn btn-success btn-block" onClick={()=>this.feed()}>Feed</button>
			 		</div>
			 		<div className="col">
				 		<button className="btn btn-warning btn-block" onClick={()=>this.oil()}>Oil</button>
				 	</div>
				 	<div className="col">
				 		<button className="btn btn-primary btn-block" onClick={()=>this.sleep()}>Sleep</button>
				 	</div>
				</nav>
			</div>
		)
	}
}