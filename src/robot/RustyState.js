import React from 'react';

export default class RustyState extends React.Component {
	charge(robot) {
		const currentState = robot.transitions[robot.state.currentState][robot.inputs.CHARGE];
		//decrement electricity
		const electricity = robot.state.electricity === 0 ? 0 : robot.state.electricity - 1; 
		//increment energy  
		const energy = robot.state.energy === 100 ? 100 : robot.state.energy + 1;
		robot.setState({
			currentState: currentState,
			electricity: electricity,
			energy: energy
		});
	}

	oil(robot) {
		const currentState = robot.transitions[robot.state.currentState][robot.inputs.OIL];
		//decrement oil
		const oil = robot.state.oil === 0 ? 0 : robot.state.oil - 1;
		//increment condition
		const condition = robot.state.condition === 100 ? 100 : robot.state.condition + 1;
		robot.setState({
			currentState: currentState,
			oil: oil,
			condition: condition
		});
	}

	sleep(robot) {
		
	}

	reset(robot) {
		const currentState = robot.transitions[robot.state.currentState][robot.inputs.RESET];
		robot.setState({
			currentState: currentState,
			energy: 100,
			condition: 100,
			electricity: 100,
			oil: 100
		});
		
		robot.interval = setInterval(()=>
			robot.update(), 1000 * 2);
	}
}