class SceneInit {
	createScene() {
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xebfdff);

		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.set(0, 100, 200);

		let light = new THREE.HemisphereLight(0xffffff, 0x404040, 1); 
		this.scene.add(light);
		/* To visualize physic car */
		this.geometryCar = new THREE.BoxGeometry(30, 23, 62);
		this.materialCar = new THREE.MeshBasicMaterial({ color: 0xff0048, transparent: true, opacity: 0.2});
		this.meshBoxCar = new THREE.Mesh(this.geometryCar, this.materialCar);
		this.scene.add(this.meshBoxCar);

		let plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0xbfbfbf }));
		plane.receiveShadow = true;
		plane.rotation.x = -Math.PI / 2;
		this.scene.add(plane);

		this.createRenderer();
		this.createControls();
	}
	createRenderer() {
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.shadowMap.enabled = true;
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
	createControls() {		
		let controls = new THREE.OrbitControls(Scene.camera, Scene.renderer.domElement);
		controls.update();
	}
}
