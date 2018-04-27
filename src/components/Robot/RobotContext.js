import IdleState from './State/IdleState';
import HungryState from './State/HungryState';
import RustyState from './State/RustyState';
import DeadState from './State/DeadState';

export default class RobotContext {
	constructor() {
		this.names = {'IDLE': 0, 'HUNGRY': 1, 'RUSTY': 2, 'DEAD': 3};
		this.states = [new IdleState(), new HungryState(), new RustyState(), new DeadState()];
		//context
		this.inputs = {'CHARGE': 0, 'OIL': 1, 'SLEEP': 2, 'ON_HUNGRY': 3, 'ON_RUSTY': 4, 'RESET': 5};
		//context
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
		//context
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
}