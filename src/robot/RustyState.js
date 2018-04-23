import React from 'react';

export default class RustyState extends React.Component {
	feed(robot) {
		const currentState = robot.transitions[robot.state.currentState][robot.inputs.FEED];
		//decrement food
		const foodLevel = robot.state.foodLevel === 0 ? 0 : robot.state.foodLevel -= 1;  
		robot.setState({
			currentState: currentState,
			foodLevel: foodLevel
		});
	}

	oil(robot) {
		const currentState = robot.transitions[robot.state.currentState][robot.inputs.OIL];
		//decrement oil
		const oilLevel = robot.state.oilLevel === 0 ? 0 : robot.state.oilLevel -= 1;
		robot.setState({
			currentState: currentState,
			oilLevel: oilLevel
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