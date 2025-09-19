import React, { useState, useEffect, navigation } from 'react';
import { Link } from "react-router-dom"
import { Box, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material'
import TextField from '@mui/material/TextField';
import $ from 'jquery';
import { format } from 'util';
import packageInfo from '../../package.json';
import * as Constants from '../Constants';
import { useAuthContext } from '../AuthContext'

export default function UserDetails (props) {
//   const [country, setCountry]             = useState("");
//   const [year, setYear]                   = useState("");
//   const [course, setCourse]               = useState("");
//   const [clazz, setClazz]                 = useState("");
//   const [tableContent, setTableContent]   = useState([]);
//   const [countries, setCountries]         = useState([]);
//   const [years, setYears]                 = useState([]);
//   const [courses, setCourses]             = useState([]);
//   const [classes, setClasses]             = useState([]);
//   const [walkList, setWalkList]           = useState([]);
//   const [confirmIsOpen, setConfirmIsOpen] = useState(false);
//   const [deletionId, setDeletionId]       = useState(0);
//   const [rowsPerPage, setRowsPerPage]     = useState(25);
//   const [currentRow, setCurrentRow]       = useState(0);
//   const [numRows, setNumRows]             = useState(0);
//   const [nextEnabled, setNextEnabled]     = useState(false);
//   const [prevEnabled, setPrevEnabled]     = useState(false);
//   const [pageNo, setPageNo]               = useState(1);
//   const [inputPageNo, setInputPageNo]     = useState(1);
//   const [numPages, setNumPages]           = useState(1);

  const {authenticated, setAuthenticated,
         name,          setName,
         email,         setEmail,
         userid,        setUserid}                          = useAuthContext();
  const [forename, setForename]                             = useState("");
  const [surname, setSurname]                               = useState("");
  const [telephoneNo, setTelephoneNo]                       = useState("");
  const [userEmail, setUserEmail]                           = useState("");
  const [adminUser, setAdminUser]                           = useState("");
  const [twoPhase, setTwoPhase]                             = useState("");
  const [accountInactive, setAccountInactive]               = useState("");
  const [toBeActivated, setToBeActivated]                   = useState("");

  const [lastLoggedIn, setLastLoggedIn]                     = useState("");
  const [passwordResetRequested, setPasswordResetRequested] = useState("");
  const [invalidLoginAttempts, setInvalidLoginAttempts]     = useState("");
  const [emailInvalid, setEmailInvalid]                     = useState("");


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
      url: packageInfo.actionsUrl + format(Constants.OPERATION_USER_DETAILS,encodeURIComponent(userid.trim())),
      xhrFields: { withCredentials: true, credentials: 'include' },
      success(json) {
        if (json["result"] === "success") {
            setForename(json["user"]["forename"]);
            setSurname(json["user"]["surname"]);
            setTelephoneNo(json["user"]["telephone_no"]);
            setUserEmail(json["user"]["email"]);
            setAdminUser(json["user"]["admin_user"]);
            setTwoPhase(json["user"]["two_phase"]);
            setAccountInactive(json["user"]["account_inactive"]);
            setToBeActivated(json["user"]["to_be_activated"]);
            setLastLoggedIn(json["user"]["last_logged_in"]);
            setPasswordResetRequested(json["user"]["password_reset_requested"]);
            setInvalidLoginAttempts(json["user"]["invalid_login_attempts"]);
            setEmailInvalid(json["user"]["email_invalid"]);
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
     setAdminUser(event.target.value);
  };
  const handleTwoPhaseChange = event => {
     setTwoPhase(event.target.value);
  };
  const handleAccountInactiveChange = event => {
     setAccountInactive(event.target.value);
  };
  const handleToBeActivatedChange = event => {
     setToBeActivated(event.target.value);
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
      <div d="wrapper" style={wrapperStyle}>
        <div id="header" style={headerStyle}>
        </div>

        <div id="content" style={contentStyle}>
           Hello, world from the details page of user {userid}!

           <TextField
             autoFocus
             margin="dense"
             id="forename"
             label="Forename"
             type="text"
             fullWidth
             variant="standard"
             value={forename}
             onChange={handleForenameChange}
             inputProps={{maxLength: Constants.FORENAME_LEN}}
           />
           <TextField
             autoFocus
             margin="dense"
             id="surname"
             label="Surname"
             type="text"
             fullWidth
             variant="standard"
             value={surname}
             onChange={handleSurnameChange}
             inputProps={{maxLength: Constants.SURNAME_LEN}}
           />
           <TextField
             autoFocus
             margin="dense"
             id="telephoneNo"
             label="Telephone No"
             type="text"
             fullWidth
             variant="standard"
             value={telephoneNo}
             onChange={handleTelephoneNoChange}
             inputProps={{maxLength: Constants.TELNO_LEN}}
           />
           <TextField
             autoFocus
             margin="dense"
             id="email"
             label="Email"
             type="text"
             fullWidth
             variant="standard"
             value={userEmail}
             onChange={handleUserEmailChange}
             inputProps={{maxLength: Constants.EMAIL_LEN}}
           />
           <TextField
             autoFocus
             margin="dense"
             id="adminUser"
             label="Admin user"
             type="text"
             fullWidth
             variant="standard"
             value={adminUser}
             onChange={handleAdminUserChange}
             inputProps={{maxLength: Constants.ADMIN_USER_LEN}}
           />
           <TextField
             autoFocus
             margin="dense"
             id="twoPhase"
             label="Two phase"
             type="text"
             fullWidth
             variant="standard"
             value={twoPhase}
             onChange={handleTwoPhaseChange}
             inputProps={{maxLength: Constants.TWO_PHASE_LEN}}
           />
           <TextField
             autoFocus
             margin="dense"
             id="accountInactive"
             label="Account inactive"
             type="text"
             fullWidth
             variant="standard"
             value={accountInactive}
             onChange={handleAccountInactiveChange}
             inputProps={{maxLength: Constants.ACCOUNT_INACTIVE_LEN}}
           />
           <TextField
             autoFocus
             margin="dense"
             id="toBeActivated"
             label="To be activated"
             type="text"
             fullWidth
             variant="standard"
             value={toBeActivated}
             onChange={handleToBeActivatedChange}
             inputProps={{maxLength: Constants.TO_BE_ACTIVATED_LEN}}
           />
           <TextField
             autoFocus
             margin="dense"
             id="lastLoggedIn"
             label="Last logged in"
             type="text"
             fullWidth
             variant="standard"
             value={lastLoggedIn}
             readOnly
           />
           <TextField
             autoFocus
             margin="dense"
             id="passwordResetRequested"
             label="Password reset requested"
             type="text"
             fullWidth
             variant="standard"
             value={passwordResetRequested}
             readOnly
           />
           <TextField
             autoFocus
             margin="dense"
             id="invalidLoginAttempts"
             label="Invalid login attempts"
             type="text"
             fullWidth
             variant="standard"
             value={invalidLoginAttempts}
             readOnly
           />
           <TextField
             autoFocus
             margin="dense"
             id="emailInvalid"
             label="Email Invalid"
             type="text"
             fullWidth
             variant="standard"
             value={emailInvalid}
             readOnly
           />
        </div>

        <div id="footer" style={footerStyle}>
        </div>
      </div>
    </div>
  );
};
