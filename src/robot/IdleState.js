import React from 'react';

export default class IdleState extends React.Component {
	charge(robot) {
		//decrement electricity
		const electricity = (robot.state.electricity === 0) ? 0 : robot.state.electricity - 1; 
		//increment energy  
		let energy;
		if (robot.state.electricity === 0) {
			energy = robot.state.energy;  
		} else if (robot.state.energy === 100) {
			energy = 100;
		} else {
			energy = robot.state.energy + 1;
		}

		let currentState;
		if (robot.state.energy < 50) {
			currentState = robot.state.currentState;
		} else {
			currentState = robot.transitions[robot.state.currentState][robot.inputs.CHARGE];
		}

		robot.setState({
			currentState: currentState,
			electricity: electricity,
			energy: energy
		});
	}

	oil(robot) {
		//decrement oil
		const oil = (robot.state.oil === 0) ? 0 : robot.state.oil - 1;
		//increment condition
		let condition; 
		if (robot.state.oil === 0) {
			condition = robot.state.condition;
		} else if (robot.state.condition === 100) {
			condition = 100; 
		} else {
			condition = robot.state.condition + 1;
		}
		
		let currentState;
		if (robot.state.condition < 50) {
			currentState = robot.state.currentState;
		} else {
			currentState = robot.transitions[robot.state.currentState][robot.inputs.OIL];
		}
		
		robot.setState({
			currentState: currentState,
			oil: oil,
			condition: condition
		});
	}

	sleep(robot) {
		clearInterval(robot.energyInterval);
		clearInterval(robot.conditionInterval);

		setTimeout(()=> {
			robot.energyInterval = setInterval(()=> robot.updateEnergy(), 1000 * 1);

			robot.conditionInterval = setInterval(()=> robot.updateCondition(), 1000 * 2);
		}, 1000 * 60)
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
		
		robot.energyInterval = setInterval(()=> robot.updateEnergy(), 1000 * 1);

		robot.conditionInterval = setInterval(()=> robot.updateCondition(), 1000 * 2);
	}
}