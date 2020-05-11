import * as THREE from 'three';

export default class Lights {
	constructor(scene) {
		this.scene = scene;

		this.setAmbient();
		this.setDetection();
		this.setAmbiance();
	}

	setAmbient() {
		const hemlight = new THREE.HemisphereLight(0x404040, 0x404040, 1); 
		this.scene.add(hemlight);	
	}

	setDetection() {
		/* moto detection point lights */
		this.motoLight = new THREE.PointLight(0xffffff, 10, 6);
		this.motoLight.position.set(10, 5, 20);
		this.scene.add(this.motoLight);
	}

	setAmbiance() {
		this.pointLights = [];
		this.pointLights.length = 4;

		const x = [], z = [];
		this.v1 = [], this.v2 = [];
		/* random lights position X and Z between -1000 and 1000 
			and random value for animation */
		for(let i = 0; i < this.pointLights.length * 2; ++i) {
	   		x.push(this.getRandom(-5, 5));
	   		z.push(this.getRandom(-5, 5));

	   		this.v1.push(this.getRandom(0.1, 1));
			this.v2.push(this.getRandom(0.1, 1));
	   	}

		for (let i = 0; i < this.pointLights.length; ++i) {
			this.pointLights[i] = new THREE.PointLight(this.getRandomColor(), 1, 50);
			this.pointLights[i].position.set(x[i], 27, z[i]);
			this.scene.add(this.pointLights[i]);
		}
	}

	renderAmbiance() {
		const clock = new THREE.Clock();
		const time = Date.now() * 0.0025;
		const dt = 0.1;

		for (let i = 0; i < this.pointLights.length; ++i) {
			this.pointLights[i].position.x += Math.sin(time * this.v1[i]) * dt;
			this.pointLights[i].position.z += Math.cos(time * this.v2[i]) * dt;
		}
	}

	getRandom(min, max) {
		return Math.random() * (max - min) + min;
	}

	getRandomColor() {
		return ('#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6));
	}
}