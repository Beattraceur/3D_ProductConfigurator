import React from 'react';
import { Helmet } from 'react-helmet-async';
import ConfigMenu from './ConfigMenu.jsx';
import Calculator from './Calculator.jsx';

export default function Configurator() {
	return (
		<>
			<Helmet title="Configurator" />
			Configurator
			<Calculator />
			<ConfigMenu />
		</>
	);
}
