let clock, mixer, Scene;

init();

function init() {
	clock = new THREE.Clock();

	Scene = new SceneInit();
	Scene.createScene();

	const loader = new THREE.GLTFLoader();
	loader.load('assets/models/Xbot.glb', (gltf) => {
		let model = gltf.scene;
		model.traverse((object) => {
			if (object.isMesh) {
				object.castShadow = true;
				object.receiveShadow = true;
			}
		});
		model.scale.multiplyScalar(0.8);
		Scene.scene.add(model);

		let animation = gltf.animations;
		mixer = new THREE.AnimationMixer(model);

		idleAction = mixer.clipAction(animation[0]);
		walkAction = mixer.clipAction(animation[3]);
		
		idleAction.play();

		animate();
	});
	document.body.appendChild(Scene.renderer.domElement);
	window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
	Scene.camera.aspect = window.innerWidth / window.innerHeight;
	Scene.camera.updateProjectionMatrix();
	Scene.renderer.setSize( window.innerWidth, window.innerHeight );
}

document.onkeydown = handler;
document.onkeyup = handler;

function handler(event) {
    var up = (event.type == 'keyup');

    if(!up && event.type !== 'keydown'){
        return;
    }

    if (up) idleAction.play();

    switch(event.keyCode) {
	    case 87: // forward - W
			walkAction.play();
			break;
	}
}

function animate() {
	requestAnimationFrame(animate);
	let mixerUpdateDelta = clock.getDelta();
	mixer.update(mixerUpdateDelta);
	Scene.renderer.render(Scene.scene, Scene.camera);
}
