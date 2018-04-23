import React from 'react';

export default class RustyState extends React.Component {
	feed(robot) {
		const currentState = robot.transitions[robot.state.currentState][robot.inputs.FEED];
		robot.setState({
			currentState: currentState
		});
	}

	oil(robot) {
		const currentState = robot.transitions[robot.state.currentState][robot.inputs.OIL];
		robot.setState({
			currentState: currentState
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