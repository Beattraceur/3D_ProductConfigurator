import React, { useEffect, useState } from 'react';
import jsonData from '../data/productConfig.json';
import {
	useConfigDispatchContext,
	useProductDataContext,
} from './ConfigHandler.jsx';
import { Link } from 'wouter';
import { getFormattedPrice } from '../hooks/getFormatedPrice.js';
import Calculator from './Calculator.jsx';

export default function ConfigMenu() {
	const [productData, setProductData, priceData, setPriceData] =
		useProductDataContext();
	const [config, configDispatch, setSharingURL, clipboardNote] =
		useConfigDispatchContext();

	const [subMenuIndex, setSubMenuIndex] = useState(0);
	const [currentOption, setCurrentOption] = useState(
		getInitialOptions(productData),
	);

	return (
		<div className="config-menu">
			<div className="display-total">
				<Calculator display="total" />
			</div>
			{/* MainMenu */}
			<div className="main-menu">
				<button
					className="reset-config-button"
					onClick={() => configDispatch({ action: 'reset' })}
				>
					Reset all
				</button>
				{productData.configPages.map((page, index) => (
					<button
						className="config-menu-button"
						disabled={subMenuIndex === index}
						key={page}
						onClick={() => setSubMenuIndex(index)}
					>
						{page}
					</button>
				))}
				<button
					className="sharing-config-button"
					onClick={() => setSharingURL(true)}
				>
					{clipboardNote ? 'Copied to clipboard!' : 'Share config link'}
				</button>
				<Link href="/checkout">
					<button className="checkout-config-button">Checkout</button>
				</Link>
			</div>

			{/* SubMenu */}
			<div className="sub-menu">
				{productData[productData.subMenu[subMenuIndex]].map((option) => (
					<button
						className="config-menu-button"
						disabled={currentOption[subMenuIndex] === option}
						key={option}
						onClick={() => {
							const newOptArr = [...currentOption];
							newOptArr[subMenuIndex] = option;
							setCurrentOption(newOptArr);
						}}
					>
						{option}
					</button>
				))}
			</div>

			<div className="sub-menu">
				{/* <p>{currentOption[subMenuIndex]}</p> */}
				<div className="config-item-container">
					{productData[currentOption[subMenuIndex]].map((item, index) => (
						<label
							key={item}
							className={`config-item-label${
								config[currentOption[subMenuIndex]] === index ? '-active' : ''
							}`}
						>
							<input
								className="checkbox"
								type="checkbox"
								checked={config[currentOption[subMenuIndex]] === index}
								onChange={({ target }) =>
									configDispatch({
										currentOption: currentOption[subMenuIndex],
										index,
										item,
										action: `${target.checked}`,
									})
								}
							></input>
							{productData.colorValues[item] !== undefined && (
								<span
									className="color-dip"
									style={{ backgroundColor: productData.colorValues[item] }}
								></span>
							)}
							<span className="config-item-text-container">
								<span className="config-item-price">
									+
									{getFormattedPrice(
										priceData[currentOption[subMenuIndex]][index],
									)}
								</span>
								<span className="config-item-name">{item}</span>
							</span>
						</label>
					))}
				</div>
			</div>
		</div>
	);
}

function getInitialOptions(productData) {
	// console.log('productData', productData);
	const initialOptions = [];
	productData.subMenu.forEach((subMenu) => {
		initialOptions.push(productData[subMenu][0]);
	});

	return initialOptions;
}
