import React, { useEffect, useState } from 'react';
import { useProductDataContext } from './ConfigHandler.jsx';
import jsonData from '../data/productConfig.json';
export default function DataLoader() {
	const [productData, setProductData] = useProductDataContext();
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		// Simulating asynchronous data fetching with setTimeout
		setTimeout(() => {
			setProductData(jsonData);
			setIsLoading(false);
		}, 1000); // Change the delay according to your preference
	}, []);

	if (isLoading) {
		return <div>Loading from Database...</div>;
	}

	return <div>Loading Complete</div>;
}
