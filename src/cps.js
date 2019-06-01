import { useState, useEffect, useRef } from 'react';
import { useInterval, useStateWithLocalStorage } from './hooks.js';

import format_number from './number.js';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const moment = require('moment');

function useCps(earnCash, updateHz, offlineEaringRate) {
	const [cps, setCps] = useState(0);
	
	const [lastUpdate, setLastUpdate] = useStateWithLocalStorage("last_update", Date.now(), parseInt);
	const [cpsLoaded, setCpsLoaded] = useState(false);

	// Stops the compiler warnings, not sure if this is how I want to do this though
	// I saw useCallback being recommended
	// Will experiment
	const state = useRef({lastUpdate, setLastUpdate, earnCash, cps, offlineEaringRate});
	useEffect(() => {
		state.current.cps = cps
	}, [cps]);

	useEffect(() => {
		// Earn money offline

		if (cpsLoaded) {
			state.current.setLastUpdate(Date.now())
			let time = Date.now() - state.current.lastUpdate;
			let x = state.current.cps * time / 1000 * state.current.offlineEaringRate;
			state.current.earnCash(x);

			if (x > 0 && time > 0) {
				toast.info("Earned " + format_number(x, "$") + 
					" since you were offline for " + moment.duration(time).humanize(), {
						position: toast.POSITION.BOTTOM_CENTER,
						className: 'notification',
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
					});
			}
		}
	}, [cpsLoaded, state]);

	// There were some interesting bugs here
	// Race conditions, timeouts being incorrect, etc
	// From what I can tell, this is now a lot more accurate/reliable
	useInterval(() => {
		setLastUpdate(Date.now());
		earnCash(cps * (Date.now() - lastUpdate) / 1000);
	}, 1000 / updateHz);

	return [cps, setCps, setCpsLoaded]
} 

export default useCps;