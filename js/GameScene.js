var width = window.innerWidth;
var height = window.innerHeight;
var what;
var easystar;
var cursorPosition; 
var cursorPos;
var clickCallback;
var cursorPosX;
var cursorPosY;
var thisTile;
var thisText;
var lightTile;
var thisTileiso;
var unitData;
var thisUnit;
var dontWalk;
var tileGroup;
var dontWalkcat;
var dontWalkSprite;
var dontWalkSpritecat;
var iso;
var poly;
var mapHeight;
var mapWidth;
var selected;
var selectedCount=0;
var serverCount=0;
var unitCount=0;
var unitCount=0;
var unitSprite;
var unitSpriteHealth;
var unitCountArray = [];
var serverCountArray = [];
var selectedArray = [];
var navtween;
var navContainer;
var containsCount=0;
var navigation;
var Units = {}; 
var selected; 
var selectedUnit;
var attackReady;
var attackTarget;
var attackSprite;
var attackState;
var attack;
var ground;
var groundunits;
var startTileX;
var startTileY;
var targetTileX;
var targetTileY;
var currentPathX;
var currentPathY;
var UnitCountUpdate;
var updateUnitArray=[];

var tileWidthHalf;
var tileHeightHalf;
    var level = [[0,0,1,0,0],
                 [1,0,1,0,1],
	         [0,0,1,0,0],
	         [0,0,1,1,0],
	         [0,0,0,0,0]];


var d = 0;

var scene;




class GameScene extends Phaser.Scene {
	
	constructor() {
		super({
			key: 'game',
			physics: {
				arcade: {
				debug:true,
				gravity: { y:0 }
			},
				matter: {
				debug: true,
				gravity: { y:0 },
				debugShowBody: true,
				debugBodyColor: 0x0000ff
				}
		
			}
		})	
	}
	


