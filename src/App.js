import React, { useEffect, useState } from 'react';

import useCash from './cash.js';
import useCps from './cps.js';

import Grid from '@material-ui/core/Grid';

import format_number from './number.js';

import Left from './Left.js';
import Right from './Right.js';

import './App.css';

// import moment from 'moment';

import { toast, ToastContainer } from 'react-toastify';

// Call it once in your app. At the root of your app is the best place
toast.configure();

const moment = require('moment');
moment().format();

const updateHz = 10;
const offlineEaringRate = 0.25;

function App() {
	const [reset, setReset] = useState(false);
	const [cash, totalCash, totalSpent, earnCash, spendCash] = useCash(reset);

	// Update title to include current cash
	useEffect(() => {
		document.title = `Clicker | ${format_number(cash, "$")}`;
	}, [cash]);

	/// Earn cash per second
	const [cps, setCps, setCpsLoaded] = useCps(earnCash, updateHz, offlineEaringRate)

	return (
	<div className="App">
		<Grid container spacing={2} direction="row" alignItems="flex-start" justify="flex-start">

			<Left cash={cash} cps={cps} earnCash={earnCash} />

			{/*<Center setReset={setReset} cash={cash} totalCash={totalCash} totalSpent={totalSpent} />*/}

			<Grid item container xs={3}>
			</Grid>

			<Right cash={cash} earnCash={earnCash} spendCash={spendCash} setCps={setCps} setCpsLoaded={setCpsLoaded} reset={reset}/>

		</Grid>

		<ToastContainer
			className='toast-container'
			newestOnTop
			hideProgressBar
			closeOnClick
			position="bottom-center"
			draggable
		/>
	</div>
	);
}

export default App;
