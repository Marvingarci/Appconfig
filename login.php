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
    if($fila){
    //   printf (" la contra es %s\n", $fila[7]);
      $hashPassword = $fila[7];
      if(password_verify($pass,$hashPassword)){
        http_response_code(200);
      }else{
        echo 'contrasena incorrecta';
      }
    }else{
      echo 'usuario incorrecto';
    }
  }
  /* liberar el conjunto de resultados */
  $resultado->close();
}