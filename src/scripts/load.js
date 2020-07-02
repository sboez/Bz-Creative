import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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
				// this.model.add(this.scene.camera);
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

				/* to have physics and glb room at the same scale */
				const roomScale = 7.53

                for(let i = 0; i < this.room.children.length; ++i) { 
                    let child = this.room.children[i]
                    child.position.multiplyScalar(roomScale);
                    child.scale.multiplyScalar(roomScale);
                }

				this.scene.add(this.room);
				resolve(this.room);
			});
		});
	}

	initSkills() {
		this.skills = [];

		return new Promise((resolve) => {
			for (let i = 0; i < this.room.children.length; ++i) {
				if (this.room.children[i].name.match('skill_')) {
					this.skills[i] = this.room.children[i];
				}
			}
			resolve(this.skills);
		});
	}
}
