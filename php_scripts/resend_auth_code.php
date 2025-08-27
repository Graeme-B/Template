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
   reportSecurityProblem("Attempt to resend authorise code without an associated logon attempt");
}

// Check if the request has expired
if ($result['result'] == "") {
   $currentTime = time();
   if ($currentTime > $_SESSION['two_phase_expiry']) {
       reportSecurityProblem("Auth code resend for user '".$_SESSION['two_phase_userid']."' timed out");

       unset($_SESSION['two_phase_userid']); 
       unset($_SESSION['two_phase_code']);   
       unset($_SESSION['two_phase_expiry']); 
       unset($_SESSION['two_phase_admin']);  
       unset($_SESSION['two_phase_email']);
       unset($_SESSION['two_phase_tel_no']);

       $result["result"] = AUTH_CODE_TIMEOUT;
   }    
}

// If we're here and the result is not set, we must be OK
if ($result['result'] == "") {
   sendAuthCode($_SESSION['two_phase_userid'], $_SESSION['two_phase_admin'], $_SESSION['two_phase_email'], $_SESSION['two_phase_tel_no'], $result);
   $result["result"] = "two_phase";
}

// Return to the client
header('Content-type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');

echo json_encode($result);
exit();
?>
