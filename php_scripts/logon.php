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

// See if the user userid and password are OK
if (array_key_exists("userid",$parms) && is_string($parms["userid"]) &&
    array_key_exists("password",$parms) && is_string($parms["password"]))
{
   $userid   = $parms["userid"];
   $password = $parms["password"];

   $query    = sprintf("SELECT password               AS password,
                               admin_user             AS admin_user,
                               invalid_login_attempts AS invalid_login_attempts,
                               email                  AS email,
                               to_be_activated        AS to_be_activated,
                               email_invalid          AS email_invalid,
                               two_phase              AS two_phase,
                               telephone_no           AS telephone_no
                        FROM %s
                        WHERE userid = ?", CONFIG_USER_TABLE);
   $res = query($query, "s",$userid);
   if (sizeof($res) > 0)
   {
      if ($res[0]['email_invalid'])
      {
         $result["result"] = INVALID_EMAIL;
      }
      else if ($res[0]['to_be_activated'])
      {
         $result["result"] = ACCOUNT_NOT_ACTIVATED;
      }
      else if (strcmp($res[0]['password'],$password) == 0)
      {
         if ($res[0]['two_phase']) {
            sendAuthCode($userid, $res[0]['admin_user'], $res[0]['email'], $res[0]['telephone_no'], $result);
            $result["result"] = "two_phase";
         } else {

            $_SESSION['logged_on']  = "TRUE";
            $_SESSION['userid']     = $userid;
            $_SESSION['admin_user'] = $res[0]["admin_user"] == 1 ? "TRUE" : "FALSE";
            $query                  = sprintf("UPDATE %s
                                               SET last_logged_in           = NOW(),
                                                   account_inactive         = 0,
                                                   password_reset_requested = NULL
                                               WHERE userid = ?", CONFIG_USER_TABLE);
            query($query,"s",$userid);
            $result["admin_user"] = $_SESSION['admin_user'];
            $result["userid"]     = $userid;
            $result["email"]      = $res[0]["email"];
            $result["result"]     = "success";
         }
      }
      else
      {
         if ($res[0]['invalid_login_attempts'] < MAX_INVALID_LOGIN_ATTEMPTS) {
            $query = sprintf("UPDATE %s
                              SET invalid_login_attempts = invalid_login_attempts + 1
                              WHERE userid = ?", CONFIG_USER_TABLE);
            query($query,"s",$userid);
            $result["result"] = INVALID_PASSWORD;
         }
         else
         {
            reportSecurityProblem("Max login attempts exceeded for user '".$userid."'");
            $result["result"] = ACCOUNT_LOCKED;
         }
      }
   }
   else
   {
      reportSecurityProblem("Invalid login attempt for unknown user '".$userid."'");
      $result["result"] = UNKNOWN_USER;
   }
}

header('Content-type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');

echo json_encode($result);
exit();
?>
