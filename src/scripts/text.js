import * as THREE from 'three';
import TweenMax from 'gsap';

export default class Text {
	constructor(scene, lights) {
		this.scene = scene;
		this.lights = lights;

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
			this.mesh.rotation.y = Math.PI / 2;

			this.scene.add(this.mesh);

			this.setTl();
			this.mesh.visible = false;
		});
	}

	setTl() {
		this.tl = TweenMax.fromTo(this.mesh.position, 4,
			{
				y: 4
			},
			{
				y: 6,
				paused: true,
				onStart: () => this.mesh.visible = true
		});
	}

	playEnter(x, y, z, isEnter) {
		if (isEnter) {
			this.mesh.position.set(x + 1, y, z);
			this.tl.play();
		} else {
			this.tl.reverse();
			this.mesh.visible = false;
		}
			
	}

	setSkills() {
		this.skills = ['JS', 'Three.JS'];
		this.skillMesh = [];
		this.skillGeo = [];
		this.skillMat = [];

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

			/* loop for add skills name in the scene */
			for (let i = 0; i < this.skills.length; ++i) {
				this.skillMat[i] = new THREE.MeshBasicMaterial({ color: 0xf00f0 });
				this.skillMesh[i] = new THREE.Mesh(this.skillGeo[i], this.skillMat[i]);
				this.skillMesh[i].position.set(10, 3, 10);
				this.scene.add(this.skillMesh[i]);
			};

			this.skillMat[1].color.setHex(0xff00bf);
		});
	}
}