    preload () {
		scene = GameScene;
		
		//BACKGROUND IMAGE
		this.load.image('stars', '../assets/backgrounds/stars.png');
		
		//UI IMAGES/SPRITESHEETS
		this.load.image('navigation', '../assets/ui/navigation.png');
		this.load.image('attack', '../assets/ui/attack.png');
		this.load.image('build', '../assets/ui/build.png');
		this.load.image('patrol', '../assets/ui/patrol.png');
		this.load.spritesheet('target', '../assets/ui/target.png', {frameWidth: 100, frameHeight: 50 });
		
		//TERRAIN SPRITESHEETS
		this.load.spritesheet('grasssprite', '../assets/terrain/grassworld/grasssprite.png', {frameWidth: 128, frameHeight: 128 });
		this.load.spritesheet('watersprite', '../assets/terrain/grassworld/watersprite.png', {frameWidth: 128, frameHeight: 128 });
		this.load.spritesheet('flatsprite', '../assets/terrain/grassworld/flatsprite.png', {frameWidth: 128, frameHeight: 128 });
		this.load.spritesheet('obstacles', '../assets/terrain/grassworld/obstacles.png', {frameWidth: 128, frameHeight: 128 });
		
		//UNIT SPRITESHEETS
		
		//CIMEX METRUS WALK
		this.load.spritesheet('metruswalknorth', '../assets/cimex/metrus/walk/walknorth.png', {frameWidth: 300, frameHeight: 300 });
		this.load.spritesheet('metruswalknortheast', '../assets/cimex/metrus/walk/walknortheast.png', {frameWidth: 300, frameHeight: 300 });
		this.load.spritesheet('metruswalkeast', '../assets/cimex/metrus/walk/walkeast.png', {frameWidth: 300, frameHeight: 300 });
		this.load.spritesheet('metruswalksoutheast', '../assets/cimex/metrus/walk/walksoutheast.png', {frameWidth: 300, frameHeight: 300 });
		this.load.spritesheet('metruswalksouth', '../assets/cimex/metrus/walk/walksouth.png', {frameWidth: 300, frameHeight: 300 });
		this.load.spritesheet('metruswalksouthwest', '../assets/cimex/metrus/walk/walksouthwest.png', {frameWidth: 300, frameHeight: 300 });
		this.load.spritesheet('metruswalkwest', '../assets/cimex/metrus/walk/walkwest.png', {frameWidth: 300, frameHeight: 300 });
		this.load.spritesheet('metruswalknorthwest', '../assets/cimex/metrus/walk/walknorthwest.png', {frameWidth: 300, frameHeight: 300 });
		
		//CIMEX METRUS ATTACK
		this.load.spritesheet('metrusattacknorth', '../assets/cimex/metrus/attack/attacknorth.png', {frameWidth: 300, frameHeight: 300 });
		this.load.spritesheet('metrusattacknortheast', '../assets/cimex/metrus/attack/attacknortheast.png', {frameWidth: 300, frameHeight: 300 });
		this.load.spritesheet('metrusattackeast', '../assets/cimex/metrus/attack/attackeast.png', {frameWidth: 300, frameHeight: 300 });
		this.load.spritesheet('metrusattacksoutheast', '../assets/cimex/metrus/attack/attacksoutheast.png', {frameWidth: 300, frameHeight: 300 });
		this.load.spritesheet('metrusattacksouth', '../assets/cimex/metrus/attack/attacksouth.png', {frameWidth: 300, frameHeight: 300 });
		this.load.spritesheet('metrusattacksouthwest', '../assets/cimex/metrus/attack/attacksouthwest.png', {frameWidth: 300, frameHeight: 300 });
		this.load.spritesheet('metrusattackwest', '../assets/cimex/metrus/attack/attackwest.png', {frameWidth: 300, frameHeight: 300 });
		this.load.spritesheet('metrusattacknorthwest', '../assets/cimex/metrus/attack/attacknorthwest.png', {frameWidth: 300, frameHeight: 300 });




    }
	
	
    create () {
		//scene = GameScene;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.Scale.SHOW_ALL;
		game.disableVisibilityChange = true;
		
		
		
		this.matter.world.setBounds((mapWidth*64)/2, (mapWidth*64)/4, (mapWidth*128)/2, (mapWidth*64)/2).disableGravity();
		
		var time = new Date();
		
		//Background
		this.background = this.add.image(0,0, 'stars');
		this.background.setOrigin(0,0);
		this.background.displayWidth=game.config.width*1;
		this.background.displayHeight=game.config.height*1;
		this.background.setScrollFactor(0)
		this.background.fixedToCamera = true;
		
		var camWidth = game.config.width;
		var camHeight = game.config.Height;
		
		tileGroup = this.add.group();
		dontWalk = this.add.group();
		
		ground = this.matter.world.nextCategory();
		groundunits = this.matter.world.nextCategory();
        // SPAWN TILES FROM THE LEVELDATA
        this.spawnTiles();
		this.spawnText();
		
		console.log(tileGroup);
		
		//EASYSTAR PATHFINDING
		var easystar = new EasyStar.js();
		easystar.setGrid(levelData);
		easystar.setAcceptableTiles([0]);
		
		
	
		tileGroup.setImmovable = true;
		dontWalk.setImmovable = true;

		

		
		function unitData(callback){
			
			var updateInterval = 5000;
			setInterval(function(){
				$.ajax({
					type: 'GET',
					global: true, 
					dataType: "json",
					url:'../includes/units.php',
					contentType: 'application/json',
					cache: false,
					success: callback 
				});
			},updateInterval);
			
		}
		
		unitData(result => {
			
		const tileWidthHalf = tileWidth / 2;
		const tileHeightHalf = tileHeight / 2;
		
		const centerX = mapWidth * tileWidthHalf;
		const centerY = 64;
			
		var unitCount = Object.keys(Units).length;
		var serverCount = result.unitId.length;
	
		if (unitCount > serverCount) {
			
			
		//UNIT(S) REMOVED FORM SERVER
			var unitCountArray = [];	
			var serverCountArray = [];

			//PUT UNITS DICTIONARIES INTO ARRAY
			for (let k in Units) 
			{
				unitCountArray.push(k);
			}	

			//PUT THE UNIT IDS IN ARRAY
			for (var z = 0; z < result.unitId.length; z++)
			{
				serverCountArray.push(result.unitId[z]);
			}

			//GET THE DIFFERENCE BETWEEN ARRAYS
			var difference = unitCountArray.filter(x => serverCountArray.indexOf(x) === -1);
			
			//ITERATE THROUGH DIFFERENCE ARRAY, DESTROY EACH
			if (difference.length > 0) {
				
				for (var q = 0; q < difference.length; q++)
				{
				
				//REMOVE FROM UNITCOUNTARRAY
				var deleteIndex = selectedArray.indexOf(difference[q]);
				var deleteUnitArrayIndex = unitCountArray.indexOf(difference[q]);
				
				//DESTROY THE GAME OBJECT
				Units[difference[q]].destroy();
				//DELETE THE DICTIONARY
				delete Units[difference[q]];
							

				//unitCount--;
				selectedArray.splice(deleteIndex, 1);
				if (selectedCount > 0) { selectedCount--; }
				this.selectedListener();
				difference.splice(q, 1);
				
				unitCountArray.splice(deleteUnitArrayIndex, 1);

				}
				
			}

			unitCount = 0; 
		}
			
		if (unitCount < serverCount) {
		//UNIT(S) ADDED TO SERVER
			var unitCountArray = [];	
			var serverCountArray = [];

			//PUT UNITS DICTIONARIES INTO ARRAY
			for (let k in Units) 
			{
				unitCountArray.push(k);
			}	

			//PUT THE UNIT IDS IN ARRAY
			for (var z = 0; z < result.unitId.length; z++)
			{
				serverCountArray.push(result.unitId[z]);
			}

			//GET THE DIFFERENCE BETWEEN ARRAYS
			var difference = serverCountArray.filter(x => unitCountArray.indexOf(x) === -1);
			
			//ITERATE THROUGH DIFFERENCE ARRAY, ADD EACH
			
			for (var q = 0; q < difference.length; q++)
			{
				//GET INDEX OF THE DIFFERENCE IN UNITS
				var addUnitIndex = result.unitId.indexOf(difference[q]);
				
				var unitX = result.unitX[addUnitIndex];
				var unitY = result.unitY[addUnitIndex];

				var unitId = result.unitId[addUnitIndex];

				var unitUsername = result.unitUsername[addUnitIndex];
				var unitType = result.unitType[addUnitIndex];
				var unitAction = result.unitAction[addUnitIndex];
				var unitHealth = result.unitHealth[addUnitIndex];
				var unitTotalhealth = result.unitTotalhealth[addUnitIndex];
				var unitShields = result.unitShields[addUnitIndex];
				var unitTotalshields = result.unitTotalshields[addUnitIndex];
				var unitWorld = result.unitWorld[addUnitIndex];
				var unitDirection = result.unitDirection[addUnitIndex];
				var unitTarget = result.unitTarget[addUnitIndex];
				
				
				
				for (var i = 0; i < levelData.length; i++)
				{
					for (var j = 0; j < levelData[0].length; j++)
					{

					const tx = (j - i) * tileWidthHalf
					const ty = (j + i) * tileHeightHalf
					const txOffset = tx - 64;
					const tyOffset = ty - 64;


					if (unitX == i)
					{
						if (unitY == j) 
						{
												
						//ADD TO UNITS
						Units[unitId] = this.add.existing(new window[`${unitType}`](this, centerX + txOffset, centerY + tyOffset, unitAction, unitDirection, 150, unitId, i, j, unitUsername, unitWorld, unitHealth, unitTotalhealth, unitShields, unitTotalshields, unitTarget));
						this.cameras.main.centerOn(centerX + tx, centerY + ty);

						}
					}
					
					}
				}
				
				}
				
				//RESET ARRAY AFTER ADDING
				unitCountArray.length = 0;
				serverCountArray.length = 0;
				unitCountArray = [];
				serverCountArray = [];
				unitCount = 0;

		}
			
		for (var z = 0; z < result.unitId.length; z++)
		{

		var unitX = result.unitX[z];
		var unitY = result.unitY[z];

		var unitId = result.unitId[z];
			
		var unitUsername = result.unitUsername[z];
		var unitType = result.unitType[z];
		var unitAction = result.unitAction[z];
		var unitHealth = result.unitHealth[z];
		var unitTotalhealth = result.unitTotalhealth[z];
		var unitShields = result.unitShields[z];
		var unitTotalshields = result.unitTotalshields[z];
		var unitWorld = result.unitWorld[z];
		var unitDirection = result.unitDirection[z];
		var unitTarget = result.unitTarget[z];

		var unitTypearray = unitType + 's';
		var unitTypeconstructor = unitType.charAt(0);	
			

		//CHECK IF UNIT ALREADY EXISTS
			
		if (typeof Units[unitId] !== "undefined") {
			containsCount++;
		}
		
		for (var i = 0; i < levelData.length; i++)
		{
			for (var j = 0; j < levelData[0].length; j++)
			{
				
			const tx = (j - i) * tileWidthHalf
			const ty = (j + i) * tileHeightHalf
			const txOffset = tx - 64;
			const tyOffset = ty - 64;
				

			if (unitX == i)
			{
				if (unitY == j) 
				{
					//CHECK TO SEE IF UNIT HAS ALREADY BEEN COUNTED
					if (containsCount == 0) 
					{
					
					Units[unitId] = this.add.existing(new window[`${unitType}`](this, centerX + txOffset, centerY + tyOffset, unitAction, unitDirection, 150, unitId, i, j, unitUsername, unitWorld, unitHealth, unitTotalhealth, unitShields, unitTotalshields, unitTarget));
					this.cameras.main.centerOn(centerX + tx, centerY + ty);
					
					}
				}
			}
				
			}
		}
			
		}
		//RESET THE COUNT BEFORE AJAX CALL BEGINS AGAIN
		containsCount = 0;
		unitCount = 0;

		});
		
		
		
		//NAVIGATION
		this.navigation = this.add.image(0,0, 'navigation');
		this.navigation.setScale(0.5);
		this.navigation.setOrigin(0.5,0);
		this.navigation.x = game.config.width*0.5;
		this.navigation.y = game.config.height*2;
		//this.navigation.displayWidth = game.config.width;
		this.navigation.setScrollFactor(0)
		this.navigation.fixedToCamera = true;
		this.navigation.setDepth(999999);
		
		//ATTACK BTN
		attack = this.add.image(0, 0, 'attack');
		attack.setScale(0.5);
		attack.setOrigin(0,0);
		attack.x = game.config.width/2+250;
		attack.y = game.config.height-233;
		//this.attack.displayWidth = game.config.width*0.09375;
		attack.setScrollFactor(0)
		attack.fixedToCamera = true;
		attack.setDepth(999999);
		attack.alpha = 0; 
		attack.setInteractive();
		attack.priorityID = 2;
		
		//SELECTED TEXT
        this.selectedText = this.add.text(game.config.width/2-153, game.config.height-211, selectedCount + ' SELECTED', { fontFamily: 'nasalizationregular', fontSize: 12, color: '#CCCCCC'});
		this.selectedText.setOrigin(0,0);
		this.selectedText.setShadow(2,2, '#818dff', 3, false, true);
		this.selectedText.setDepth(999999);
		this.selectedText.setScrollFactor(0)
		this.selectedText.fixedToCamera = true;
		this.selectedText.alpha = 0;
		
		this.selectedArray = [];
		
		//ATTACK BUTTON LOGIC
		attackSprite = this.add.sprite(game.config.width/2, game.config.height/2, 'target', 0);	
		attackSprite.depth = 999998;
		attackSprite.fixedToCamera = false;
		attackSprite.setOrigin(0.5,0.5);
		attackSprite.alpha = 0;
		
		//ATTACK ANIM
		var attackanim = this.anims.create({
					key: 'attackanim',
					frames: this.anims.generateFrameNumbers('target'),
					frameRate: 40,
					repeat: 0,
					hideOnComplete: false
		});
		
		//ATTACK BUTTON IS CLICKED
		attack.on('pointerdown', function(){
			
			if (attackState == true) {
				//ALREADY SELECTED
				this.clearTint();
				attackState = false
				
			}else{
				//NOT YET SELECTED
				attackState = true;	
				this.tint = 0xFF0000;
				
			}
		});
				
				//ATTACK TARGET IS CLICKED
				this.input.setHitArea(tileGroup.getChildren()).on('gameobjectdown', function(pointer, gameObject, scene) {
			
				if (attackReady == true) {
				var attackX = pointer.worldX;
				var attackY = pointer.worldY;
				var gameTileX = gameObject.x;
				var gameTileY = gameObject.y;
				gameObject.priorityID=0;
				
				console.log('x:'+attackX+' y:'+attackY);
				
				
				attackSprite.x = attackX; 
				attackSprite.y = attackY;
				attackSprite.alpha = 1;
				attackSprite.play('attackanim');
				
				//ATTACK TARGET DISAPPEAR ANIMATION DELAY
				setTimeout(function(){
				attackSprite.alpha = 0;
				}, 200); 
					
				//ATTACK COMPLETE, RESET STATES
				attackReady = false;
				attackState = false; 
					
				for (var i = 0; i < selectedArray.length; i++)
				{	
					const thisUnit = Units[selectedArray[i]];
					
					thisUnit.targetX = attackX;
					thisUnit.targetY = attackY;
					
					var thisX = thisUnit.x;
					var thisY = thisUnit.y;
					
					startTileX = thisUnit.tileX;
					startTileY = thisUnit.tileY;
					
					targetTileX = gameObject.tileX;
					targetTileY = gameObject.tileY;
										
					var theScene = this.scene;
					
					var speed = thisUnit.speed;
					
					//STOP ANY MOVEMENT BEFORE PROCEEDING
					thisUnit.setVelocityX(0);
					thisUnit.setVelocityY(0);
					
					const tileWidthHalf = tileWidth / 2;
					const tileHeightHalf = tileHeight / 2;

					const centerX = mapWidth * tileWidthHalf;
					const centerY = 64;
					
					
					var tileXDistance = 0;
					var tileYDistance = 0;
					
					thisUnit.targetTileX = targetTileX; 
					thisUnit.targetTileY = targetTileY;
					
					//SET UNIT IN WALKING MOTION
					thisUnit.motion = "walk";

					//SET UNIT'S INITIAL MOTION
					var angle = Math.atan2(attackX - thisY, attackY - thisX);

					const direction = Math.atan((attackX - thisX) / (attackY- thisY));
					const speed2 = attackY >= thisY ? speed : -speed;

					var velX = speed2 * Math.sin(direction);
					var velY = speed2 * Math.cos(direction);

					thisUnit.setVelocityX(velX);
					thisUnit.setVelocityY(velY);
					thisUnit.velocityX = velX;
					thisUnit.velocityY = velY;	

					
					thisUnit.update();
					
					console.log('Target Tile X: '+thisUnit.targetTileX+' Y: '+thisUnit.targetTileY)
				}
	

					
				}
					
				});
		what = this; 
		console.log(what);
		
		//DETECT WALKABLE TILE COLLISIONS
		this.matter.world.on('collisionstart', function (event, tileGroup, Units, what) {
    		
			var currentTileDepth = tileGroup.gameObject.depth; 
			var currentUnitId = Units.gameObject.id;
			var currentUnit = Units.gameObject;
			var theScene = tileGroup.gameObject.scene;
			
			currentUnit.depth = currentTileDepth+129;
			currentUnit.tileX = tileGroup.gameObject.tileX;
			currentUnit.tileY = tileGroup.gameObject.tileY;		

			console.log('COLLISION. TILE DEPTH: '+currentTileDepth);
			
			if (currentUnit.tileX == currentUnit.targetTileX && currentUnit.tileY == currentUnit.targetTileY) {
				//REACHED TARGET TILE, STOP UNIT
				currentUnit.motion = "idle";
				currentUnit.setVelocityX(0);
				currentUnit.setVelocityY(0);
				currentUnit.update();
				console.log("REACHED DESTINATION");
			}
			
			/*
			if (currentUnit.stuckTrigger == true) {
			//UNIT IS STUCK, WAIT RANDOM TIME BETWEEN 1-5 SECONDS FOR IT TO CLEAR TRIGGER
			var randomSeconds = Math.floor(Math.random() * 4999) + 1000;
			var randomWait = currentUnit.speed * randomSeconds;
			
				setTimeout(function() {
					console.log('UNIT STUCK, WAITING FOR REVERSE MOVEMENT. RANDOM WAIT: '+randomWait);
					currentUnit.stuckTrigger = false;
					
				}, randomWait);
				
			}else{
			*/
			if (currentUnit.motion == "walk" && currentUnit.groundType == true) {
			
				//STORE TILE TO CHECK AGAIN
				let lastTileX = currentUnit.tileX;
				let lastTileY = currentUnit.tileY;
				
			/*	
				
			setTimeout(function() {
			//UNIT IS STUCK WALKING ON TILE FOR MORE THAN 5 SECONDS, REDIRECT
				if (lastTileX == currentUnit.tileX && lastTileY == currentUnit.tileY) {
				//UNIT IS ON SAME TILE, SEND OPPOSITE DIRECTION OF TARGET
					
					var attackX = currentUnit.targetX;
					var attackY = currentUnit.targetY;
					var thisX = currentUnit.x;
					var thisY = currentUnit.y;
					var speed = currentUnit.speed;
					
					var angle = Math.atan2(attackX - thisY, attackY - thisX);

					const direction = Math.atan((attackX - thisX) / (attackY- thisY));
					const speed2 = attackY >= thisY ? speed : -speed;
					
					//var randomVelocity = Math.random() * -1;

					//REVERSED VELOCITY
					var velX = (speed2 * Math.sin(direction)) * -1;
					var velY = (speed2 * Math.cos(direction)) * -1;

					currentUnit.setVelocityX(velX);
					currentUnit.setVelocityY(velY);
					currentUnit.velocityX = velX;
					currentUnit.velocityY = velY;
					
					currentUnit.stuckTrigger = true;
					
					currentUnit.update();
				}
				
			}, 5000);
				
				*/
			
			currentUnit.path = [];
						
			easystar.findPath(currentUnit.tileX, currentUnit.tileY, currentUnit.targetTileX, currentUnit.targetTileY, function( path ) {
				
				if (path === null) {
				
				//NO PATH FOUND, SEND TOWARDS TARGET AGAIN
				console.log("NO PATH, REDIRECT TO TARGET. Current X: "+currentUnit.tileX+' Y: '+currentUnit.tileY+' targetTileX: '+currentUnit.targetTileX+' Y: '+currentUnit.targetTileY);
				
					/*
					var attackX = currentUnit.targetX;
					var attackY = currentUnit.targetY;
					var thisX = currentUnit.x;
					var thisY = currentUnit.y;
					var speed = currentUnit.speed;
					
					var angle = Math.atan2(attackX - thisY, attackY - thisX);

					const direction = Math.atan((attackX - thisX) / (attackY- thisY));
					const speed2 = attackY >= thisY ? speed : -speed;

					var velX = speed2 * Math.sin(direction);
					var velY = speed2 * Math.cos(direction);

					currentUnit.setVelocityX(velX);
					currentUnit.setVelocityY(velY);
					currentUnit.velocityX = velX;
					currentUnit.velocityY = velY;	
					*/
					

				}else{

					currentUnit.motion = "walk";

					for (var p = 0; p < path.length; p++)
					{
						currentUnit.path.push(path[p]);	
					}

					//PATH SET UP, MOVE TO FIRST TILE
					var thisX = currentUnit.x;
					var thisY = currentUnit.y;

					var nextTargetX = currentUnit.path[1].x;
					var nextTargetY = currentUnit.path[1].y;

					var speed = currentUnit.speed;

					const tileWidthHalf = tileWidth / 2;
					const tileHeightHalf = tileHeight / 2;
					const centerX = mapWidth * tileWidthHalf;
					const centerY = 64;

						//GET WORLD COORDINATES FROM CURRENT TILE
						var currentNextPointX = (nextTargetY - nextTargetX) * tileWidthHalf;
						var currentNextPointY = (nextTargetY + nextTargetX) * tileHeightHalf;
						var currentCoordX = centerX + currentNextPointX; 
						var currentCoordY = centerY + currentNextPointY; 	

						var angle = Math.atan2(currentCoordX - thisY, currentCoordY - thisX);

						const direction = Math.atan((currentCoordX - thisX) / (currentCoordY- thisY));
						const speed2 = currentCoordY >= thisY ? speed : -speed;

						var velX = speed2 * Math.sin(direction);
						var velY = speed2 * Math.cos(direction);

						currentUnit.setVelocityX(velX);
						currentUnit.setVelocityY(velY);
						currentUnit.velocityX = velX;
						currentUnit.velocityY = velY;	
						
						console.log(theScene);
					
						var pathArray = [];
					
							for (var z = 0; z < path.length; z++)
							{
								console.log('Path '+i+' X: '+path[z].x+' Y: '+path[z].y);
								var pathX = path[z].x;
								var pathY = path[z].y;

								for (var i = 0; i < levelData.length; i++)
								{
									for (var j = 0; j < levelData[0].length; j++)
									{
										
									const tx = (j - i) * tileWidthHalf
									const ty = (j + i) * tileHeightHalf
									
									const isotopleftX = centerX + tx + tileWidthHalf;  //TOP OF DIAMOND
									const isotopleftY = centerY + ty; //TOP OF DIAMOND
									const isotoprightX = centerX + tx + tileWidth -1; //RIGHT OF DIAMOND
									const isotoprightY = centerY + ty + tileHeightHalf; //RIGHT OF DIAMOND
									const isobottomleftX = centerX + tx +1; //LEFT OF DIAMOND
									const isobottomleftY = centerY + ty + tileHeightHalf; //LEFT OF DIAMOND
									const isobottomrightX = centerX + tx + tileWidthHalf; //BOTTOM OF DIAMOND
									const isobottomrightY = centerY + ty + tileHeight; //BOTTOM OF DIAMOND

									const iso = isotopleftX + ' ' + isotopleftY + ' ' + isotoprightX + ' ' + isotoprightY + ' ' + isobottomrightX + ' ' + isobottomrightY + ' ' + isobottomleftX + ' ' + isobottomleftY;
										
									if (i == path[z].x && j == path[z].y) {	
										
									lightTile = theScene.matter.add.sprite(centerX + tx, centerY + ty, 'flatsprite',2, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);
									lightTile.depth = centerY + ty;
									lightTile.setOrigin(0.5,0.25);
								
									
									
									}
										
									}
									
								}
								
								
							}
					
					
						
				}

			});

			easystar.calculate();

			console.log('Target Tile X: '+currentUnit.targetTileX+' Y: '+currentUnit.targetTileY);
			//console.log('Next Tile X: '+currentUnit.path[1].x+' Y: '+currentUnit.path[1].y);

			currentUnit.update();
				
			}
				
			
				
			
		});
		
		//DETECT NON-WALKABLE TILE COLLISIONS
		this.matter.world.on('collisionstart', function (event, dontWalk, Units) {
    		
		/*
			var currentTileDepth = dontWalk.gameObject.depth; 
			var currentUnitId = Units.gameObject.id;
			var currentUnit = Units.gameObject;
			var isDontWalk = dontWalk.gameObject.dontWalk;
			var dontWalkTileX = dontWalk.gameObject.tileX;
			var dontWalkTileY = dontWalk.gameObject.tileY;
			var unitTileX = currentUnit.tileX;
			var unitTileY = currentUnit.tileY;
			
			currentUnit.depth = currentTileDepth+64;
			
			///////////////OLD DIRECTION BASED COLLISION PATHFINDING///////////////
			
			//CHECK IF GROUND UNIT AND HAS COLLIDED
			if (currentUnit.groundType == true && isDontWalk == true) {
				
			console.log('COLLISION OCCURED');
			
			//DEFINE SURROUNDING TILES OF UNIT
			var tileXLeft = Math.floor(levelData.indexOf(levelData[unitTileX-1]));
			if (tileXLeft < 0) { tileXLeft = 0; }
			var tileXRight = Math.floor(levelData.indexOf(levelData[unitTileX+1]));
			if (tileXRight < 0) { tileXRight = 0; }
			var tileYUp = Math.floor(levelData.indexOf(levelData[unitTileY-1]));
			if (tileYUp < 0) { tileYUp = 0; }
			var tileYDown = Math.floor(levelData.indexOf(levelData[unitTileY+1]));
			if (tileYDown < 0) { tileYDown = 0; }
			var tileX2Left = Math.floor(levelData.indexOf(levelData[unitTileX-2]));
			if (tileX2Left < 0) { tileX2Left = 0; }
			var tileX2Right = Math.floor(levelData.indexOf(levelData[unitTileX+2]));
			if (tileX2Right < 0) { tileX2Right = 0; }
			var tileY2Up = Math.floor(levelData.indexOf(levelData[unitTileY-2]));
			if (tileY2Up < 0) { tileY2Up = 0; }
			var tileY2Down = Math.floor(levelData.indexOf(levelData[unitTileY+2]));
			if (tileY2Down < 0) { tileY2Down = 0; }
				
			//GET DIRECTION OF UNIT COLLIDING
			
				//SOUTHWEST
				if (currentUnit.direction == "southWest") {

				console.log('UNIT IS SOUTHWEST FACING');

				var southEastCost = 0;
				var northWestCost = 0;

					if (levelData[unitTileX][tileYUp] > 8) { northWestCost++; }
					if (levelData[unitTileX][tileY2Up] > 8) { northWestCost++; }
					if (levelData[unitTileX][tileYDown] > 8) { southEastCost++; }
					if (levelData[unitTileX][tileY2Down] > 8) { southEastCost++; }

					//STORE OLD TARGET BEFORE CHANGING TEMPORARILY
					let oldTargetX = currentUnit.targetTileX;
					let oldTargetY = currentUnit.targetTileY;

					//CHECK COST BANK AND SET TARGET ACCORDINGLY
					if (southEastCost > northWestCost) {
						currentUnit.targetTileX = unitTileX;
						currentUnit.targetTileY = unitTileY - 99;
						console.log('MOVING NW. COST SE: '+southEastCost+' NW: '+northWestCost);
					}

					if (southEastCost < northWestCost) {
						currentUnit.targetTileX = unitTileX;
						currentUnit.targetTileY = unitTileY + 99;
						console.log('MOVING SE. COST SE: '+southEastCost+' NW: '+northWestCost);
					}
					
					if (southEastCost == northWestCost) {
					var randomDirection = Math.floor(Math.random() * 2); 
						if (randomDirection > 0) {
						currentUnit.targetTileX = unitTileX;
						currentUnit.targetTileY = unitTileY - 99;	
						console.log('RANDOM NW');	
						}else{
						currentUnit.targetTileX = unitTileX;
						currentUnit.targetTileY = unitTileY + 99;
						console.log('RANDOM SE');	
						}
	
					}

					//WAIT TO GO BACK TO ORIGINAL TARGET
					setTimeout(function() {
						currentUnit.targetTileX = oldTargetX;
						currentUnit.targetTileY = oldTargetY;
						console.log('OLD TARGET X: '+oldTargetX+' Y: '+oldTargetY);
					},currentUnit.speed*400);

				}
				
				//NORTHEAST
				if (currentUnit.direction == "northEast") {

				console.log('UNIT IS NORTHEAST FACING');

				var southEastCost = 0;
				var northWestCost = 0;

					if (levelData[unitTileX][tileYUp] > 8) { northWestCost++; }
					if (levelData[unitTileX][tileY2Up] > 8) { northWestCost++; }
					if (levelData[unitTileX][tileYDown] > 8) { southEastCost++; }
					if (levelData[unitTileX][tileY2Down] > 8) { southEastCost++; }

					//STORE OLD TARGET BEFORE CHANGING TEMPORARILY
					let oldTargetX = currentUnit.targetTileX;
					let oldTargetY = currentUnit.targetTileY;

					//CHECK COST BANK AND SET TARGET ACCORDINGLY
					if (southEastCost > northWestCost) {
						currentUnit.targetTileX = unitTileX;
						currentUnit.targetTileY = unitTileY - 99;
						console.log('MOVING NW. COST SE: '+southEastCost+' NW: '+northWestCost);
					}

					if (southEastCost < northWestCost) {
						currentUnit.targetTileX = unitTileX;
						currentUnit.targetTileY = unitTileY + 99;
						console.log('MOVING SE. COST SE: '+southEastCost+' NW: '+northWestCost);
					}
					
					if (southEastCost == northWestCost) {
					var randomDirection = Math.floor(Math.random() * 2); 
						if (randomDirection > 0) {
						currentUnit.targetTileX = unitTileX;
						currentUnit.targetTileY = unitTileY - 99;	
						console.log('RANDOM NW');	
						}else{
						currentUnit.targetTileX = unitTileX;
						currentUnit.targetTileY = unitTileY + 99;
						console.log('RANDOM SE');	
						}
	
					}

					//WAIT TO GO BACK TO ORIGINAL TARGET
					setTimeout(function() {
						currentUnit.targetTileX = oldTargetX;
						currentUnit.targetTileY = oldTargetY;
						console.log('OLD TARGET X: '+oldTargetX+' Y: '+oldTargetY);
					},currentUnit.speed*400);

				}
				
				//SOUTHEAST
				if (currentUnit.direction == "southEast") {

				console.log('UNIT IS SOUTHEAST FACING');

				var southWestCost = 0;
				var northEastCost = 0;

					if (levelData[tileXLeft][unitTileY] > 8) { northEastCost++; }
					if (levelData[tileX2Left][unitTileY] > 8) { northEastCost++; }
					if (levelData[tileXRight][unitTileY] > 8) { southWestCost++; }
					if (levelData[tileX2Right][unitTileY] > 8) { southWestCost++; }

					//STORE OLD TARGET BEFORE CHANGING TEMPORARILY
					let oldTargetX = currentUnit.targetTileX;
					let oldTargetY = currentUnit.targetTileY;

					//CHECK COST BANK AND SET TARGET ACCORDINGLY
					if (southWestCost > northEastCost) {
						currentUnit.targetTileX = unitTileX - 99;
						currentUnit.targetTileY = unitTileY;
						console.log('MOVING NE. COST SW: '+southWestCost+' NE: '+northEastCost);
					}

					if (southWestCost < northEastCost) {
						currentUnit.targetTileX = unitTileX + 99;
						currentUnit.targetTileY = unitTileY;
						console.log('MOVING SW. COST SW: '+southWestCost+' NE: '+northEastCost);
					}
					
					if (southWestCost == northEastCost) {
					var randomDirection = Math.floor(Math.random() * 2); 
						if (randomDirection > 0) {
						currentUnit.targetTileX = unitTileX - 99;
						currentUnit.targetTileY = unitTileY;	
						console.log('RANDOM NE');	
						}else{
						currentUnit.targetTileX = unitTileX + 99;
						currentUnit.targetTileY = unitTileY;
						console.log('RANDOM SW');	
						}
	
					}

					//WAIT TO GO BACK TO ORIGINAL TARGET
					setTimeout(function() {
						currentUnit.targetTileX = oldTargetX;
						currentUnit.targetTileY = oldTargetY;
					},currentUnit.speed*400);

				}
				
				//NORTHWEST
				if (currentUnit.direction == "northWest") {

				console.log('UNIT IS NORTHWEST FACING');

				var southWestCost = 0;
				var northEastCost = 0;

					if (levelData[tileXLeft][unitTileY] > 8) { northEastCost++; }
					if (levelData[tileX2Left][unitTileY] > 8) { northEastCost++; }
					if (levelData[tileXRight][unitTileY] > 8) { southWestCost++; }
					if (levelData[tileX2Right][unitTileY] > 8) { southWestCost++; }

					//STORE OLD TARGET BEFORE CHANGING TEMPORARILY
					let oldTargetX = currentUnit.targetTileX;
					let oldTargetY = currentUnit.targetTileY;

					//CHECK COST BANK AND SET TARGET ACCORDINGLY
					if (southWestCost > northEastCost) {
						currentUnit.targetTileX = unitTileX - 99;
						currentUnit.targetTileY = unitTileY;
						console.log('MOVING NE. COST SW: '+southWestCost+' NE: '+northEastCost);
					}

					if (southWestCost < northEastCost) {
						currentUnit.targetTileX = unitTileX + 99;
						currentUnit.targetTileY = unitTileY;
						console.log('MOVING SW. COST SW: '+southWestCost+' NE: '+northEastCost);
					}
					
					if (southWestCost == northEastCost) {
					var randomDirection = Math.floor(Math.random() * 2); 
						if (randomDirection > 0) {
						currentUnit.targetTileX = unitTileX - 99;
						currentUnit.targetTileY = unitTileY;	
						console.log('RANDOM NE');	
						}else{
						currentUnit.targetTileX = unitTileX + 99;
						currentUnit.targetTileY = unitTileY;
						console.log('RANDOM SW');	
						}
	
					}

					//WAIT TO GO BACK TO ORIGINAL TARGET
					setTimeout(function() {
						currentUnit.targetTileX = oldTargetX;
						currentUnit.targetTileY = oldTargetY;
					},currentUnit.speed*400);

				}
				
				/*
				//SOUTH
				if (currentUnit.direction == "south") {

				console.log('UNIT IS SOUTH FACING');

				var southEastCost = 0;
				var southWestCost = 0;

					if (levelData[tileXRight][unitTileY] > 8) { southWestCost++; }
					if (levelData[tileX2Right][unitTileY] > 8) { southWestCost++; }
					if (levelData[unitTileX][tileYDown] > 8) { southEastCost++; }
					if (levelData[unitTileX][tileY2Down] > 8) { southEastCost++; }

					//STORE OLD TARGET BEFORE CHANGING TEMPORARILY
					let oldTargetX = currentUnit.targetTileX;
					let oldTargetY = currentUnit.targetTileY;

					//CHECK COST BANK AND SET TARGET ACCORDINGLY
					if (southEastCost > southWestCost) {
						currentUnit.targetTileX = unitTileX + 99;
						currentUnit.targetTileY = unitTileY;
						console.log('MOVING SW. COST SE: '+southEastCost+' SW: '+southWestCost);
					}

					if (southEastCost < southWestCost) {
						currentUnit.targetTileX = unitTileX;
						currentUnit.targetTileY = unitTileY + 99;
						console.log('MOVING SE. COST SE: '+southEastCost+' SW: '+southWestCost);
					}
					
					if (southEastCost == southWestCost) {
					var randomDirection = Math.floor(Math.random() * 2); 
						if (randomDirection > 0) {
						currentUnit.targetTileX = unitTileX + 99;
						currentUnit.targetTileY = unitTileY;	
						console.log('RANDOM SW');	
						}else{
						currentUnit.targetTileX = unitTileX;
						currentUnit.targetTileY = unitTileY + 99;
						console.log('RANDOM SE');	
						}
	
					}

					//WAIT TO GO BACK TO ORIGINAL TARGET
					setTimeout(function() {
						currentUnit.targetTileX = oldTargetX;
						currentUnit.targetTileY = oldTargetY;
						console.log('OLD TARGET X: '+oldTargetX+' Y: '+oldTargetY);
					},currentUnit.speed*400);

				}
				
				
				
			}			
			
			
		*/
			var currentTileDepth = dontWalk.gameObject.depth; 
			var currentUnitId = Units.gameObject.id;
			var currentUnit = Units.gameObject;
			var isDontWalk = dontWalk.gameObject.dontWalk;
			var dontWalkTileX = dontWalk.gameObject.tileX;
			var dontWalkTileY = dontWalk.gameObject.tileY;
			var unitTileX = currentUnit.tileX;
			var unitTileY = currentUnit.tileY;	
			
			
		});
		
		
		
		
	}
	
