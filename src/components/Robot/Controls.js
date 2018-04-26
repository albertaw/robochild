import React from 'react';

export default function Controls(props) {
	return (
		<div>
	 		<div className="row justify-content-center">
	 			<button className="btn btn-danger btn-lg btn-reset" onClick={props.reset}>New Bot</button>
		 	</div>
			<nav className="navbar fixed-bottom navbar-dark bg-dark">
			  <div className="col">
		 			<button className="btn btn-success btn-block" onClick={props.charge}>charge</button>
		 		</div>
		 		<div className="col">
			 		<button className="btn btn-primary btn-block" onClick={props.oil}>Oil</button>
			 	</div>
			 	<div className="col">
			 		<button className="btn btn-warning btn-block" onClick={props.sleep}>Sleep</button>
			 	</div>
			</nav>
		</div>
	)
}