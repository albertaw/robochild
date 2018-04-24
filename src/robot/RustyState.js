import React from 'react';

export default class RustyState extends React.Component {
	feed(robot) {
		const currentState = robot.transitions[robot.state.currentState][robot.inputs.FEED];
		//decrement food
		const foodLevel = robot.state.foodLevel === 0 ? 0 : robot.state.foodLevel -= 1; 
		//increment hunger  
		const hungerLevel = robot.state.hungerLevel === 100 ? 100 : robot.state.hungerLevel += 1;
		robot.setState({
			currentState: currentState,
			foodLevel: foodLevel,
			hungerLevel: hungerLevel
		});
	}

	oil(robot) {
		const currentState = robot.transitions[robot.state.currentState][robot.inputs.OIL];
		//decrement oil
		const oilLevel = robot.state.oilLevel === 0 ? 0 : robot.state.oilLevel -= 1;
		//increment rust
		const rustLevel = robot.state.rustLevel === 100 ? 100 : robot.state.rustLevel += 1;
		robot.setState({
			currentState: currentState,
			oilLevel: oilLevel,
			rustLevel: rustLevel
		});
	}

	sleep(robot) {
		const currentState = robot.transitions[robot.state.currentState][robot.inputs.SLEEP];
		robot.setState({
			currentState: currentState
		});
	}

	reset(robot) {
		const currentState = robot.transitions[robot.state.currentState][robot.inputs.RESET];
		robot.setState({
			currentState: currentState
		});
	}
}