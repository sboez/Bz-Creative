let clock, mixer, Scene, Load;
document.onkeydown = handler;
document.onkeyup = handler;

async function letsPlay() {
	init();
	await Load.loadFile('assets/models/Xbot.glb');
	mixer = new THREE.AnimationMixer(Load.model);
	animModel();
	animate();
}

function init() {
	clock = new THREE.Clock();

	Scene = new SceneInit();
	Scene.createScene();

	Load = new LoadInit();

	document.body.appendChild(Scene.renderer.domElement);
	window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
	Scene.camera.aspect = window.innerWidth / window.innerHeight;
	Scene.camera.updateProjectionMatrix();
	Scene.renderer.setSize( window.innerWidth, window.innerHeight );
}

function animModel() {
	idleAction = mixer.clipAction(Load.animation[0]);
	walkAction = mixer.clipAction(Load.animation[3]);

	idleAction.play();
}

function handler(event) {
    let up = (event.type == 'keyup');

    if(!up && event.type !== 'keydown') return;

    if (up) {
    	console.log("up was called !");
    	walkAction.stop();
    	idleAction.play();
    } else if (event.keyCode == 87) {
    	console.log("W key down");
		walkAction.play();
    	idleAction.stop();
    }
}

function animate() {
	requestAnimationFrame(animate);
	let mixerUpdateDelta = clock.getDelta();
	mixer.update(mixerUpdateDelta);
	Scene.renderer.render(Scene.scene, Scene.camera);
}

letsPlay();
