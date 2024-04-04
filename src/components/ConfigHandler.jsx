import { createContext, useContext, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import ProductFinder from './ProductFinder.jsx';

const ConfigContext = createContext(null);

export function useConfigContext() {
	return useContext(ConfigContext);
}

export default function ConfigHandler() {
	const [config, configDispatch] = useImmerReducer(
		configReducer,
		null,
		getInitialConfig,
	);

	useEffect(() => {
		localStorage.setItem('config', JSON.stringify(config));
	}, [config]);

	return (
		<ConfigContext.Provider value={[config, configDispatch]}>
			<ProductFinder />
		</ConfigContext.Provider>
	);
}

function configReducer(config, message) {
	switch (message.action) {
		case 'changeto':
			break;

		default:
			break;
	}
}

function getInitialConfig() {
	try {
		const config = JSON.parse(localStorage.getItem('config'));
		return Array.isArray(config) ? config : [];
	} catch (error) {
		console.log(error);
	}
	return [];
}
