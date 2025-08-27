<?php

session_start();
include_once 'constants.php';
include_once 'common_functions.php';

// $_GET  = filter_input_array(INPUT_GET, FILTER_SANITIZE_STRING);
// $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
$_GET  = filter_input_array(INPUT_GET, FILTER_UNSAFE_RAW);
$_POST = filter_input_array(INPUT_POST, FILTER_UNSAFE_RAW);

// Get the input parameters
if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
   $parmArray = $_GET;
}
else
{
   $parmArray = $_POST;
}
$operation = $parmArray["operation"];

// Check session variables are set up, and initialise them if not
if (!isset($_SESSION['logged_on']))
{
   $_SESSION['logged_on'] = "FALSE";
} 
if (!isset($_SESSION['userid']))
{
   $_SESSION['userid'] = "";
} 
if (!isset($_SESSION['last_regeneration']))
{
   $_SESSION['last_regeneration'] = time();
}
if (!isset($_SESSION['last_interaction']))
{
   $_SESSION['last_interaction'] = time();
}
if (!isset($_SESSION['admin_user']))
{
   $_SESSION['admin_user'] = "FALSE";
} 

// Regenerate the session id every half hour
if (time() - $_SESSION['last_regeneration'] > SESSION_TIMEOUT)
{
   session_regenerate_id();
   $_SESSION['last_regeneration'] = time();
}

// If there's been no interaction for half an hour, reset the user
if (time() - $_SESSION['last_interaction'] > SESSION_TIMEOUT)
{
   $_SESSION['logged_on']  = "FALSE";
   $_SESSION['userid']     = "";
   $_SESSION['admin_user'] = "FALSE";
}

// Remember the last interaction time
$_SESSION['last_interaction'] = time();

$cookie = isset($_COOKIE['PHPSESSID']) ? $_COOKIE['PHPSESSID'] : 'undefined';
debug('Operation '.$operation.' Cookie '.$cookie.' userid '.$_SESSION['userid'].' loggedOn '.$_SESSION['logged_on'].' admin '.$_SESSION['admin_user']);

// Perform the required action...
switch ($operation) {
case 'logon':
    include 'logon.php';
    break;
case 'two_phase_auth_code':
    include 'auth_code.php';
    break;
case 'check_captcha':
    include 'check_captcha.php';
    break;
case 'logoff':
    include 'logoff.php';
    break;
case 'forgotten_password':
    include 'forgotten_password.php';
    break;
case 'forgotten_userid':
    include 'forgotten_userid.php';
    break;
case 'reset_password':
    include 'reset_password.php';
    break;
case 'change_password':
    include 'change_password.php';
    break;
case 'register':
    include 'register.php';
    break;
case 'complete_registration':
    include 'complete_registration.php';
    break;
case 'unlock_user':
    if ($_SESSION['logged_on'] == "TRUE" && $_SESSION['admin_user'] == "TRUE") {
       include 'unlock_user.php';
    }
    break;
case 'phpinfo':
    phpinfo();
    break;
case 'send_message':
    include 'send_message.php';
    break;
// case 'main':
 default:
     reportSecurityProblem("Invalid operation ".$operation);
     break;
}

?>
