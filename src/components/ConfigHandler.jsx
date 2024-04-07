import { createContext, useContext, useEffect, useState } from 'react';
import { useImmerReducer } from 'use-immer';
import ProductFinder from './ProductFinder.jsx';

const ProductDataContext = createContext(null);
export function useProductDataContext() {
	return useContext(ProductDataContext);
}

const ConfigDispatchContext = createContext(null);
const DisplayContext = createContext({});
export function useConfigDispatchContext() {
	return useContext(ConfigDispatchContext);
}
export function useDisplayContext() {
	return useContext(DisplayContext);
}
export default function ConfigHandler() {
	const [productData, setProductData] = useState(null);
	const [config, configDispatch] = useImmerReducer(
		configReducer,
		null,
		getInitialConfig,
	);

	useEffect(() => {
		localStorage.setItem('config', JSON.stringify(config));
	}, [config]);
	const [boatMaterial, setBoatMaterial] = useState('wood');
	const [sailMaterial, setSailMaterial] = useState('sail');
	useEffect(() => {
		config.Woodcolor !== undefined
			? setBoatMaterial(config.Woodcolor)
			: setBoatMaterial('wood');
		config.FabricSails !== undefined
			? setSailMaterial(config.FabricSails)
			: setSailMaterial('sail');
	}, [config]);

	return (
		<ProductDataContext.Provider value={[productData, setProductData]}>
			<ConfigDispatchContext.Provider value={[config, configDispatch]}>
				<DisplayContext.Provider value={{ boatMaterial, sailMaterial }}>
					<ProductFinder />
				</DisplayContext.Provider>
			</ConfigDispatchContext.Provider>
		</ProductDataContext.Provider>
	);
}

function configReducer(config, message) {
	// console.log(message);
	switch (message.action) {
		case 'true':
			// console.log('set', message.currentOption, 'to', message.item);
			config[message.currentOption] = message.index;
			break;
		case 'false':
			// console.log('in', message.currentOption, 'delete', message.item);
			delete config[message.currentOption];
			break;
		case 'reset':
			console.log('reset');
			return {};
		default:
			break;
	}
}

function getInitialConfig() {
	try {
		const config = JSON.parse(localStorage.getItem('config'));

		return config === null ? {} : config;
	} catch (error) {
		console.log(error);
	}
	return {};
}