    update () {
		
		//scene = GameScene;
		
		var cam = this.cameras.main; 
		this.cameras.main.setBounds((mapWidth*64)/2, (mapWidth*64)/4, (mapWidth*128)/2, (mapWidth*64)/2);
		cam.setZoom(1);
		
        const controlConfig = {
            camera: this.cameras.main,
            acceleration: 0.06,
            drag: 0.1,
            maxSpeed: 0
        };
		
		//ATTACK BUTTON LOGIC
		if (attackState == true) {
			attackReady = true;	
			
		}else{
			attackReady = false;
			attack.clearTint();
		}
		
		//WORLD SCROLL LOGIC
        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
		
		this.input.on('pointermove', function (p) {
    		if (!p.isDown) return;

			cam.scrollX -= (p.x - p.prevPosition.x) / 256;
			cam.scrollY -= (p.y - p.prevPosition.y) / 256;
			  
  		});
		
		
		//UPDATE UNITS
		for (let q in Units) {
		
			//PREVENT SPRITE ROTATION TO PRESERVE ISO
			Units[q].body.angle = 0;
			
			//UNIT DATA
			var healthBarBG = Units[q].healthBG;
			var unitCurrentHealth = Units[q].currentHealth;
			var unitHealth = Units[q].health;
			var unitTotalHealth = Units[q].totalhealth;
			var unitID = Units[q].id;
			
			//HEALTH BAR
			
			//CLEAR EXISTING BARS FIRST
				healthBarBG.clear();
				unitCurrentHealth.clear();	
			
			//CHECK IF A UNIT IS SELECTED TO DISPLAY HEALTH BAR
			if (selectedArray.length > 0) {
			
			var unitX = Units[q].x;
			var unitY = Units[q].y;
			

				//ACTUAL HEALTH
				var unitHealthCalc = unitHealth / unitTotalHealth;
				var h = Math.floor(unitHealthCalc * 50);
				
				if (unitHealthCalc > 0.5) {
					unitCurrentHealth.clear();
					unitCurrentHealth.fillStyle(0x00FF00);
					unitCurrentHealth.fillRect(unitX-25, unitY-50, h, 5);
				}else{
					unitCurrentHealth.clear();
					unitCurrentHealth.fillStyle(0xFF0000);	
					unitCurrentHealth.fillRect(unitX-25, unitY-50, h, 5);
				}
				
				healthBarBG.clear();
				healthBarBG.fillRect(unitX-25, unitY-50, 50, 5);
				healthBarBG.fillStyle(0xFFFFFF);
				
			
			}
			
			//UPDATE UNIT'S VELOCITY IF IN MOTION
			if (Units[q].motion == "walk") {
				
				if (Units[q].tileX == Units[q].targetTileX && Units[q].tileY == Units[q].targetTileY) {
					
				Units[q].setVelocityX(0);
				Units[q].setVelocityY(0);
				Units[q].targetTileX = null;
				Units[q].targetTileY = null;
					
				}else{
				
				if (Units[q].velocityX !== 'undefined' && Units[q].velocityY !== 'undefined') {
				
				var currentVelX = Units[q].velocityX;
				var currentVelY = Units[q].velocityY;
				
				Units[q].setVelocityX(currentVelX);
				Units[q].setVelocityY(currentVelY);
					
				}
					
			}
		}
			
			
		}
			
    }
	
