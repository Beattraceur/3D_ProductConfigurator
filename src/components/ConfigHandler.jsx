import { createContext, useContext, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import ProductFinder from './ProductFinder.jsx';

const ConfigDispatchContext = createContext(null);

export function useConfigDispatchContext() {
	return useContext(ConfigDispatchContext);
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
		<ConfigDispatchContext.Provider value={[config, configDispatch]}>
			<ProductFinder />
		</ConfigDispatchContext.Provider>
	);
}

function configReducer(config, message) {
	console.log(message);
	switch (message.action) {
		case 'true':
			console.log('set', message.currentOption, 'to', message.item);
			config[message.currentOption] = message.item;
			break;
		case 'false':
			console.log('in', message.currentOption, 'delete', message.item);
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
