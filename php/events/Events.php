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
$today = date('Y-m-d h-m-s');
// Create connection

$mysqli = mysqli_connect('localhost', 'melvinsevilla', 'M3lv1n**', $database);
// Check connection
if ($mysqli->connect_error) {
  die("Connection failed: " . $mysqli->connect_error);
}
//echo "Connected successfully";
//$result = mysqli_query($mysqli, "select * from location_accs where username = 'oel077@aedsoft.com';");

$myArray = array();
if ($result = $mysqli->query("SELECT * FROM Events WHERE dbDatets > '".$today."';")) {

    while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $myArray[] = $row;
    }
    echo json_encode($myArray);
}




// $mysqli = new mysqli('localhost','user','password','myDatabaseName');
// $myArray = array();
// if ($result = $mysqli->query("SELECT * FROM phase1")) {

//     while($row = $result->fetch_array(MYSQLI_ASSOC)) {
//             $myArray[] = $row;
//     }
//     echo json_encode($myArray);
// }

// $result->close();
// $mysqli->close();