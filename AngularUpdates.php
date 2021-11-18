<?php


$updateAngular = shell_exec("git pull https://github.com/Marvingarci/Appconfig master");
$updateNPMDependencies = shell_exec("npm install");
$generateDependencies = shell_exec("npm run build --force");
//$executingDependencies = shell_exec("ng serve");
http_response_code(201);
echo "Connected successfully";
?>