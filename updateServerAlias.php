<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods:POST");
$postdata = file_get_contents("php://input");
 if (!$postdata) {
       return;
  }
$request = json_decode($postdata, true);
$serverAliasInput = $request['serverAliasInput'];
// Create connections
$connServerLocal = mysqli_connect("localhost", "melvinsevilla", "M3lv1n**","serverLocal");
$connServerLocal->query("UPDATE serverDetailsInfo SET serverAlias='".$serverAliasInput."' WHERE id = 1;");

