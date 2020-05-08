import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class SceneInit {
	createScene() {
		this.scene = new THREE.Scene();
		this.scene.fog = new THREE.Fog(0x6f609b, 10, 80);
		this.scene.background = new THREE.Color(0x6f609b);

		this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1);
		this.camera.position.set(-5, 5, -10);
		this.camera.lookAt(this.scene.position);

		/* to enable orbitcontrols car model */
		this.fakeCamera = this.camera.clone();

		/* to visualize physic car */
		this.geometry = new THREE.BoxGeometry(2, 0.6, 4);
		this.material = new THREE.MeshBasicMaterial({color: 0xff0048, transparent: true, opacity: 0.4, side: THREE.DoubleSide});
		this.box = new THREE.Mesh(this.geometry, this.material);
		// this.scene.add(this.box);

		/* to visualize physic moto */
		this.geoMoto = new THREE.BoxGeometry(0.6, 3, 3);
		this.matMoto = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.4});
		this.meshMoto = new THREE.Mesh(this.geoMoto, this.matMoto);
		// this.scene.add(this.meshMoto);
		this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100), new THREE.MeshPhongMaterial({
			color: 0x444463,
			emissive: 0x666666,
			specular: 0x666666,
			shininess: 8,
			side: THREE.DoubleSide
		}));
		this.plane.receiveShadow = true;
		this.plane.rotation.x = Math.PI / 2;
		this.scene.add(this.plane);

		this.setLights();
		this.setRenderer();
		this.setControls();
	}
	setLights() {
		let hemlight = new THREE.HemisphereLight(0xffffff, 0x404040, 1); 
		this.scene.add(hemlight);

		let light = new THREE.DirectionalLight(0xffffff, .1);
		light.castShadow = true;
		light.position.set(10, 50, 10)

		/* set up shadow properties for the shadow casting directional light */
		light.shadow.mapSize.width = 1024;
		light.shadow.mapSize.height = 1024;
		light.shadow.camera.near = 0.5;
		light.shadow.camera.far = 500;
		let mapArea = 100
		light.shadow.camera.left = light.shadow.camera.bottom = -mapArea
		light.shadow.camera.top = light.shadow.camera.right = mapArea
		light.shadow.bias = -0.001
		this.scene.add(light);

		/* point lights */
		this.pointLight = new THREE.PointLight(0xffffff, 10, 6);
		this.pointLight.position.set(10, 5, 20);
		this.scene.add(this.pointLight);
	}
	setRenderer() {
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.shadowMap.enabled = true;
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
	setControls() {		
		let controls = new OrbitControls(this.fakeCamera, this.renderer.domElement);
		controls.update();
	}
}
