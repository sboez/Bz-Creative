class PhysicsInit {
	createWorld() {
		let mass = 150;
		this.hitMaterial = new CANNON.Material("hitMaterial");
		this.playerMaterial = new CANNON.Material("playerMaterial");
		/* Set the world */
		this.world = new CANNON.World();
		this.world.gravity.set(0, -70, 0);
		this.world.broadphase = new CANNON.NaiveBroadphase();
		this.world.solver.iterations = 10;
		/* Create floor */ 
		this.groundShape = new CANNON.Plane();
		this.groundBody = new CANNON.Body({ mass: 0 });
		this.groundBody.addShape(this.groundShape);
		this.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
		this.world.addBody(this.groundBody);

		this.world.defaultContactMaterial.friction = 0.1;

		let hitContactMaterial = window.hitContactMaterial = new CANNON.ContactMaterial(this.playerMaterial, this.hitMaterial, {
            friction: 0.9,
            restitution: 0,
            contactEquationStiffness: 1000
        });
		this.world.addContactMaterial(hitContactMaterial);

		this.createCar();
	}
	createCar() {
		/* Player car */
		this.shapePlayer = new CANNON.Box(new CANNON.Vec3(1 / 2, 2 / 2, 1 / 2));
		this.bodyPlayer = new CANNON.Body({ mass: 1, fixedRotation: true, material: this.playerMaterial});
		this.bodyPlayer.addShape(this.shapePlayer);
		this.bodyPlayer.position.set(0, 30, 0);
		this.world.addBody(this.bodyPlayer);
		/* Test box colision */
		this.shape = new CANNON.Box(new CANNON.Vec3(2 / 2, 2 / 2, 2 / 2));
		this.body = new CANNON.Body({ mass: 1, material: this.hitMaterial });
		this.body.position.set(0, 30, 10);
		this.body.addShape(this.shape);
		this.body.angularDamping = 0.5;
		this.world.addBody(this.body);
	}
}