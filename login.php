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


// Create connections
$connServer = mysqli_connect("10.0.10.168", "melvinsevilla", "M3lv1n**", "apiAedPayCustomers");
$connLocal = mysqli_connect("localhost", "melvinsevilla", "M3lv1n**","serverLocal");

// Check connection
// if ($mysqli->connect_error) {
//   die("Connection failed: " . $mysqli->connect_error);
// }

if ($resultado = $connServer->query("select * from location_accs where username = '".$user."';")) {
  
  /* obtener el array de objetos */
  while ($fila = $resultado->fetch_row()) {
    $hashPassword = $fila[7];
    $dbServer = $fila[10];    
    $hashUser = $fila[6];
  }


    if($hashPassword){
    //   printf (" la contra es %s\n", $fila[7]);
      //$hashPassword = $fila[7];
      if(password_verify($pass,$hashPassword) && ($user == $hashUser)){






                //verificar si la conexion se ya se hizo por primera vez
              //   $datos = $connLocal->query("select * from serverDetailsInfo where id = 1;");
              //   while($row  = $datos->fetch_row()){
              //       $statusFirstDb = $row[4];
              //   }

              //   if($statusFirstDb == 'Need Setup'){
              //   $connLocal->query("create database ".$dbServer.";");
              //   $connLocal->query("create database apiAedPayCustomers;");
                
              //   //vamos a bajar las dbs.sql
              //   Shell_exec("/Applications/MAMP/library/bin/mysqldump -h 10.0.10.168 -u melvinsevilla -pM3lv1n** ".$dbServer." --triggers --routines > /Applications/MAMP/htdocs/php/db/dbLocalDealer.sql");
              //   Shell_exec("/Applications/MAMP/library/bin/mysqldump -h 10.0.10.168 -u melvinsevilla -pM3lv1n** apiAedPayCustomers Globals HelpCenter location_accs StyleItems Styles Suppliers supven --routines --triggers > /Applications/MAMP/htdocs/php/db/dbLocalaedpayCustomers.sql");
              //   Shell_exec("/Applications/MAMP/library/bin/mysqldump -h 10.0.10.168 -u melvinsevilla -pM3lv1n** apiAedPayCustomers location_accs --where=\"dbServer='$dbServer'\" > /Applications/MAMP/htdocs/php/db/locations.sql");
                
              //   //change collation
              //   $oldFile="/Applications/MAMP/htdocs/php/db/dbLocalaedpayCustomers.sql"; 
              //   $newFile="/Applications/MAMP/htdocs/php/db/dbLocalaedpayCustomers.sql"; 
              //   file_put_contents($newFile,str_replace('utf8mb4_0900_ai_ci','utf8_general_ci',file_get_contents($oldFile)));                

              //   //vamos a ejecutar los dbs.sql
              //   Shell_exec("/Applications/MAMP/Library/bin/mysql --host=localhost -umelvinsevilla -pM3lv1n** -D".$dbServer." < /Applications/MAMP/htdocs/php/db/dbLocalDealer.sql");
              //   Shell_exec("/Applications/MAMP/Library/bin/mysql --host=localhost -umelvinsevilla -pM3lv1n**  -DapiAedPayCustomers < /Applications/MAMP/htdocs/php/db/dbLocalaedpayCustomers.sql");
              //   Shell_exec("/Applications/MAMP/Library/bin/mysql --host=localhost -umelvinsevilla -pM3lv1n**  -DapiAedPayCustomers < /Applications/MAMP/htdocs/php/db/locations.sql");
              //   Shell_exec("/Applications/MAMP/Library/bin/mysql --host=localhost -umelvinsevilla -pM3lv1n**  -DapiAedPayCustomers < /Applications/MAMP/htdocs/php/db/ViewVSuppliers.sql");
              //   Shell_exec("/Applications/MAMP/Library/bin/mysql --host=localhost -umelvinsevilla -pM3lv1n**  -DapiAedPayCustomers < /Applications/MAMP/htdocs/php/db/ViewVDistinctSuppliers.sql");

              //   $connLocal->query("UPDATE serverDetailsInfo SET statusFirstDb='Setup Complet' WHERE id = 1;");
              //   $connLocal->query("UPDATE serverDetailsInfo SET serverName='".$dbServer."' WHERE id = 1;");

              //   http_response_code(200);
              //   echo json_encode($dbServer);
              //   return;
                
              // }else{
                http_response_code(200);
                echo json_encode($dbServer);
                return;
              // }






        
      }else{
        echo json_encode('Invalid Credential');
        http_response_code(401);
        return;
      }
    }else{
      echo json_encode('Invalid Credential');
      http_response_code(401);
      return;
    }
  
  /* liberar el conjunto de resultados */
  $resultado->close();
}
