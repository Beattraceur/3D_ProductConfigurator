import { Canvas, extend } from '@react-three/fiber';
import React, { Suspense } from 'react';

import BasicDinghy from './BasicDinghy.jsx';
import { OrbitControls, Sky } from '@react-three/drei';
import { Water } from 'three-stdlib';
import Ocean from './Ocean.jsx';
import ScreenshotButton from './ScreenshotButton.jsx';

extend({ Water });
//function that renders the 3d stage
export default function ProductStage() {
	return (
		<>
			{/* 3d stage */}
			<Canvas
				className="Stage"
				camera={{ position: [-33, 33, -33], fov: 55, near: 1, far: 20000 }}
			>
				{/*lights*/}
				<ambientLight intensity={1.5} />
				<directionalLight position={[600, 150, 500]} intensity={2} />
				{/*boat in water*/}
				<Suspense fallback={null}>
					<Ocean />
					<BasicDinghy />
				</Suspense>
				{/*skybox*/}
				<Sky scale={1000} sunPosition={[600, 150, 500]} turbidity={0.1} />
				{/*controls*/}
				<OrbitControls maxPolarAngle={Math.PI / 2 - 0.01} />
				{/*screencapture function*/}
				<ScreenshotButton />
			</Canvas>
		</>
	);
}
