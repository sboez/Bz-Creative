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

		/* Box colision test */
		this.geoTest = new THREE.BoxGeometry(1.6, 0.8, 0.6);
		this.matTest = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.2});
		this.meshBoxTest = new THREE.Mesh(this.geoTest, this.matTest);
		this.add(this.meshBoxTest);

		this.setRenderer();
		this.setControls();
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
