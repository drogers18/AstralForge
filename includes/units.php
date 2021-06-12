<?php
include "../dbauth/users.inc.php";

$usersconn = new mysqli($usershostname, $usersusername, $userspassword, $usersdbname);
// Check connection
if ($usersconn->connect_error) {
	die("Connection failed: " . $usersconn->connect_error);
} 

			
			
				$unitssql = "SELECT * FROM units";
				$thisunitsresult = $usersconn->query($unitssql);
				
				$thisunitsresultnumrows = mysqli_num_rows($thisunitsresult); 

				
				
				if ($thisunitsresult->num_rows > 0) {
					
				$unitData = array();
				$unitData['unitId'] = array();
				$unitData['unitUsername'] = array();
				$unitData['unitType'] = array();
				$unitData['unitHealth'] = array();
				$unitData['unitTotalhealth'] = array();
				$unitData['unitShields'] = array();
				$unitData['unitTotalshields'] = array();
				$unitData['unitWorld'] = array();
				$unitData['unitX'] = array();
				$unitData['unitY'] = array();
				$unitData['unitAction'] = array();
				$unitData['unitDirection'] = array();
				$unitData['unitTarget'] = array();
					
				$z = 0;
					
					while($thisunitsrow = $thisunitsresult->fetch_assoc()) {
						$thisunitsid = $thisunitsrow["id"];
						$thisunitsusername = $thisunitsrow["username"];
						$thisunitstype = $thisunitsrow["type"];
						$thisunitshealth = $thisunitsrow["health"];
						$thisunitstotalhealth = $thisunitsrow["totalhealth"];
						$thisunitsshields = $thisunitsrow["shields"];
						$thisunitstotalshields = $thisunitsrow["totalshields"];
						$thisunitsworld = $thisunitsrow["world"];
						$thisunitsx = $thisunitsrow["x"];
						$thisunitsy = $thisunitsrow["y"];
						$thisunitsaction = $thisunitsrow["action"];
						$thisunitsdirection = $thisunitsrow["direction"];
						$thisunitstarget = $thisunitsrow["target"];
					
							
						array_push($unitData['unitId'], $thisunitsid);
						array_push($unitData['unitUsername'], $thisunitsusername);
						array_push($unitData['unitType'], $thisunitstype);
						array_push($unitData['unitHealth'], $thisunitshealth);
						array_push($unitData['unitTotalhealth'], $thisunitstotalhealth);
						array_push($unitData['unitShields'], $thisunitsshields);
						array_push($unitData['unitTotalshields'], $thisunitstotalshields);
						array_push($unitData['unitWorld'], $thisunitsworld);
						array_push($unitData['unitX'], $thisunitsx);
						array_push($unitData['unitY'], $thisunitsy);
						array_push($unitData['unitAction'], $thisunitsaction);
						array_push($unitData['unitDirection'], $thisunitsdirection);
						array_push($unitData['unitTarget'], $thisunitstarget);
						

						
						
					
						
					$z++;
						
					}
					
					echo json_encode($unitData);
					
				}
					
						
?>