import React, { useState, useEffect, navigation } from 'react';
import { Link } from "react-router-dom"
import { TextField, FormGroup, Box, FormControl, InputLabel, Select, MenuItem, Grid, Button } from '@mui/material'
import $ from 'jquery';
import { format } from 'util';
import packageInfo from '../../package.json';
import * as Constants from '../Constants';
import { useAuthContext } from '../AuthContext'

export default function UserConfig (props) {
  const {authenticated, setAuthenticated,
         name, setName,
         email, setEmail,
         userid, setUserid}                         = useAuthContext();
  const [businessName, setBusinessName]             = useState("");
  const [industry, setIndustry]                     = useState("");
  const [productsOrServices, setProductsOrServices] = useState("");
  const [targetAudience, setTargetAudience]         = useState("");
  const [frequency, setFrequency]                   = useState("");
  const [brandTone, setBrandTone]                   = useState("");
  const [writingStyle, setWritingStyle]             = useState("");
  const [voiceDo, setVoiceDo]                       = useState("");
  const [voiceDont, setVoiceDont]                   = useState("");
  const [examplePhrase, setExamplePhrase]           = useState("");
  const [keyMessage, setKeyMessage]                 = useState("");
  const [contentGoal, setContentGoal]               = useState("");
  const [phrase, setPhrase]                         = useState("");

//   const hideHeader   = () => { var elem = document.getElementById("header"); elem.style.display = 'none'; }
//   const hideFooter   = () => { var elem = document.getElementById("footer"); elem.style.display = 'none'; }
//   const closeConfirm = () => setConfirmIsOpen(false)
//   const openConfirm  = (walkId) => { setDeletionId(walkId); setConfirmIsOpen(true); }

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
          setBusinessName(json["user"]["business_name"]);
          setIndustry(json["user"]["industry"]);
          setProductsOrServices(json["user"]["products_or_services"]);
          setTargetAudience(json["user"]["target_audience"]);
          setFrequency(json["user"]["frequency"]);
          setBrandTone(getArray(json["user"], "brand_tone"));
          setWritingStyle(getArray(json["user"], "writing_style"));
          setVoiceDo(getArray(json["user"], "voice_do"));
          setVoiceDont(getArray(json["user"], "voice_dont"));
          setExamplePhrase(getArray(json["user"], "phrase"));
          setKeyMessage(getArray(json["user"], "key_message"));
          setContentGoal(getArray(json["user"], "content_goal"));
          setPhrase(getArray(json["user"], "phrase"));

        }
      }
    });
  }

  const handleBusinessNameChange = event => {
    setBusinessName(event.target.value);
  };
  const handleIndustryChange = event => {
    setIndustry(event.target.value);
  };
  const handleProductsOrServicesChange = event => {
    setProductsOrServices(event.target.value);
  };
  const handleTargetAudienceChange = event => {
    setTargetAudience(event.target.value);
  };
  const handleFrequencyChange = event => {
    setFrequency(event.target.value);
  };
  const handleBrandToneChange = event => {
    setBrandTone(event.target.value);
  };
  const handleKeyMessageChange = event => {
    setKeyMessage(event.target.value);
  };
  const handleWritingStyleChange = event => {
    setWritingStyle(event.target.value);
  }
  const handleVoiceDoChange = event => {
    setVoiceDo(event.target.value);
  }
  const handleVoiceDontChange = event => {
    setVoiceDont(event.target.value);
  }
  const handleExamplePhraseChange = event => {
    setExamplePhrase(event.target.value);
  }
  const handleContentGoalChange = event => {
    setContentGoal(event.target.value);
  };
  const handlePhraseChange = event => {
    setPhrase(event.target.value);
  };





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

  return (
    <div>
      <div id="wrapper" style={wrapperStyle}>
        <div id="header" style={headerStyle}>
        </div>

        <div id="content" style={contentStyle}>
          <FormGroup>
          <TextField
           autoFocus
           margin="dense"
           id="businessName"
           label="Business name"
           type="text"
           fullWidth
           variant="outlined"
           value={businessName}
           onChange={handleBusinessNameChange}
           inputProps={{maxLength: Constants.BUSINESS_NAME_LEN}}
          />
          <TextField
           margin="dense"
           id="industry"
           label="Industry"
           type="text"
           fullWidth
           variant="outlined"
           value={industry}
           onChange={handleIndustryChange}
           inputProps={{maxLength: Constants.INDUSTRY_LEN}}
          />
          <TextField
           margin="dense"
           id="productsOrServices"
           label="Products or Services"
           type="text"
           fullWidth
           variant="outlined"
           value={productsOrServices}
           onChange={handleProductsOrServicesChange}
           inputProps={{maxLength: Constants.PRODUCTS_OR_SERVICES_LEN}}
          />
          <TextField
           margin="dense"
           id="targetAudience"
           label="Target Audience"
           type="text"
           fullWidth
           variant="outlined"
           value={targetAudience}
           onChange={handleTargetAudienceChange}
           inputProps={{maxLength: Constants.TARGET_AUDIENCE_LEN}}
          />
          <TextField
           margin="dense"
           id="frequency"
           label="Reminder Frequency"
           type="text"
           fullWidth
           variant="outlined"
           value={frequency}
           onChange={handleFrequencyChange}
           inputProps={{maxLength: Constants.FREQUENCY_LEN}}
          />
          <label htmlFor="brandToneId">
          Brand tones
          </label>
          <textarea
            id="brandToneId"
            value={brandTone}
            onChange={handleBrandToneChange}
            placeholder="Add brand tones"
            rows={5}
            cols={40}
          />
          <label htmlFor="writingStyleId">
          Writing Styles
          </label>
          <textarea
            id="writingStyleId"
            value={writingStyle}
            onChange={handleWritingStyleChange}
            placeholder="Add writing styles"
            rows={5}
            cols={40}
          />
          <label htmlFor="voiceDosId">
          Voice Dos
          </label>
          <textarea
            id="voiceDosId"
            value={voiceDo}
            onChange={handleVoiceDoChange}
            placeholder="Add voice dos"
            rows={5}
            cols={40}
          />
          <label htmlFor="voiceDontsId">
          Voice Donts
          </label>
          <textarea
            id="voiceDontsId"
            value={voiceDont}
            onChange={handleVoiceDontChange}
            placeholder="Add voice donts"
            rows={5}
            cols={40}
          />
          <label htmlFor="examplePhraseId">
          Example phrases
          </label>
          <textarea
            id="examplePhraseId"
            value={examplePhrase}
            onChange={handleExamplePhraseChange}
            placeholder="Add example phrases"
            rows={5}
            cols={40}
          />
          <label htmlFor="keyMessageId">
          Key messages
          </label>
          <textarea
            id="keyMessageId"
            value={keyMessage}
            onChange={handleKeyMessageChange}
            placeholder="Add key messages"
            rows={5}
            cols={40}
          />
          <label htmlFor="contentGoalId">
          Content goals
          </label>
          <textarea
            id="contentGoalId"
            value={contentGoal}
            onChange={handleContentGoalChange}
            placeholder="Add content goals"
            rows={5}
            cols={40}
          />
          <label htmlFor="savedPhraseId">
          Saved phrases
          </label>
          <textarea
            id="savedPhraseId"
            value={phrase}
            onChange={handlePhraseChange}
            placeholder="Add saved phrases"
            rows={5}
            cols={40}
          />
          <br/>
          <Box>
            <Button variant="contained"
                    onClick={() => {
                      alert('Save');
                    }}
            >
            Save
            </Button>
            &nbsp;
            <Button variant="contained"
                    onClick={() => {
                      alert('Cancel');
                    }}
            >
           Cancel
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
