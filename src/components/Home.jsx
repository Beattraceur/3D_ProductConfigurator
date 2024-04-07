import React from 'react';
import DataLoader from './DataLoader.jsx';

export default function Home() {
	//Load product data in background
	console.log(DataLoader().props.children);
	return <div>Home</div>;
}
