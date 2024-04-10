import React, { useEffect, useState } from 'react';
import { IoIosCamera } from 'react-icons/io';
import {
	useCaptureScreenContext,
	useConfigDispatchContext,
	useProductDataContext,
} from './ConfigHandler.jsx';
import { Link, useLocation } from 'wouter';
import { getFormattedPrice } from '../hooks/getFormatedPrice.js';
import Calculator from './Calculator.jsx';

export default function ConfigMenu() {
	//getting all the needed context data
	const [productData, setProductData, priceData, setPriceData] =
		useProductDataContext();
	const [config, configDispatch, setSharingURL, clipboardNote] =
		useConfigDispatchContext();
	const [takeScreenShot, setTakeScreenShot] = useCaptureScreenContext();
	const [subMenuIndex, setSubMenuIndex] = useState(0);
	const [currentOption, setCurrentOption] = useState(
		getInitialOptions(productData),
	);
	//useEffect to trigger screenshots of the 3d product for checkout page every time the config changes
	const [location, setLocation] = useLocation();

	useEffect(() => {
		setTimeout(() => {
			setTakeScreenShot(2);
		}, 10);
	}, [location, config]);

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

				<IoIosCamera
					className="screenshot-button"
					onClick={() => setTakeScreenShot(1)}
				/>

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
							{/* show color dips only on small screens */}
							{(window.innerWidth > 1486 ||
								productData.colorValues[item] === undefined) && (
								<span className="config-item-text-container">
									<span className="config-item-price">
										+
										{getFormattedPrice(
											priceData[currentOption[subMenuIndex]][index],
										)}
									</span>
									<span className="config-item-name">{item}</span>
								</span>
							)}
						</label>
					))}
				</div>
			</div>
		</div>
	);
}
//get initial options from productData
function getInitialOptions(productData) {
	// console.log('productData', productData);
	const initialOptions = [];
	productData.subMenu.forEach((subMenu) => {
		initialOptions.push(productData[subMenu][0]);
	});

	return initialOptions;
}
