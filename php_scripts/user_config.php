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

// See if the userid is OK
if (array_key_exists("userid",$parms) && is_string($parms["userid"]))
{
   $userid   = $parms["userid"];

/*
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
   $res                                        = query($query, "s", $userid);
   $result["user"]                             = array();
   $result["user"]["forename"]                 = $res[0]["forename"];
   $result["user"]["surname"]                  = $res[0]["surname"];
   $result["user"]["telephone_no"]             = $res[0]["telephone_no"];
   $result["user"]["email"]                    = $res[0]["email"];
   $result["user"]["admin_user"]               = $res[0]["admin_user"];
   $result["user"]["two_phase"]                = $res[0]["two_phase"];
   $result["user"]["last_logged_in"]           = $res[0]["last_logged_in"];
   $result["user"]["account_inactive"]         = $res[0]["account_inactive"];
   $result["user"]["password_reset_requested"] = $res[0]["password_reset_requested"];
   $result["user"]["invalid_login_attempts"]   = $res[0]["invalid_login_attempts"];
   $result["user"]["to_be_activated"]          = $res[0]["to_be_activated"];
   $result["user"]["email_invalid"]            = $res[0]["email_invalid"];
*/



   $query = sprintf("SELECT p.business_name        AS business_name,
                            p.industry             AS industry,
                            p.products_or_services AS products_or_services,
                            p.target_audience      AS target_audience,
                            r.frequency            AS frequency
                     FROM %s p,
                          %s r
                     WHERE p.userid = ?
                     AND   p.reminder_frequency = r.id", CONFIG_PROFILE_TABLE, CONFIG_REMINDER_FREQ_TABLE);
   $res                                     = query($query, "s", $userid);
   $result["user"]                          = array();
   if (count($res) > 0) {
      $result["user"]["business_name"]         = $res[0]["business_name"];
      $result["users"]["industry"]             = $res[0]["industry"];
      $result["users"]["products_or_services"] = $res[0]["products_or_services"];
      $result["users"]["target_audience"]      = $res[0]["target_audience"];
      $result["users"]["frequency"]            = $res[0]["frequency"];
   
      $query = sprintf("SELECT b.brand_tone AS brand_tone
                        FROM %s p,
                             %s b
                        WHERE p.user_id = ?
                        AND   p.id      = b.profile_id", CONFIG_PROFILE_TABLE, CONFIG_BRAND_TONES);
      $res = query($query, "s", $userid);
      $result["user"]["brand_tone"] = array();
      foreach($res as $row) {
         $result["users"]["brand_tone"][] = $row["brand_tone"];
      }

      $query = sprintf("SELECT w.writing_style AS writing_style
                        FROM %s p,
                             %s w
                        WHERE p.user_id = ?
                        AND   p.id      = w.profile_id", CONFIG_PROFILE_TABLE, CONFIG_WRITING_STYLES);
      $res = query($query, "s", $userid);
      $result["user"]["writing_style"] = array();
      foreach($res as $row) {
         $result["users"]["writing_style"][] = $row["writing_style"];
      }

      $query = sprintf("SELECT w.voice_do AS voice_do
                        FROM %s p,
                             %s v
                        WHERE p.user_id = ?
                        AND   p.id      = v.profile_id", CONFIG_PROFILE_TABLE, CONFIG_VOICE_DOS);
      $res = query($query, "s", $userid);
      $result["user"]["voice_do"] = array();
      foreach($res as $row) {
         $result["users"]["voice_do"][] = $row["voice_do"];
      }

      $query = sprintf("SELECT w.voice_dont AS voice_dont
                        FROM %s p,
                             %s v
                        WHERE p.user_id = ?
                        AND   p.id      = v.profile_id", CONFIG_PROFILE_TABLE, CONFIG_VOICE_DONTS);
      $res = query($query, "s", $userid);
      $result["user"]["voice_dont"] = array();
      foreach($res as $row) {
         $result["users"]["voice_dont"][] = $row["voice_dont"];
      }

      $query = sprintf("SELECT e.example_phrase AS example_phrase
                        FROM %s p,
                             %s e
                        WHERE p.user_id = ?
                        AND   p.id      = e.profile_id", CONFIG_PROFILE_TABLE, CONFIG_EXAMPLE_PHRASES);
      $res = query($query, "s", $userid);
      $result["user"]["example_phrase"] = array();
      foreach($res as $row) {
         $result["users"]["example_phrase"][] = $row["example_phrase"];
      }

      $query = sprintf("SELECT e.key_message AS key_message
                        FROM %s p,
                             %s k
                        WHERE p.user_id = ?
                        AND   p.id      = k.profile_id", CONFIG_PROFILE_TABLE, CONFIG_KEY_MESSAGES);
      $res = query($query, "s", $userid);
      $result["user"]["key_message"] = array();
      foreach($res as $row) {
         $result["users"]["key_message"][] = $row["key_message"];
      }

      $query = sprintf("SELECT c.content_goal AS content_goal
                        FROM %s p,
                             %s c
                        WHERE p.user_id = ?
                        AND   p.id      = c.profile_id", CONFIG_PROFILE_TABLE, CONFIG_CONTENT_GOALS);
      $res = query($query, "s", $userid);
      $result["user"]["content_goal"] = array();
      foreach($res as $row) {
         $result["users"]["content_goal"][] = $row["content_goal"];
      }
   
      $query = sprintf("SELECT f.phrase AS phrase
                        FROM %s p,
                             %s f
                        WHERE p.user_id = ?
                        AND   p.id      = f.profile_id", CONFIG_PROFILE_TABLE, CONFIG_SAVED_FAVOURITES);
      $res = query($query, "s", $userid);
      $result["user"]["phrase"] = array();
      foreach($res as $row) {
         $result["users"]["phrase"][] = $row["phrase"];
      }
   }

   $result["result"] = "success";
}

header('Content-type: application/json');
header(sprintf('Access-Control-Allow-Origin: %s', CONFIG_ACCESS_ORIGIN));
header('Access-Control-Allow-Credentials: true');

echo json_encode($result);
exit();
?>
