class LoadInit {
	loadFile(path) {
			const loader = new THREE.GLTFLoader()
			loader.load(path, (gltf) => {
				this.model = gltf.scene;
				this.model.traverse((child) => {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
				});
				this.model.scale.multiplyScalar(2);
				Scene.scene.add(this.model);
		});
	}
}
