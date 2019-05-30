import React from 'react';
import format_number from './number.js';

import './Building.css';

const buildings = [
	{name: "Printer", baseCost: 15, cps: 0.1},
	{name: "Press", baseCost: 200, cps: 10},
]

function Building({
		index,
		numOwned,
		cash,
		buyBuilding,
		buyN,
	}) {


	if (-buyN > numOwned) {
		buyN = -numOwned
	}

	let price = buyN >= 0 ? buildings[index].baseCost * Math.pow(1.15, numOwned)        * (Math.pow(1.15,  buyN) - 1) / 0.15 :
						   -buildings[index].baseCost * Math.pow(1.15, numOwned + buyN) * (Math.pow(1.15, -buyN) - 1) / 0.15 / 4;


	if (buyN === 0) {
		return (<div className="building-cant-afford">
			<span className="name">{buildings[index].name}</span><br />
			<span className="owned">0</span><br />
			<span className="price">$0</span><br />
		</div>);
	} else if (buyN < 0) {
		return (<div className="building" onClick={() => buyBuilding(index, price, buyN)}>
			<span className="name">{buildings[index].name}</span><br />
			<span className="owned">{numOwned}</span><br />
			<span className="refund">{format_number(Math.round(-price), "$")}</span><br />
		</div>);
	}

	if (cash >= price) {
		return (
			<div className="building" onClick={() => buyBuilding(index, price, buyN)}>
				<span className="name">{buildings[index].name}</span><br />
				<span className="owned">{numOwned}</span><br />
				<span className="price">{format_number(Math.round(price), "$")}</span><br />
			</div>
		);
	} else {
		return (
			<div className="building-cant-afford">
				<span className="name">{buildings[index].name}</span><br />
				<span className="owned">{numOwned}</span><br />
				<span className="price">{format_number(Math.round(price), "$")}</span><br />
			</div>
		);
	}
}

export default Building;
export { buildings };