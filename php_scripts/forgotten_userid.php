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

// See if the email exists and is OK to use
if (array_key_exists("email",$parms) && is_string($parms["email"]))
{
   $email = $parms["email"];

   $query = sprintf("SELECT userid        AS userid,
                            email_invalid AS email_invalid
                     FROM %s
                     WHERE email = ?", CONFIG_USER_TABLE);
   $res = query($query, "s",$email);
   if (sizeof($res) > 0)
   {
      if ($res[0]["email_invalid"])
      {
         reportSecurityProblem("Userid request for invalid email account '".$email."'");
         $result["result"] = INVALID_EMAIL;
      }
      else
      {
         $userid   = $res[0]["userid"];
         $subject  = 'Userid Reminder for '.CONFIG_SITE_NAME;
         $message  = '<p>Your userid is '.$userid;
         $message .= '<p>If you did not request your userid, please email <a href=mailto:'.CONFIG_ADMIN_EMAIL.'>'.CONFIG_ADMIN_EMAIL.'</a></p>';
         
         if (sendEmail($message,$subject,$email)) {
            $result["result"] = "success";
         }
      }
   }
   else
   {
      $result["result"] = UNKNOWN_USER;
   }
}

header('Content-type: application/json');

echo json_encode($result);
exit();
?>
