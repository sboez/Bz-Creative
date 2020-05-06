class PhysicsInit {
	createWorld() {
		/* Set the world */
		this.world = new CANNON.World();
		this.world.broadphase = new CANNON.SAPBroadphase(this.world);
		this.world.gravity.set(0, -10, 0);
		this.world.defaultContactMaterial.friction = 0;
		/* Create floor */ 
		this.groundShape = new CANNON.Plane();
		this.groundBody = new CANNON.Body({ 
			mass: 0, 
			material: this.groundMaterial 
		});
		this.groundBody.addShape(this.groundShape);
		this.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
		this.world.addBody(this.groundBody);
		/* Materials */
		this.groundMaterial = new CANNON.Material('groundMaterial');
		this.wheelMaterial = new CANNON.Material('wheelMaterial');
		this.wheelGroundContactMaterial = new CANNON.ContactMaterial(this.wheelMaterial, this.groundMaterial, {
		    friction: 0.3,
		    restitution: 0,
		    contactEquationStiffness: 1000,
		});
		this.world.addContactMaterial(this.wheelGroundContactMaterial);


		this.createCar();
		this.createWheels(this.wheelMaterial);
	}
	createCar() {
		/* car physics body */
		this.chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.3, 2));
		this.chassisBody = new CANNON.Body({mass: 150});
		this.chassisBody.addShape(this.chassisShape);
		this.chassisBody.position.set(0, 0.2, 0);
		this.chassisBody.angularVelocity.set(0, 0, 0); /* initial velocity */

		/* parent vehicle object */
		this.vehicle = new CANNON.RaycastVehicle({
		  chassisBody: this.chassisBody,
		  indexRightAxis: 0, // x
		  indexUpAxis: 1, // y
		  indexForwardAxis: 2, // z
		});
	}
	createWheels(wheelMaterial) {
		this.options = {
			radius: 0.3,
			directionLocal: new CANNON.Vec3(0, -1, 0),
			suspensionStiffness: 45,
			suspensionRestLength: 0.4,
			frictionSlip: 5,
			dampingRelaxation: 2.3,
			dampingCompression: 4.5,
			maxSuspensionForce: 200000,
			rollInfluence:  0.01,
			axleLocal: new CANNON.Vec3(-1, 0, 0),
			chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
			maxSuspensionTravel: 0.25,
			customSlidingRotationalSpeed: -30,
			useCustomSlidingRotationalSpeed: true,
		};

		let axlewidth = 0.7;
		this.options.chassisConnectionPointLocal.set(axlewidth, 0, -1);
		this.vehicle.addWheel(this.options);

		this.options.chassisConnectionPointLocal.set(-axlewidth, 0, -1);
		this.vehicle.addWheel(this.options);

		this.options.chassisConnectionPointLocal.set(axlewidth, 0, 1);
		this.vehicle.addWheel(this.options);

		this.options.chassisConnectionPointLocal.set(-axlewidth, 0, 1);
		this.vehicle.addWheel(this.options);

		this.vehicle.addToWorld(this.world);

		/* car wheels */
		this.vehicle.wheelInfos.forEach(function(wheel) {
			let shape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20);
			let body = new CANNON.Body({mass: 1, material: wheelMaterial});
			let q = new CANNON.Quaternion();
			q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
			body.addShape(shape, new CANNON.Vec3(), q);
			wheelBodies.push(body);
			Scene.visualizeWheels(wheel, wheelVisuals);
		});
	}
}
