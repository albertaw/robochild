import React from 'react';

export default function Messages(props) {
	return (
		<div className="row">
			<p className="col">Electricity: {props.electricity}</p>
			<p className="col">Oil: {props.oil}</p>
 			<p className="col">State: {Object.keys(props.names)[props.currentState]}</p>
 		</div>
	)
}