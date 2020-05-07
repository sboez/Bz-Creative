let Scene, Physic, Load;
let wheelBodies = [], wheelVisuals = [];

async function letsPlay() {
	init();
	await Load.loadFile('assets/models/street_car.glb');
	await Load.loadOther('assets/models/motorbike.glb');
	Load.other.userData = { URL: "https://github.com/sboez" };
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
		for (let i = 0; i < Physic.vehicle.wheelInfos.length; ++i) {
			Physic.vehicle.updateWheelTransform(i);
			let t = Physic.vehicle.wheelInfos[i].worldTransform;
			/* update wheel physics */
			wheelBodies[i].position.copy(t.position);
			wheelBodies[i].quaternion.copy(t.quaternion);
			/* update wheel model */
			let w = Load.wheelMeshes[i];
			Scene.scene.attach(w);
			w.quaternion.copy(t.quaternion);
			w.position.copy(wheelBodies[i].position);
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
	Scene.renderer.setSize(window.innerWidth, window.innerHeight);
}

function updatePhysics() {
	Physic.world.step(1 / 60);

	/* update the chassis position */
	Scene.box.position.copy(Physic.chassisBody.position);
	Scene.box.quaternion.copy(Physic.chassisBody.quaternion);

	Load.model.position.copy(Physic.chassisBody.position);
	Load.model.quaternion.copy(Physic.chassisBody.quaternion);

	Load.other.position.copy(Physic.bodyMoto.position);
	Load.other.quaternion.copy(Physic.bodyMoto.quaternion);
}

function animate() {
	Scene.camera.copy(Scene.fakeCamera);
	requestAnimationFrame(animate);
	Scene.renderer.render(Scene.scene, Scene.camera);
	updatePhysics();
}

letsPlay();
