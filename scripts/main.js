let Scene, Physic, Load;
let wheelBodies = [], wheelVisuals = [];

async function letsPlay() {
	init();
	await Load.loadFile('assets/models/street_car2.glb');
	animate();
}

function init() {
	Scene = new SceneInit();
	Scene.createScene();

	Load = new LoadInit();

	Physic = new PhysicsInit();
	Physic.createWorld();

	/* update the wheels to match the physics */
	Physic.world.addEventListener('postStep', function() {
		for (var i = 0; i < Physic.vehicle.wheelInfos.length; ++i) {
			Physic.vehicle.updateWheelTransform(i);
			let t = Physic.vehicle.wheelInfos[i].worldTransform;
			/* update wheel physics */
			wheelBodies[i].position.copy(t.position);
			wheelBodies[i].quaternion.copy(t.quaternion);
			/* update wheel visuals */
			wheelVisuals[i].position.copy(t.position);
			wheelVisuals[i].quaternion.copy(t.quaternion);
			/* update wheel model */
			let w = Load.wheelMeshes[i];
			let savePar = w.parent;
			Scene.scene.attach(w);
			w.quaternion.copy(t.quaternion);
			w.position.copy(wheelBodies[i].position);
			savePar.attach(w)
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

  Load.model.position.copy(Physic.chassisBody.position);
  Load.model.quaternion.copy(Physic.chassisBody.quaternion);

  Scene.meshBoxTest.position.copy(Physic.bodyTest.position);
  Scene.meshBoxTest.quaternion.copy(Physic.bodyTest.quaternion);
}

function animate() {
  requestAnimationFrame(animate);
  Scene.renderer.render(Scene.scene, Scene.camera);
  updatePhysics();
}

letsPlay();
