<?php
include 'common_functions.php';

$ERROR_FILE = "walk_upload.err";

$ERR_ALL_OK      = "Walk uploaded successfully";
$ERR_PARSE_JSON  = "Server error - please report this message to ".CONFIG_ADMIN_EMAIL." quoting error ";
$ERR_SQL_CONNECT = "Server error - please report this message to ".CONFIG_ADMIN_EMAIL." quoting error ";
$ERR_SQL_EXECUTE = "Server error - please report this message to ".CONFIG_ADMIN_EMAIL." quoting error ";
$error_id        = uniqid(ERRORSTEM);
$emptyString     = "";

// Initialise the response
$errc = 200;
$errm = $ERR_ALL_OK;

// Parse the JSON out of the input and create a JSON object from it
try {
  $data = json_decode(file_get_contents('php://input'), true);
  $s    = "";
  foreach ($data as $row) {
    $s .= chr($row);
  }
  $rawjson = $s;
  $json = json_decode($s, true);
} catch(Exception $e) {
  reportInternalError("None",__FILE__,"AddUser - Parse JSON error",$e->getMessage());
  $errc = 500;
  $errm = $ERR_PARSE_JSON.$error_id;
}


$walk = $json["walk"];
if ($errc == 200 &&
    !(array_key_exists("device_uuid",$json) && is_string($json["device_uuid"]) &&
      array_key_exists("user",$json)    && is_string($json["user"]) &&
      array_key_exists("name",$json)    && is_string($json["name"]) &&
      array_key_exists("uuid",$json)    && is_string($json["uuid"]) &&
      array_key_exists("email",$json)   && is_string($json["email"]) &&
      array_key_exists("name",$walk)    && is_string($walk["name"]) &&
      array_key_exists("created",$walk) && is_string($walk["created"]))) {
  reportInternalError("None",__FILE__,"Missing top level VALUE or invalid TYPE in JSON ",$json);
  $errc = 500;
  $errm = $ERR_PARSE_JSON.$error_id;
}







// Write the response (whatever it was)
http_response_code($errc);
echo $errm;

exit();
?>
