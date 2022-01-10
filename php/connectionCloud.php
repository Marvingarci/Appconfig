<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding,X-Auth-Token ");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

 
/* Attempt to connect to MySQL database */
$connServerCloud = mysqli_connect("10.0.10.168", "melvinsevilla", "M3lv1n**", "apiAedPayCustomers");
if($connServerCloud === false){
  die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>