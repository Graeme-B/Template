<?php

// Assume we're going to fail
$result           = [];
$result["result"] = "failure";

// Run the query and extract the results
$query = sprintf("SELECT userid                 AS userid,
                         admin_user             AS admin_user,
                         invalid_login_attempts AS invalid_login_attempts,
                         email                  AS email,
                         to_be_activated        AS to_be_activated,
                         email_invalid          AS email_invalid
                  FROM %s", CONFIG_USER_TABLE);
$res             = query($query);
$result["users"] = array();
foreach($res as $row) {
   $result["users"][] = array(
      "userid"                 => $row["userid"],
      "admin_user"             => $row["admin_user"],
      "invalid_login_attempts" => $row["invalid_login_attempts"],
      "email"                  => $row["email"],
      "to_be_activated"        => $row["to_be_activated"],
      "email_invalid"          => $row["email_invalid"]
   );
}
$result["result"] = "success";

header('Content-type: application/json');
header(sprintf('Access-Control-Allow-Origin: %s', CONFIG_ACCESS_ORIGIN));
header('Access-Control-Allow-Credentials: true');

echo json_encode($result);
exit();
?>
