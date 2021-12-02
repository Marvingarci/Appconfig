<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
$postdata = file_get_contents("php://input");
 if (!$postdata) {
       return;
  }
$request = json_decode($postdata, true);
$database = $request['dbServer'];
$SID = $request['SID'];

// Create connection
$mysqli = mysqli_connect('localhost', 'melvinsevilla', 'M3lv1n**', $database);
if ($mysqli->connect_error) {
  die("Connection failed: " . $mysqli->connect_error);
}

$myArray = array();
if ($result = $mysqli->query("SELECT * FROM styles WHERE SID = '".$SID."';")) {

    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $myArray[] = $row;
    }
    echo json_encode($myArray);
}


