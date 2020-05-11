import * as THREE from 'three';
import TweenLite from 'gsap';

export default class Text {
	constructor(scene, lights, physic) {
		this.scene = scene;
		this.lights = lights;
		this.physic = physic;

		this.setEnter();
	}
	setEnter() {
		const loader = new THREE.FontLoader();
		loader.load('assets/fonts/Roboto_Regular.json', font => {
			this.textGeo = new THREE.TextGeometry('Enter', {
			    font: font,
			    size: 0.25,
			    height: 0.05
			});
			this.textGeo.center();
			this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
			this.mesh = new THREE.Mesh(this.textGeo, this.material);
			this.mesh.position.set(this.physic.bodyMoto.position.x, this.physic.bodyMoto.position.y + 2, this.physic.bodyMoto.position.z);
			this.mesh.rotation.y = Math.PI;

			this.scene.add(this.mesh);
		});
	}

	checkDistance() {
		/* check if car position is near to moto */
		if (this.physic.chassisBody.position.z >= 15) {
			this.lights.motoLight.color.set(0xffffff);
			this.mesh.visible = true;
			TweenLite.to(this.mesh.position, 4, {y: 3});
		}
		else {
			this.lights.motoLight.color.set(0x000000);
			this.mesh.visible = false;
			TweenLite.to(this.mesh.position, 1, {y: 2});
		}
	}
}
