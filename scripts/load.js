class LoadInit {
	loadFile(path) {
		return new Promise((resolve) => {
			const loader = new THREE.GLTFLoader()
			loader.load(path, (gltf) => {
				this.model = gltf.scene;
				this.model.traverse((object) => {
					if (object.isMesh) {
						object.castShadow = true;
						object.receiveShadow = true;
					}
				});
				this.model.scale.multiplyScalar(1);
				Scene.scene.add(this.model);

				this.animation = gltf.animations;
				resolve(this.model);
			});
		});
	}
}
