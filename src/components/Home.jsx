import React from 'react';
import DataLoader from './DataLoader.jsx';
//just a free home webpage
export default function Home() {
	//Load product data in background
	console.log(DataLoader().props.children);
	return (
		<div>
			<h1>Homepage of the actual Product</h1>
			<p>Loading Configurator JSON Data in the background </p>
		</div>
	);
}