    render () {

    }
	
	selectedListener() {
		
		if (selectedCount > 0) {
			
			//NAVIGATION BAR
			this.tweens.add({
				targets: this.navigation,
				y: game.config.height-295,
				duration: 250,
				ease: 'Power2'
			});
			
			//ATTACK BTN
			this.tweens.add({
				targets: attack,
				alpha: 1,
				duration: 200,
				delay: 250,
				ease: 'Power2'
			});
			
			//UPDATE SELECTED TEXT
			this.selectedText.setText(selectedCount+' SELECTED');
			
			//SELECTED TEXT
			this.tweens.add({
				targets: this.selectedText,
				alpha: 1,
				duration: 200,
				delay: 250,
				ease: 'Power2'
			});		

		}else{
		
			//NAVIGATION BAR
			this.tweens.add({
				targets: this.navigation,
				y: game.config.height*2,
				duration: 300,
				delay: 200,
				ease: 'Power2'
			});
			
			//ATTACK BTN
			this.tweens.add({
				targets: attack,
				alpha: 0,
				duration: 200,
				ease: 'Power2'
			});
			
			//SELECTED TEXT
			this.tweens.add({
				targets: this.selectedText,
				alpha: 0,
				duration: 200,
				ease: 'Power2'
			});
			
			attack.clearTint();
			attackReady = false;
			
		}

	}
	

	
	
