class SceneInit {
	createScene() {
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xa0a0a0);

		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
		this.camera.position.set(0, 5, 10);

		let light = new THREE.HemisphereLight(0xffffff, 0x404040, 1); 
		this.scene.add(light);
		/* To visualize physic car */
		this.geoPlayer = new THREE.BoxGeometry(1, 2, 1);
		this.matPlayer = new THREE.MeshBasicMaterial({ color: 0xff0048, transparent: true, opacity: 0.2});
		this.meshBoxPlayer = new THREE.Mesh(this.geoPlayer, this.matPlayer);
		this.scene.add(this.meshBoxPlayer);
		/* Box colision test */
		this.geoTest = new THREE.BoxGeometry(2, 2, 2);
		this.matTest = new THREE.MeshBasicMaterial({ color: 0x00ff48, transparent: true, opacity: 0.2});
		this.meshBoxTest = new THREE.Mesh(this.geoTest, this.matTest);
		this.scene.add(this.meshBoxTest);

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
		let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		controls.target.set(0, 1, 0);
		controls.update();
	}
}
