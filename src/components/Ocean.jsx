import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
//just a free ocean with a custom hole for the Boat to sit in
export default function Ocean() {
	const ref = useRef();
	const gl = useThree((state) => state.gl);
	const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpeg');
	waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
	const x = 0,
		y = 0;

	// the outer square shape
	const squareShape = new THREE.Shape();
	squareShape.moveTo(x - 2000, y - 2000);
	squareShape.lineTo(x + 2000, y - 2000);
	squareShape.lineTo(x + 2000, y + 2000);
	squareShape.lineTo(x - 2000, y + 2000);
	squareShape.lineTo(x - 2000, y - 2000);

	// the bezier curve cutout shape
	const cutoutShape = new THREE.Shape();
	cutoutShape.moveTo(x + 13.2, y);
	cutoutShape.bezierCurveTo(x + 1.7, y - 8.5, x - 11.3, y - 4, x - 11.3, y - 4);
	cutoutShape.lineTo(x - 11.3, y + 4);
	cutoutShape.bezierCurveTo(x - 11.3, y + 4, x + 1.7, y + 8.5, x + 13.2, y);
	cutoutShape.lineTo(x + 13.2, y);

	// Boolean subtraction to create the cutout
	squareShape.holes.push(cutoutShape);
	const geom = useMemo(() => new THREE.ShapeGeometry(squareShape), []);
	const config = useMemo(
		() => ({
			textureWidth: 512,
			textureHeight: 512,
			waterNormals,
			sunDirection: new THREE.Vector3(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale: 3.7,
			fog: false,
			format: gl.encoding,
		}),
		[waterNormals],
	);
	// let the water flow
	useFrame(
		(state, delta) => (ref.current.material.uniforms.time.value += delta),
	);
	return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
}