    spawnTiles () {
		
		//scene = GameScene;
		
		var gameWidth = game.config.width;
		var gameHeight = game.config.height;
		
		const tileWidthHalf = tileWidth / 2;
		const tileHeightHalf = tileHeight / 2;
		
		const centerX = mapWidth * tileWidthHalf;
		const centerY = 64;
		
		for (var i = 0; i < levelData.length; i++)
		{
			for (var j = 0; j < levelData[0].length; j++)
			{
				tileType=levelData[i][j];
				
				var tile = new Phaser.Geom.Point(i,j);

				const tx = (j - i) * tileWidthHalf
				const ty = (j + i) * tileHeightHalf
				
				const isotopleftX = centerX + tx + tileWidthHalf;  //TOP OF DIAMOND
				const isotopleftY = centerY + ty; //TOP OF DIAMOND
				const isotoprightX = centerX + tx + tileWidth -1; //RIGHT OF DIAMOND
				const isotoprightY = centerY + ty + tileHeightHalf; //RIGHT OF DIAMOND
				const isobottomleftX = centerX + tx +1; //LEFT OF DIAMOND
				const isobottomleftY = centerY + ty + tileHeightHalf; //LEFT OF DIAMOND
				const isobottomrightX = centerX + tx + tileWidthHalf; //BOTTOM OF DIAMOND
				const isobottomrightY = centerY + ty + tileHeight; //BOTTOM OF DIAMOND
					
				const iso = isotopleftX + ' ' + isotopleftY + ' ' + isotoprightX + ' ' + isotoprightY + ' ' + isobottomrightX + ' ' + isobottomrightY + ' ' + isobottomleftX + ' ' + isobottomleftY;
				
				
				//DEFINE TILE TYPES
				
				//GRASS0
				if (tileType==0)
				{
				thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'flatsprite',0, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true).setSensor(true);
				thisTile.depth = centerY + ty;
				thisTile.setOrigin(0.5,0.25);
				
				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				tileGroup.add(thisTile);
				
				}
				
				    
				
				//GRASS1
				if (tileType==1)
				{
				thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'grasssprite',1, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true).setSensor(true);
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				tileGroup.add(thisTile);
				
				}
				
				//GRASS2
				if (tileType==2)
				{
				thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'grasssprite',2, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true).setSensor(true);		
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				tileGroup.add(thisTile)
				}
				
