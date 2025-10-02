import React, { useState, useEffect, navigation } from 'react';
import { Link } from "react-router-dom"
import { TextField, FormGroup, Box, Button, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material'
import { useAuthContext } from '../AuthContext'
import $ from 'jquery';
import { format } from 'util';
import packageInfo from '../../package.json';
import * as Constants from '../Constants';

export default function UserHome (props) {
  const {authenticated, setAuthenticated,
         name, setName,
         email, setEmail,
         userid, setUserid}               = useAuthContext();
  const [userConfig,setUserConfig]        = useState([]);
  const [content,setContent]              = useState("");

  const hideHeader   = () => { var elem = document.getElementById("header"); elem.style.display = 'none'; }
  const hideFooter   = () => { var elem = document.getElementById("footer"); elem.style.display = 'none'; }

  {/*
  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#00FF00",
    maxHeight: 'calc(100vh - 200px)',
    overflow: "scroll"
  }
  const headerStyle = {
    backgroundColor: "#FF0000",
    flex: "none"
  }
  const footerStyle = {
    backgroundColor: "#0000FF",
    flex: "none",
    position:"absolute",
    left:"0",
    bottom:"0",
    padding: "0 10px 10px 10px",
    margin: "20px"
  }


  const wrapperStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "20px"
  }
  const headerStyle = {
    background: silver;
  };
  const footerStyle = {
    background: silver;
  };
  const contentStyle = {
    flex: 1;
    overflow: auto;
    background: pink;
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#00FF00"
  }
  const headerStyle = {
    backgroundColor: "#FF0000",
    flex: "none"
  }
  const footerStyle = {
    backgroundColor: "#0000FF",
    flex: "none",
    position:"absolute",
    left:"0",
    bottom:"0",
    padding: "0 10px 10px 10px",
    margin: "20px"
  }
  */}
  const wrapperStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "20px"
  }

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    maxHeight: 'calc(100vh - 200px)',
    overflow: "scroll"
  }
  const headerStyle = {
    flex: "none",
  }
  const footerStyle = {
    flex: "none",
    position:"absolute",
    left:"20px",
    bottom:"10px",
    padding: "10px 10px 10px 10px",
  }

  useEffect(() => {
    fetchData();
  }, []);

  function getArray(json, element) {
    let retval = "";
    if (typeof json[element] !== "undefined") {
      for (var i = 0; i < json[element].length; i++) {
        if (i > 0) retval = retval + "\n";
        retval = retval + json[element][i];
      }
    }
    return retval;
  }

  function fetchData() {
    $.ajax({
      type: "GET",
      url: packageInfo.actionsUrl + format(Constants.OPERATION_USER_CONFIG,encodeURIComponent(userid.trim())),
      xhrFields: { withCredentials: true, credentials: 'include' },
      success(json, textStatus, request) {
        if (json["result"] === "success") {
          let userConfig = [];
          userConfig["businessName"] = json["user"]["business_name"];
          userConfig["industry"] = json["user"]["industry"];
          userConfig["productsOrServices"] = json["user"]["products_or_services"];
          userConfig["targetAudience"] = json["user"]["target_audience"];
          userConfig["frequency"] = json["user"]["frequency"];
          userConfig["brandTone"] = getArray(json["user"], "brand_tone");
          userConfig["writingStyle"] = getArray(json["user"], "writing_style");
          userConfig["voiceDo"] = getArray(json["user"], "voice_do");
          userConfig["voiceDont"] = getArray(json["user"], "voice_dont");
          userConfig["examplePhrase"] = getArray(json["user"], "phrase");
          userConfig["keyMessage"] = getArray(json["user"], "key_message");
          userConfig["contentGoal"] = getArray(json["user"], "content_goal");
          userConfig["phrase"] = getArray(json["user"], "phrase");

        }
      }
    });
  }

//   const getPhrases = () => {
//     $.ajax({
//       type: "POST",
//       url: packageInfo.aiUrl,


// $business_name = "acme inc";
// $industry = "Cookies";
// $tone = "friendly, cozy, playful, a little cheeky";
// $audience = "young moms, college students, locals";
// $products_or_services = "flour, water, chocolate";
// $posting_goals = "grow following";
// $content_preferences = "no hard sales";
// $location = "Worthing, West Sussex";

// voice_examples: actual captions or phrases from the client
// do_not_do: brand-specific no-gos (e.g., “never sound corporate”)
// common_emojis: e.g. 🧁✨💖
// products_or_services: list of offerings
// content_preferences: (e.g. “no hard sales, prefers story-based posts”)
// posting_goals: grow following, drive in-store visits, highlight new items
// location: (used for local content & events)
// image_style: optional — what their content looks like visually


// $system_content = sprintf("You are a social media assistant for a small business. ".
//                           "This business is called %s. ".
//                           "Tone: %s ".
//                           "Audience: %s ".
// //                          "Avoid: [do_not_do]
// //                          "Use phrases like: [voice_examples]
// //                          "Emojis: [common_emojis]
//                           "Content preferences: %s",
//                           $business_name, $tone, $audience, $content_preferences);


// $data = '{
//     "model": "gpt-4o-mini",
//     "store": true,
//     "messages": [
//         {"role": "system", "content": "'.$system_content.'"},
//         {"role": "user", "content": "'.$input.'. Please write three one line sales pitches."}
//     ]
//   }';
//
// $ch = curl_init("https://api.openai.com/v1/chat/completions");

  const handleContentChange = event => {
    setContent(event.target.value);
  };

  return (
    <div>
      <div d="wrapper" style={wrapperStyle}>
        <div id="header" style={headerStyle}>
        </div>

        <div id="content" style={contentStyle}>
          <FormGroup>
          <label htmlFor="contentId">
          Enter your content
          </label>
          <textarea
            id="contentId"
            value={content}
            onChange={handleContentChange}
            placeholder="Add content"
            rows={5}
            cols={40}
          />
          <Box sx={{ width: 'fit-content', mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => alert('Save')}
            >
              Generate phrases
            </Button>
          </Box>
          </FormGroup>
        </div>

        <div id="footer" style={footerStyle}>
        </div>
      </div>
    </div>
  );
};
