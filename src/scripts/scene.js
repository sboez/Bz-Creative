import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

export default class Scene extends THREE.Scene {
	constructor() {
		super();
		this.setScene();
	}

	setScene() {
		this.background = new THREE.Color(0xe6e6e6);

		this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
		this.camera.position.set(-5, 5, -10);
		this.add(this.camera);

		this.setShelf();
		this.setRamp();
		this.setRenderer();
		this.setControls();
	}

	setShelf() {
		this.shelf = new THREE.Mesh(new THREE.BoxBufferGeometry(45, 4, 0.5), new THREE.MeshBasicMaterial({
			color: 0x6f609b,
			side: THREE.FrontSide
		}));

		this.shelf.position.set(28, 5, -7.5);
		this.shelf.rotation.set(Math.PI / 2, 0, Math.PI / 2);
		this.shelf.updateMatrixWorld();
		this.shelf.matrixAutoUpdate = false;
		this.add(this.shelf);
	}

	setRamp() {
		this.ramp = new THREE.Mesh(new THREE.BoxGeometry(18, 0.5, 15), new THREE.MeshBasicMaterial({
			color: 0xff0048,
			wireframe: true
		}));
		this.add(this.ramp);
	}

	setRenderer() {
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		window.renderInfo = this.renderer.info;
	}

	setControls() {		
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.controls.update();
	}
}
