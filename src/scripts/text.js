import * as THREE from 'three';
import TweenLite from 'gsap';

export default class Text {
	constructor(scene, lights, physic) {
		this.scene = scene;
		this.lights = lights;
		this.physic = physic;

		this.favFont = 'assets/fonts/Roboto_Regular.json';

		this.loader = new THREE.FontLoader();

		this.setEnter();
		this.setSkills();
	}

	setEnter() {
		this.loader.load(this.favFont, font => {
			this.textGeo = new THREE.TextGeometry('Enter', {
			    font: font,
			    size: 0.30,
			    height: 0.05
			});
			this.textGeo.center();
			this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
			this.mesh = new THREE.Mesh(this.textGeo, this.material);
			this.mesh.position.set(this.physic.bodyMoto.position.x, this.physic.bodyMoto.position.y + 2, this.physic.bodyMoto.position.z);
			this.mesh.rotation.y = Math.PI / 2;

			this.scene.add(this.mesh);
		});
	}

	setSkills() {
		this.skills = ['JS', 'Three.JS'];
		this.skillMesh = [];
		this.skillGeo = [];

		/* loop in skills name */
		this.loader.load(this.favFont, font => {
			for (let i = 0; i < this.skills.length; ++i) {
				console.log(this.skills[i]);
				this.skillGeo[i] = new THREE.TextGeometry(this.skills[i], {
				    font: font,
				    size: 1,
				    height: 0.5
				});
				this.skillGeo[i].center();
			}
			this.skillMat = new THREE.MeshBasicMaterial({ color: 0xf00f0 });

			/* loop for add skills name in the scene */
			for (let i = 0; i < this.skills.length; ++i) {
				this.skillMesh[i] = new THREE.Mesh(this.skillGeo[i], this.skillMat);
				this.skillMesh[i].position.set(10, 3, 10);
				this.scene.add(this.skillMesh[i]);
				console.log(this.skillMesh[i]);
			};

			this.skillMesh[1].position.set(13, 5, 13);
		});
	}

	checkDistance() {
		/* check if car position is near to moto */
		if (this.physic.chassisBody.position.x <= this.physic.bodyMoto.position.x + 7) {
				this.mesh.visible = true;
				TweenLite.to(this.mesh.position, 4, {y: 7});
		}
		else {
			this.mesh.visible = false;
			TweenLite.to(this.mesh.position, 1, {y: 5});
		}
	}
}
