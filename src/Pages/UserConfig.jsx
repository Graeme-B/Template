import React, { useState, useEffect, navigation } from 'react';
import { Link } from "react-router-dom"
import { TextField, FormGroup, Box, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material'
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
  const [keyMessage, setKeyMessage]                 = useState("");

//   const hideHeader   = () => { var elem = document.getElementById("header"); elem.style.display = 'none'; }
//   const hideFooter   = () => { var elem = document.getElementById("footer"); elem.style.display = 'none'; }
//   const closeConfirm = () => setConfirmIsOpen(false)
//   const openConfirm  = (walkId) => { setDeletionId(walkId); setConfirmIsOpen(true); }

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    $.ajax({
      type: "GET",
      url: packageInfo.actionsUrl + format(Constants.OPERATION_USER_CONFIG,encodeURIComponent(userid.trim())),
      xhrFields: { withCredentials: true, credentials: 'include' },
      success(json, textStatus, request) {
        if (json["result"] === "success") {
          let userConfig = [];
//           userConfig["businessName"]       = json["user"]["business_name"];
//           userConfig["industry"]           = json["user"]["industry"];
//           userConfig["productsOrServices"] = json["user"]["products_or_services"];
//           userConfig["targetAudience"]     = json["user"]["target_audience"];
//           userConfig["frequency"]          = json["user"]["frequency"];
          setBusinessName(json["user"]["business_name"]);
          setIndustry(json["user"]["industry"]);
          setProductsOrServices(json["user"]["products_or_services"]);
          setTargetAudience(json["user"]["target_audience"]);
          setFrequency(json["user"]["frequency"]);
          let bt = "";
          for (var i = 0; i < json["user"]["brand_tone"].length; i++) {
              if (i > 0) bt = bt + "\n";
              bt = bt + json["user"]["brand_tone"][i];
          }
          setBrandTone(bt);

//           userConfig["brandTone"] = [];
//           json["user"]["brand_tone"].forEach((item) => {
//               userConfig["brandTone"].push(item);
//           });
//           userConfig["writingStyle"] = [];
//           json["user"]["writing_style"].forEach((item) => {
//               userConfig["writingStyle"].push(item);
//           });
//           userConfig["voiceDo"] = [];
//           json["user"]["voice_do"].forEach((item) => {
//               userConfig["voiceDo"].push(item);
//           });
//           userConfig["voiceDont"] = [];
//           json["user"]["voice_dont"].forEach((item) => {
//               userConfig["voiceDont"].push(item);
//           });
//           userConfig["examplePhrase"] = [];
//           json["user"]["example_phrase"].forEach((item) => {
//               userConfig["examplePhrase"].push(item);
//           });
//           userConfig["keyMessage"] = [];
//           json["user"]["key_message"].forEach((item) => {
//               userConfig["keyMessage"].push(item);
//           });
          let km = "";
          for (var i = 0; i < json["user"]["key_message"].length; i++) {
              if (i > 0) km = km + "\n";
              km = km + json["user"]["key_message"][i];
          }
          setKeyMessage(km);

//           userConfig["contentGoal"] = [];
//           json["user"]["content_goal"].forEach((item) => {
//               userConfig["contentGoal"].push(item);
//           });
//           userConfig["phrase"] = [];
//           json["user"]["phrase"].forEach((item) => {
//               userConfig["phrase"].push(item);
//           });
//           setUserConfig(userConfig);
        }
      }
    });
  }

  const handleBusinessNameChange = event => {
//     userConfig["businessName"] = event.target.value;
//     setUserConfig(userConfig);
    setBusinessName(event.target.value);
  };
  const handleIndustryChange = event => {
//     userConfig["industry"] = event.target.value;
//     setUserConfig(userConfig);
    setIndustry(event.target.value);
  };
  const handleProductsOrServicesChange = event => {
//     userConfig["productsOrServices"] = event.target.value;
//     setUserConfig(userConfig);
    setProductsOrServices(event.target.value);
  };
  const handleTargetAudienceChange = event => {
//     userConfig["targetAudience"] = event.target.value;
//     setUserConfig(userConfig);
    setTargetAudience(event.target.value);
  };
  const handleFrequencyChange = event => {
//     userConfig["frequency"] = event.target.value;
//     setUserConfig(userConfig);
//
//     setUserConfig(prev => ({
//           ...prev,
//           frequency: event.target.value
//         }));
   setFrequency(event.target.value);
  };
  const handleBrandToneChange = event => {
    setBrandTone(event.target.value);
  };
  const handleKeyMessageChange = event => {
    setKeyMessage(event.target.value);
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
                Hello, world from the config page of user {userid}!
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
           label="Frequency"
           type="text"
           fullWidth
           variant="outlined"
           value={frequency}
           onChange={handleFrequencyChange}
           inputProps={{maxLength: Constants.FREQUENCY_LEN}}
          />
          <textarea
            value={brandTone}
            onChange={handleBrandToneChange}
            placeholder="Brand tones"
            rows={5}
            cols={40}
          />
          <textarea
            value={keyMessage}
            onChange={handleKeyMessageChange}
            placeholder="Key messages"
            rows={5}
            cols={40}
          />
          </FormGroup>
        </div>

        <div id="footer" style={footerStyle}>
        </div>
      </div>
    </div>
  );
};
