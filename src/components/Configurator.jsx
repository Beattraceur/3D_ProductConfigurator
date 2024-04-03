import React from 'react';
import { Helmet } from 'react-helmet-async';
import ConfigMenu from './ConfigMenu.jsx';

export default function Configurator() {
	return (
		<>
			<Helmet title="Configurator" />
			Configurator
      <ConfigMenu />
		</>
	);
}
