import React from 'react';
import ekgSrc from './ekg.mp3'; 
import flatlineSrc from './flatline.mp3';

export default function Audio(props) {
	return (
		<div>
			<audio ref={props.ekg} loop>
	 			<source src={ekgSrc} type="audio/mpeg"/>
	 		</audio>
	 		<audio ref={props.flatline}>
	 			<source src={flatlineSrc} type="audio/mpeg"/>
	 		</audio>
	 	</div>
	)
}