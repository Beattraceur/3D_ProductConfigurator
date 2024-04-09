import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import ConfigHandler from './components/ConfigHandler.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		{/* Helmet for total head control of the App */}
		<HelmetProvider>
			{/* Main entry point */}
			<ConfigHandler />
		</HelmetProvider>
	</React.StrictMode>,
);
