<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding,X-Auth-Token ");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");

require_once "../connectionLocal.php";

exec("ipconfig getifaddr en1",$arrInfo);
$connServerLocal->query("UPDATE serverDetailsInfo SET ipAdress='".$arrInfo[0]."' WHERE id = 1;");
?>