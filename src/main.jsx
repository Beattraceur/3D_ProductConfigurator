import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import ProductFinder from './components/ProductFinder.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<HelmetProvider>
			<ProductFinder />
		</HelmetProvider>
	</React.StrictMode>,
);
