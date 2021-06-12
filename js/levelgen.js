var min = 50;
var max = 50; 

var minTileRange = 0;
var maxTileRange = 9;

var mapWidth = Math.floor(Math.random() * (max - min + 1) ) + min;


//BEGIN BY RANDOMLY GENERATING TILES EXCEPT WATER EDGES
var levelData = []; // Initialize array
for (var i = 0 ; i < mapWidth; i++) {
    levelData[i] = []; // Initialize inner array
    for (var j = 0; j < mapWidth; j++) { // i++ needs to be j++

        	levelData[i][j] = Math.floor(Math.random() * (maxTileRange - minTileRange + 1) ) + minnTileRange;
		
	}
}

		//REMOVE WATER TILES 2 TILES AWAY AND TOO CLOSE TO EDGES
		for (var i = 0; i < levelData.length; i++)
		{
			
			for (var j = 0; j < levelData[0].length; j++)
			{
				
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
					
					//TILE IS WATER, CHANGE TO DEFAULT TILE
					if (levelData[tileX2Left][tileYIndex] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
				
					if (levelData[tileX2Right][tileYIndex] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
					
					if (levelData[tileXIndex][tileY2Up] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
				
					if (levelData[tileXIndex][tileY2Down] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
				
					if (levelData[tileX2Left][tileY2Up] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
				
					if (levelData[tileX2Right][tileY2Up] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
					
					if (levelData[tileX2Left][tileY2Up] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
				
					if (levelData[tileX2Right][tileY2Down] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
				
					if (levelData[tileX2Left][tileYUp] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
				
					if (levelData[tileX2Right][tileYUp] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
					
					if (levelData[tileXLeft][tileY2Up] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
				
					if (levelData[tileXRight][tileY2Up] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
				
					if (levelData[tileX2Left][tileYDown] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
				
					if (levelData[tileX2Right][tileYDown] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
					
					if (levelData[tileXLeft][tileY2Down] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
				
					if (levelData[tileXRight][tileY2Down] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close detected at X='+tileXIndex+' Y='+tileYIndex);
					}
				
					//TILE IS WATER TOO CLOSE TO EDGE, CHANGE TO DEFAULT TILE
					if (levelData[1][tileYIndex] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close to X edge at X='+tileXIndex+' Y='+tileYIndex);
					}
				
					if (levelData[tileXIndex][1] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close to Y edge at X='+tileXIndex+' Y='+tileYIndex);
					}
				
					if (levelData[mapWidth-1][tileYIndex] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close to S X edge at X='+tileXIndex+' Y='+tileYIndex);
					}
				
					if (levelData[tileXIndex][mapWidth-1] == 9) {
						levelData[tileXIndex][tileYIndex] = 0;
						//console.log('Water too close to S Y edge at X='+tileXIndex+' Y='+tileYIndex);
					}

				
			}
			
		}

		//FIRST PASS, CREATE EDGES AROUND WATER TILES
		for (var i = 0; i < levelData.length; i++)
		{
			
			for (var j = 0; j < levelData[0].length; j++)
			{
				
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
					
				
					//TILE IS WATER, CHANGE NEIGHBORS
					if (tileType==9) {
						
						//CHANGE NEIGHBOR TILES
						levelData[tileXLeft][tileYIndex] = 16;
						levelData[tileXRight][tileYIndex] = 12;
						levelData[tileXIndex][tileYUp] = 10;
						levelData[tileXIndex][tileYDown] = 14;
						levelData[tileXLeft][tileYUp] = 17;
						levelData[tileXRight][tileYUp] = 11;
						levelData[tileXLeft][tileYDown] = 15;
						levelData[tileXRight][tileYDown] = 13;
					}
					
				
			}
			
		}

		//SECOND PASS, REMOVE RANDOM CORNERS
		for (var i = 0; i < levelData.length; i++)
		{
			
			for (var j = 0; j < levelData[0].length; j++)
			{
				
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
					
					if (levelData[tileXLeft][tileYIndex]==9 && tileType==16) {
						levelData[tileXIndex][tileYIndex] = 9;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to water');
					}
				
					if (levelData[tileXRight][tileYIndex]==9 && tileType==12) {
						levelData[tileXIndex][tileYIndex] = 9;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to water');
					}
				
					if (levelData[tileXIndex][tileYUp]==9 && tileType==10) {
						levelData[tileXIndex][tileYIndex] = 9;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to water');
					}
				
					if (levelData[tileXIndex][tileYDown]==9 && tileType==14) {
						levelData[tileXIndex][tileYIndex] = 9;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to water');
					}
				

				
			}
			
		}

		//THIRD PASS, MERGE ADJACENT CORNERS MAKE LONG WATER STRETCHES
		for (var i = 0; i < levelData.length; i++)
		{
			
			for (var j = 0; j < levelData[0].length; j++)
			{
				
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
					
					if (levelData[tileXIndex][tileYIndex]==13 && levelData[tileXIndex][tileYDown]==11) {
						levelData[tileXIndex][tileYIndex] = 12;
						levelData[tileXIndex][tileYDown] = 12;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', MERGED S CORNER');
					}
				
					if (levelData[tileXIndex][tileYIndex]==13 && levelData[tileXRight][tileYIndex]==16) {
						levelData[tileXIndex][tileYIndex] = 14;
						levelData[tileXRight][tileYIndex] = 20;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', MERGED S CORNER');
					}
				
					if (levelData[tileXIndex][tileYIndex]==13 && levelData[tileXIndex][tileYDown]==15) {
						levelData[tileXIndex][tileYIndex] = 14;
						levelData[tileXIndex][tileYDown] = 14;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', MERGED S CORNER');
					}
				
					if (levelData[tileXIndex][tileYIndex]==17 && levelData[tileXLeft][tileYIndex]==11) {
						levelData[tileXIndex][tileYIndex] = 10;
						levelData[tileXLeft][tileYIndex] = 10;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', MERGED N CORNER');
					}
				
					if (levelData[tileXIndex][tileYIndex]==11 && levelData[tileXLeft][tileYIndex]==13) {
						levelData[tileXIndex][tileYIndex] = 14;
						levelData[tileXLeft][tileYIndex] = 14;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', MERGED E CORNER');
					}
				
					if (levelData[tileXIndex][tileYIndex]==11 && levelData[tileXRight][tileYIndex]==17) {
						levelData[tileXIndex][tileYIndex] = 10;
						levelData[tileXRight][tileYIndex] = 10;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', MERGED E CORNER');
					}
				
					if (levelData[tileXIndex][tileYIndex]==11 && levelData[tileXRight][tileYIndex]==10) {
						levelData[tileXIndex][tileYIndex] = 10;
						levelData[tileXRight][tileYIndex] = 17;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', MERGED E CORNER');
					}
				
					if (levelData[tileXIndex][tileYIndex]==15 && levelData[tileXIndex][tileYDown]==17) {
						levelData[tileXIndex][tileYIndex] = 16;
						levelData[tileXIndex][tileYDown] = 16;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', MERGED W CORNER');

					}
				
					if (levelData[tileXIndex][tileYIndex]==15 && levelData[tileXLeft][tileYIndex]==13) {
						levelData[tileXIndex][tileYIndex] = 14;
						levelData[tileXLeft][tileYIndex] = 14;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', MERGED W CORNER');
					}
			
					if (levelData[tileXIndex][tileYIndex]==15 && levelData[tileXIndex][tileYDown]==16) {
						levelData[tileXIndex][tileYIndex] = 16;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', MERGED W CORNER');
					}
				
					if (levelData[tileXIndex][tileYIndex]==15 && levelData[tileXLeft][tileYIndex]==12) {
						levelData[tileXIndex][tileYIndex] = 14;
						levelData[tileXLeft][tileYIndex] = 13;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', MERGED W CORNER');
					}
				
					if (levelData[tileXIndex][tileYIndex]==14 && levelData[tileXIndex][tileYDown]==10) {
						levelData[tileXIndex][tileYIndex] = 9;
						levelData[tileXIndex][tileYDown] = 9;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', MERGED SW FACE TO WATER');
					}
				
					if (levelData[tileXIndex][tileYIndex]==16 && levelData[tileXLeft][tileYIndex]==12) {
						levelData[tileXIndex][tileYIndex] = 9;
						levelData[tileXLeft][tileYIndex] = 9;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', MERGED NW FACE TO WATER');
					}
				
			}
			
		}

		//FOURTH PASS, REMOVE ODD SOUTH OFFSETS
		for (var i = 0; i < levelData.length; i++)
		{
			
			for (var j = 0; j < levelData[0].length; j++)
			{
				
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

					if (levelData[tileXIndex][tileYIndex]==13 && levelData[tileXIndex][tileYUp]==11) {
						levelData[tileXIndex][tileYIndex] = 12;
						levelData[tileXRight][tileYIndex] = 15;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', SOUTH OFFSET, MADE EDGE AND CORNER');
					}
				
					if (levelData[tileXIndex][tileYIndex]==13 && levelData[tileXIndex][tileYDown]==10) {
						levelData[tileXIndex][tileYIndex] = 12;
						levelData[tileXIndex][tileYDown] = 18;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', SOUTH OFFSET, MADE EDGE AND CORNER');
					}
				
					if (levelData[tileXIndex][tileYIndex]==17 && levelData[tileXLeft][tileYIndex]==12) {
						levelData[tileXIndex][tileYIndex] = 10;
						levelData[tileXLeft][tileYIndex] = 18;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', NORTH OFFSET, MADE EDGE AND CORNER');
					}
				
				
					if (levelData[tileXIndex][tileYIndex]==15 && levelData[tileXIndex][tileYDown]==10) {
						levelData[tileXIndex][tileYIndex] = 16;
						levelData[tileXIndex][tileYDown] = 12;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', ODD W CORNER, MERGED');
					}
				
					if (levelData[tileXIndex][tileYIndex]==17 && levelData[tileXIndex][tileYUp]==14) {
						levelData[tileXIndex][tileYIndex] = 16;
						levelData[tileXIndex][tileYUp] = 20;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', ODD N CORNER, MERGED');
					}
				
					if (levelData[tileXIndex][tileYIndex]==17 && levelData[tileXIndex][tileYUp]==16) {
						levelData[tileXIndex][tileYIndex] = 10;
						levelData[tileXIndex][tileYUp] = 14;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', ODD W CORNER, MERGED');
					}
				
					if (levelData[tileXIndex][tileYIndex]==11 && levelData[tileXIndex][tileYUp]==14) {
						levelData[tileXIndex][tileYIndex] = 12;
						levelData[tileXIndex][tileYUp] = 19;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', ODD S CORNER, MERGED');
					}
				
			}
			
		}


		//FIFTH PASS, MAKE CORNER TIPS FROM ODD WATER CORNERS
		for (var i = 0; i < levelData.length; i++)
		{
			
			for (var j = 0; j < levelData[0].length; j++)
			{
				
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
					
					if (levelData[tileXLeft][tileYIndex]==10 && levelData[tileXIndex][tileYUp]==16) {
						levelData[tileXIndex][tileYIndex] = 21;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to north tip');
					}
				
					if (levelData[tileXIndex][tileYIndex]==10 && levelData[tileXLeft][tileYIndex]==13) {
						levelData[tileXIndex][tileYIndex] = 21;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to north tip');
					}
				
					if (levelData[tileXRight][tileYIndex]==14 && levelData[tileXIndex][tileYDown]==12) {
						levelData[tileXIndex][tileYIndex] = 19;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to south tip');
					}
				
					if (levelData[tileXLeft][tileYIndex]==14 && levelData[tileXIndex][tileYDown]==16) {
						levelData[tileXIndex][tileYIndex] = 20;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to west tip');
					}
				
					if (levelData[tileXLeft][tileYIndex]==14 && levelData[tileXIndex][tileYDown]==15) {
						levelData[tileXIndex][tileYIndex] = 20;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to west tip');
					}
				
					if (levelData[tileXLeft][tileYIndex]==17 && levelData[tileXIndex][tileYUp]==16) {
						levelData[tileXIndex][tileYIndex] = 21;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to north tip');
					}
				
					if (levelData[tileXLeft][tileYIndex]==10 && levelData[tileXIndex][tileYUp]==16) {
						levelData[tileXIndex][tileYIndex] = 21;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to north tip');
					}
			
				
					if (levelData[tileXIndex][tileYUp]==12 && levelData[tileXRight][tileYIndex]==11) {
						levelData[tileXIndex][tileYIndex] = 18;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to east tip');
					}
				
					if (levelData[tileXIndex][tileYUp]==11 && levelData[tileXRight][tileYIndex]==10) {
						levelData[tileXIndex][tileYIndex] = 18;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to east tip');
					}
				
					if (levelData[tileXRight][tileYIndex]==13 && levelData[tileXIndex][tileYDown]==12) {
						levelData[tileXIndex][tileYIndex] = 19;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to south tip');
					}
				
					if (levelData[tileXRight][tileYIndex]==14 && levelData[tileXIndex][tileYDown]==13) {
						levelData[tileXIndex][tileYIndex] = 19;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to south tip');
					}
				
					if (levelData[tileXLeft][tileYIndex]==15 && levelData[tileXIndex][tileYDown]==16) {
						levelData[tileXIndex][tileYIndex] = 20;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to west tip');
					}
				
					if (levelData[tileXLeft][tileYIndex]==10 && levelData[tileXIndex][tileYUp]==17) {
						levelData[tileXIndex][tileYIndex] = 21;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to west tip');
					}
				
					if (levelData[tileXIndex][tileYIndex]==10 && levelData[tileXLeft][tileYIndex]==11) {
						levelData[tileXIndex][tileYIndex] = 21;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to north tip');
					}
				
				
				
			}
			
		}

		//FINAL PASS, MAKE OBSTACLES
		for (var i = 0; i < levelData.length; i++)
		{
			
			for (var j = 0; j < levelData[0].length; j++)
			{
				
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
					
					if (levelData[tileXIndex][tileYIndex]==0 && levelData[tileXLeft][tileYIndex]==1 && levelData[tileXIndex][tileYUp]==1) {
						levelData[tileXIndex][tileYIndex] = 22;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to tree');
					}
				
					if (levelData[tileXIndex][tileYIndex]==0 && levelData[tileXRight][tileYIndex]==1 && levelData[tileXIndex][tileYDown]==1) {
						levelData[tileXIndex][tileYIndex] = 23;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to shrub');
					}
				
					if (levelData[tileXIndex][tileYIndex]==0 && levelData[tileXLeft][tileYIndex]==2 && levelData[tileXIndex][tileYUp]==2) {
						levelData[tileXIndex][tileYIndex] = 24;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to pond plant');
					}
				
					if (levelData[tileXIndex][tileYIndex]==0 && levelData[tileXRight][tileYIndex]==2 && levelData[tileXIndex][tileYDown]==2) {
						levelData[tileXIndex][tileYIndex] = 25;
						//console.log('Tile X='+tileXIndex+' Y='+tileYIndex+' was tiletype '+ tileType+', changed to pond');
					}
				
			}
			
		}

		//PUSH levelData to cells array
		/*
		levelData.row = {}
		levelData.col = {}

		for (var i = 0; i < levelData.length; i++)
		{
			levelData.row[i] = levelData[i];			
			
			for (var j = 0; j < levelData[0].length; j++)
			{
				
				levelData.col[j] = levelData[j];
	
				
			}
			
		}
		*/
	//console.log(levelData.row);
		
	/*
	
//TILEMAP ARRAY EXAMPLE
[[0,0,0,0,0,0],
[0,1,8,8,7,0],
[0,2,9,9,6,0],
[0,2,9,9,6,0],
[0,3,4,4,5,0],
[0,0,0,0,0,0]];
*/