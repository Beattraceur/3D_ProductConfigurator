import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Route } from 'wouter';
import Home from './Home.jsx';
import Configurator from './Configurator.jsx';
import Checkout from './Checkout.jsx';
import About from './About.jsx';
//function that controls the routing
export default function ProductFinder() {
	return (
		<div className="product-finder">
			<Helmet title="3D Boat Configurator" />
			<nav className="navbar">
				<Link className="nav-item" href="/">
					Home
				</Link>
				<Link className="nav-item" href="/configurator">
					Configurator
				</Link>
				<Link className="nav-item" href="/checkout">
					Checkout
				</Link>
				<Link className="nav-item" href="/about">
					About
				</Link>
			</nav>
			<Route path="/" component={Home} />
			<Suspense fallback={<strong>Loading...</strong>}>
				<Route path="/configurator" component={Configurator} />
			</Suspense>
			<Route path="/checkout" component={Checkout} />
			<Route path="/about" component={About} />
		</div>
	);
}
