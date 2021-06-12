class BootScene extends Phaser.Scene {
	constructor() {
		super('BootScene')	
	}


	create() {
		this.add.text(200, 200, "Loading...");
		this.scene.start('GameScene');
	}
	
}