<?php
$_SESSION['logged_on']  = "FALSE";
$_SESSION['admin_user'] = "FALSE";
$_SESSION['last_regeneration'] = time();
session_regenerate_id(true);

$result           = [];
$result["result"] = "success";

header('Content-type: application/json');
header(sprintf('Access-Control-Allow-Origin: %s', CONFIG_ACCESS_ORIGIN));
header('Access-Control-Allow-Credentials: true');
echo json_encode($result);
exit();
?>
