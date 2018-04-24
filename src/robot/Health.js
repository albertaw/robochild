import React from 'react';

export default function Health() {
	return (
		<section>
 		<div className="row">
	 		<p className="col-3">Hunger Level</p>
	 		<div className="col-9">
		 		<div className="progress">
				  <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{width: this.state.hungerLevel + '%'}}>{this.state.hungerLevel + '%'}</div>
				</div>
			</div>
		</div>
		<div className="row">
	 		<p className="col-3">Rust Level</p>
	 		<div className="col-9">
		 		<div className="progress">
				  <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{width: this.state.rustLevel + '%'}}>{this.state.rustLevel + '%'}</div>
				</div>
			</div>
		</div>
	</section>
	)
}