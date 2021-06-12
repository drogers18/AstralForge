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