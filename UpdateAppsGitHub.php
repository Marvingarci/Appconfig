<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
$postdata = file_get_contents("php://input");



// Create connections
$connServerLocal = mysqli_connect("localhost", "melvinsevilla", "M3lv1n**","serverLocal");

if($postdata == 'updateBoth'){
  $connServerLocal->query("UPDATE serverDetailsInfo SET testUpdate='updateBoth' WHERE id = 1;");

}else if($postdata == 'updateOnlyAngular'){
  $connServerLocal->query("UPDATE serverDetailsInfo SET testUpdate='updateOnlyAngular' WHERE id = 1;");

}else if($postdata == 'updateOnlyLaravel'){
  $connServerLocal->query("UPDATE serverDetailsInfo SET testUpdate='updateOnlyLaravel' WHERE id = 1;");
  
}else if($postdata == 'updateOnlyConfig'){
  $connServerLocal->query("UPDATE serverDetailsInfo SET testUpdate='updateOnlyConfig' WHERE id = 1;");  
}