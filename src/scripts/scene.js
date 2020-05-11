import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

export default class Scene extends THREE.Scene {
	constructor() {
		super();
		this.setScene();
	}

	setScene() {
		this.fog = new THREE.Fog(0x6f609b, 10, 80);
		this.background = new THREE.Color(0x6f609b);

		this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
		this.camera.position.set(-5, 5, -10);

		/* to enable orbitcontrols car model */
		this.fakeCamera = this.camera.clone();

		this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100), new THREE.MeshPhongMaterial({
			color: 0x444463,
			emissive: 0x666666,
			specular: 0x666666,
			shininess: 8,
			side: THREE.BackSide
		}));
		this.plane.receiveShadow = true;
		this.plane.rotation.x = Math.PI / 2;
		this.add(this.plane);

		this.setWalls();
		this.setLights();
		this.setRenderer();
		this.setControls();
	}

	setWalls() {
		this.wallMesh = [];
		for (let i = 0; i < 4; ++i) {
			this.wallMesh[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(65, 65), new THREE.MeshPhongMaterial({
				color: 0x444463,
				emissive: 0x666666,
				specular: 0x666666,
				shininess: 8
			}));
			this.wallMesh[i].receiveShadow = true;
			this.add(this.wallMesh[i]);
		}

		this.wallMesh[0].position.x = 30; // Left
		this.wallMesh[0].rotation.y = Math.PI / 2;
		this.wallMesh[0].material.side = THREE.BackSide;

		this.wallMesh[1].position.x = -30; // Right
		this.wallMesh[1].rotation.y = Math.PI / 2;

		this.wallMesh[2].position.z = -30; //Back
		this.wallMesh[2].rotation.z = Math.PI;

		this.wallMesh[3].position.z = 30; // Front
		this.wallMesh[3].rotation.z = Math.PI;
		this.wallMesh[3].material.side = THREE.BackSide;
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
