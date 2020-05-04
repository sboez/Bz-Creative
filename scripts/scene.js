class SceneInit {
	createScene() {
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xa0a0a0);
		this.scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
		this.camera.position.set(- 1, 2, 3);

		let light = new THREE.HemisphereLight(0xffffff, 0x404040, 1); 
		this.scene.add(light);
		/* To visualize physic car */
		this.geometryCar = new THREE.BoxGeometry(25, 50, 10);
		this.materialCar = new THREE.MeshBasicMaterial({ color: 0xff0048, transparent: true, opacity: 0.2});
		this.meshBoxCar = new THREE.Mesh(this.geometryCar, this.materialCar);
		// this.scene.add(this.meshBoxCar);
		/* Box colision test */
		this.geoTest = new THREE.BoxGeometry(20, 25, 25);
		this.matTest = new THREE.MeshBasicMaterial({ color: 0x00ff48, transparent: true, opacity: 0.2});
		this.meshBoxTest = new THREE.Mesh(this.geoTest, this.matTest);
		// this.scene.add(this.meshBoxTest);

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
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
	createControls() {		
		let controls = new THREE.OrbitControls(Scene.camera, Scene.renderer.domElement);
		controls.target.set(0, 1, 0);
		controls.update();
	} 
}
