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
		this.setExp();
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
		this.skills = ['JS', 'Three.JS', 'C', 'Git', 'HTML5', 'WebGL', 'Blender'];
		this.skillMesh = [];
		this.skillGeo = [];
		this.skillMat = [];

		/* loop in skills name */
		this.loader.load(this.favFont, font => {
			for (let i = 0; i < this.skills.length; ++i) {
				this.skillGeo[i] = new THREE.TextGeometry(this.skills[i], {
				    font: font,
				    size: 1,
				    height: 0.3
				});
				this.skillGeo[i].center();
			}

			/* loop for add skills name in the scene */
			for (let i = 0; i < this.skills.length; ++i) {
				this.skillMat[i] = new THREE.MeshBasicMaterial({ color: 0xffd500 });
				this.skillMesh[i] = new THREE.Mesh(this.skillGeo[i], this.skillMat[i]);
				this.scene.add(this.skillMesh[i]);
			};

			this.skillMat[1].color.setHex(0xff00bf); // Three
			this.skillMat[2].color.setHex(0x1d63f0); // C
			this.skillMat[3].color.setHex(0xf05033); // Git
			this.skillMat[4].color.setHex(0xff1000); // HTML
			this.skillMat[5].color.setHex(0x750510); // WebGL
			this.skillMat[6].color.setHex(0x4acfc1); // Blender
		});
	}

	setYear() {
		this.years = ["42", "2018", "2019", "2020"];
		this.yearMesh = [];
		this.yearGeo = [];
		this.yearMat = [];

		this.loader.load(this.favFont, font => {
			for (let i = 0; i < this.years.length; ++i) {
				this.yearGeo[i] = new THREE.TextGeometry(this.years[i], {
				    font: font,
				    size: 0.8,
				    height: 0.08
				});
				this.yearGeo[i].center();
			}

			/* loop for add years in the scene */
			for (let i = 0; i < this.years.length; ++i) {
				this.yearMat[i] = new THREE.MeshBasicMaterial({ color: 0x962121 });
				this.yearMesh[i] = new THREE.Mesh(this.yearGeo[i], this.yearMat[i]);
				this.yearMesh[i].rotation.y = Math.PI;
				this.yearMesh[i].position.set(10, 5, 30);
				this.scene.add(this.yearMesh[i]);
			};

			this.yearMat[0].color.setHex(0x000000); // 42
			this.yearMesh[0].position.set(0, 10, 30);
			this.yearMesh[2].position.set(0, 5, 30); // 2019
			this.yearMesh[3].position.set(-10, 5, 30); // 2020
		});
	}

	setExp() {
		this.setYear();

		const school42 = "                            2016 - 2019 \nMaking some graphic projects in C langage \nFractals - Wolfenstein 3D - Raytracing";
		const stage1 = "Société Générale - Fullstack JS Developer \nInternship 6 months \nR&D face and objects recognition";
		const stage2 = "MadBox - HTML5 Developer \nInternship 6 months \nMobile video games start-up \nMaking Playables Ads 2D and 3D with Three.JS \nParticipate to an interne editor with React";
		const job1 = "FDJ Gaming Solutions - Front JS Developer \nExtern during a few days \nMaking 2D web games with Typescript and Pixi.js";

		this.exps = [school42, stage1, stage2, job1];
		this.expMesh = [];
		this.expGeo = [];
		this.expMat = [];

		this.loader.load(this.favFont, font => {
			for (let i = 0; i < this.exps.length; ++i) {
				this.expGeo[i] = new THREE.TextGeometry(this.exps[i], {
				    font: font,
				    size: 0.2,
				    height: 0.01
				});
				this.expGeo[i].center();
			}

			/* loop for add exps in the scene */
			for (let i = 0; i < this.exps.length; ++i) {
				this.expMat[i] = new THREE.MeshBasicMaterial({ color: 0x0f0fff });
				this.expMesh[i] = new THREE.Mesh(this.expGeo[i], this.expMat[i]);
				this.expMesh[i].rotation.y = Math.PI;
				this.expMesh[i].position.set(-10, 3, 30);
				this.scene.add(this.expMesh[i]);
			};

			this.expMat[0].color.setHex(0x000000); // 42
			this.expMesh[0].position.set(0, 8, 30);
			this.expMesh[1].position.set(10, 3, 30); // Stage 1 
			this.expMesh[2].position.set(0, 3, 30); // Stage 2
		});
	}
}
