let wheelBodies = [];
let wheelVisuals = [];

function letsPlay() {
	init();
	animate();
}

function init() {
	Scene = new SceneInit();
	Scene.createScene();

	Physic = new PhysicsInit();
	Physic.createWorld();

	/* update the wheels to match the physics */
	Physic.world.addEventListener('postStep', function() {
		for (var i=0; i<Physic.vehicle.wheelInfos.length; i++) {
			Physic.vehicle.updateWheelTransform(i);
			var t = Physic.vehicle.wheelInfos[i].worldTransform;
			/* update wheel physics */
			wheelBodies[i].position.copy(t.position);
			wheelBodies[i].quaternion.copy(t.quaternion);
			/* update wheel visuals */
			wheelVisuals[i].position.copy(t.position);
			wheelVisuals[i].quaternion.copy(t.quaternion);
		}
	});
	document.body.appendChild(Scene.renderer.domElement);
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('keydown', keyboardEvent)
	window.addEventListener('keyup', keyboardEvent)
}

function onWindowResize() {
	Scene.camera.aspect = window.innerWidth / window.innerHeight;
	Scene.camera.updateProjectionMatrix();
	Scene.renderer.setSize( window.innerWidth, window.innerHeight );
}

function updatePhysics() {
  Physic.world.step(1 / 60);
  /* update the chassis position */
  Scene.box.position.copy(Physic.chassisBody.position);
  Scene.box.quaternion.copy(Physic.chassisBody.quaternion);
}

function animate() {
  requestAnimationFrame(animate);
  Scene.renderer.render(Scene.scene, Scene.camera);
  updatePhysics();
}

letsPlay();
