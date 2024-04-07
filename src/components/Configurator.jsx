import React from 'react';
import { Helmet } from 'react-helmet-async';
import ConfigMenu from './ConfigMenu.jsx';
import Calculator from './Calculator.jsx';
import ProductStage from './ProductStage.jsx';
import { useProductDataContext } from './ConfigHandler.jsx';
import DataLoader from './DataLoader.jsx';

export default function Configurator() {
	const [productData, setProductData] = useProductDataContext();
	if (productData === null) return <DataLoader />;

	return (
		<div className="configurator">
			<Helmet title="Configurator" />

			<ProductStage />
			<Calculator display="total" />
			<ConfigMenu />
		</div>
	);
}
