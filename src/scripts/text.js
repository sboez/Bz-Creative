import * as THREE from 'three';
import TweenMax from 'gsap';

export default class Text {
	constructor(scene, lights) {
		this.scene = scene;
		this.lights = lights;

		this.favFont = 'assets/fonts/Roboto_Regular.json';

		this.loader = new THREE.FontLoader();

		this.setEnter();
	}

	setEnter() {
		this.loader.load(this.favFont, font => {
			this.textGeo = new THREE.TextGeometry('Enter', {
			    font: font,
			    size: 0.340,
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
}
