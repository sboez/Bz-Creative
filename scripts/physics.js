class PhysicsInit {
	createWorld() {
		/* Set the world */
		this.world = new CANNON.World();
		this.world.gravity.set(0, -70, 0);
		this.world.broadphase = new CANNON.NaiveBroadphase();
		this.world.solver.iterations = 10;
		/* Create floor */ 
		this.groundShape = new CANNON.Plane();
		this.groundBody = new CANNON.Body({ mass : 0 });
		this.groundBody.position.set(0, 0, 0);
		this.groundBody.addShape(this.groundShape);
		this.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
		this.world.addBody(this.groundBody);

		this.createCar();
	}
	createCar() {
		/* Player car */
		this.shapeCar = new CANNON.Box(new CANNON.Vec3(30 / 2, 23 / 2, 62 / 2));
		this.bodyCar = new CANNON.Body({ mass: 1, fixedRotation: true});
		this.bodyCar.addShape(this.shapeCar);
		this.bodyCar.position.set(0, 30, 0);
		this.world.addBody(this.bodyCar);
	}
}