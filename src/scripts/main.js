import Stats from 'stats.js';
import Scene from './scene';
import Lights from './lights';
import Physics from './physics';
import Load from './load';
import Controls from './controls';
import * as THREE from 'three';

class App {
	constructor() {
		this.scene = null;
		this.load = null;
		this.physic = null;
		this.lights = null;
		this.controls = null;

		this.CLICK = 0;

		this.mouse = new THREE.Vector2();

		this.letsPlay();
	}

	async letsPlay() {
		this.scene = new Scene();
		this.load = new Load(this.scene);

		await this.load.loadFile('assets/models/street_car.glb');
		await this.load.loadRoom('assets/models/room.glb');
		await this.load.initSkills();

		this.init();
		this.animate();
	}

	init() {
		this.physic = new Physics(this.scene, this.load);
		
		this.lights = new Lights(this.scene);

		window.addEventListener( 'click', this.onDocumentMouseDown.bind(this), false );
		this.controls = new Controls(this.physic, this.load);

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

		/* update JS Skill position */
		for (let i = 14; i < this.load.skills.length; ++i) {
			this.load.skills[i].position.copy(this.physic.bodySkill[i].position);
			this.load.skills[i].quaternion.copy(this.physic.bodySkill[i].quaternion);
		}
	}

	/* I set raycast to be able to click on Desktop.
	On mobile device click is impossible with my virtual joystick so I set a timeout to open the link */
	setRaycast() {
		this.raycaster = new THREE.Raycaster();
		this.raycaster.setFromCamera(this.mouse, this.scene.camera);    

		const intersects = this.raycaster.intersectObjects(this.scene.children, true);

		if (this.isMobile()) {
			if (this.physic.isLinkedin && this.CLICK === 0) {
				++this.CLICK;
				if (this.CLICK === 1) setTimeout(this.openWindow, 3000);
			}
		}
		else if (intersects.length > 0 && intersects[0].object.name === "link_linkedin" && this.physic.isLinkedin && this.CLICK === 0) {
			++this.CLICK;
			if (this.CLICK === 1) window.open("https://www.linkedin.com/in/sandra-boez-224b11b8/", "_blank");
		}

		if (!this.physic.isLinkedin) this.CLICK = 0;
	}

	openWindow() {
		if (window.confirm('If you click "ok" you will be redirected on my Linkedin profile')) 
			window.open("https://www.linkedin.com/in/sandra-boez-224b11b8/", "_blank");
	}

	isMobile() {
		return ('ontouchstart' in document.documentElement);
	}

	onDocumentMouseDown(e) {
		this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
		this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this));

		this.stats.begin();

		this.physic.checkDistance();

		this.scene.controls.target.copy(this.physic.chassisBody.position);
		this.scene.controls.update();

		this.lights.renderAmbiance();

		this.setRaycast();

		this.scene.renderer.render(this.scene, this.scene.camera);

		this.updatePhysics();

		this.stats.end();
	}
}

new App();
