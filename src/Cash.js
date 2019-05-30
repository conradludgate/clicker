import React from 'react';
import format_number from './number.js';

import './Cash.css';

function Cash({cash}) {
	return (
		<span className="cash">{format_number(cash, "$")}</span>
	);
}

export default Cash;