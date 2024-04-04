import React, { useEffect, useState } from 'react';
import { useConfigDispatchContext } from './ConfigHandler.jsx';
import jsonPriceList from '../data/p8priceList.json';

export default function Calculator() {
	const [config, configDispatch] = useConfigDispatchContext();
	const [priceData, setPriceData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulating asynchronous data fetching with setTimeout
		setTimeout(() => {
			setPriceData(jsonPriceList);
			setIsLoading(false);
		}, 1000); // Change the delay according to your preference
	}, []);

	if (isLoading) {
		return <p>Total...</p>;
	}

	return (
		<div>
			<TotalPrice priceData={priceData} config={config} />
		</div>
	);
}

function TotalPrice({ priceData, config }) {
	const [totalPrice, setTotalPrice] = useState(0);
	Object.keys(config).forEach((key) => {
		console.log(key, config[key]);
		const index = config[key];
		const prices = priceData[key];
		console.log(prices[index]);
	});
	return <p>Total: {totalPrice}€</p>;
}
