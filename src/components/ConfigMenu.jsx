import React, { useEffect, useState } from 'react';
import jsonData from '../data/productConfig.json';
import { useConfigDispatchContext } from './ConfigHandler.jsx';

export default function ConfigMenu() {
	const [config, configDispatch] = useConfigDispatchContext();
	const [data, setData] = useState([]);
	const [subMenuIndex, setSubMenuIndex] = useState([]);
	const [currentOption, setCurrentOption] = useState([]);

	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		// Simulating asynchronous data fetching with setTimeout
		setTimeout(() => {
			setData(jsonData);
			setSubMenuIndex(0);
			setCurrentOption('Woodcolor');
			setIsLoading(false);
		}, 1000); // Change the delay according to your preference
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<p>Done</p>
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
			{console.log(data.subMenu[subMenuIndex])}
			{data[data.subMenu[subMenuIndex]].map((option) => (
				<button
					disabled={currentOption === option}
					key={option}
					onClick={() => setCurrentOption(option)}
				>
					{option}
				</button>
			))}
			<div>
				{console.log(data[currentOption])}
				<p>{currentOption}</p>
				{data[currentOption].map((item) => (
					<label key={item}>
						<input
							type="checkbox"
							checked={config[currentOption] === item}
							onChange={({ target }) =>
								configDispatch({
									currentOption,
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
	);
}
