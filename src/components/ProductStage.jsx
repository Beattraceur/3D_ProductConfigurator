import { Canvas } from '@react-three/fiber';
import React from 'react';
import StageControl from './StageControl.jsx';
import BasicDinghy from './BasicDinghy.jsx';
import { Environment } from '@react-three/drei';

export default function ProductStage() {
	return (
		<>
			<Canvas className="Stage">
				<ambientLight intensity={0.05} />
				<directionalLight position={[0, 0, 5]} intensity={0.5} />
				<StageControl />
				<BasicDinghy />

				<Environment preset="sunset" />
			</Canvas>
		</>
	);
}
