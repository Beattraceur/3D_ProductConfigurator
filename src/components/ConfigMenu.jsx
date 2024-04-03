import React, { useEffect, useState } from 'react';
import jsonData from '../data/productConfig.json';

export default function ConfigMenu() {
	const [data, setData] = useState([]);
	const [subMenuIndex, setSubMenuIndex] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		// Simulating asynchronous data fetching with setTimeout
		setTimeout(() => {
			setData(jsonData);
			setSubMenuIndex(0);
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
			{data[data.subMenu[subMenuIndex]].map((option, index) => (
				<button key={option}>{option}</button>
			))}
		</div>
	);
}
