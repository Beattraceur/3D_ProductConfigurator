import React, { useState } from 'react';
import { useConfigDispatchContext } from './ConfigHandler.jsx';

export default function Calculator() {
	const [totalPrice, setTotalPrice] = useState(0);
	const [config, configDispatch] = useConfigDispatchContext();

	Object.keys(config).forEach((key) => {
		console.log(key, config[key]);
	});
	return (
		<div>
			<p>Total: {totalPrice}€</p>
		</div>
	);
}
