import * as THREE from 'three';
import Stats from 'stats.js';
import Scene from './scene';
import Lights from './lights';
import Physics from './physics';
import Load from './load';
import Text from './text';
import Key from './keyboardEvent';

class App {
	constructor() {
		this.scene = null;
		this.load = null;
		this.text = null;
		this.physic = null;
		this.lights = null;
		this.key = null;

		this.letsPlay();
	}

	async letsPlay() {
		this.init();

		await this.load.loadFile('assets/models/street_car.glb');
		await this.load.loadOther('assets/models/motorbike.glb');
		await this.load.loadObj();

		this.load.obj[0].position.set(-29, 3, 13);


		this.animate();
	}
	
	init() {
		this.scene = new Scene();

		this.load = new Load(this.scene);
	
		this.text = new Text(this.scene, this.lights);

		this.physic = new Physics(this.scene, this.load, this.text);
		
		this.lights = new Lights(this.scene);

		this.key = new Key(this.physic, this.load);

		this.stats = new Stats();
		this.stats.showPanel(0);

		document.body.appendChild(this.stats.dom);
		document.body.appendChild(this.scene.renderer.domElement);
		window.addEventListener('resize', this.onWindowResize.bind(this), false);

		this.scene.traverse((e) => {
			if (e.isMesh)e.castShadow = e.receiveShadow = true;
		});
	}

	onWindowResize() {
		this.scene.camera.aspect = window.innerWidth / window.innerHeight;
		this.scene.camera.updateProjectionMatrix();
		this.scene.renderer.setSize(window.innerWidth, window.innerHeight);
	}
	
	updatePhysics() {
		this.physic.world.step(1 / 60);

		/* update chassis position */	
		this.load.model.position.copy(this.physic.chassisBody.position);
		this.load.model.quaternion.copy(this.physic.chassisBody.quaternion);
	
		/* update motorcyle position */
		this.load.other.position.copy(this.physic.bodyMoto.position);
		this.load.other.quaternion.copy(this.physic.bodyMoto.quaternion);
		this.load.other.matrixAutoUpdate = false;
		this.load.other.updateMatrix();

		/* update shelf position */
		this.scene.shelf.position.copy(this.physic.shelfBody.position);
		this.scene.shelf.quaternion.copy(this.physic.shelfBody.quaternion);

		/* update ramp position */
		this.scene.ramp.position.copy(this.physic.rampBody.position);
		this.scene.ramp.quaternion.copy(this.physic.rampBody.quaternion);
		this.scene.ramp.updateMatrixWorld();
		this.scene.ramp.matrixAutoUpdate = false;

		/* update JS Skill position */
		for (let i = 0; i < this.text.skills.length; ++i) {
			this.text.skillMesh[i].position.copy(this.physic.bodySkill[i].position);
			this.text.skillMesh[i].quaternion.copy(this.physic.bodySkill[i].quaternion);
		}
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this));

		this.stats.begin();

		this.physic.checkDistance();

		this.scene.controls.target.copy(this.physic.chassisBody.position);
		this.scene.controls.update();

		this.lights.renderAmbiance();

		this.scene.renderer.render(this.scene, this.scene.camera);

		this.updatePhysics();

		this.stats.end();
	}
}

new App();
