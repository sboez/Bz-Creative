document.onkeydown = handler;
document.onkeyup = handler;
let clock, mixer, timeStep = 1/60, Scene, Load, Physic;
let rotationSpeed = 0;

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

	Physic = new PhysicsInit();
	Physic.createWorld();

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

function goWalk(){
	walkAction.play();
	idleAction.stop();
}

function goIdle() {
	walkAction.stop();
	idleAction.play();
}

function handler(event) {
	let eulerAngle = {};
	Physic.bodyPlayer.quaternion.toEuler(eulerAngle);
	eulerAngle.y += rotationSpeed;
	Physic.bodyPlayer.quaternion.setFromEuler(eulerAngle.x, eulerAngle.y, eulerAngle.z);
	let theta = eulerAngle.y;
	Physic.bodyPlayer.angularVelocity.set(0, 0, 0);

    let up = (event.type == 'keyup');
    if(!up && event.type !== 'keydown') return;

	if (up) goIdle();
    else {
	    switch(event.keyCode) {
	    	case 87:
		    	goWalk();
		    	Physic.bodyPlayer.velocity.set(40 * Math.sin(theta), 0, 40 * Math.cos(theta));
		    	break;

	    	case 83:
		    	goWalk();
		    	Physic.bodyPlayer.velocity.set(40 * Math.sin(theta), 0, -40 * Math.cos(theta));
	    	break;

	    	case 65:
		    	goWalk();
		    	rotationSpeed = 0.1;
				Physic.bodyPlayer.velocity.set(0 * Math.sin(theta), 0, 0 * Math.cos(theta));
	    	break;

	    	case 68:
		    	goWalk();
				rotationSpeed = -0.1;
				Physic.bodyPlayer.velocity.set(0 * Math.sin(theta), 0, 0 * Math.cos(theta));
	    	break;
	    }
	}
}

function updatePhysics() {
	/* Step the physics world */
	Physic.world.step(timeStep);
	/* Copy coordinates from Cannon.js to Three.js */
    Scene.meshBoxPlayer.position.copy(Physic.bodyPlayer.position);
    Scene.meshBoxPlayer.quaternion.copy(Physic.bodyPlayer.quaternion);
	Load.model.position.copy(Physic.bodyPlayer.position);
	Load.model.quaternion.copy(Physic.bodyPlayer.quaternion);

	Scene.meshBoxTest.position.copy(Physic.body.position);
	Scene.meshBoxTest.quaternion.copy(Physic.body.quaternion);
}

function animate() {
	requestAnimationFrame(animate);
	let mixerUpdateDelta = clock.getDelta();
	mixer.update(mixerUpdateDelta);
	updatePhysics();
	Scene.renderer.render(Scene.scene, Scene.camera);
}

letsPlay();
