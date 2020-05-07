class PhysicsInit {
	createWorld() {
		/* set the world */
		this.world = new CANNON.World();
		this.world.broadphase = new CANNON.SAPBroadphase(this.world);
		this.world.gravity.set(0, -10, 0);
		this.world.defaultContactMaterial.friction = 0;

		/* set floor */ 
		this.groundShape = new CANNON.Plane();
		this.groundBody = new CANNON.Body({
			mass: 0, 
			material: this.groundMaterial
		});
		this.groundBody.addShape(this.groundShape);
		this.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
		this.world.addBody(this.groundBody);

		/* set materials */
		this.groundMaterial = new CANNON.Material('groundMaterial');
		this.wheelMaterial = new CANNON.Material('wheelMaterial');
		this.objectMaterial = new CANNON.Material('objectMaterial');

		this.world.addContactMaterial(new CANNON.ContactMaterial(this.objectMaterial, this.groundMaterial, { 
			friction: 0, 
			restitution: 0.5
		}));

		this.world.addContactMaterial(new CANNON.ContactMaterial(this.wheelMaterial, this.groundMaterial, {
		    friction: 0.3,
		    restitution: 0
		}));

		this.createCar();
		this.createWheels(this.wheelMaterial);
		this.createMoto();
	}
	createCar() {
		/* car physics body */
		this.chassisShape = new CANNON.Box(new CANNON.Vec3(1, .3, 2));
		this.chassisBody = new CANNON.Body({ mass: 30 });
		this.chassisBody.addShape(this.chassisShape);
		this.chassisBody.angularVelocity.set(0, 0, 0);

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
			radius: 0.35,
			directionLocal: new CANNON.Vec3(0, -1, 0),
			axleLocal: new CANNON.Vec3(-1, 0, 0),
			chassisConnectionPointLocal: new CANNON.Vec3(0, 1, 0),
			frontOffsetDepth: 0.635,
			backOffsetDepth: -0.475,
			offsetWidth: 0.39,
			height: 0.24,
			suspensionStiffness: 25,
			suspensionRestLength: 0.1,
			frictionSlip: 1,
			dampingRelaxation: 1.8,
			dampingCompression: 1.5,
			maxSuspensionForce: 100000,
			rollInfluence:  0,
			maxSuspensionTravel: 0.2
		};

		let axlewidth = 0.85;
		let chassisLength = 1.05
		this.options.chassisConnectionPointLocal.set(axlewidth, 0, -chassisLength);
		this.vehicle.addWheel(this.options);

		this.options.chassisConnectionPointLocal.set(-axlewidth, 0, -chassisLength);
		this.vehicle.addWheel(this.options);

		this.options.chassisConnectionPointLocal.set(axlewidth, 0, chassisLength);
		this.vehicle.addWheel(this.options);

		this.options.chassisConnectionPointLocal.set(-axlewidth, 0, chassisLength);
		this.vehicle.addWheel(this.options);

		this.vehicle.addToWorld(this.world);

		/* car wheels */
		this.vehicle.wheelInfos.forEach(function(wheel) {
			let shape = new CANNON.Cylinder(wheel.radius, wheel.radius, 0.15, 20);
			let body = new CANNON.Body({mass: 30, material: wheelMaterial});
			let q = new CANNON.Quaternion();
			q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
			body.addShape(shape, new CANNON.Vec3(), q);
			wheelBodies.push(body);
		});
	}
	createMoto() {
		this.shapeMoto = new CANNON.Box(new CANNON.Vec3(0.3, 1.5, 1.5));
		this.bodyMoto = new CANNON.Body({ mass: 0, material: this.objectMaterial });
		this.bodyMoto.addShape(this.shapeMoto);
		this.bodyMoto.position.set(10, 0, 20);
		this.bodyMoto.quaternion.setFromEuler(0, -Math.PI / 2, 0);
		this.world.addBody(this.bodyMoto);
	}
}
