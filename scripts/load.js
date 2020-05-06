class LoadInit {
	loadFile(path) {
		return new Promise((resolve) => {
			const loader = new THREE.GLTFLoader();
			loader.load(path, (gltf) => {
				this.model = gltf.scene;
				this.model.traverse((object) => {
					if (object.isMesh) {
						object.castShadow = true;
						object.receiveShadow = true;
					}
				});
   				this.model.children[0].scale.multiplyScalar(2.6);
    			this.model.children[0].position.y -= 0.36;

    			this.wheelMeshes = [
					gltf.scene.getChildByName("SR_Veh_Wheel_FL"),
					gltf.scene.getChildByName("SR_Veh_Wheel_FR"),
					gltf.scene.getChildByName("SR_Veh_Wheel_RL"),
					gltf.scene.getChildByName("SR_Veh_Wheel_RR")
				];
				Scene.scene.add(this.model);
				resolve(this.model);
			});
		});
	}
}
