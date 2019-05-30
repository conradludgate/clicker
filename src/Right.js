import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import Building from './Building.js';

import format_number from './number.js';

function Right({cash, buildings, buyBuilding}) {
	const [pow, setPow] = useState(0);
	const [sell, setSell] = useState(1); // 1 is buy, -1 is sell



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
		{buildings.map((b, i) => (
		<Grid item xs={2}>
			<Building index={i} key={i} name={b.name} baseCost={b.baseCost} numOwned={b.numOwned} cps={b.cps} cash={cash} buyBuilding={buyBuilding} buyN={Math.pow(10, pow) * sell} />
		</Grid>
		))}
	</Grid>
	);
}

export default Right;