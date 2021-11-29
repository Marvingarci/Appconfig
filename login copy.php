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
$user = $request['username'];
$pass = $request['password'];
$servername = '10.0.10.168';
$username = 'melvinsevilla';
$password = 'M3lv1n**';
$database = 'apiAedPayCustomers';
// Create connection
$mysqli = mysqli_connect($servername, $username, $password, $database);
// Check connection
if ($mysqli->connect_error) {
  die("Connection failed: " . $mysqli->connect_error);
}
//echo "Connected successfully";
//$result = mysqli_query($mysqli, "select * from location_accs where username = 'oel077@aedsoft.com';");
if ($resultado = $mysqli->query("select * from location_accs where username = '".$user."';")) {
  /* obtener el array de objetos */

  while ($fila = $resultado->fetch_row()) {
   
    //   printf (" la contra es %s\n", $fila[7]);
      $hashPassword = $fila[7];
      $hashUser = $fila[6];
      if((password_verify($pass,$hashPassword)) && ($user == $hashUser)){
        http_response_code(200);
        echo json_encode($fila[10]);
        return;
      }else{
        echo json_encode('Invalid Credential');
        http_response_code(401);
        return;
      }
    
     

  }
  echo json_encode('Invalid Credential');
  http_response_code(401);
  /* liberar el conjunto de resultados */
  //$resultado->close();
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