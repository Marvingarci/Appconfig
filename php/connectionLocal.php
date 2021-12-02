<?php

 
/* Attempt to connect to MySQL database */
$connServerLocal = mysqli_connect("localhost", "melvinsevilla", "M3lv1n**", "serverLocal");
if($connServerLocal === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

$connServerAedPayLocal = mysqli_connect("localhost", "melvinsevilla", "M3lv1n**","apiAedPayCustomers");
if($connServerAedPayLocal === false){
  die("ERROR: Could not connect. " . mysqli_connect_error());
}

?>