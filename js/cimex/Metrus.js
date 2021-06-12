


//METRUS GAME OBJECT
class Metrus extends Phaser.Physics.Arcade.Sprite {
	
    constructor(scene, x, y, motion, direction, distance, id, tileX, tileY, username, world, health, totalhealth, shields, totalshields, target) {
        super(scene, x, y, 'metrustotalsprite', direction.offset, id, tileX, tileY, username, world, health, totalhealth, shields, totalshields, target);	

		this.id = id;
		this.name = id;
        this.startX = x;
        this.startY = y;
		this.tileX = tileX;
		this.tileY = tileY;
        this.distance = distance;
        this.direction = direction;
		this.motion = motion;
		this.speed = 1;
		const tileHeightHalf = tileHeight / 2;
		this.depth = (tileY + tileX) * tileHeightHalf + 65;
		this.scene = scene;
		
		this.username = username;
		this.world = world;
		this.health = health;
		this.totalhealth = totalhealth;
		this.shields = shields;
		this.totalshields = totalshields;
		this.target = target;
		this.groundType = true;
		
		this.setDataEnabled();
		this.data.set('id', id);
		
		this.setName(id);
		
		unitSprite = this.scene.matter.add.gameObject(this, {shape: 'circle', circleRadius: 15} );	
		//unitSprite = this.scene.matter.add.gameObject(this, { shape: 'circle', circleRadius: 15} );	
		
		unitSprite.setCollisionCategory(groundunits);
		unitSprite.setCollidesWith([ground, groundunits]);
		unitSprite.ignoreGravity = true;
		unitSprite.allowGravity = false;
		unitSprite.setBounce(0);
		unitSprite.width = 40;
		unitSprite.height = 40;
		unitSprite.scale = 0.4;
		var circle = new Phaser.Geom.Circle(150, 150, 40);
		unitSprite.setInteractive(circle, Phaser.Geom.Circle.Contains);

		unitSprite.x = this.x;
		unitSprite.y = this.y;

		
				//HEALTH BAR

				//BG
				this.healthBG = this.scene.add.graphics();
		//this.healthBG.fillStyle(0xFFFFFF);

				//ACTUAL HEALTH
				this.currentHealth = this.scene.add.graphics();
		
				this.healthBG.depth = 999997;
				this.currentHealth.depth = 999999;		

		
		
		
		var idlesouth = this.scene.anims.create({
					key: 'idlesouth',
					frames: this.scene.anims.generateFrameNumbers('metruswalksouth', 
						{
						start: 0,
						end: 0
						}),
					frameRate: 1,
					repeat: 0,
					hideOnComplete: false
		});	
		
		var idlesouthwest = this.scene.anims.create({
					key: 'idlesouthWest',
					frames: this.scene.anims.generateFrameNumbers('metruswalksouthwest', 
						{
						start: 0,
						end: 0
						}),
					frameRate: 1,
					repeat: 0,
					hideOnComplete: false
		});	
		
		var idlewest = this.scene.anims.create({
					key: 'idlewest',
					frames: this.scene.anims.generateFrameNumbers('metruswalkwest', 
						{
						start: 0,
						end: 0
						}),
					frameRate: 1,
					repeat: 0,
					hideOnComplete: false
		});	
		
		var idlenorthwest = this.scene.anims.create({
					key: 'idlenorthWest',
					frames: this.scene.anims.generateFrameNumbers('metruswalknorthwest', 
						{
						start: 0,
						end: 0
						}),
					frameRate: 1,
					repeat: 0,
					hideOnComplete: false
		});	
		
		var idlenorth = this.scene.anims.create({
					key: 'idlenorth',
					frames: this.scene.anims.generateFrameNumbers('metruswalknorth', 
						{
						start: 0,
						end: 0
						}),
					frameRate: 1,
					repeat: 0,
					hideOnComplete: false
		});	
		
		var idlenortheast = this.scene.anims.create({
					key: 'idlenorthEast',
					frames: this.scene.anims.generateFrameNumbers('metruswalknortheast', 
						{
						start: 0,
						end: 0
						}),
					frameRate: 1,
					repeat: 0,
					hideOnComplete: false
		});	
		
		var idleeast = this.scene.anims.create({
					key: 'idleeast',
					frames: this.scene.anims.generateFrameNumbers('metruswalkeast', 
						{
						start: 0,
						end: 0
						}),
					frameRate: 1,
					repeat: 0,
					hideOnComplete: false
		});	
		
		var idlesoutheast = this.scene.anims.create({
					key: 'idlesouthEast',
					frames: this.scene.anims.generateFrameNumbers('metruswalksoutheast', 
						{
						start: 0,
						end: 0
						}),
					frameRate: 1,
					repeat: 0,
					hideOnComplete: false
		});		
		
		var walksouth = this.scene.anims.create({
					key: 'walksouth',
					frames: this.scene.anims.generateFrameNumbers('metruswalksouth', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 15,
					repeat: -1,
					hideOnComplete: false
		});	
		
		var walksouthwest = this.scene.anims.create({
					key: 'walksouthWest',
					frames: this.scene.anims.generateFrameNumbers('metruswalksouthwest', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 15,
					repeat: -1,
					hideOnComplete: false
		});	
		
		var walkwest = this.scene.anims.create({
					key: 'walkwest',
					frames: this.scene.anims.generateFrameNumbers('metruswalkwest', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 15,
					repeat: -1,
					hideOnComplete: false
		});	
		
		var walknorthwest = this.scene.anims.create({
					key: 'walknorthWest',
					frames: this.scene.anims.generateFrameNumbers('metruswalknorthwest', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 15,
					repeat: -1,
					hideOnComplete: false
		});	
		
		var walknorth = this.scene.anims.create({
					key: 'walknorth',
					frames: this.scene.anims.generateFrameNumbers('metruswalknorth', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 15,
					repeat: -1,
					hideOnComplete: false
		});	
		
		var walknortheast = this.scene.anims.create({
					key: 'walknorthEast',
					frames: this.scene.anims.generateFrameNumbers('metruswalknortheast', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 15,
					repeat: -1,
					hideOnComplete: false
		});	
		
		var walkeast = this.scene.anims.create({
					key: 'walkeast',
					frames: this.scene.anims.generateFrameNumbers('metruswalkeast', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 15,
					repeat: -1,
					hideOnComplete: false
		});	
		
		var walksoutheast = this.scene.anims.create({
					key: 'walksouthEast',
					frames: this.scene.anims.generateFrameNumbers('metruswalksoutheast', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 15,
					repeat: -1,
					hideOnComplete: false
		});		

		var attacksouth = this.scene.anims.create({
					key: 'attacksouth',
					frames: this.scene.anims.generateFrameNumbers('metrusattacksouth', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 40,
					repeat: -1,
					hideOnComplete: false
		});	
		
		var attacksouthwest = this.scene.anims.create({
					key: 'attacksouthWest',
					frames: this.scene.anims.generateFrameNumbers('metrusattacksouthwest', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 40,
					repeat: -1,
					hideOnComplete: false
		});	
		
		var attackwest = this.scene.anims.create({
					key: 'attackwest',
					frames: this.scene.anims.generateFrameNumbers('metrusattackwest', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 40,
					repeat: -1,
					hideOnComplete: false
		});	
		
		var attacknorthwest = this.scene.anims.create({
					key: 'attacknorthWest',
					frames: this.scene.anims.generateFrameNumbers('metrusattacknorthwest', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 40,
					repeat: -1,
					hideOnComplete: false
		});	
		
		var attacknorth = this.scene.anims.create({
					key: 'attacknorth',
					frames: this.scene.anims.generateFrameNumbers('metrusattacknorth', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 40,
					repeat: -1,
					hideOnComplete: false
		});	
		
		var attacknortheast = this.scene.anims.create({
					key: 'attacknorthEast',
					frames: this.scene.anims.generateFrameNumbers('metrusattacknortheast', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 40,
					repeat: -1,
					hideOnComplete: false
		});	
		
		var attackeast = this.scene.anims.create({
					key: 'attackeast',
					frames: this.scene.anims.generateFrameNumbers('metrusattackeast', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 40,
					repeat: -1,
					hideOnComplete: false
		});	
		
		var attacksoutheast = this.scene.anims.create({
					key: 'attacksouthEast',
					frames: this.scene.anims.generateFrameNumbers('metrusattacksoutheast', 
						{
						start: 0,
						end: 22
						}),
					frameRate: 40,
					repeat: -1,
					hideOnComplete: false
		});	
		
		
		if (motion === "walk") {
		
		var walkDirection = this.motion + this.direction;
		this.play(walkDirection);
		}

		if (motion === "attack") {
			var attackDirection = this.motion + this.direction;
			this.play(attackDirection);
		}

		if (motion === "idle") {
			var idleDirection = this.motion + this.direction;
			this.play(idleDirection);
		};			

	
		//CHECK IF UNIT IS IN PLAY BEFORE ANIMATING
		if(this.active == false) {return;}
		//scene.time.delayedCall(this.anim.speed * 1000, this.changeFrame, [], this); 
		

		unitSprite.on('pointerdown', function(pointer, localX, localY, event){
			
			//console.log(pointer.x+'/'+pointer.y);
			
			console.log('ID ' + this.data.get('id'));
			
			if (this.selected == true) {
				//ALREADY SELECTED
				this.clearTint();
				this.selected = false
				selectedCount--;
				
				var deleteIndex = selectedArray.indexOf(this.data.get('id'));
				selectedArray.splice(deleteIndex, 1);
				this.scene.selectedListener(this);
			}else{
				//NOT YET SELECTED
				this.selected = true;	
				this.tint = 0xFF0000;
				selectedCount++;
				selectedArray.push(this.data.get('id'));
				
				this.scene.selectedListener(this);
				console.log(this);
			}
			
		});		

		
    }
	
	update() {
	
		var tileX = this.tileX;
		var tileY = this.tileY;
		
		var newdepth = tileY + tileX * tileHeightHalf + 128;
		var olddepth = this.depth;
		
		/*
			if (newdepth !== olddepth) {
			this.depth = newdepth;
			}
		*/
		
		var motion = this.motion;
		
		var currentX = this.x;
		var currentY = this.y;
		var newTargetX = this.targetX;
		var newTargetY = this.targetY;
		
		var targetRad = Phaser.Math.Angle.Between(
				currentX, currentY,
				newTargetX, newTargetY
			);
		
		var targetDegrees = Phaser.Math.RadToDeg(targetRad);
		
		
		//DETERMINE SOUTHEAST IN DEGREES
		if (targetDegrees > 22.5 && targetDegrees < 67.5 ) {
				this.direction = 'southEast';
			}
		
		//DETERMINE SOUTH IN DEGREES
		if (targetDegrees > 67.5 && targetDegrees < 112.5 ) {
				this.direction = 'south';
			}
		
		//DETERMINE SOUTHWEST IN DEGREES
		if (targetDegrees > 112.5 && targetDegrees < 157.5 ) {
				this.direction = 'southWest';
			}
		
		//DETERMINE WEST IN DEGREES
		if (targetDegrees > -180 && targetDegrees < -157.5) {
				this.direction = 'west';
			}
		
		if (targetDegrees > 157.5 && targetDegrees < 180) {
				this.direction = 'west';
		}
		
		//DETERMINE NORTHWEST IN DEGREES
		if (targetDegrees > -157.5 && targetDegrees < -112.5 ) {
				this.direction = 'northWest';
			}
		
		//DETERMINE NORTH IN DEGREES
		if (targetDegrees > -112.5 && targetDegrees < -67.5 ) {
				this.direction = 'north';
			}
		
		//DETERMINE NORTHEAST IN DEGREES
		if (targetDegrees > -67.5 && targetDegrees < -22.5 ) {
				this.direction = 'northEast';
			}
		
		//DETERMINE EAST IN DEGREES
		if (targetDegrees > -22.5 && targetDegrees < 22.5) {
				this.direction = 'east';
			}

		//GENERATE ANIMATION
		if (motion === "walk") {
			var walkDirection = this.motion + this.direction;
			if (previousWalkDirection !== walkDirection) {
			this.play(walkDirection);
			var previousDirection = this.direction;
			var previousMotion = this.motion;
			var previousWalkDirection = previousMotion + previousDirection; 
			}
		}

		if (motion === "attack") {
			var attackDirection = this.motion + this.direction;
			this.play(attackDirection);
		}

		if (motion === "idle") {
			var idleDirection = this.motion + this.direction;
			this.play(idleDirection);
		};		
	}
	
}

window.Metrus = Metrus;