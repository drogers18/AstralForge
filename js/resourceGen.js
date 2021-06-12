resourceData = [];



		for (var i = 0; i < levelData.length; i++)
		{
			resourceData[i] = []
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
					
			//DO STUFF WITH TILETYPE HERE
				
				
				
			}
			
		}