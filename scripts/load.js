class LoadInit {
	loadFile(path) {
		return new Promise((resolve) => {
			const loader = new THREE.GLTFLoader()
			loader.load(path, (gltf) => {
				gltf.scene.traverse((object) => {
					if (object.isMesh) {
						object.castShadow = true;
						object.receiveShadow = true;
					}
				});
   				gltf.scene.children[0].scale.multiplyScalar(2.6);
    			gltf.scene.children[0].position.y -= 0.63;
				this.model = gltf.scene;
				Scene.scene.add(this.model);
				resolve(this.model);
			});
		});
	}
}
