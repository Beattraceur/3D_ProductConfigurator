import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';
import { useCaptureScreenContext } from './ConfigHandler.jsx';
//function for 2d capturing of the 3d scene
export default function ScreenshotButton() {
	//context that holds the screenshot data
	const [takeScreenShot, setTakeScreenShot, screenshotData, setScreenshotData] =
		useCaptureScreenContext();
	//camera for capturing with active camera
	const { gl, scene, camera } = useThree();
	//three extra cameras for capturing different parts of the 3d scene
	const photoCamera1 = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000,
	);
	photoCamera1.position.set(-25, 10, 15);
	photoCamera1.lookAt(-4, 10, 0);
	photoCamera1.aspect = 400 / 400;
	photoCamera1.updateProjectionMatrix();
	scene.add(photoCamera1);
	const photoCamera2 = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000,
	);
	photoCamera2.position.set(0, 10, 22);
	photoCamera2.aspect = 400 / 400;
	photoCamera2.updateProjectionMatrix();
	scene.add(photoCamera2);
	const photoCamera3 = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000,
	);
	photoCamera3.position.set(12, 12, -3);
	photoCamera3.lookAt(-8, -10, 5);
	photoCamera3.aspect = 400 / 400;
	photoCamera3.updateProjectionMatrix();
	scene.add(photoCamera3);
	//function to capture the 3d scene with active camera and download the image
	function ScreenShot() {
		gl.render(scene, camera);
		gl.toneMapping = THREE.ACESFilmicToneMapping;
		gl.toneMappingExposure = 1;
		gl.outputEncoding = THREE.sRGBEncoding;
		gl.preserveDrawingBuffer = true;
		gl.domElement.toBlob(
			function (blob) {
				const a = document.createElement('a');
				const url = URL.createObjectURL(blob);
				a.href = url;
				a.download = 'canvas.jpg';
				a.click();
				console.log('function is actually being used');
			},
			'image/jpg',
			1.0,
		);
	}
	//function to capture the 3d scene with different cameras for checkout page
	function tempScreenShot() {
		const pictureArray = [];
		for (let index = 1; index <= 3; index++) {
			const currentCam =
				index === 1 ? photoCamera1 : index === 2 ? photoCamera2 : photoCamera3;
			gl.render(scene, currentCam);
			gl.toneMapping = THREE.ACESFilmicToneMapping;
			gl.toneMappingExposure = 1;
			gl.outputEncoding = THREE.sRGBEncoding;
			gl.preserveDrawingBuffer = true;
			gl.domElement.toBlob(
				function (blob) {
					const reader = new FileReader();
					reader.readAsDataURL(blob);
					reader.onloadend = function () {
						const base64data = reader.result;
						// Access the context and update the image data
						pictureArray.push(base64data);
					};
				},
				'image/jpeg',
				1.0,
			);
		}
		setScreenshotData(pictureArray);
	}
	//deside for which purpose to take the screenshot
	useEffect(() => {
		if (takeScreenShot === 1) {
			ScreenShot();
			setTakeScreenShot(false);
		} else if (takeScreenShot === 2) {
			tempScreenShot();
			setTakeScreenShot(false);
		}

		return () => {
			setTakeScreenShot(false);
		};
	}, [takeScreenShot]);
}
