let Scene;
var model, mixer, clock;

var crossFadeControls = [];

var currentBaseAction = 'idle';
const allActions = [];
const baseActions = {
	idle: { weight: 1 },
	walk: { weight: 0 },
	run: { weight: 0 }
};
const additiveActions = {
	sneak_pose: { weight: 0 },
	sad_pose: { weight: 0 },
	agree: { weight: 0 },
	headShake: { weight: 0 }
};
var panelSettings, numAnimations;

init();

function init() {
	clock = new THREE.Clock();

	Scene = new SceneInit();
	Scene.createScene();

	const loader = new THREE.GLTFLoader();
	loader.load('assets/models/Xbot.glb', (gltf) => {
		model = gltf.scene;
		model.traverse((object) => {
			if (object.isMesh) {
				object.castShadow = true;
				object.receiveShadow = true;
			}
		});
		model.scale.multiplyScalar(0.8);
		Scene.scene.add(model);

		var animations = gltf.animations;
		mixer = new THREE.AnimationMixer(model);

		numAnimations = animations.length;

		for (let i = 0; i !== numAnimations; ++i) {
			let clip = animations[i];
			const name = clip.name;
			if (baseActions[name]) {
				const action = mixer.clipAction(clip);
				activateAction(action);
				baseActions[name].action = action;
				allActions.push(action);
			} else if (additiveActions[name]) {
				/* Make the clip additive and remove the reference frame */
				THREE.AnimationUtils.makeClipAdditive(clip);
				if (clip.name.endsWith('_pose')) {
					clip = THREE.AnimationUtils.subclip(clip, clip.name, 2, 3, 30);
				}
				const action = mixer.clipAction(clip);
				activateAction(action);
				additiveActions[name].action = action;
				allActions.push(action);
			}
		}
		createPanel();
		animate();
	});
	document.body.appendChild(Scene.renderer.domElement);
	window.addEventListener('resize', onWindowResize, false);
}

function createPanel() {
	var panel = new dat.GUI({ width: 310 });
	var folder1 = panel.addFolder('Base Actions');
	var folder3 = panel.addFolder('General Speed');
	panelSettings = {
		'modify time scale': 1.0
	};
	const baseNames = ['None', ...Object.keys(baseActions)];

	for (let i = 0, l = baseNames.length; i !== l; ++i) {
		const name = baseNames[ i ];
		const settings = baseActions[ name ];
		panelSettings[ name ] = function () {
			const currentSettings = baseActions[ currentBaseAction ];
			const currentAction = currentSettings ? currentSettings.action : null;
			const action = settings ? settings.action : null;

			prepareCrossFade( currentAction, action, 0.35 );
		};
		crossFadeControls.push(folder1.add(panelSettings, name));
	}

	for (const name of Object.keys(additiveActions)) {
		const settings = additiveActions[name];
		panelSettings[name] = settings.weight;
	}

	folder3.add(panelSettings, 'modify time scale', 0.0, 1.5, 0.01).onChange(modifyTimeScale);

	folder1.open();
	folder3.open();

	crossFadeControls.forEach( function (control) {
		control.classList1 = control.domElement.parentElement.parentElement.classList;
		control.classList2 = control.domElement.previousElementSibling.classList;

		control.setInactive = () => {
			control.classList2.add('control-inactive');
		};

		control.setActive = () => {
			control.classList2.remove('control-inactive');
		};

		const settings = baseActions[control.property];

		if (!settings || !settings.weight) control.setInactive();
	});
}

function activateAction(action) {
	const clip = action.getClip();
	const settings = baseActions[clip.name] || additiveActions[clip.name];
	setWeight(action, settings.weight);
	action.play();
}

function modifyTimeScale(speed) {
	mixer.timeScale = speed;
}

function prepareCrossFade(startAction, endAction, duration) {
	// If the current action is 'idle', execute the crossfade immediately;
	// else wait until the current action has finished its current loop
	if (currentBaseAction === 'idle' || ! startAction || ! endAction) executeCrossFade(startAction, endAction, duration);
	else synchronizeCrossFade(startAction, endAction, duration);

	/* Update control colors */
	if (endAction) {
		const clip = endAction.getClip();
		currentBaseAction = clip.name;
	} 
	else currentBaseAction = 'None';

	crossFadeControls.forEach((control) => {
		const name = control.property;
		if (name === currentBaseAction) control.setActive();
		else control.setInactive();
	});
}

function synchronizeCrossFade(startAction, endAction, duration) {
	mixer.addEventListener('loop', onLoopFinished);
	function onLoopFinished(event) {
		if (event.action === startAction) {
			mixer.removeEventListener('loop', onLoopFinished);
			executeCrossFade(startAction, endAction, duration);
		}
	}
}

function executeCrossFade(startAction, endAction, duration) {
	/* 	Not only the start action, but also the end action must get a weight of 1 before fading
		(concerning the start action this is already guaranteed in this place) */
	if (endAction) {
		setWeight(endAction, 1);
		endAction.time = 0;
		// Crossfade with warping
		if (startAction) startAction.crossFadeTo(endAction, duration, true);
		else endAction.fadeIn(duration); 
	} 
	else startAction.fadeOut(duration);
}

/* 	This function is needed, since animationAction.crossFadeTo() disables its start action and sets
	the start action's timeScale to ((start animation's duration) / (end animation's duration)) */
function setWeight( action, weight ) {
	action.enabled = true;
	action.setEffectiveTimeScale(1);
	action.setEffectiveWeight(weight);
}

function onWindowResize() {
	Scene.camera.aspect = window.innerWidth / window.innerHeight;
	Scene.camera.updateProjectionMatrix();
	Scene.renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame(animate);

	for (let i = 0; i !== numAnimations; ++ i) {
		const action = allActions[i];
		const clip = action.getClip();
		const settings = baseActions[ clip.name ] || additiveActions[clip.name];
		settings.weight = action.getEffectiveWeight();
	}

	var mixerUpdateDelta = clock.getDelta();
	mixer.update(mixerUpdateDelta);
	Scene.renderer.render(Scene.scene, Scene.camera);
}

