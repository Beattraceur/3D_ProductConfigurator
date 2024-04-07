import React, { useEffect, useState } from 'react';
import jsonData from '../data/productConfig.json';
import {
	useConfigDispatchContext,
	useProductDataContext,
} from './ConfigHandler.jsx';
import { Link } from 'wouter';
export default function ConfigMenu() {
	const [productData] = useProductDataContext();
	const [config, configDispatch] = useConfigDispatchContext();

	const [subMenuIndex, setSubMenuIndex] = useState(0);
	const [currentOption, setCurrentOption] = useState(
		getInitialOptions(productData),
	);

	return (
		<div className="config-menu">
			{/* MainMenu */}
			<div>
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
						<label key={item} className="config-item-label">
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
							{item}
						</label>
					))}
				</div>
			</div>
			<button onClick={() => configDispatch({ action: 'reset' })}>Reset</button>
			<Link href="/checkout">
				<button>Checkout</button>
			</Link>
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
