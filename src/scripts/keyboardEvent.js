export default class Key {
	constructor(physic, load) {
		this.physic = physic;
		this.load = load;

		this.listen();
	}

	listen() {
		window.addEventListener('keydown', this.keyboardEvent.bind(this));
		window.addEventListener('keyup', this.keyboardEvent.bind(this));
	}

	keyboardEvent(e) {
		if (e.type !== 'keydown' && e.type !== 'keyup') return;
		const isKeyup = e.type === 'keyup';

		this.physic.vehicle.setBrake(0, 0);
		this.physic.vehicle.setBrake(0, 1);
		this.physic.vehicle.setBrake(0, 2);
		this.physic.vehicle.setBrake(0, 3);

		const engineForce = 300;
		const maxSteerVal = 0.3;
		switch(e.keyCode) {
			case 90: /* forward - Z */
			case 87: /* forward - W */
				this.physic.vehicle.applyEngineForce(isKeyup ? 0 : -engineForce, 2);
				this.physic.vehicle.applyEngineForce(isKeyup ? 0 : -engineForce, 3);
				break;

			case 83: /* backward - S */
				this.physic.vehicle.applyEngineForce(isKeyup ? 0 : engineForce, 2);
				this.physic.vehicle.applyEngineForce(isKeyup ? 0 : engineForce, 3);
				break;

			case 68: /* right - D */
				this.physic.vehicle.setSteeringValue(isKeyup ? 0 : -maxSteerVal, 2);
				this.physic.vehicle.setSteeringValue(isKeyup ? 0 : -maxSteerVal, 3);
				break;
			case 81: /* left - Q */
			case 65: /* left - A */
				this.physic.vehicle.setSteeringValue(isKeyup ? 0 : maxSteerVal, 2);
				this.physic.vehicle.setSteeringValue(isKeyup ? 0 : maxSteerVal, 3);
				break;
		}

		if (e.keyCode == 13 && this.physic.isGithub) window.open("https://github.com/sboez");
		if (e.keyCode == 13 && this.physic.isLinkedin) window.open("https://www.linkedin.com/in/sandra-boez-224b11b8/");
	}
}
