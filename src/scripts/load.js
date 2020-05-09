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
						object.receiveShadow = true;
					}
				});
				this.model.add(this.scene.camera);
				this.model.children[0].scale.multiplyScalar(2.6);
				this.model.children[0].position.y -= 0.36;

				this.wheelMeshes = [
					this.model.getChildByName("SR_Veh_Wheel_FL"),
					this.model.getChildByName("SR_Veh_Wheel_FR"),
					this.model.getChildByName("SR_Veh_Wheel_RL"),
					this.model.getChildByName("SR_Veh_Wheel_RR")
				];
				this.scene.add(this.model);
				resolve(this.model);
			});
		});
	}
	loadOther(path) {
		return new Promise((resolve) => {
			const loader = new GLTFLoader();
			loader.load(path, (gltf) => {
				this.other = gltf.scene;
				this.other.traverse((object) => {
					if (object.isMesh) {
						object.castShadow = true;
						object.receiveShadow = true;
					}
				});
				this.other.children[0].scale.multiplyScalar(2);
				this.other.position.set(20, 0, 0);
				this.scene.add(this.other);
				resolve(this.other);
			});
		});
	}
}
