import React, { useState, useEffect, useRef } from 'react';
import { useStateWithLocalStorage } from './hooks.js';

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import Building, { buildings } from './Building.js';

function Right({cash, earnCash, spendCash, setCps, setCpsLoaded, reset}) {
	const [pow, setPow] = useState(0);
	const [sell, setSell] = useState(1); // 1 is buy, -1 is sell

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

	const setCpsRef = useRef(setCps);

	useEffect(() => {
		setCpsRef.current(nbuildings.reduce((acc, b, i) => {
			return acc + b * buildings[i].cps; 
		}, 0));
		setCpsLoaded(true);
	}, [nbuildings, setCpsLoaded]);

	useEffect(() => {
		if (reset) {
			setNBuildings(new Array(buildings.length).fill(0));
		}
	}, [reset, setNBuildings])

	return (
	<Grid item xs container spacing={2} direction="column">
		<Grid item xs container spacing={0} direction="row">
			{sell === -1 && <Button color="secondary" className="sell" onClick={() => {setSell(sell * -1)}}>Sell</Button>}
			{sell ===  1 && <Button color="primary"   className="buy"  onClick={() => {setSell(sell * -1)}}>Buy </Button>}
			<Tabs value={pow} onChange={(event, newValue) => {setPow(newValue)}}>
				<Tab label="1" />
				<Tab label="10" />
				<Tab label="100" />
			</Tabs>

		</Grid>
		{nbuildings.map((n, i) => (
		<Grid item xs={2} key={i}>
			<Building index={i} numOwned={n} cash={cash} buyBuilding={buyBuilding} buyN={Math.pow(10, pow) * sell} />
		</Grid>
		))}
	</Grid>
	);
}

export default Right;