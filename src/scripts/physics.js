import CANNON from 'cannon';

export default class Physics {
	constructor(scene, load) {
		this.scene = scene;
		this.load = load;

		this.wheelBodies = [];

		this.GITHUB = this.load.room.getObjectByName("link_github");
		this.ENTER_GITHUB = this.load.room.getObjectByName("text_enter_github");
		this.LINKEDIN = this.load.room.getObjectByName("link_linkedin");
		this.ENTER_LINKEDIN = this.load.room.getObjectByName("text_enter_linkedin");
		this.XP_WALL = this.load.room.getObjectByName("wall4");

		this.setWorld();
		this.setMaterials();
		this.setGround();
		this.setShelf();
		this.setRamp();
		this.setWalls();
		this.setOptions();
		this.listen();
		this.setCar();
		this.setWheels(this.wheelMaterial);
		this.setMoto();
		this.setSkills();
	}

	setWorld() {
		this.world = new CANNON.World();
		this.world.broadphase = new CANNON.SAPBroadphase(this.world);
		this.world.gravity.set(0, -10, 0);
		this.world.defaultContactMaterial.friction = 0;
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

	setShelf() {
		this.shelfShape = new CANNON.Box(new CANNON.Vec3(2, 0.25, 22.5));
		this.shelfBody = new CANNON.Body({
			position: new CANNON.Vec3(28, 4.8, -7.6),
			mass: 0, 
			material: this.groundMaterial
		});
		this.shelfBody.addShape(this.shelfShape);
		this.world.addBody(this.shelfBody);
	}

	setRamp() {
		this.rampShape = new CANNON.Box(new CANNON.Vec3(8.6, 0.25, 5.5));
		this.rampBody = new CANNON.Body({
			position: new CANNON.Vec3(18, 2.15, -24.5),
			mass: 0, 
			material: this.groundMaterial
		});
		this.rampBody.addShape(this.rampShape);
		this.rampBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), Math.PI / 9.36);
		this.world.addBody(this.rampBody);
	}

	setWalls() {
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

	setCar() {
		/* car physics body */
		this.chassisShape = new CANNON.Box(new CANNON.Vec3(1, .3, 2));
		this.chassisBody = new CANNON.Body({ mass: 50 });
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
		this.vehicle.wheelInfos.forEach(wheel => {
			const shape = new CANNON.Cylinder(wheel.radius, wheel.radius, 0.15, 20);
			const body = new CANNON.Body({mass: 5, material: wheelMaterial});
			const q = new CANNON.Quaternion();
			q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
			body.addShape(shape, new CANNON.Vec3(), q);
			this.wheelBodies.push(body);
		});
	}

	checkDistance() {
		/* check if car position is near the github model */
		if (this.chassisBody.position.distanceTo(this.GITHUB.position) <= 7) {
			this.GITHUB.rotation.y += 0.04;
			this.ENTER_GITHUB.visible = true;
			this.isGithub = true;
		} else {
			this.GITHUB.rotation.set(Math.PI, 1.6, 0);
			this.ENTER_GITHUB.visible = false;
			this.isGithub = false;
		}

		/* check if car position is near the linkedin model */
		if (this.chassisBody.position.distanceTo(this.LINKEDIN.position) <= 7) {
			this.LINKEDIN.rotation.y += 0.04;
			this.ENTER_LINKEDIN.visible = true;
			this.isLinkedin = true;
		} else {
			this.LINKEDIN.rotation.set(Math.PI, -1.6, 0);
			this.ENTER_LINKEDIN.visible = false;
			this.isLinkedin = false;
		}

		/* check if car position is near the experience wall to do a focus on the wall */
		if (this.chassisBody.position.distanceTo(this.XP_WALL.position) <= 20)
			this.scene.camera.position.set(0, 3, 8);
		else
			this.scene.camera.position.set(-5, 5, -10);
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
		const y = 0.3, z = 0.55;
		const posX = 27, posY = 8;

		this.bodySkill = [];

		for(let i = 13; i < this.load.skills.length; ++i) { 
			this.shapeSkill = new CANNON.Box(new CANNON.Vec3(0.85, y, z));
			this.bodySkill[i] = new CANNON.Body({ mass: 1, material: this.wheelMaterial });
			this.bodySkill[i].addShape(this.shapeSkill);
			this.bodySkill[i].position.set(posX, posY, -17); // JS
			this.bodySkill[i].quaternion.setFromEuler(Math.PI / 2, 0, Math.PI / 2);
			this.world.addBody(this.bodySkill[i]);
		}

		this.bodySkill[14].position.set(posX + 2, posY, -15); // C
		this.bodySkill[14].addShape(new CANNON.Box(new CANNON.Vec3(0.55, 0.3, z)));

		this.bodySkill[15].position.set(posX, posY, -10.5); // HTML5
		this.bodySkill[15].addShape(new CANNON.Box(new CANNON.Vec3(2.5, y, z)));

		this.bodySkill[16].position.set(posX + 2, posY, -4); // ThreeJS
		this.bodySkill[16].addShape(new CANNON.Box(new CANNON.Vec3(3, y, z)));

		this.bodySkill[17].position.set(posX, posY, 2.5); // WebGL
		this.bodySkill[17].addShape(new CANNON.Box(new CANNON.Vec3(2.55, y, z)));

		this.bodySkill[18].position.set(posX + 2, posY, 7); // Git
		this.bodySkill[18].addShape(new CANNON.Box(new CANNON.Vec3(1, y, z)));

		this.bodySkill[19].position.set(posX, posY, 12); // Blender
		this.bodySkill[19].addShape(new CANNON.Box(new CANNON.Vec3(2.8, y, z)));
	}
}
