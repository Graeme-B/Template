<?php
$_SESSION['logged_on']  = "FALSE";
$_SESSION['admin_user'] = "FALSE";
$_SESSION['last_regeneration'] = time();
session_regenerate_id(true);

$result           = [];
$result["result"] = "success";

header('Content-type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
echo json_encode($result);
exit();
?>
