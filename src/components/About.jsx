import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function About() {
	return (
		<div>
			<Helmet title="About" />
			<h1>About</h1>
			<p>Without background data loading from JSON </p>
		</div>
	);
}
