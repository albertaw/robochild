import React from 'react';

export default class DeadState extends React.Component{
	feed(robot) {
		
	}

	oil(robot) {
		
	}

	sleep(robot) {
		
	}

	reset(robot) {
		const currentState = robot.transitions[robot.state.currentState][robot.inputs.RESET];
		robot.setState({
			currentState: currentState
		});
	}

}