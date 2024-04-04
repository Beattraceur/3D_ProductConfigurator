import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Checkout() {
	try {
		const config = JSON.parse(localStorage.getItem('config'));
		console.log(config);
	} catch (error) {
		console.log(error);
	}
	return (
		<div>
			<Helmet title="Checkout" />
			Checkout
		</div>
	);
}
