import { Canvas, extend } from '@react-three/fiber';
import React, { Suspense } from 'react';
import StageControl from './StageControl.jsx';
import BasicDinghy from './BasicDinghy.jsx';
import { Environment, OrbitControls, Sky } from '@react-three/drei';
import { Water } from 'three-stdlib';
import Ocean from './Ocean.jsx';

extend({ Water });
export default function ProductStage() {
	return (
		<>
			<Canvas
				className="Stage"
				camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}
			>
				<pointLight position={[100, 100, 100]} />
				<pointLight position={[-100, -100, -100]} />
				<ambientLight />
				<directionalLight position={[0, 20, 0]} />
				<Suspense fallback={null}>
					<Ocean />
					<BasicDinghy />
				</Suspense>
				<Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
				<OrbitControls />
			</Canvas>
		</>
	);
}
