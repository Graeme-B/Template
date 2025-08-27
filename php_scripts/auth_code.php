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
$result["result"] = "";

// Check if two-phase authentication data exists in session
if (!isset($_SESSION['two_phase_userid']) || 
    !isset($_SESSION['two_phase_code'])   || 
    !isset($_SESSION['two_phase_expiry']) ||
    !isset($_SESSION['two_phase_admin'])  ||
    !isset($_SESSION['two_phase_email'])  ||
    !isset($_SESSION['two_phase_tel_no'])) {
   $result["result"] = NO_AUTH_IN_PROGRESS;
   reportSecurityProblem("Attempt to authorise without an associated logon attempt");
}

// See if the auth code is of the correct type and length
if ($result['result'] == "") {
   if (array_key_exists("code",$parms) && is_string($parms["code"])) {

      // Validate code format (6 digits)
      if (!preg_match('/^\d{6}$/', $parms['code'])) {
         $result["result"] = INVALID_AUTH_CODE;
         reportSecurityProblem("Invalid auth code ".$parms['code']." for user '".$_SESSION['two_phase_userid']."'");
      }
   } else {
      $result["result"] = INVALID_AUTH_CODE;
      reportSecurityProblem("Invalid auth code ".$parms['code']." for user '".$_SESSION['two_phase_userid']."'");
   }
}

// Check if the request has expired
if ($result['result'] == "") {
   $currentTime = time();
   if ($currentTime > $_SESSION['two_phase_expiry']) {
       reportSecurityProblem("Auth code for user '".$_SESSION['two_phase_userid']."' timed out");

       unset($_SESSION['two_phase_userid']); 
       unset($_SESSION['two_phase_code']);   
       unset($_SESSION['two_phase_expiry']); 
       unset($_SESSION['two_phase_admin']);  
       unset($_SESSION['two_phase_email']);
       unset($_SESSION['two_phase_tel_no']);

       $result["result"] = AUTH_CODE_TIMEOUT;
   }    
}

// Check the code is correct
if ($result['result'] == "") {
   if ($parms['code'] !== $_SESSION['two_phase_code']) {
      $result["result"] = INVALID_AUTH_CODE;
   }
}

// If we're here and the result is not set, we must be OK
if ($result['result'] == "") {
    $_SESSION['logged_on']  = "TRUE";
    $_SESSION['userid']     = $_SESSION['two_phase_userid'];
    $_SESSION['admin_user'] = $_SESSION['two_phase_admin'];
    $_SESSION['email']      = $_SESSION['two_phase_email'];
    $query                  = sprintf("UPDATE %s
                                       SET last_logged_in           = NOW(),
                                           account_inactive         = 0,
                                           password_reset_requested = NULL
                                       WHERE userid = ?", CONFIG_USER_TABLE);
    query($query,"s",$_SESSION['userid']);

    $result["admin_user"] = $_SESSION['admin_user'];
    $result["userid"]     = $_SESSION['userid'];
    $result["email"]      = $_SESSION["email"];
    $result["result"]     = "success";
}

// Return to the client
header('Content-type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');

echo json_encode($result);
exit();
?>
