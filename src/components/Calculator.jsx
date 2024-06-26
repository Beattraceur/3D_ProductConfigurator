import React, { useEffect, useState } from 'react';
import {
	useConfigDispatchContext,
	useProductDataContext,
} from './ConfigHandler.jsx';

import { getFormattedPrice } from '../hooks/getFormatedPrice.js';
import DataLoader from './DataLoader.jsx';
//function that returns the actual config list and the total price depending on the settings: display
export default function Calculator({ display }) {
	//getting all the needed context data
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
//function that calculates the total price
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
//function that returns the actual config list
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
		<table className="config-table">
			<thead>
				<tr>
					<td colSpan="3" className="table-header"></td>
				</tr>
				<tr>
					<th>Product:</th>
					<th>type:</th>
					<th>individual price:</th>
				</tr>
			</thead>
			<tbody>
				{configList.map((item) => (
					<tr key={item}>
						<td>{item[0]}</td>
						<td>{item[1]}</td>
						<td className="price-display">{item[2]}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
