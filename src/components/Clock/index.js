import React from 'react';

export default class Clock{
	constructor() {
		this.energyInterval = null;
		this.conditionInterval = null;
		this.energyFrameRate = 1000 * 2;
		this.conditionFrameRate = 1000 * 3;
	}

	update(context) {
		this.energyInterval = setInterval(()=>context.updateEnergy(), this.energyFrameRate);

		this.conditionInterval = setInterval(()=>context.updateCondition(), this.conditionFrameRate);
	}
	
	cleanup() {
		clearInterval(this.energyInterval);
		clearInterval(this.conditionInterval);
	}

}



