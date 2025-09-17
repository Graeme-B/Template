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

// See if the input parameters are OK
if (array_key_exists("userid",$parms) && is_string($parms["userid"]) &&
    array_key_exists("forename",$parms) && is_string($parms["forename"]) &&
    array_key_exists("surname",$parms) && is_string($parms["surname"]) &&
    array_key_exists("telno",$parms) && is_string($parms["telno"]) &&
    array_key_exists("email",$parms) && is_string($parms["email"]) &&
    array_key_exists("password",$parms) && is_string($parms["password"]) &&
//    array_key_exists("two_phase",$parms) && is_string($parms["two_phase"]) &&
    array_key_exists("captcha",$parms) && is_string($parms["captcha"]))
{
   $userid       = $parms["userid"];
   $forename     = $parms["forename"];
   $surname      = $parms["surname"];
   $telephone_no = $parms["telno"];
   $email        = $parms["email"];
   $password     = $parms["password"];
   $two_phase    = isset($parms["two_phase"]) ? $parms["two_phase"] : "FALSE";
   $captcha      = $parms["captcha"];
   if (strcmp($captcha,$_SESSION['captcha']) == 0) {
      $query    = sprintf("SELECT COUNT(*) AS num_users
                           FROM %s
                           WHERE email = ?", CONFIG_USER_TABLE);
      $res      = query($query,"s",$email);
      if (sizeof($res) > 0 && $res[0]['num_users'] == 0)
      {
         $query = sprintf("SELECT COUNT(*) AS num_users
                           FROM %s
                           WHERE userid = ?", CONFIG_USER_TABLE);
         $res   = query($query,"s",$userid);
         if (sizeof($res) > 0 && $res[0]['num_users'] == 0) {
            $uuid  = uniqid();
            $query = sprintf("INSERT INTO %s(userid, forename, surname, telephone_no, email, password, two_phase, admin_user, to_be_activated, password_reset_uuid)
                              VALUES(?,?,?,?,?,?,FALSE,FALSE,TRUE,?)", CONFIG_USER_TABLE);
            query($query,"sssssss",$userid,$forename,$surname,$telephone_no,$email,$password,$uuid);

            $url      = CONFIG_PROTOCOL.'://'.CONFIG_WEB_SERVER.'/'.ROOT_PATH.'?action=account_activation&email='.$email.'&register_code='.$uuid;
            $subject  = 'Complete Registration for '.CONFIG_SITE_NAME;
            $message  = '<p>Please click the following link to complete your registration at <a href ="'.$url.'">'.CONFIG_SITE_NAME.'</a></p>';
            $message .= '<p>If you did not register for this site and received this message in error, please email <a href=mailto:'.CONFIG_ADMIN_EMAIL.'>'.CONFIG_ADMIN_EMAIL.'</a></p>';
            // sendEmail($message,$subject,$email);
            $result["result"] = "success";
         }
         else
         {
            $result["result"] = EXISTING_USERID;
            $existingUserid   = TRUE;
            do {
               $userid = $userid."_".rand(0,1000);
               $query  = sprintf("SELECT COUNT(*) AS num_users
                                  FROM %s
                                  WHERE userid = ?", CONFIG_USER_TABLE);
               $res    = query($query,"s",$userid);
               if (sizeof($res) > 0 && $res[0]['num_users'] == 0) {
                  $existingUserid            = FALSE;
                  $result["suggestedUserid"] = $userid;
               }
            } while ($existingUserid);
         }
      }
      else
      {
         reportSecurityProblem("Attempt to reregister user '".$email."'");
         $result["result"] = REGISTERED_USER;
      }
   }
   else
   {
      reportSecurityProblem("Invalid captcha for user '".$email."'");
      $result["result"] = INVALID_CAPTCHA;
   }
}

header('Content-type: application/json');

echo json_encode($result);
exit();
?>
