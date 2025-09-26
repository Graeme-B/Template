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



   $query = sprintf("SELECT p.id                   AS id,
                            p.business_name        AS business_name,
                            p.industry             AS industry,
                            p.products_or_services AS products_or_services,
                            p.target_audience      AS target_audience,
                            r.frequency            AS frequency
                     FROM %s u,
                          %s p,
                          %s r
                     WHERE u.userid = ?
                     AND   u.id = p.userid
                     AND   p.reminder_frequency = r.id", CONFIG_USER_TABLE, CONFIG_PROFILE_TABLE, CONFIG_REMINDER_FREQ_TABLE);
   $res            = query($query, "s", $userid);
   $result["user"] = array();
   if (getAffectedRows() > 0) {
      $profileId                              = $res[0]["id"];
      $result["user"]["business_name"]        = $res[0]["business_name"];
      $result["user"]["industry"]             = $res[0]["industry"];
      $result["user"]["products_or_services"] = $res[0]["products_or_services"];
      $result["user"]["target_audience"]      = $res[0]["target_audience"];
      $result["user"]["frequency"]            = $res[0]["frequency"];
   
      $query = sprintf("SELECT b.brand_tone AS brand_tone
                        FROM %s b
                        WHERE b.profile_id = %d", CONFIG_BRAND_TONES, $profileId);
      $res                          = query($query);
      $result["user"]["brand_tone"] = array();
      if (getAffectedRows() > 0) {
         foreach($res as $row) {
            $result["user"]["brand_tone"][] = $row["brand_tone"];
         }
      }

      $query = sprintf("SELECT w.writing_style AS writing_style
                        FROM %s w
                        WHERE w.profile_id = %d", CONFIG_WRITING_STYLES, $profileId);
      $res                             = query($query);
      $result["user"]["writing_style"] = array();
      if (getAffectedRows() > 0) {
         foreach($res as $row) {
            $result["user"]["writing_style"][] = $row["writing_style"];
         }
      }

      $query = sprintf("SELECT v.voice_do AS voice_do
                        FROM %s v
                        WHERE v.profile_id = %d", CONFIG_VOICE_DOS, $profileId);
      $res                        = query($query);
      $result["user"]["voice_do"] = array();
      if (getAffectedRows() > 0) {
         foreach($res as $row) {
            $result["user"]["voice_do"][] = $row["voice_do"];
         }
      }

      $query = sprintf("SELECT v.voice_dont AS voice_dont
                        FROM %s v
                        WHERE v.profile_id = %d", CONFIG_VOICE_DONTS, $profileId);
      $res                          = query($query);
      $result["user"]["voice_dont"] = array();
      if (getAffectedRows() > 0) {
         foreach($res as $row) {
            $result["user"]["voice_dont"][] = $row["voice_dont"];
         }
      }

      $query = sprintf("SELECT e.example_phrase AS example_phrase
                        FROM %s e
                        WHERE e.profile_id = %d", CONFIG_EXAMPLE_PHRASES, $profileId);
      $res                              = query($query);
      $result["user"]["example_phrase"] = array();
      if (getAffectedRows() > 0) {
         foreach($res as $row) {
            $result["user"]["example_phrase"][] = $row["example_phrase"];
         }
      }

      $query = sprintf("SELECT k.key_message AS key_message
                        FROM %s k
                        WHERE k.profile_id = %d", CONFIG_KEY_MESSAGES, $profileId);
      $res                           = query($query);
      $result["user"]["key_message"] = array();
      if (getAffectedRows() > 0) {
         foreach($res as $row) {
            $result["user"]["key_message"][] = $row["key_message"];
         }
      }

      $query = sprintf("SELECT c.content_goal AS content_goal
                        FROM %s c
                        WHERE c.profile_id = %d", CONFIG_CONTENT_GOALS, $profileId);
      $res = query($query);
      $result["user"]["content_goal"] = array();
      if (getAffectedRows() > 0) {
         foreach($res as $row) {
            $result["user"]["content_goal"][] = $row["content_goal"];
         }
      }
   
      $query = sprintf("SELECT f.phrase AS phrase
                        FROM %s f
                        WHERE f.profile_id = %d", CONFIG_SAVED_FAVOURITES, $profileId);
      $res = query($query);
      $result["user"]["phrase"] = array();
      if (getAffectedRows() > 0) {
         foreach($res as $row) {
            $result["user"]["phrase"][] = $row["phrase"];
         }
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
