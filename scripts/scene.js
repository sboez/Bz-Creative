class SceneInit {
	createScene() {
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xa0a0a0);

		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
		this.camera.position.set(0, 5, 10);
		/* To visualize physic car */
		this.geometry = new THREE.BoxGeometry(2, 0.6, 4); // double chasis shape
		this.material = new THREE.MeshBasicMaterial({color: 0xff0048, transparent: true, opacity: 0.4, side: THREE.DoubleSide});
		this.box = new THREE.Mesh(this.geometry, this.material);
		this.scene.add(this.box);
		/* Box colision test */
		this.geoTest = new THREE.BoxGeometry(2, 2, 2);
		this.matTest = new THREE.MeshBasicMaterial({ color: 0x00ff48, transparent: true, opacity: 0.2});
		this.meshBoxTest = new THREE.Mesh(this.geoTest, this.matTest);
		// this.scene.add(this.meshBoxTest);		

		this.plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0xbfbfbf, side: THREE.DoubleSide }));
		this.plane.receiveShadow = true;
		this.plane.rotation.x = Math.PI / 2;
		this.scene.add(this.plane);

		this.setLights();
		this.setRenderer();
		this.setControls();
	}
	setLights() 
	{
		let hemlight = new THREE.HemisphereLight(0xffffff, 0x404040, 1); 
		this.scene.add(hemlight);

		let light = new THREE.DirectionalLight(0xffffff, .1); 
	    light.castShadow = true;
	    light.position.set(10, 50, 10)

		/* Set up shadow properties for the shadow casting directional light */
		light.shadow.mapSize.width = 1024;
		light.shadow.mapSize.height = 1024;
		light.shadow.camera.near = 0.5;
		light.shadow.camera.far = 500;
		let mapArea = 100
		light.shadow.camera.left = light.shadow.camera.bottom = -mapArea
		light.shadow.camera.top = light.shadow.camera.right = mapArea
		light.shadow.bias = -0.001
		this.scene.add(light);
	}
	setRenderer() {
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.shadowMap.enabled = true;
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
	setControls() {		
		let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
		controls.target.set(0, 1, 0);
		controls.update();
	}
	visualizeWheels(wheel, wheelVisuals) {
		this.geoWheels = new THREE.CylinderGeometry(wheel.radius, wheel.radius, 0.4, 32);
		this.matWheels = new THREE.MeshBasicMaterial({
			color: 0xd0901d,
			transparent: true, 
			opacity: 0.8,
			side: THREE.DoubleSide,
		});
		this.cylinder = new THREE.Mesh(this.geoWheels, this.matWheels);
		this.geoWheels.rotateZ(Math.PI / 2);
		wheelVisuals.push(this.cylinder);
		this.scene.add(this.cylinder);
	}
}
