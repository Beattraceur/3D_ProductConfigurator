import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useCaptureScreenContext } from './ConfigHandler.jsx';
export default function ScreenshotButton({ ...props }) {
	const [takeScreenShot, setTakeScreenShot] = useCaptureScreenContext();

	const { gl, scene, camera } = useThree();

	function ScreenShot() {
		console.log(gl);
		gl.render(scene, camera);
		gl.toneMapping = THREE.ACESFilmicToneMapping;
		gl.toneMappingExposure = 1;
		gl.outputEncoding = THREE.sRGBEncoding;
		gl.preserveDrawingBuffer = true;
		gl.domElement.toBlob(
			function (blob) {
				var a = document.createElement('a');
				var url = URL.createObjectURL(blob);
				a.href = url;
				a.download = 'canvas.jpg';
				a.click();
				console.log('function is actually being used');
			},
			'image/jpg',
			1.0,
		);
	}
	useEffect(() => {
		if (takeScreenShot) {
			ScreenShot();
			setTakeScreenShot(false);
		}

		return () => {
			setTakeScreenShot(false);
		};
	}, [takeScreenShot]);

	// return (
	// <sprite {...props} scale={[10, 10, 10]} onClick={ScreenShot}>
	// 	<spriteMaterial
	// 		attach="material"
	// 		color={'lightblue'}
	// 		depthWrite={false}
	// 		depthTest={false}
	// 		renderOrder={10000}
	// 		fog={false}
	// 		onClick={ScreenShot}
	// 	/>
	// </sprite>
	// );
}
