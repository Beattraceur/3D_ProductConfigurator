import { Canvas, extend } from '@react-three/fiber';
import React, { Suspense } from 'react';

import BasicDinghy from './BasicDinghy.jsx';
import { OrbitControls, Sky } from '@react-three/drei';
import { Water } from 'three-stdlib';
import Ocean from './Ocean.jsx';

extend({ Water });
export default function ProductStage() {
	return (
		<>
			<Canvas
				className="Stage"
				camera={{ position: [-33, 33, -33], fov: 55, near: 1, far: 20000 }}
			>
				{/* <pointLight position={[100, 100, 100]} />
				<pointLight position={[-100, -100, -100]} /> */}
				<ambientLight intensity={1.5} />
				<directionalLight position={[600, 150, 500]} intensity={2} />
				<Suspense fallback={null}>
					<Ocean />
					<BasicDinghy />
				</Suspense>
				{/* <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} /> */}
				<Sky scale={1000} sunPosition={[600, 150, 500]} turbidity={0.1} />
				{/* <Environment preset="dawn" /> */}

				<OrbitControls />
			</Canvas>
		</>
	);
}
