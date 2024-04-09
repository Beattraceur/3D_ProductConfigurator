import React from 'react';
import { Helmet } from 'react-helmet-async';
import Calculator from './Calculator.jsx';
import { useCaptureScreenContext } from './ConfigHandler.jsx';

export default function Checkout() {
	//Context that holds the screenshot data
	const [takeScreenShot, setTakeScreenShot, screenshotData, setScreenshotData] =
		useCaptureScreenContext();

	return (
		<div>
			{/* set title of the page */}
			<Helmet title="Checkout" />
			{/* show the screenshot of the 3d product */}
			{screenshotData !== null && (
				<div className="product-images-container">
					{screenshotData.map((image, index) => (
						<img
							key={index}
							className="product-image"
							src={screenshotData[index]}
							width={400}
							height={400}
							alt="product pictures"
						/>
					))}
				</div>
			)}
			<div className="total-display-checkout">
				<h2>Your current configuration:</h2>
				{/* display configlist and total price */}
				<Calculator display="all" />
			</div>
		</div>
	);
}
