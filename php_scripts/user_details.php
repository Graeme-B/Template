<?php

// Get the input parameters
if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
   $parms = $_GET;
}
else
{
   $parms = $_POST;
}

// Assume we're going to fail
$result           = [];
$result["result"] = "failure";

// See if the userid is set
if (array_key_exists("userid",$parms) && is_string($parms["userid"]))
{
   $query    = sprintf("SELECT forename                 AS forename,
                               surname                  AS surname,
                               telephone_no             AS telephone_no,
                               email                    AS email,
                               admin_user               AS admin_user,
                               two_phase                AS two_phase,
                               last_logged_in           AS last_logged_in,
                               account_inactive         AS account_inactive,
                               password_reset_requested AS password_reset_requested,
                               invalid_login_attempts   AS invalid_login_attempts,
                               to_be_activated          AS to_be_activated,
                               email_invalid            AS email_invalid
                        FROM %s
                        WHERE userid = ?", CONFIG_USER_TABLE);
   $res = query($query, "s", $parms["userid"]);
   if (count($res) > 0) {
      $result["user"] = array(
         "forename"                 => $res[0]["forename"],
         "surname"                  => $res[0]["surname"],
         "telephone_no"             => $res[0]["telephone_no"],
         "email"                    => $res[0]["email"],
         "admin_user"               => $res[0]["admin_user"],
         "two_phase"                => $res[0]["two_phase"],
         "last_logged_in"           => $res[0]["last_logged_in"],
         "account_inactive"         => $res[0]["account_inactive"],
         "password_reset_requested" => is_null($res[0]["password_reset_requested"]) ? '0' : $res[0]["password_reset_requested"],
         "invalid_login_attempts"   => $res[0]["invalid_login_attempts"],
         "to_be_activated"          => $res[0]["to_be_activated"],
         "email_invalid"            => $res[0]["email_invalid"]
      );
      $result["result"] = "success";
   }
}

header('Content-type: application/json');
header(sprintf('Access-Control-Allow-Origin: %s', CONFIG_ACCESS_ORIGIN));
header('Access-Control-Allow-Credentials: true');

echo json_encode($result);
exit();
?>
