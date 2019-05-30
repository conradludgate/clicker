import React, { useState, useEffect, useMemo } from 'react';
import { useInterval, useStateWithLocalStorage } from './hooks.js';

import Grid from '@material-ui/core/Grid';

import format_number from './number.js';

import Left from './Left.js';
import Right from './Right.js';

import { buildings } from './Building.js'

import './App.css';

// import moment from 'moment';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Call it once in your app. At the root of your app is the best place
toast.configure();

const updateHz = 10;
const savePeriod = 10;
const offlineEaringRate = 0.25;

function App() {
	const [cash, setCash] = useStateWithLocalStorage("cash", 0, parseInt);
	const [totalCash, setTotalCash] = useStateWithLocalStorage("total_cash", 0, parseInt);
	const [totalSpent, setTotalSpent] = useStateWithLocalStorage("total_spent", 0, parseInt);

	const earnCash = (amount = 0) => {
		setCash(c => c + amount);
		setTotalCash(c => c + amount);
	};

	const spendCash = (amount) => {
		if (cash >= amount) {
			setCash(c => c - amount);
			setTotalSpent(c => c + amount);
			return true
		}
		return false
	};

	// Update title to include current cash
	useEffect(() => {
		document.title = `Clicker | ${format_number(cash, "$")}`;
	}, [cash]);



	// Create some buildings
	const [nbuildings, setNBuildings] = useStateWithLocalStorage("buildings", new Array(buildings.length).fill(0), JSON.parse, JSON.stringify);

	// Buy building functionality
	const buyBuilding = (index, price, num=1) => {
		if (price < 0) {
			earnCash(-price);
			setNBuildings(b => {
				if (b[index] < num) { return b; }

				return [...b.slice(0, index), b[index] + num, ...b.slice(index+1)];
			});
		} if (spendCash(price)) {
			setNBuildings(b => {
				return [...b.slice(0, index), b[index] + num, ...b.slice(index+1)];
			});
		}
	}



	/// Earn cash per second
	const cps = useMemo(() => {
		return nbuildings.reduce((acc, b, i) => {
			return acc + b * buildings[i].cps; 
		}, 0)
	}, [nbuildings]);


	const [lastUpdate, setLastUpdate] = useStateWithLocalStorage("last_update", Date.now(), parseInt);
	useEffect(() => {
		console.log("boop")
		setLastUpdate(Date.now())
		let time = Date.now() - lastUpdate;
		let x = cps * time / 1000 * offlineEaringRate;
		earnCash(x);

		if (x > 0 && (Date.now() - lastUpdate) > 60000) {
			toast("Earned " + format_number(x, "$") + 
				" since you were offline " + 
				Math.round(time / 1000).toString() + 
				" seconds ago", {
					position: toast.POSITION.BOTTOM_CENTER,
					className: 'notification'
				});
		}
	}, [])

	// There were some interesting bugs here
	// Race conditions, timeouts being incorrect, etc
	// From what I can tell, this is now a lot more accurate/reliable
	useInterval(() => {
		setLastUpdate(Date.now())
		earnCash(cps * (Date.now() - lastUpdate) / 1000);
	}, 1000 / updateHz);

	// const save = () => {
	// 	console.log("save", totalSpent)
	// 	localStorage.setItem("cash", cash);
	// 	localStorage.setItem("total_cash", totalCash);
	// 	localStorage.setItem("total_spent", totalSpent);
	// 	localStorage.setItem("buildings", JSON.stringify(nbuildings));
	// }

	// // Save automatically every {savePeriod} seconds
	// useInterval(save, 1000 * savePeriod);

	return (
	<div className="App">
		<Grid container spacing={2} direction="row" alignItems="flex-start" justify="flex-start">

			<Left cash={cash} cps={cps} earnCash={earnCash} />

			<Grid item container xs={3}>
			</Grid>

			<Right cash={cash} nbuildings={nbuildings} buyBuilding={buyBuilding} />

		</Grid>
	</div>
	);
}

export default App;
