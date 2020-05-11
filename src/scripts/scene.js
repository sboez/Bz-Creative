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

		/* to enable orbitcontrols car model */
		this.fakeCamera = this.camera.clone();

		this.setGround();
		this.setCeiling();
		this.setWalls();
		this.setRenderer();
		this.setControls();
	}

	setGround() {
		this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(60, 60), new THREE.MeshPhysicalMaterial({
			color: 0x444463,
			clearcoat: 1,
			reflectivity: 1,
			metalness: 0.4,
			side: THREE.BackSide
		}));

		this.plane.receiveShadow = true;
		this.plane.rotation.x = Math.PI / 2;
		this.add(this.plane);
	}

	setCeiling() {
		this.ceiling = new THREE.Mesh(new THREE.PlaneBufferGeometry(60, 60), new THREE.MeshPhysicalMaterial({
			color: 0x6f609b,
			clearcoat: 1,
			reflectivity: 1,
			metalness: 0.4
		}));

		this.ceiling.receiveShadow = true;
		this.ceiling.position.y = 30;
		this.ceiling.rotation.x = Math.PI / 2;
		this.add(this.ceiling);
	}

	setWalls() {
		this.wallMesh = [];
		for (let i = 0; i < 4; ++i) {
			this.wallMesh[i] = new THREE.Mesh(new THREE.PlaneBufferGeometry(60, 30), new THREE.MeshPhysicalMaterial({
				color: 0xe6e6e6
			}));
			this.wallMesh[i].position.y = 15;
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
