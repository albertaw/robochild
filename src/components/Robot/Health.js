import React from 'react';

export default function Health(props) {
	return (
		<section>
	 		<div className="row">
		 		<p className="col-3">Energy</p>
		 		<div className="col-9">
			 		<div className="progress">
					  <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{width: props.energy + '%'}}>{props.energy + '%'}</div>
					</div>
				</div>
			</div>
			<div className="row">
		 		<p className="col-3">Condition</p>
		 		<div className="col-9">
			 		<div className="progress">
					  <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: props.condition + '%'}}>{props.condition + '%'}</div>
					</div>
				</div>
			</div>
		</section>
	)
}

				