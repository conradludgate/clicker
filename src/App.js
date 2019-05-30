import React, { useState, useEffect } from 'react';
import useInterval from './useInterval.js';

import Grid from '@material-ui/core/Grid';

import format_number from './number.js';

import Left from './Left.js';
import Right from './Right.js';

import './App.css';

function App() {
	const [cash, setCash] = useState(0);
	const [totalCash, setTotalCash] = useState(0);
	const [totalSpent, setTotalSpent] = useState(0);

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



	/// Earn cash per second
	const [cps, setCps] = useState(0);
	const [cpsUpdate, setCpsUpdate] = useState(Date.now());

	// There were some interesting bugs here
	// Race conditions, timeouts being incorrect, etc
	// From what I can tell, this is now a lot more accurate/reliable
	const earnCashInterval = () => {
		setCpsUpdate(Date.now())
		earnCash(cps * (Date.now() - cpsUpdate) / 1000);
	}

	const updateHz = 10
	useInterval(earnCashInterval, 1000 / updateHz);
	


	// Update title to include current cash
	useEffect(() => {
		document.title = `Clicker | ${format_number(cash, "$")}`;
	}, [cash]);



	// Create some buildings
	const [buildings, setBuildings] = useState([
		{name: "Printer", numOwned: 0, cps: 0.1, baseCost: 15},
		{name: "Press", numOwned: 0, cps: 10, baseCost: 200},
	])

	// Buy building functionality
	const buyBuilding = (index, price, num=1) => {
		if (spendCash(price)) {
			setBuildings(b => {
				b[index].numOwned += num

				return b
			})
		}
	}

	// Update cps when a building is bought
	useEffect(() => {
		setCps(buildings.reduce((acc, b) => {
			return acc + b.numOwned * b.cps 
		}, 0))
	}, [buildings])

	return (
	<div className="App">
		<Grid container spacing={2} direction="row" alignItems="flex-start" justify="flex-start">

			<Left cash={cash} cps={cps} earnCash={earnCash} />

			<Grid item container xs={3}>
			</Grid>

			<Right cash={cash} buildings={buildings} buyBuilding={buyBuilding} />

		</Grid>
	</div>
	);
}

export default App;
