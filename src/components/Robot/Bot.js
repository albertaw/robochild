import React from 'react';

export default function Bot(props) {
	return (
		<section>
	 		<div className="row justify-content-center">
	 			<div className="v-align">
	 				<div className={(props.currentState === props.deadState) ? "robot-body robot-dead" : "robot-body"}> 
	 				
	 				</div>
	 			</div>
	 		</div>
 		</section>
	)
}