				//GRASS3
				if (tileType==3)
				{
				thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'grasssprite',3, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true).setSensor(true);				
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				tileGroup.add(thisTile);
				}
				
				//GRASS4
				if (tileType==4)
				{
				thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'grasssprite',4, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true).setSensor(true);
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				tileGroup.add(thisTile);
				}
				
				//GRASS5
				if (tileType==5)
				{
				thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'grasssprite',5, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true).setSensor(true);
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				tileGroup.add(thisTile);
				}
							
				//GRASS6
				if (tileType==6)
				{
				thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'grasssprite',6, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true).setSensor(true);	
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				tileGroup.add(thisTile);
				}
				
				//GRASS7
				if (tileType==7)
				{
				thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'grasssprite',7, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true).setSensor(true);		
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				tileGroup.add(thisTile);
				}
				
				//GRASS8
				if (tileType==8)
				{
				thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'grasssprite',8, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true).setSensor(true);	
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				tileGroup.add(thisTile);
				
				}
				
				//WATER
				if (tileType==9)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'flatsprite',5, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true)
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
tileGroup.add(thisTile);
				
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				thisTile.body.enable = true; 
				thisTile.body.immovable = true;
				}	

				//WATER NORTHEAST
				if (tileType==10)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'watersprite',27, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);
				thisTile.depth = centerY + ty;
				thisTile.setOrigin(0.5,0.25);
				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				thisTile.body.enable = true; 
				thisTile.body.immovable = true;
				}
				
				//WATER EAST
				if (tileType==11)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'watersprite',14, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				thisTile.body.enable = true; 
				thisTile.body.immovable = true;
				}
				
				//WATER SOUTHEAST
				if (tileType==12)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'watersprite',25, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
