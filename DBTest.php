<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

// Shell_exec("/Applications/MAMP/library/bin/mysqldump -h 10.0.10.168 -u melvinsevilla -pM3lv1n** download > /Applications/MAMP/htdocs/Appconfig/db/localaedpay.sql");
Shell_exec("/Applications/MAMP/Library/bin/mysql --host=localhost -umelvinsevilla -pM3lv1n** -Dlocalaedpay < /Applications/MAMP/htdocs/Appconfig/db/localaedpay.sql");
$postdata = file_get_contents("php://input");

 if (!$postdata) {
       return;
  }

$request = json_decode($postdata, true);

$servername = $request['servername'];
$username = $request['username'];
$password = $request['password'];

// Create connection
$mysqli = mysqli_connect($servername, $username, $password);
//
$table1 = "tabla1";
$database = "download";
$batch_line = "cmd /c C:\laragon\www\sqlbackUp ".escapeshellarg($database)." ".escapeshellarg($table1);
//// Check connection
if ($mysqli->connect_error) {
  die("Connection failed: " . $mysqli->connect_error);
 
}else{
//  exec($batch_line);
echo "succeffully conected";
}

// $result = mysqli_query($mysqli, "create database testDBConnection;");

?>
