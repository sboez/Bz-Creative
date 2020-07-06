export default class Key {
	constructor(physic, load) {
		this.physic = physic;
		this.load = load;

		this.engineForce = 300;
		this.maxSteerVal = 0.3;

		this.listen();
	}

	listen() {
		window.addEventListener('keydown', this.keyboardEvent.bind(this));
		window.addEventListener('keyup', this.keyboardEvent.bind(this));
		window.addEventListener('touchstart', this.mobileEvent.bind(this));
		window.addEventListener('touchend', this.mobileEvent.bind(this));
	}

	keyboardEvent(e) {
		if (e.type !== 'keydown' && e.type !== 'keyup') return;
		const isKeyup = e.type === 'keyup';

		this.physic.vehicle.setBrake(0, 0);
		this.physic.vehicle.setBrake(0, 1);
		this.physic.vehicle.setBrake(0, 2);
		this.physic.vehicle.setBrake(0, 3);

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

	mobileEvent(e) {
		if (e.type !== 'touchstart' && e.type !== 'touchend') return;
		const isReleased = e.type === 'touchend';

		if ((e.touches[0].pageY - (window.innerHeight / 2)) < 0) { // UP
			if(e.touches[0].pageX - (window.innerWidth / 2) < 0) { // LEFT
				console.log("UP LEFT");
				this.physic.vehicle.applyEngineForce(isReleased ? 0 : -this.engineForce, 2);
				this.physic.vehicle.applyEngineForce(isReleased ? 0 : -this.engineForce, 3);
				this.physic.vehicle.setSteeringValue(isReleased ? 0 : this.maxSteerVal, 2);
				this.physic.vehicle.setSteeringValue(isReleased ? 0 : this.maxSteerVal, 3);
			}
			else { // RIGHT
				console.log("UP RIGHT");
				this.physic.vehicle.applyEngineForce(isReleased ? 0 : -this.engineForce, 2);
				this.physic.vehicle.applyEngineForce(isReleased ? 0 : -this.engineForce, 3);
				this.physic.vehicle.setSteeringValue(isReleased ? 0 : -this.maxSteerVal, 2);
				this.physic.vehicle.setSteeringValue(isReleased ? 0 : -this.maxSteerVal, 3);
			}
		}
		else if ((e.touches[0].pageY - (window.innerHeight / 2)) > 0) { // DOWN
			if(e.touches[0].pageX - (window.innerWidth / 2) < 0) { // LEFT
				console.log("DOWN LEFT");
				this.physic.vehicle.applyEngineForce(isReleased ? 0 : this.engineForce, 2);
				this.physic.vehicle.applyEngineForce(isReleased ? 0 : this.engineForce, 3);
				this.physic.vehicle.setSteeringValue(isReleased ? 0 : this.maxSteerVal, 2);
				this.physic.vehicle.setSteeringValue(isReleased ? 0 : this.maxSteerVal, 3);
			}
			else { // RIGHT
				console.log("DOWN RIGHT");
				this.physic.vehicle.applyEngineForce(isReleased ? 0 : this.engineForce, 2);
				this.physic.vehicle.applyEngineForce(isReleased ? 0 : this.engineForce, 3);
				this.physic.vehicle.setSteeringValue(isReleased ? 0 : -this.maxSteerVal, 2);
				this.physic.vehicle.setSteeringValue(isReleased ? 0 : -this.maxSteerVal, 3);
			}
		}
	}
}
