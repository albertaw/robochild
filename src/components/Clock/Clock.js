import React from 'react';

export default class Countdown extends React.Component{
	constructor(props) {
		super(props);
		var days = 0,
		hours = 0,
		minutes = 0,
		seconds = 0,
		
		//Convert the date string into number of milliseconds, then divide 
		//by 1000 to get the number of seconds
		endDate = Date.parse(futureDate) / 1000,
		refreshRate = 1000,
		intervalID;
	}
	

	//private method
	function update () {
		var today = Date.parse(new Date()) / 1000;
		var diff = endDate - today;
		//var diff = -1;
		if (diff <= 0) {
			diff = 0;
			clearInterval(intervalID);
			console.log("end");
		}
		//find days left first: if seconds remaining is at least a day (86400s),
		if (diff >= 86400) {
			days = Math.floor(diff / 86400);
			//get the number of SECONDS left by subtracting the number of seconds in
			//days left from our difference
			//and update diff to use in the next calculation.
			diff -= (days * 86400);
			//console.log(days);
		}

		//find hours left: if seconds remaining equal at least 1 hour (3600s)
		if (diff >= 3600) {
			hours = Math.floor(diff / 3600);
			diff -= (hours * 3600);
			//console.log(hours);
		}

		//find minutes left: if seconds remaining equal at least 1 minute (60s)
		if (diff >= 60) {
			minutes = Math.floor(diff / 60);
			diff -= (minutes * 60);
			//console.log(minutes);
		}

		//seconds left will be whatever remains
		seconds = diff;
		//console.log(seconds);
		
		draw();
		//console.log(seconds);
	}
	
	
	//public method
	this.init = function () {
		
		intervalID = setInterval(function () { 
			update();
		}, refreshRate);

	};

	//TODO
	this.cleanup = function () {

	};
	
}



