import React from 'react';

export default function Resources() {
	return (
		<section>
	 		<div className="row">
		 		<p className="col-3">Oil</p>
		 		<div className="col-9">
			 		<div className="progress">
					  <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: this.state.oilLevel + '%'}}>{this.state.oilLevel + '%'}</div>
					</div>
				</div>
			</div>
			<div className="row">
		 		<p className="col-3">Electricity</p>
		 		<div className="col-9">
			 		<div className="progress">
					  <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: this.state.foodLevel + '%'}}>{this.state.foodLevel + '%'}</div>
					</div>
				</div>
			</div>
		</section>
	)
}

				