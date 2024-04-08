import React, { useEffect, useState } from 'react';
import {
	useConfigDispatchContext,
	useProductDataContext,
} from './ConfigHandler.jsx';

import { getFormattedPrice } from '../hooks/getFormatedPrice.js';
import DataLoader from './DataLoader.jsx';

export default function Calculator({ display }) {
	const [productData, setProductData, priceData, setPriceData] =
		useProductDataContext();

	const [config] = useConfigDispatchContext();

	const [data, setData] = useState([]);

	if (productData === null) return <DataLoader />;

	return (
		<div>
			{display === 'all' || display === 'list' ? (
				<ConfigList
					priceData={priceData}
					productData={productData}
					config={config}
				/>
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
	return <p className="total">Total: {totalPrice}</p>;
}

function ConfigList({ priceData, config, productData }) {
	const [configList, setConfigList] = useState([]);
	useEffect(() => {
		const tempConfigList = [
			['P8-Sailboat', 'basic', getFormattedPrice(priceData.basePrice, ' €')],
		];
		Object.keys(config).forEach((key) => {
			const index = config[key];
			const prices = priceData[key];
			const itemName = productData[key][index];
			tempConfigList.push([
				key,
				itemName,
				getFormattedPrice(Number(prices[index]), ' €'),
			]);
		});

		setConfigList(tempConfigList);
	}, [priceData, config, productData]);
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
