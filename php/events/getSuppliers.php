<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding,X-Auth-Token ");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");



$postdata = file_get_contents("php://input");
 if (!$postdata) {
       return;
  }

$request = json_decode($postdata, true);
$database = $request['dbServer'];
$today = date('Y-m-d');

require_once "../connectionLocal.php";

$myArray = array();
if ($result = $connServerLocal->query("SELECT * FROM suppliers;")) {

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