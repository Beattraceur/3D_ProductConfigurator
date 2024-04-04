import React from 'react';
import { Helmet } from 'react-helmet-async';
import Calculator from './Calculator.jsx';

export default function Checkout() {
	return (
		<div>
			<Helmet title="Checkout" />
			Checkout
			<Calculator display="all" />
		</div>
	);
}
