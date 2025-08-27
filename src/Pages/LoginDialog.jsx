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
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginDialog(props) {
  const { open, onClose, onSuccess, onForgottenPassword, onForgottenUserid, onTwoPhase } = props;
  const [userid, setUserid]                                                              = useState("");
  const [password, setPassword]                                                          = useState("");
  const navigate                                                                         = useNavigate();

  const handleUseridInputChange = event => {
    setUserid(event.target.value);
  };              

  const handlePasswordInputChange = event => {
    setPassword(event.target.value);
  };          

  const handleLogin = () => {
    $.ajax({
      type: "GET",
      url: packageInfo.actionsUrl + format(Constants.OPERATION_LOGON,
                                           encodeURIComponent(userid.trim()),
                                           encodeURIComponent(password.trim())),
      xhrFields: { withCredentials: true, credentials: 'include' },
      success(json, textStatus, request) {
        if (json["result"] === "success") {
          onSuccess(json["admin_user"], json["userid"], json["email"], json["two_phase"]);
          setUserid("");
          setPassword("");
          onClose();
        } else if (json["result"] === "two_phase") {
          setUserid("");
          setPassword("");
          onTwoPhase();
        } else if (json["result"] === "AccountLocked") {
          alert("Login failed - account locked. Please contact the administrator to unlock this account");
        } else if (json["result"] === "AccountNotActivated") {
          alert("Login failed - this account isn't activated yet: please check your email and click on the ACTIVATE link");
        } else if (json["result"] === "InvalidEmail") {
          alert("Login failed - this account does not have a valid email address. Please contact the administrator to reset the email address");
        } else {
          alert("Login failed - invalid userid/password?");
        }
      }
    });
  };

  const handleForgottenPassword = () => {
    setUserid("");
    setPassword("");
    onForgottenPassword();
  };

  const handleForgottenUserid = () => {
    setUserid("");
    setPassword("");
    onForgottenUserid();
  };

  const handleClose = () => {
    setUserid("");
    setPassword("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="userid"
          label="User ID"
          type="text"
          fullWidth
          variant="standard"
          value={userid}
          onChange={handleUseridInputChange}
          inputProps={{maxLength: Constants.USERID_LEN}}
        />
        <TextField
          margin="dense"
          id="password"
          label="password"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={handlePasswordInputChange}
          inputProps={{maxLength: Constants.PASSWORD_LEN}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogin}>Login</Button>
        <Button onClick={handleForgottenPassword}>Forgotten Password?</Button>
        <Button onClick={handleForgottenUserid}>Forgotten Userid?</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
