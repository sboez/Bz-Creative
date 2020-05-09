import * as THREE from 'three';

export default class Text {
	constructor(scene, physic) {
		this.scene = scene;
		this.physic = physic;

		this.setEnter();
	}
	setEnter() {
		const loader = new THREE.FontLoader();
		loader.load('assets/fonts/helvetiker_regular.typeface.json', font => {
			this.textGeo = new THREE.TextGeometry('Enter', {
			    font: font,
			    size: 0.2,
			    height: 0.05,
			    curveSegments: 1
			});
			this.textGeo.center();
			this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
			this.mesh = new THREE.Mesh(this.textGeo, this.material);
			this.mesh.position.set(this.physic.bodyMoto.position.x, this.physic.bodyMoto.position.y + 2, this.physic.bodyMoto.position.z);
			this.mesh.rotation.y = Math.PI;
			this.mesh.visible = false;
			this.scene.add(this.mesh);
		});
	}
}
