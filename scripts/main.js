let Scene, Load, Physic, timeStep = 1 / 60;;

function letsPlay() {
	init();
	animate();
}

async function init() {
	Scene = new SceneInit();
	Scene.createScene();

	Physic = new PhysicsInit();
	Physic.createWorld();

	Load = new LoadInit();
	await Load.loadFile("assets/models/street_car.glb");

	window.addEventListener('resize', onWindowResize, false);
	document.body.addEventListener('keydown', keyPressed);
	document.body.appendChild(Scene.renderer.domElement);
}

function onWindowResize() {
	Scene.camera.aspect = window.innerWidth / window.innerHeight;
	Scene.camera.updateProjectionMatrix();
	Scene.renderer.setSize(window.innerWidth, window.innerHeight);
}

function updatePhysics() {
	/* Step the physics world */
	Physic.world.step(timeStep);
	/* Copy coordinates from Cannon.js to Three.js */
	Scene.meshBoxCar.position.copy(Physic.bodyCar.position);
	Scene.meshBoxCar.quaternion.copy(Physic.bodyCar.quaternion);

	Load.model.position.copy(Physic.bodyCar.position);
	Load.model.quaternion.copy(Physic.bodyCar.quaternion);
}

function keyPressed(e){
	switch(e.key) {
		case 'ArrowUp':
			Load.model.rotateX(-0.1);
			break;
		case 'ArrowDown':
			Load.model.rotateX(0.1);
			break;
		case 'ArrowLeft':
			Load.model.rotateY(-0.1);
			break;
		case 'ArrowRight':
			Load.model.rotateY(0.1);
			break;
	}
	e.preventDefault();
}

function animate() {
	requestAnimationFrame(animate);
	updatePhysics();
	Scene.renderer.render(Scene.scene, Scene.camera);
}

letsPlay();
