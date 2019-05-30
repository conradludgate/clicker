import React from 'react';
import money_bag from './images/money-bag.png';

import './Clicker.css';

function Clicker(props) {


	return (
		<img className="clicker" onClick={() => {
			props.earnCash(props.perClick);
		}} src={money_bag} />
	);
}

export default Clicker;