class PhysicsInit {
	createWorld() {
		let mass = 150;
		let groundMaterial = new CANNON.Material("groundMaterial");
		let wheelMaterial = new CANNON.Material("wheelMaterial");
		/* Set the world */
		this.world = new CANNON.World();
		this.world.gravity.set(0, -70, 0);
		this.world.broadphase = new CANNON.NaiveBroadphase();
		this.world.solver.iterations = 10;
		/* Create floor */ 
		this.groundShape = new CANNON.Plane();
		this.groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
		this.groundBody.addShape(this.groundShape);
		this.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
		this.world.addBody(this.groundBody);

        var wheelGroundContactMaterial = window.wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
            friction: 0.3,
            restitution: 0,
            contactEquationStiffness: 1000
        });
		this.world.addContactMaterial(new CANNON.ContactMaterial(groundMaterial, wheelMaterial, {friction: 0, restitution: 0.3}));

		this.createCar();
	}
	createCar() {
		/* Player car */
		this.shapeCar = new CANNON.Box(new CANNON.Vec3(30 / 2, 23 / 2, 62 / 2));
		this.bodyCar = new CANNON.Body({ mass: 1, fixedRotation: true});
		this.bodyCar.addShape(this.shapeCar);
		this.bodyCar.position.set(0, 10, 50);a
		this.world.addBody(this.bodyCar);
		/* Test box colision */
		this.shape = new CANNON.Box(new CANNON.Vec3(25 / 2, 50 / 2, 10 / 2));
		this.body = new CANNON.Body({ mass: 1 });
		this.body.position.set(0, 30, 0);
		this.body.addShape(this.shape);
		this.body.angularDamping = 0.5;
		this.world.addBody(this.body);
	}
}