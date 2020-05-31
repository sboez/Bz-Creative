import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

export default class Load {
	constructor(scene) {
		this.scene = scene;
	}

	loadFile(path) {
		return new Promise((resolve) => {
			const loader = new GLTFLoader();
			loader.load(path, gltf => {
				this.model = gltf.scene;
				this.model.traverse((object) => {
					if (object.isMesh) {
						object.castShadow = true;
						object.receiveShadow = false;
					}
				});
				this.model.add(this.scene.camera);
				this.model.children[0].scale.multiplyScalar(2.6);
				this.model.children[0].position.y -= 0.36;

				this.wheelMeshes = [
					this.model.getObjectByName("SR_Veh_Wheel_FL"),
					this.model.getObjectByName("SR_Veh_Wheel_FR"),
					this.model.getObjectByName("SR_Veh_Wheel_RL"),
					this.model.getObjectByName("SR_Veh_Wheel_RR")
				];
				this.scene.add(this.model);
				resolve(this.model);
			});
		});
	}

	loadObj() {
		this.path = ['assets/models/github.glb', 'assets/models/linkedin.glb'];
		this.obj = [];

		return new Promise((resolve) => {
			const loader = new GLTFLoader();
			for (let i = 0; i < this.path.length; ++i) {
				loader.load(this.path[i], gltf => {
					this.obj[i] = gltf.scene;
					this.obj[i].traverse((object) => {
						if (object.isMesh) {
							object.castShadow = true;
							object.receiveShadow = false;
						}
					});
					this.obj[i].children[0].scale.multiplyScalar(1);
					this.obj[i].position.set(-29, 3, 21);
					this.scene.add(this.obj[i]);
					resolve(this.obj[i]);
				});
			};
		});
	}

	loadRoom(path) {
		return new Promise((resolve) => {
			const loader = new GLTFLoader();
			loader.load(path, gltf => {
				this.room = gltf.scene;
				this.room.traverse((object) => {
					if (object.isMesh) {
						object.castShadow = true;
						object.receiveShadow = false;
					}
				});
				this.room.scale.multiplyScalar(7.53);
				this.scene.add(this.room);
				resolve(this.room);
			});
		});
	}

	// initSkills() {
	// 	this.skills = [];
	// 	return new Promise((resolve) => {
	// 		for (let i = 0; i < this.room.children.length; ++i) {
	// 			if (this.room.children[i].name.match('skill_')) {
	// 				this.skills[i] = this.room.children[i].name.split('skill_').pop();
	// 			}
	// 		}
	// 		if (this.skills[11] === "JS") {
	// 			this.skillJS = new THREE.Mesh(this.skills[11].geometry, this.skills[11].material);
	// 			this.scene.add(this.skillJS);
	// 		}
	// 		resolve(this.skillJS);
	// 	});
	// }
}
