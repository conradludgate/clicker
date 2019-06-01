import { useRef, useEffect, useState } from 'react';

function useInterval(callback, delay) {
  
	const savedCallback = useRef();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null && delay !== undefined) {
			let id = setInterval(tick, delay);
			return () => { clearInterval(id) }
		}
	}, [delay]);
}

const useStateWithLocalStorage = (key, def, fr= v => v, to= v => v) => {
	const store = localStorage.getItem(key);
	const [value, setValue] = useState(!!store ? fr(store) : def);

	useEffect(() => {
		localStorage.setItem(key, to(value));
	}, [value, key, to]);

	return [value, setValue];
};

export { useInterval, useStateWithLocalStorage };