tileGroup.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				}
				
				//WATER SOUTH
				if (tileType==13)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'watersprite',17, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
tileGroup.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				}
				
				//WATER SOUTHWEST
				if (tileType==14)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'watersprite',24, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);	
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
tileGroup.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				}
				
				//WATER WEST
				if (tileType==15)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'watersprite',15, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
tileGroup.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				}
				
				//WATER NORTHWEST
				if (tileType==16)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'watersprite',26, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);	
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
tileGroup.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				}

				//WATER NORTH
				if (tileType==17)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'watersprite',16, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
tileGroup.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				}	
				
				//WATER EAST CORNER TIP
				if (tileType==18)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'watersprite',11, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;	
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
tileGroup.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				}	
				
				//WATER SOUTH CORNER TIP
				if (tileType==19)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'watersprite',1, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
tileGroup.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				}
				
				//WATER WEST CORNER TIP
				if (tileType==20)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'watersprite',10, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);	
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
tileGroup.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				}
				
				//WATER NORTH CORNER TIP
				if (tileType==21)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'watersprite',0, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;		
				dontWalk.add(thisTile);
tileGroup.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				}
				
				//TREE OBSTACLE
				if (tileType==22)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'obstacles',0, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
tileGroup.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				}
				
				//SHRUB OBSTACLE
				if (tileType==23)
				{
				
		thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'obstacles',1, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
tileGroup.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				}
				
				//POND PLANT OBSTACLE
				if (tileType==24)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'obstacles',2, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
