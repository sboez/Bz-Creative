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
		this.lastEvent = e;
	}

	mobileEvent(e) {
		this.lastEvent = e;
	}

	updateInputs() {
		this.physic.vehicle.setBrake(0, 0);
		this.physic.vehicle.setBrake(0, 1);
		this.physic.vehicle.setBrake(0, 2);
		this.physic.vehicle.setBrake(0, 3);

		if(!this.lastEvent)return;
		let e = this.lastEvent;

		if (e.type === 'touchstart' || e.type === 'touchend' || e.type === 'touchmove') {
			let w2 = window.innerWidth / 2;
			let h2 = window.innerHeight / 2;
			let ndx = (e.touches[0].pageX - w2) / w2;
			let ndy = (e.touches[0].pageY - h2) / h2;

			this.physic.vehicle.applyEngineForce(ndy * this.engineForce, 3);
			this.physic.vehicle.setSteeringValue(ndx * this.maxSteerVal, 2);

			if (e.type === 'touchend' || ((ndx * ndx) + (ndy * ndy) < 0.001)) {
				ndx = ndy = 0;
			}

		} else if (e.type === 'keydown' || e.type === 'keyup') {
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
		}
	}
}
