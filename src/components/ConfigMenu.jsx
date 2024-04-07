import React, { useEffect, useState } from 'react';
import jsonData from '../data/productConfig.json';
import { useConfigDispatchContext } from './ConfigHandler.jsx';
import { Link } from 'wouter';
export default function ConfigMenu() {
	const [config, configDispatch] = useConfigDispatchContext();
	const [data, setData] = useState([]);
	const [subMenuIndex, setSubMenuIndex] = useState(0);
	const [currentOption, setCurrentOption] = useState([
		'Woodcolor',
		'FabricSails',
		'Canopy',
	]);

	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		// Simulating asynchronous data fetching with setTimeout
		setTimeout(() => {
			setData(jsonData);
			setIsLoading(false);
		}, 1000); // Change the delay according to your preference
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<p>Done</p>
			{/* MainMenu */}
			<div>
				{data.configPages.map((page, index) => (
					<button
						disabled={subMenuIndex === index}
						key={page}
						onClick={() => setSubMenuIndex(index)}
					>
						{page}
					</button>
				))}
			</div>
			<div>{subMenuIndex}</div>
			{/* SubMenu */}
			{data[data.subMenu[subMenuIndex]].map((option) => (
				<button
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
			<div>
				<p>{currentOption[subMenuIndex]}</p>

				{data[currentOption[subMenuIndex]].map((item, index) => (
					<label key={item}>
						<input
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
			<button onClick={() => configDispatch({ action: 'reset' })}>Reset</button>
			<Link href="/checkout">
				<button>Checkout</button>
			</Link>
		</div>
	);
}
