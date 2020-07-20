import nipplejs from 'nipplejs';

export default class Controls {
	constructor(physic, load) {
		this.physic = physic;
		this.load = load;

		this.engineForce = 150;
		this.maxSteerVal = .5;

		this.listen();
		this.setJoystick();
	}

	listen() {
		window.addEventListener('keydown', this.keyboardEvent.bind(this));
		window.addEventListener('keyup', this.keyboardEvent.bind(this));
	}

	keyboardEvent(e) {
		if (e.type !== 'keydown' && e.type !== 'keyup') return;
		const isKeyup = e.type === 'keyup';

		switch(e.keyCode) {
			case 90: /* forward - Z */
			case 87: /* forward - W */
				this.physic.vehicle.applyEngineForce(isKeyup ? 0 : -this.engineForce, 2);
				this.physic.vehicle.applyEngineForce(isKeyup ? 0 : -this.engineForce, 3);
				break;

			case 83: /* backward - S */
				this.physic.vehicle.applyEngineForce(isKeyup ? 0 : this.engineForce, 2);
				this.physic.vehicle.applyEngineForce(isKeyup ? 0 : this.engineForce, 3);
				break;

			case 68: /* right - D */
				this.physic.vehicle.setSteeringValue(isKeyup ? 0 : -this.maxSteerVal, 2);
				this.physic.vehicle.setSteeringValue(isKeyup ? 0 : -this.maxSteerVal, 3);
				break;
			case 81: /* left - Q */
			case 65: /* left - A */
				this.physic.vehicle.setSteeringValue(isKeyup ? 0 : this.maxSteerVal, 2);
				this.physic.vehicle.setSteeringValue(isKeyup ? 0 : this.maxSteerVal, 3);
				break;
		}

		if (e.keyCode == 13 && this.physic.isGithub) window.open("https://github.com/sboez");
		if (e.keyCode == 13 && this.physic.isLinkedin) window.open("https://www.linkedin.com/in/sandra-boez-224b11b8/");
	}

	setJoystick() {
		const options = {
			color: '#000000',
			size: 200
		};

		const manager = nipplejs.create(options);

		manager.on('start', () => {
			console.log("Movement start");
		});

		manager.on('end', () => {
			this.physic.vehicle.applyEngineForce(0, 2);
			this.physic.vehicle.applyEngineForce(0, 3);

			this.physic.vehicle.setSteeringValue(0, 2);
			this.physic.vehicle.setSteeringValue(0, 3);
		});

		manager.on('dir:up', () => {
			this.physic.vehicle.applyEngineForce(-this.engineForce, 2);
			this.physic.vehicle.applyEngineForce(-this.engineForce, 3);
		});

		manager.on('dir:down', () => {
			this.physic.vehicle.applyEngineForce(this.engineForce, 2);
			this.physic.vehicle.applyEngineForce(this.engineForce, 3);
		});

		manager.on('dir:left', () => {
			this.physic.vehicle.setSteeringValue(this.maxSteerVal, 2);
			this.physic.vehicle.setSteeringValue(this.maxSteerVal, 3);
		});

		manager.on('dir:right', () => {
			this.physic.vehicle.setSteeringValue(-this.maxSteerVal, 2);
			this.physic.vehicle.setSteeringValue(-this.maxSteerVal, 3);
		});
	}
}
