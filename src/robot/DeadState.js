import React from 'react';

export default class DeadState extends React.Component{
	charge(robot) {
		
	}

	oil(robot) {
		
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