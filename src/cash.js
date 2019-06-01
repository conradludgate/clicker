import { useEffect } from 'react';
import { useStateWithLocalStorage } from './hooks.js';

function useCash(reset) {
	const [cash, setCash] = useStateWithLocalStorage("cash", 0, parseInt);
	const [totalCash, setTotalCash] = useStateWithLocalStorage("total_cash", 0, parseInt);
	const [totalSpent, setTotalSpent] = useStateWithLocalStorage("total_spent", 0, parseInt);

	const earnCash = (amount = 0) => {
		setCash(c => c + amount);
		setTotalCash(c => c + amount);
	};

	const spendCash = (amount) => {
		if (cash >= amount) {
			setCash(c => c - amount);
			setTotalSpent(c => c + amount);
			return true
		}
		return false
	};

	useEffect(() => {
		if (reset) {
			setCash(0); 
			setTotalCash(0);
			setTotalSpent(0);
		}
	}, [reset, setCash, setTotalCash, setTotalSpent])

	return [cash, totalCash, totalSpent, earnCash, spendCash];
}

export default useCash;