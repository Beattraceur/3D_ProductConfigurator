import { createContext, useContext, useEffect, useState } from 'react';
import { useImmerReducer } from 'use-immer';
import ProductFinder from './ProductFinder.jsx';
//Contect that holds the product data
const ProductDataContext = createContext(null);
//Context that holds the current configuration
const ConfigDispatchContext = createContext(null);
//Context that holds the 3d display settings
const DisplayContext = createContext({});
//Context that holds the screenshot data
const CaptureScreenContext = createContext({});
//Context helping hooks
export function useProductDataContext() {
	return useContext(ProductDataContext);
}
export function useConfigDispatchContext() {
	return useContext(ConfigDispatchContext);
}
export function useDisplayContext() {
	return useContext(DisplayContext);
}
export function useCaptureScreenContext() {
	return useContext(CaptureScreenContext);
}
export default function ConfigHandler() {
	//individual states for all the nescessary data and functions
	const [sharingURL, setSharingURL] = useState(false);
	const [clipboardNote, setClipboardNote] = useState(false);
	const [productData, setProductData] = useState(null);
	const [priceData, setPriceData] = useState(null);
	const [config, configDispatch] = useImmerReducer(
		configReducer,
		null,
		getInitialConfig,
	);
	const [takeScreenShot, setTakeScreenShot] = useState(false);
	const [screenshotData, setScreenshotData] = useState(null);
	const [boatMaterial, setBoatMaterial] = useState('wood');
	const [sailMaterial, setSailMaterial] = useState('sail');
	const [displayPaddleOars, setDisplayPaddleOars] = useState(false);
	const [displayTeakBenches, setDisplayTeakBenches] = useState(false);
	const [displayLaserEngraving, setDisplayLaserEngraving] = useState(false);
	const [displayEngineSupport, setDisplayEngineSupport] = useState(false);
	const [displayLadder, setDisplayLadder] = useState(false);
	const [displayAwning, setDisplayAwning] = useState(false);
	const [displayLifeJacket, setDisplayLifeJacket] = useState(false);
	//save config to local storage and clear url
	useEffect(() => {
		setClipboardNote(false);
		const url = new URL(window.location.href);
		url.searchParams.delete('config');
		window.history.replaceState(null, null, url.href);
		localStorage.setItem('config', JSON.stringify(config));
	}, [config]);
	//write url to clipboard and show searchParams url
	useEffect(() => {
		if (sharingURL) {
			// console.log('sharingURL', sharingURL);
			const url = new URL(window.location.href);
			url.searchParams.delete('config');
			// console.log('config', config);
			url.searchParams.set('config', JSON.stringify(config));
			window.history.replaceState(null, null, url.href);
			navigator.clipboard
				.writeText(url.href)
				.then(() => {
					setClipboardNote(true);
					setTimeout(() => {
						setClipboardNote(false);
					}, 3000);
				})
				.catch((error) => {
					console.error('Failed to copy URL: ', error);
				});
			setSharingURL(false);
		}
	}, [sharingURL]);

	//set material according to config
	useEffect(() => {
		config.Woodcolor !== undefined
			? setBoatMaterial(config.Woodcolor)
			: setBoatMaterial('wood');
		config.FabricSails !== undefined
			? setSailMaterial(config.FabricSails)
			: setSailMaterial('sail');
		config.Ladder !== undefined
			? setDisplayLadder(true)
			: setDisplayLadder(false);
		config.PaddleOars !== undefined
			? setDisplayPaddleOars(true)
			: setDisplayPaddleOars(false);
		config.TeakBenches !== undefined
			? setDisplayTeakBenches(true)
			: setDisplayTeakBenches(false);
		config.LaserEngraving !== undefined
			? setDisplayLaserEngraving(true)
			: setDisplayLaserEngraving(false);
		config.EngineSupport !== undefined
			? setDisplayEngineSupport(true)
			: setDisplayEngineSupport(false);
		config.Awning !== undefined
			? setDisplayAwning(true)
			: setDisplayAwning(false);
		config.LifeJacket !== undefined
			? setDisplayLifeJacket(config.LifeJacket)
			: setDisplayLifeJacket(false);
	}, [config]);

	return (
		// Context providers for all the data
		<ProductDataContext.Provider
			value={[productData, setProductData, priceData, setPriceData]}
		>
			<ConfigDispatchContext.Provider
				value={[config, configDispatch, setSharingURL, clipboardNote]}
			>
				<DisplayContext.Provider
					value={{
						boatMaterial,
						sailMaterial,
						displayLadder,
						displayPaddleOars,
						displayTeakBenches,
						displayLaserEngraving,
						displayEngineSupport,
						displayAwning,
						displayLifeJacket,
					}}
				>
					<CaptureScreenContext.Provider
						value={[
							takeScreenShot,
							setTakeScreenShot,
							screenshotData,
							setScreenshotData,
						]}
					>
						<ProductFinder />
					</CaptureScreenContext.Provider>
				</DisplayContext.Provider>
			</ConfigDispatchContext.Provider>
		</ProductDataContext.Provider>
	);
}
//ImmerReducer to change custom user config
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
			// console.log('reset');
			return {};
		default:
			break;
	}
}
//get initial config from url or local storage
function getInitialConfig() {
	const url = new URL(window.location.href);
	if (url.searchParams.get('config')) {
		console.log('searchParams', url.searchParams.get('config'));
		return JSON.parse(url.searchParams.get('config'));
	} else {
		try {
			const config = JSON.parse(localStorage.getItem('config'));

			return config === null ? {} : config;
		} catch (error) {
			console.log(error);
		}
	}

	return {};
}
