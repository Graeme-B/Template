import React, { useState, } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import $ from 'jquery';
import { format } from 'util';
import packageInfo from '../../package.json';
import * as Constants from '../Constants';

export default function RegisterDialog(props) {
  const { open, onClose, onSuccess } = props;
  const [userid, setUserid]       = useState("");
  const [forename, setForename]   = useState("");
  const [surname, setSurname]     = useState("");
  const [telno, setTelno]         = useState("");
  const [email, setEmail]         = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [captcha, setCaptcha]     = useState("");
  const [imageKey, setImageKey]   = useState(Date.now());

  const handleUseridChange = event => {
    setUserid(event.target.value);
  };              
  const handleForenameChange = event => {
    setForename(event.target.value);
  };              
  const handleSurnameChange = event => {
    setSurname(event.target.value);
  };              
  const handleTelnoChange = event => {
    setTelno(event.target.value);
  };              
  const handleEmailChange = event => {
    setEmail(event.target.value);
  };              
  const handlePassword1Change = event => {
    setPassword1(event.target.value);
  };          
  const handlePassword2Change = event => {
    setPassword2(event.target.value);
  };          
  const handleCaptchaChange = event => {
    setCaptcha(event.target.value);
  };          

  const refreshCaptcha = () => {
    setImageKey(Date.now());
  };          

  const handleRegister = () => {
    if (Constants.pattern.test(email)) {
      if (password1 === password2) {
         $.ajax({
           type: "GET",
           url: packageInfo.actionsUrl + format(Constants.OPERATION_REGISTER,
                                                encodeURIComponent(userid.trim()),
                                                encodeURIComponent(forename.trim()),
                                                encodeURIComponent(surname.trim()),
                                                encodeURIComponent(telno.trim()),
                                                encodeURIComponent(email.trim()),
                                                encodeURIComponent(password1.trim()),
                                                encodeURIComponent(captcha.trim())),
           xhrFields: { withCredentials: true, credentials: 'include' },
           success(json, textStatus, request) {
             if (json["result"] === "success") {
               onSuccess(false);
               setUserid("");
               setForename("");
               setSurname("");
               setTelno("");
               setEmail("");
               setPassword1("");
               setPassword2("");
               setCaptcha("");
               alert("Register succeeded - please check your email for a link to activate your account");
               onClose();
             } else if (json["result"] === "InvalidCaptcha") {
               alert("Register failed - the captcha is invalid");
             } else if (json["result"] === "ExistingUserid") {
               alert("Register failed - this userid already exists. Suggested userid: '" + json["suggestedUserid"] + "'");
             } else if (json["result"] === "RegisteredUser") {
               alert("Register failed - this email is already registered");
             } else {
               alert("Register failed");
             }
           }
         });
      } else {
        alert('The passwords do not match');
      }
    } else {
      alert("Please enter a valid email address");
    }
  };

  const handleClose = () => {
    setUserid("");
    setForename("");
    setSurname("");
    setTelno("");
    setEmail("");
    setPassword1("");
    setPassword2("");
    setCaptcha("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="userid"
          label="Userid"
          type="text"
          fullWidth
          variant="standard"
          value={userid}
          onChange={handleUseridChange}
          inputProps={{maxLength: Constants.USERID_LEN}}
        />
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
          id="name"
          label="Telephone Number"
          type="text"
          fullWidth
          variant="standard"
          value={telno}
          onChange={handleTelnoChange}
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
          value={email}
          onChange={handleEmailChange}
          inputProps={{maxLength: Constants.EMAIL_LEN}}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={password1}
          onChange={handlePassword1Change}
          inputProps={{maxLength: Constants.PASSWORD_LEN}}
        />
        <TextField
          margin="dense"
          id="password"
          label="Reenter password"
          type="password"
          fullWidth
          variant="standard"
          value={password2}
          onChange={handlePassword2Change}
          inputProps={{maxLength: Constants.PASSWORD_LEN}}
        />
        <TextField
          margin="dense"
          id="captcha"
          label="Captcha"
          type="text"
          fullWidth
          variant="standard"
          value={captcha}
          onChange={handleCaptchaChange}
          inputProps={{maxLength: Constants.CAPTCHA_LEN}}
        />
      </DialogContent>
      <div><img src="captcha.php" id='captcha_image' key={imageKey}/></div>
      <div>
        Can't read the image? <Button onClick={refreshCaptcha}>Refresh</Button>
      </div>

      <DialogActions>
        <Button onClick={handleRegister}>Register</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
