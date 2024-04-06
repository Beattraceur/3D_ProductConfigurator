import React, { useEffect, useState } from 'react';
import { useConfigDispatchContext } from './ConfigHandler.jsx';
import jsonPriceList from '../data/p8priceList.json';
import jsonData from '../data/productConfig.json';
import { getFormattedPrice } from '../hooks/getFormatedPrice.js';

export default function Calculator({ display }) {
	const [config] = useConfigDispatchContext();
	const [priceData, setPriceData] = useState([]);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulating asynchronous data fetching with setTimeout
		setTimeout(() => {
			setPriceData(jsonPriceList);
			setData(jsonData);
			setIsLoading(false);
		}, 1000); // Change the delay according to your preference
	}, []);

	if (isLoading) {
		return <p>Total...</p>;
	}

	return (
		<div>
			{display === 'all' || display === 'list' ? (
				<ConfigList priceData={priceData} data={data} config={config} />
			) : (
				''
			)}
			{display === 'all' || display === 'total' ? (
				<TotalPrice priceData={priceData} config={config} />
			) : (
				''
			)}
		</div>
	);
}

function TotalPrice({ priceData, config }) {
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		let newTotalPrice = Number(priceData.basePrice);

		Object.keys(config).forEach((key) => {
			const index = config[key];
			const prices = priceData[key];
			newTotalPrice += Number(prices[index]);
		});

		setTotalPrice(getFormattedPrice(newTotalPrice, ' €'));
	}, [priceData, config]);
	return <p>Total: {totalPrice}</p>;
}

function ConfigList({ priceData, config, data }) {
	const [configList, setConfigList] = useState([]);
	useEffect(() => {
		const tempConfigList = [
			['P8-Sailboat', 'basic', getFormattedPrice(priceData.basePrice, ' €')],
		];
		Object.keys(config).forEach((key) => {
			const index = config[key];
			const prices = priceData[key];
			const itemName = data[key][index];
			tempConfigList.push([
				key,
				itemName,
				getFormattedPrice(Number(prices[index]), ' €'),
			]);
		});

		setConfigList(tempConfigList);
	}, [priceData, config, data]);
	return (
		<table>
			<thead>
				<tr>
					<td colSpan="4">current configuration:</td>
				</tr>
			</thead>
			<tbody>
				{configList.map((item) => (
					<tr key={item}>
						<td>{item[0]}</td>
						<td>{item[1]}</td>
						<td>Price = </td>
						<td>{item[2]}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
