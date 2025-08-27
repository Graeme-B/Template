import React, { useState, useEffect, } from 'react';
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

export default function ResetPasswordDialog(props) {
  const { open, onClose, onSuccess } = props;
  const [password1, setPassword1]    = useState("");
  const [password2, setPassword2]    = useState("");
  const [email, setEmail]            = useState("");
  const [resetCode, setResetCode]    = useState("");

  const handlePassword1InputChange = event => {
    setPassword1(event.target.value);
  };          
  const handlePassword2InputChange = event => {
    setPassword2(event.target.value);
  };          

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    if (queryParameters != null) {
      const action        = queryParameters.get('action');
      const emailParm     = queryParameters.get('email');
      const resetCodeParm = queryParameters.get('reset_code');
      if (action === 'password_reset' && emailParm != null && resetCodeParm != null) {
        setEmail(emailParm);
        setResetCode(resetCodeParm);
      } else {
        handleClose();
      }
    } else {
      handleClose();
    }
  }, []);

  const handleResetPassword = () => {
    if (password1 === password2) {
      $.ajax({
        type: "GET",
        url: packageInfo.actionsUrl + format(Constants.OPERATION_RESET_PASSWORD,
                                             encodeURIComponent(email),
                                             encodeURIComponent(password1.trim()),
                                             encodeURIComponent(resetCode)),
        xhrFields: { withCredentials: true, credentials: 'include' },
        success(json, textStatus, request) {
          if (json["result"] === "success") {
            onSuccess(json["admin_user"],json["name"],json["email"]);
            setPassword1("");
            setPassword2("");
            alert("Password changed");
            onClose();
          } else {
            alert("Password reset failed");
          }
        }
      });
    } else {
      alert("Error - passwords do not match");
    }
  };

  const handleClose = () => {
    setPassword1("");
    setPassword2("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="password1"
          label="New password"
          type="password"
          fullWidth
          variant="standard"
          value={password1}
          onChange={handlePassword1InputChange}
          inputProps={{maxLength: Constants.PASSWORD_LEN}}
        />
        <TextField
          margin="dense"
          id="password2"
          label="Reenter password"
          type="password"
          fullWidth
          variant="standard"
          value={password2}
          onChange={handlePassword2InputChange}
          inputProps={{maxLength: Constants.PASSWORD_LEN}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleResetPassword}>Update Password</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
