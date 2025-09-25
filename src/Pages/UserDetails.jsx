import React, { useState, useEffect, useRef, navigation } from 'react';
import { Link } from "react-router-dom"
import { Box, FormControl, InputLabel, Select, MenuItem, Grid, TextField, Checkbox, FormGroup, FormControlLabel, Button, Stack } from '@mui/material'
import $ from 'jquery';
import { format } from 'util';
import packageInfo from '../../package.json';
import * as Constants from '../Constants';
import { useAuthContext } from '../AuthContext'

export default function UserDetails (props) {
  const {authenticated, setAuthenticated,
         name,          setName,
         email,         setEmail,
         userid,        setUserid}                          = useAuthContext();
  const contentRef                                          = useRef();
  const [forename, setForename]                             = useState("");
  const [surname, setSurname]                               = useState("");
  const [telephoneNo, setTelephoneNo]                       = useState("");
  const [userEmail, setUserEmail]                           = useState("");
  const [adminUser, setAdminUser]                           = useState(false);
  const [twoPhase, setTwoPhase]                             = useState(false);
  const [accountInactive, setAccountInactive]               = useState(false);
  const [toBeActivated, setToBeActivated]                   = useState(false);

  const [lastLoggedIn, setLastLoggedIn]                     = useState("");
  const [passwordResetRequested, setPasswordResetRequested] = useState(false);
  const [invalidLoginAttempts, setInvalidLoginAttempts]     = useState("");
  const [emailInvalid, setEmailInvalid]                     = useState(false);

  useEffect(() => {
   fetchData();
  }, []);

  function fetchData() {
    $.ajax({
      type: "GET",
      url: packageInfo.actionsUrl + format(Constants.OPERATION_USER_DETAILS,encodeURIComponent(userid.trim())),
      xhrFields: { withCredentials: true, credentials: 'include' },
      success(json) {
        if (json["result"] === "success") {
          setForename(json["user"]["forename"]);
          setSurname(json["user"]["surname"]);
          setTelephoneNo(json["user"]["telephone_no"]);
          setUserEmail(json["user"]["email"]);
          setAdminUser(json["user"]["admin_user"] == "1" ? true : false);
          setTwoPhase(json["user"]["two_phase"] == "1" ? true : false);
          setAccountInactive(json["user"]["account_inactive"] == "1" ? true : false);
          setToBeActivated(json["user"]["to_be_activated"] == "1" ? true : false);
          setLastLoggedIn(json["user"]["last_logged_in"]);
          setPasswordResetRequested(json["user"]["password_reset_requested"] == "1" ? true : false);
          setInvalidLoginAttempts(json["user"]["invalid_login_attempts"]);
          setEmailInvalid(json["user"]["email_invalid"] == "1" ? true : false);
        }
      }
    });
  }

  const handleForenameChange = event => {
     setForename(event.target.value);
  };
  const handleSurnameChange = event => {
     setSurname(event.target.value);
  };
  const handleTelephoneNoChange = event => {
     setTelephoneNo(event.target.value);
  };
  const handleUserEmailChange = event => {
     setUserEmail(event.target.value);
  };
  const handleAdminUserChange = event => {
     setAdminUser(!adminUser);
  };
  const handleTwoPhaseChange = event => {
     setTwoPhase(!twoPhase);
  };
  const handleAccountInactiveChange = event => {
     setAccountInactive(!accountInactive);
  };
  const handleToBeActivatedChange = event => {
     setToBeActivated(!toBeActivated);
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
  const wrapperStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "20px"
  }
  */}

{/*
  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    maxHeight: 'calc(100vh - 200px)',
    overflow: "scroll"
  }
  const contentStyle = {
    flex: 1;
    overflow: auto;
    background: pink;
  };
  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#00FF00",
    maxHeight: 'calc(100vh - 200px)',
    overflow: "scroll"
  }
  const contentStyle = {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#00FF00"
  }

  const wrapperStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "20px"
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

  */}
  const wrapperStyle = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "20px"
  }

  const contentStyle = {
    border: '1px solid #fff',
    overflow: "hidden"
  }

  return (
    <div >
      <div style={wrapperStyle}>
        <div id="content" ref={contentRef} style={contentStyle}>
          <FormGroup>
            <TextField
             autoFocus
             margin="dense"
             id="forename"
             label="Forename"
             type="text"
             fullWidth
             variant="outlined"
             value={forename}
             onChange={handleForenameChange}
             inputProps={{maxLength: Constants.FORENAME_LEN}}
            />
            <TextField
             margin="dense"
             id="surname"
             label="Surname"
             type="text"
             fullWidth
             variant="outlined"
             value={surname}
             onChange={handleSurnameChange}
             inputProps={{maxLength: Constants.SURNAME_LEN}}
            />
            <TextField
             margin="dense"
             id="telephoneNo"
             label="Telephone No"
             type="text"
             fullWidth
             variant="outlined"
             value={telephoneNo}
             onChange={handleTelephoneNoChange}
             inputProps={{maxLength: Constants.TELNO_LEN}}
            />
            <TextField
             margin="dense"
             id="email"
             label="Email"
             type="text"
             fullWidth
             variant="outlined"
             value={userEmail}
             onChange={handleUserEmailChange}
             inputProps={{maxLength: Constants.EMAIL_LEN}}
            />
            {authenticated == Constants.USER_TYPE_ADMIN && (
              <div>
                <TextField
                 margin="dense"
                 id="lastLoggedIn"
                 label="Last logged in"
                 type="text"
                 fullWidth
                 variant="outlined"
                 value={lastLoggedIn}
                 readOnly
                />
                <TextField
                 margin="dense"
                 id="invalidLoginAttempts"
                 label="Invalid login attempts"
                 type="text"
                 fullWidth
                 variant="outlined"
                 value={invalidLoginAttempts}
                 readOnly
                />
               <Box display="flex" flexWrap="wrap" gap={2}>
                 <FormControlLabel control={<Checkbox tabIndex={0} id="adminUser" checked={adminUser} onChange={handleAdminUserChange}/>} label="Admin user" />
                 <FormControlLabel control={<Checkbox tabIndex={0} id="twoPhase" checked={twoPhase} onChange={handleTwoPhaseChange}/>} label="Two phase" />
                 <FormControlLabel control={<Checkbox tabIndex={0} id="accountInactive" checked={accountInactive} onChange={handleAccountInactiveChange}/>} label="Account inactive" />
                 <FormControlLabel control={<Checkbox tabIndex={0} id="toBeActivated" checked={toBeActivated} onChange={handleToBeActivatedChange}/>} label="To be activated" />
                 <FormControlLabel control={<Checkbox id="passwordResetRequested" checked={passwordResetRequested}/>} label="Password reset requested" />
                 <FormControlLabel control={<Checkbox id="emailInvalid" checked={emailInvalid}/>} label="Email Invalid" />
               </Box>
             </div>
           )}
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
      </div>
    </div>
  );
};
