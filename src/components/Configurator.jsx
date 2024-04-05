import React from 'react';
import { Helmet } from 'react-helmet-async';
import ConfigMenu from './ConfigMenu.jsx';
import Calculator from './Calculator.jsx';
import ProductStage from './ProductStage.jsx';

export default function Configurator() {
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
