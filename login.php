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
$connServerLocal = mysqli_connect("localhost", "melvinsevilla", "M3lv1n**","serverLocal");
$connServerCloud = mysqli_connect("10.0.10.168", "melvinsevilla", "M3lv1n**", "apiAedPayCustomers");
$connServerAedPayLocal = mysqli_connect("localhost", "melvinsevilla", "M3lv1n**","apiAedPayCustomers");

//verificar si ya se realizo el setUp
$datos = $connServerLocal->query("select * from serverDetailsInfo where id = 1;");
while($row  = $datos->fetch_row()){
    $statusFirstDb = $row[4];
}

if($statusFirstDb == 'Need Setup'){

    //se verifica en el cloud
    if ($resultado = $connServerCloud->query("select * from location_accs where username = '".$user."';")) {
  
          /* obtener el array de objetos */
          while ($fila = $resultado->fetch_row()) {
            $hashUser = $fila[6];
            $hashPassword = $fila[7];  
            $dbServer = $fila[10]; 
          }    
    
          if(password_verify($pass,$hashPassword) && ($user == $hashUser)){
            
              $connServerLocal->query("create database ".$dbServer.";");
              $connServerLocal->query("create database apiAedPayCustomers;");
              
              //vamos a bajar las dbs.sql
              Shell_exec("/Applications/MAMP/library/bin/mysqldump -h 10.0.10.168 -u melvinsevilla -pM3lv1n** ".$dbServer." --triggers --routines > /Applications/MAMP/htdocs/php/db/dbLocalDealer.sql");
              Shell_exec("/Applications/MAMP/library/bin/mysqldump -h 10.0.10.168 -u melvinsevilla -pM3lv1n** apiAedPayCustomers Globals HelpCenter location_accs StyleItems Styles Suppliers supven --routines --triggers > /Applications/MAMP/htdocs/php/db/dbLocalaedpayCustomers.sql");
              Shell_exec("/Applications/MAMP/library/bin/mysqldump -h 10.0.10.168 -u melvinsevilla -pM3lv1n** apiAedPayCustomers location_accs --where=\"dbServer='$dbServer'\" > /Applications/MAMP/htdocs/php/db/locations.sql");
              
              //change collation
              $oldFile="/Applications/MAMP/htdocs/php/db/dbLocalaedpayCustomers.sql"; 
              $newFile="/Applications/MAMP/htdocs/php/db/dbLocalaedpayCustomers.sql"; 
              file_put_contents($newFile,str_replace('utf8mb4_0900_ai_ci','utf8_general_ci',file_get_contents($oldFile)));                
        
              //vamos a ejecutar los dbs.sql
              Shell_exec("/Applications/MAMP/Library/bin/mysql --host=localhost -umelvinsevilla -pM3lv1n** -D".$dbServer." < /Applications/MAMP/htdocs/php/db/dbLocalDealer.sql");
              Shell_exec("/Applications/MAMP/Library/bin/mysql --host=localhost -umelvinsevilla -pM3lv1n**  -DapiAedPayCustomers < /Applications/MAMP/htdocs/php/db/dbLocalaedpayCustomers.sql");
              Shell_exec("/Applications/MAMP/Library/bin/mysql --host=localhost -umelvinsevilla -pM3lv1n**  -DapiAedPayCustomers < /Applications/MAMP/htdocs/php/db/locations.sql");
              Shell_exec("/Applications/MAMP/Library/bin/mysql --host=localhost -umelvinsevilla -pM3lv1n**  -DapiAedPayCustomers < /Applications/MAMP/htdocs/php/db/ViewVSuppliers.sql");
              Shell_exec("/Applications/MAMP/Library/bin/mysql --host=localhost -umelvinsevilla -pM3lv1n**  -DapiAedPayCustomers < /Applications/MAMP/htdocs/php/db/ViewVDistinctSuppliers.sql");
        
              $connServerLocal->query("UPDATE serverDetailsInfo SET statusFirstDb='Setup Complet' WHERE id = 1;");
              $connServerLocal->query("UPDATE serverDetailsInfo SET serverName='".$dbServer."' WHERE id = 1;");
        
              //return success
              http_response_code(200);
              echo json_encode($dbServer);
              return;
        
          }else{
                echo json_encode('Invalid Credential');
                http_response_code(401);
                return;
          }
  
    }//connection valid
  }else{

        if ($resulLocal = $connServerAedPayLocal->query("select * from location_accs where username = '".$user."';")) {
            /* obtener el array de objetos */
            while ($row = $resulLocal->fetch_row()) {
              $hashUserLocal = $row[6];
              $hashPasswordLocal = $row[7];
            }    
            
            if(password_verify($pass,$hashPasswordLocal) && ($user == $hashUserLocal)){
                  //return success
                  http_response_code(200);
                  echo json_encode($hashUserLocal);
                  return;    
            }else{
                  echo json_encode('Invalid Credential ');
                  http_response_code(401);
                  return;
            }  
        }//connection valid
}
