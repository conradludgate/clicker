import React from 'react';

import format_number from './number.js';

import Grid from '@material-ui/core/Grid';

function Center({cash, totalCash, totalSpent, nbuildings, setReset}) {
	const data = [
		{name: "Current Cash", value: format_number(cash)},
		{name: "Total Cash Earned", value: format_number(totalCash)},
		{name: "Total Cash Spent", value: format_number(totalSpent)},
		{name: "Number of buildings", value: nbuildings.reduce((acc, n) => acc + n, 0)},
	]

	const buttons = [
		{name: "Reset", onClick: setReset}, // Have popup to say "Are you sure?"
		{name: "Export", onClick: () => console.log("TODO")},
		{name: "Import", onClick: () => console.log("TODO")},
	]

	return (
		<Grid item xs container>
			<div className="stats">
				{data.map((d, i) => (
					<div key={i} className="stat-row">
						<span className="stat-name">{d.name}:</span><span className="stat-value">{d.value}</span>
					</div>
				))}
			</div>
			<div className="buttons">
				{buttons.map((b, i) => (
					<div key={i} className="button-row">
						<button onClick={b.onClick}>{b.name}</button>
					</div>
				))}
			</div>
		</Grid>
	);
}

export default Center;