<?php

 
/* Attempt to connect to MySQL database */
$connServerCloud = mysqli_connect("10.0.10.168", "melvinsevilla", "M3lv1n**", "apiAedPayCustomers");
if($connServerCloud === false){
  die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>