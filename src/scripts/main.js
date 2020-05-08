import * as THREE from 'three';
import SceneInit from './scene';
// import PhysicsInit from './physics';
import LoadInit from './load';
import KeyInit from './keyboardEvent';

let Scene, Physic, Load, Key;
let wheelBodies = [], wheelVisuals = [];

async function letsPlay() {
	init();
	// await Load.loadFile('assets/models/street_car.glb');
	// await Load.loadOther('src/assets/models/motorbike.glb');
	// Load.other.userData = { URL: "https://github.com/sboez" };
	animate();
}

function init() {
	Scene = new SceneInit();
	Scene.createScene();

	Load = new LoadInit();
	Key = new KeyInit();

	// Physic = new PhysicsInit();
	// Physic.createWorld();

	/* update the wheels to match the physics */
	// Physic.world.addEventListener('postStep', function() {
	// 	for (let i = 0; i < Physic.vehicle.wheelInfos.length; ++i) {
	// 		Physic.vehicle.updateWheelTransform(i);
	// 		let t = Physic.vehicle.wheelInfos[i].worldTransform;
	// 		/* update wheel physics */
	// 		wheelBodies[i].position.copy(t.position);
	// 		wheelBodies[i].quaternion.copy(t.quaternion);
	// 		/* update wheel model */
	// 		let w = Load.wheelMeshes[i];
	// 		Scene.scene.attach(w);
	// 		w.quaternion.copy(t.quaternion);
	// 		w.position.copy(wheelBodies[i].position);
	// 	}
	// });

	// var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
	// var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
	// var materialArray = [ materialFront, materialSide ];
	// var textGeom = new THREE.TextGeometry( "Hello, World!", 
	// {
	// 	size: 30, height: 4, curveSegments: 3,
	// 	font: "helvetiker", weight: "bold", style: "normal",
	// 	bevelThickness: 1, bevelSize: 2, bevelEnabled: true,
	// 	material: 0, extrudeMaterial: 1
	// });
	// // font: helvetiker, gentilis, droid sans, droid serif, optimer
	// // weight: normal, bold
	
	// var textMaterial = new THREE.MeshFaceMaterial(materialArray);
	// var textMesh = new THREE.Mesh(textGeom, textMaterial );
	
	// textGeom.computeBoundingBox();
	// var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
	
	// textMesh.position.set( -0.5 * textWidth, 50, 100 );
	// textMesh.rotation.x = -Math.PI / 4;
	// Scene.scene.add(textMesh);

	document.body.appendChild(Scene.renderer.domElement);
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('keydown', Key.keyboardEvent);
	window.addEventListener('keyup', Key.keyboardEvent);
}

function onWindowResize() {
	Scene.camera.aspect = window.innerWidth / window.innerHeight;
	Scene.camera.updateProjectionMatrix();
	Scene.renderer.setSize(window.innerWidth, window.innerHeight);
}

// function updatePhysics() {
// 	Physic.world.step(1 / 60);

// 	/* update the chassis position */
// 	Scene.box.position.copy(Physic.chassisBody.position);
// 	Scene.box.quaternion.copy(Physic.chassisBody.quaternion);

// 	Load.model.position.copy(Physic.chassisBody.position);
// 	Load.model.quaternion.copy(Physic.chassisBody.quaternion);

// 	Load.other.position.copy(Physic.bodyMoto.position);
// 	Load.other.quaternion.copy(Physic.bodyMoto.quaternion);
// }

function animate() {
	// Load.model.position.z >= 15 ? Scene.pointLight.color.set(0xffffff) : Scene.pointLight.color.set(0x000000);
	// Scene.camera.copy(Scene.fakeCamera);
	requestAnimationFrame(animate);
	Scene.renderer.render(Scene.scene, Scene.camera);
	// updatePhysics();
}

letsPlay();
