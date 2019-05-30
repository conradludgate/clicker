import React from 'react';

import Grid from '@material-ui/core/Grid';

import Clicker from './Clicker.js';

import format_number from './number.js';

function Left({cash, cps, earnCash}) {
	return (
	<Grid item xs container spacing={2} direction="column">
		<Grid item>
			<span className="cash">{format_number(cash, "$")}</span>
		</Grid>
		<Grid item>
			<span className="cps">{format_number(cps, "$", 1)} per second</span>
		</Grid>
		<Grid item>
			<Clicker perClick={1} earnCash={earnCash} />
		</Grid>
	</Grid>
	);
}

export default Left;