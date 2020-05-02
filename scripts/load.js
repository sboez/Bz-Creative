class LoadInit {
	loadFile(path) {
		return new Promise((resolve) => {
			const loader = new THREE.GLTFLoader()
			loader.load(path, (gltf) => {
				gltf.scene.traverse((child) => {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				this.model = gltf.scene;
				this.model.scale.multiplyScalar(40);
				Scene.scene.add(this.model);
				resolve(gltf.scene);
			});
		});
	}
}
