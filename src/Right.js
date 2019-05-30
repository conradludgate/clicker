import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

import Building from './Building.js';

function Right({cash, nbuildings, buyBuilding}) {
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
		{nbuildings.map((n, i) => (
		<Grid item xs={2} key={i}>
			<Building index={i} numOwned={n} cash={cash} buyBuilding={buyBuilding} buyN={Math.pow(10, pow) * sell} />
		</Grid>
		))}
	</Grid>
	);
}

export default Right;