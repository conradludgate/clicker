import React, { useEffect } from 'react';
import { useStateWithLocalStorage } from './hooks.js';

import format_number from './number.js';

import './Building.css';

const buildings = [
	{name: "Printer", baseCost: 15, cps: 0.1},
	{name: "Press", baseCost: 200, cps: 10},
]

function useBuildings(reset, earnCash, spendCash) {
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

	useEffect(() => {
		if (reset) {
			setNBuildings(new Array(buildings.length).fill(0));
		}
	}, [reset, setNBuildings]);

	return [nbuildings, buyBuilding];
}

function calcPrice(index, numOwned, buyN) {
	if (-buyN > numOwned) {
		buyN = -numOwned
	}

	const price = buyN >= 0 ? buildings[index].baseCost * Math.pow(1.15, numOwned)        * (Math.pow(1.15,  buyN) - 1) / 0.15 :
							 -buildings[index].baseCost * Math.pow(1.15, numOwned + buyN) * (Math.pow(1.15, -buyN) - 1) / 0.15 / 4;

	return [price, buyN];
}

function Building({
		index,
		numOwned,
		price,
		canAfford,
		buyBuilding,
		buyN,
	}) {

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

	if (canAfford) {
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
export { calcPrice, buildings, useBuildings };