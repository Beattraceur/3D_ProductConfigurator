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
		<>
			<Helmet title="Configurator" />
			Configurator
			<Calculator display="total" />
			<ProductStage />
			<ConfigMenu />
		</>
	);
}
