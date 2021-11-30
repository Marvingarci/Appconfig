<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: POST");
$postdata = file_get_contents("php://input");
 if (!$postdata) {
       return;
  }
$request = json_decode($postdata, true);
$database = $request['dbServer'];
$xx_events_id = $request['event_id'];
// Create connection
$connServerCloud = mysqli_connect("10.0.10.168", "melvinsevilla", "M3lv1n**", $database);
$mysqli = mysqli_connect('localhost', 'melvinsevilla', 'M3lv1n**', $database);

// Check connection
if ($mysqli->connect_error) {
  die("Connection failed: " . $mysqli->connect_error);
}

$myArray = array();
if ($result = $mysqli->query("SELECT * FROM salesorder WHERE xx_events_id = ".$xx_events_id.";")) {

    while($row = $result->fetch_row()) {
            echo json_encode($row[6]);
            $resultInsert = $connServerCloud->query("INSERT INTO salesorder VALUES (".$row[0].",) ");
            

    }
 //   echo json_encode($myArray);
}

for ($i=0; $i < count($myArray) ; $i++) { 
  //echo $myArray[$i].;
  //$resultInsert = $connServerCloud->query('INSERT INTO salesorder VALUES () ');
}







