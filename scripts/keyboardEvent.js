function keyboardEvent(e) {
	if (e.type != 'keydown' && e.type != 'keyup') return;
	let keyup = e.type == 'keyup';
	Physic.vehicle.setBrake(0, 0);
	Physic.vehicle.setBrake(0, 1);
	Physic.vehicle.setBrake(0, 2);
	Physic.vehicle.setBrake(0, 3);

	let engineForce = 300;
	let maxSteerVal = 0.3;
	switch(e.keyCode) {
		case 87: /* forward - W */
		Physic.vehicle.applyEngineForce(keyup ? 0 : -engineForce, 2);
		Physic.vehicle.applyEngineForce(keyup ? 0 : -engineForce, 3);
		break;

		case 83: /* backward - S */
		Physic.vehicle.applyEngineForce(keyup ? 0 : engineForce, 2);
		Physic.vehicle.applyEngineForce(keyup ? 0 : engineForce, 3);
		break;

		case 68: /* right - D */
		Physic.vehicle.setSteeringValue(keyup ? 0 : -maxSteerVal, 2);
		Physic.vehicle.setSteeringValue(keyup ? 0 : -maxSteerVal, 3);
		break;

		case 65: /* left - A */
		Physic.vehicle.setSteeringValue(keyup ? 0 : maxSteerVal, 2);
		Physic.vehicle.setSteeringValue(keyup ? 0 : maxSteerVal, 3);
		break;

		case 13: /* enter */
		window.open(Load.other.userData.URL);
		break;
	}
}
