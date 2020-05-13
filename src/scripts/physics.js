import CANNON from 'cannon'

export default class Physics {
	constructor(scene, load) {
		this.scene = scene;
		this.load = load;

		this.wheelBodies = [];

		this.setOptions();
		this.setWorld();
		this.listen();
		this.setMaterials();
		this.setGround();
		this.setwalls();
		this.setCar();
		this.setWheels(this.wheelMaterial);
		this.setMoto();
		this.setSkills();
	}

	setOptions() {
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
	}

	setWorld() {
		this.world = new CANNON.World();
		this.world.broadphase = new CANNON.SAPBroadphase(this.world);
		this.world.gravity.set(0, -10, 0);
		this.world.defaultContactMaterial.friction = 0;
	}

	listen() {
		/* update the wheels to match the physics */
		this.world.addEventListener('postStep', () => {
			for (let i = 0; i < this.vehicle.wheelInfos.length; ++i) {
				this.vehicle.updateWheelTransform(i);
				const t = this.vehicle.wheelInfos[i].worldTransform;
				/* update wheel physics */
				this.wheelBodies[i].position.copy(t.position);
				this.wheelBodies[i].quaternion.copy(t.quaternion);
				/* update wheel model */
				const w = this.load.wheelMeshes[i];
				this.scene.attach(w);
				w.quaternion.copy(t.quaternion);
				w.position.copy(this.wheelBodies[i].position);
			}
		});
	}

	setMaterials() {
		this.groundMaterial = new CANNON.Material('groundMaterial');
		this.wheelMaterial = new CANNON.Material('wheelMaterial');
		this.objectMaterial = new CANNON.Material('objectMaterial');

		this.world.addContactMaterial(new CANNON.ContactMaterial(this.objectMaterial, this.groundMaterial, { 
			friction: 0, 
			restitution: 0.5
		}));

		this.world.addContactMaterial(new CANNON.ContactMaterial(this.wheelMaterial, this.groundMaterial, {
		    friction: 0.5,
		    restitution: 0
		}));
	}

	setGround() {
		this.groundShape = new CANNON.Plane();
		this.groundBody = new CANNON.Body({
			mass: 0, 
			material: this.groundMaterial
		});
		this.groundBody.addShape(this.groundShape);
		this.groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
		this.world.addBody(this.groundBody);
	}

	setwalls() {
		this.wallShape = [];
		this.wallBody = [];
		for (let i = 0; i < 4; ++i) {
			this.wallShape[i] = new CANNON.Plane();
			this.wallBody[i] = new CANNON.Body({
				position: new CANNON.Vec3(30, 0, 0),
				mass: 0, 
				material: this.objectMaterial
			});
			this.wallBody[i].addShape(this.wallShape[i]);
			this.world.add(this.wallBody[i]);
		}

		this.wallBody[0].quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2); // Left

		this.wallBody[1].quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2); // Right
		this.wallBody[1].position.x = -30; 

		this.wallBody[2].quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI * 2); // Back
		this.wallBody[2].position.z = -30;

		this.wallBody[3].quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI); // Front
		this.wallBody[3].position.z = 30;
	}

	setCar() {
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

	setWheels(wheelMaterial) {
		const axlewidth = 0.85;
		const chassisLength = 1.05

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
		this.vehicle.wheelInfos.forEach((wheel) => {
			const shape = new CANNON.Cylinder(wheel.radius, wheel.radius, 0.15, 20);
			const body = new CANNON.Body({mass: 30, material: wheelMaterial});
			const q = new CANNON.Quaternion();
			q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
			body.addShape(shape, new CANNON.Vec3(), q);
			this.wheelBodies.push(body);
		});
	}
	
	setMoto() {
		this.shapeMoto = new CANNON.Box(new CANNON.Vec3(0.9, 4.5, 4.5));
		this.bodyMoto = new CANNON.Body({ mass: 0, material: this.objectMaterial });
		this.bodyMoto.addShape(this.shapeMoto);
		this.bodyMoto.position.set(-28, 0, 0);
		this.bodyMoto.quaternion.setFromEuler(0, Math.PI, 0);
		this.world.addBody(this.bodyMoto);
	}

	setSkills() {
		this.shapeJS = new CANNON.Box(new CANNON.Vec3(0.75, 0.5, 0.25));
		this.bodyJS = new CANNON.Body({ mass: 1, material: this.wheelMaterial });
		this.bodyJS.addShape(this.shapeJS);
		this.bodyJS.position.set(10, 2, 10);
		this.bodyJS.quaternion.setFromEuler(0, Math.PI, 0);
		this.world.addBody(this.bodyJS);
	}
}
