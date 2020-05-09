import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

export default class Scene extends THREE.Scene {
	constructor() {
		super();
		this.createScene();
	}

	createScene() {
		this.fog = new THREE.Fog(0x6f609b, 10, 80);
		this.background = new THREE.Color(0x6f609b);

		this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
		this.camera.position.set(-5, 5, -10);
		this.camera.lookAt(this.position);

		/* to enable orbitcontrols car model */
		this.fakeCamera = this.camera.clone();

		this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100), new THREE.MeshPhongMaterial({
			color: 0x444463,
			emissive: 0x666666,
			specular: 0x666666,
			shininess: 8,
			side: THREE.DoubleSide
		}));
		this.plane.receiveShadow = true;
		this.plane.rotation.x = Math.PI / 2;
		this.add(this.plane);

		this.setLights();
		this.setRenderer();
		this.setControls();
	}

	setLights() {
		let hemlight = new THREE.HemisphereLight(0xffffff, 0x404040, 1); 
		this.add(hemlight);

		/* point lights */
		this.pointLight = new THREE.PointLight(0xffffff, 10, 6);
		this.pointLight.position.set(10, 5, 20);
		this.add(this.pointLight);
	}

	setRenderer() {
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.depth = false;
		this.renderer.powerPreference = "high-performance";
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	setControls() {		
		let controls = new OrbitControls(this.fakeCamera, this.renderer.domElement);
		controls.update();
	}
}
