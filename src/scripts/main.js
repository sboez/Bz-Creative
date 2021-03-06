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

	/* On mobile device click is impossible with my virtual joystick so I set a timeout to open the link */
	setOpenWindow() {
		if (this.isMobile()) {
			if ((this.physic.isLinkedin || this.physic.isGithub) && this.CLICK === 0) {
				++this.CLICK;
				if (this.CLICK === 1 && this.physic.isLinkedin) setTimeout(this.openLinkedin, 2000);
				else if (this.CLICK === 1 && this.physic.isGithub) setTimeout(this.openGithub, 2000);
			}
		}

		if (!this.physic.isLinkedin && !this.physic.isGithub) this.CLICK = 0;
	}

	openLinkedin() {
		if (window.confirm('You will be redirected on my Linkedin profile'))
			window.open("https://www.linkedin.com/in/sandra-boez-224b11b8/", "_blank");
	}

	openGithub() {
		if (window.confirm('You will be redirected on my Github page'))
			window.open("https://github.com/sboez", "_blank");
	}

	isMobile() {
		return ('ontouchstart' in document.documentElement);
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this));

		this.stats.begin();

		this.physic.checkDistance();

		this.scene.controls.target.copy(this.physic.chassisBody.position);
		this.scene.controls.update();

		this.lights.renderAmbiance();

		this.setOpenWindow();

		this.scene.renderer.render(this.scene, this.scene.camera);

		this.updatePhysics();

		this.stats.end();
	}
}

new App();
