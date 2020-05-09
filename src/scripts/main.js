import * as THREE from 'three';
import Scene from './scene';
import Physics from './physics';
import Load from './load';
import Text from './text';
import Key from './keyboardEvent';

class App {
	constructor() {
		this.scene = null;
		this.load = null;
		this.physic = null;
		this.text = null;
		this.key = null;

		this.letsPlay();
	}

	async letsPlay() {
		this.init();

		await this.load.loadFile('assets/models/street_car.glb');
		await this.load.loadOther('assets/models/motorbike.glb');
		this.load.other.userData = { URL: "https://github.com/sboez" };

		this.animate();
	}
	
	init() {
		this.scene = new Scene();
	
		this.load = new Load(this.scene);
		
		this.physic = new Physics(this.scene, this.load);

		this.text = new Text(this.scene, this.physic);

		this.key = new Key(this.physic, this.load);

		document.body.appendChild(this.scene.renderer.domElement);
		window.addEventListener('resize', this.onWindowResize.bind(this), false);
	}

	onWindowResize() {
		this.scene.camera.aspect = window.innerWidth / window.innerHeight;
		this.scene.camera.updateProjectionMatrix();
		this.scene.renderer.setSize(window.innerWidth, window.innerHeight);
	}
	
	updatePhysics() {
		this.physic.world.step(1 / 60);
	
		/* update chassis position */
		this.scene.box.position.copy(this.physic.chassisBody.position);
		this.scene.box.quaternion.copy(this.physic.chassisBody.quaternion);
	
		this.load.model.position.copy(this.physic.chassisBody.position);
		this.load.model.quaternion.copy(this.physic.chassisBody.quaternion);
	
		this.load.other.position.copy(this.physic.bodyMoto.position);
		this.load.other.quaternion.copy(this.physic.bodyMoto.quaternion);
	}

	animate() {
		/* check if car position is near to moto */
		if (this.load.model.position.z >= 15) {
			this.scene.pointLight.color.set(0xffffff);
			this.text.mesh.visible = true;
		}
		else {
			this.scene.pointLight.color.set(0x000000);
			this.text.mesh.visible = false;
		}
		
		this.scene.camera.copy(this.scene.fakeCamera);
		requestAnimationFrame(this.animate.bind(this));
		this.scene.renderer.render(this.scene, this.scene.camera);
		this.updatePhysics();
	}
}

new App();
