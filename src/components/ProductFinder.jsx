import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Route } from 'wouter';
import Home from './Home.jsx';
import Configurator from './Configurator.jsx';
import Checkout from './Checkout.jsx';
import About from './About.jsx';

export default function ProductFinder() {
	return (
		<div className="product-finder">
			<Helmet title="ProductFinder" />
			<nav className="navbar">
				<Link href="/">Home</Link>
				<Link href="/configurator">Configurator</Link>
				<Link href="/checkout">Checkout</Link>
				<Link href="/about">About</Link>
			</nav>
			Welcome to ProductFinder
			<Route path="/" component={Home} />
			<Suspense fallback={<strong>Loading...</strong>}>
				<Route path="/configurator" component={Configurator} />
			</Suspense>
			<Route path="/checkout" component={Checkout} />
			<Route path="/about" component={About} />
		</div>
	);
}