tileGroup.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				}

				//SMALL POND OBSTACLE
				if (tileType==25)
				{
				
thisTile = this.matter.add.sprite(centerX + tx, centerY + ty, 'obstacles',3, { shape: { type: 'fromVerts', verts: iso, flagInternal: true } }).setStatic(true);
				thisTile.depth = centerY + ty;
thisTile.setOrigin(0.5,0.25);

				thisTile.tileX = i;
				thisTile.tileY = j;
thisTile.id = i+j;
				thisTile.dontWalk = true;
				dontWalk.add(thisTile);
tileGroup.add(thisTile);
				thisTile.setInteractive();
				thisTile.setCollisionCategory(ground);
				thisTile.setCollidesWith([groundunits]);
				}	
					
				
			}
		}
		

		
    }	
	
	spawnText () {
	
		const tileWidthHalf = tileWidth / 2;
		const tileHeightHalf = tileHeight / 2;
		
		const centerX = mapWidth * tileWidthHalf;
		const centerY = 64;


		for (var i = 0; i < levelData.length; i++)
		{
			
			for (var j = 0; j < levelData[0].length; j++)
			{
				
				const tx = (j - i) * tileWidthHalf
				const ty = (j + i) * tileHeightHalf
				
				//CURRENT TILE
				tileType=levelData[i][j];
				
				//GET INDEX OF TILE
				tileXIndex = levelData.indexOf(levelData[i]);
				tileYIndex = levelData.indexOf(levelData[j]);
				
				//DEFINE NEIGHBOR TILES
						var tileXLeft = Math.floor(levelData.indexOf(levelData[i-1]));
						if (tileXLeft < 0) { tileXLeft = 0; }
						var tileXRight = Math.floor(levelData.indexOf(levelData[i+1]));
						if (tileXRight < 0) { tileXRight = 0; }
						var tileYUp = Math.floor(levelData.indexOf(levelData[j-1]));
						if (tileYUp < 0) { tileYUp = 0; }
						var tileYDown = Math.floor(levelData.indexOf(levelData[j+1]));
						if (tileYDown < 0) { tileYDown = 0; }
						var tileX2Left = Math.floor(levelData.indexOf(levelData[i-2]));
						if (tileX2Left < 0) { tileX2Left = 0; }
						var tileX2Right = Math.floor(levelData.indexOf(levelData[i+2]));
						if (tileX2Right < 0) { tileX2Right = 0; }
						var tileY2Up = Math.floor(levelData.indexOf(levelData[j-2]));
						if (tileY2Up < 0) { tileY2Up = 0; }
						var tileY2Down = Math.floor(levelData.indexOf(levelData[j+2]));
						if (tileY2Down < 0) { tileY2Down = 0; }
					
				
				thisText = this.add.text(centerX + tx, centerY + ty, tileType, { fontFamily: 'nasalizationregular', fontSize: 12, color: '#CCCCCC'} );
				thisText.depth = centerY + ty;
				thisText.setOrigin(0.5,0.25);
				
				
			}
			
		}		
		
	}

	
}

