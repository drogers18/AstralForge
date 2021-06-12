

var tileWidth = 128;
var tileHeight = 64;


var config = {
	max: {
		width: 1920,
		height: 1080
	},
	scale: {
	mode: Phaser.Scale.FIT,
	autoCenter: Phaser.Scale.CENTER_BOTH,
	width: window.innerWidth * window.devicePixelRatio,
	height: window.innerHeight * window.devicePixelRatio
	
	},
	backgroundColor: 0xFFFFFF,
	antialias: true,
	renderer: Phaser.CANVAS,
	type: Phaser.WEBGL,
	scene: [ GameScene ]
}


const game = new Phaser.Game(config);

