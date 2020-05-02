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
				this.model.traverse((e) => {
					if(e.isMesh) e.geometry.translate(0,0,1.2);
				});
				Scene.scene.add(this.model);
				resolve(gltf.scene);
			});
		});
	}
}
