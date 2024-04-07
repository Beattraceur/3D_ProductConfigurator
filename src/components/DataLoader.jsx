import React, { useEffect, useState } from 'react';
import { useProductDataContext } from './ConfigHandler.jsx';
import jsonPriceList from '../data/p8priceList.json';
import jsonData from '../data/productConfig.json';
export default function DataLoader() {
	const [productData, setProductData, priceData, setPriceData] =
		useProductDataContext();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		// Simulating asynchronous data fetching with setTimeout
		setTimeout(() => {
			setProductData(jsonData);
			setPriceData(jsonPriceList);
			setIsLoading(false);
		}, 1000); // Delay of simulated data fetching in milliseconds
	}, []);

	if (isLoading) {
		return <div>Loading from Database...</div>;
	}

	return <div>Loading Complete</div>;
}
