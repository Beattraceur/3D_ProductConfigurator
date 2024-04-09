import React from 'react';
import { Helmet } from 'react-helmet-async';
import Calculator from './Calculator.jsx';
import { useCaptureScreenContext } from './ConfigHandler.jsx';

export default function Checkout() {
	const [takeScreenShot, setTakeScreenShot, screenshotData, setScreenshotData] =
		useCaptureScreenContext();
	console.log(screenshotData);
	return (
		<div>
			<Helmet title="Checkout" />
			Checkout
			{screenshotData !== null && (
				<>
					<img src={screenshotData[0]} width={400} height={400} />
					<img src={screenshotData[1]} width={400} height={400} />
					<img src={screenshotData[2]} width={400} height={400} />
				</>
			)}
			<Calculator display="all" />
		</div>
	);
}
