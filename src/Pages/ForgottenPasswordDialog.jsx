import React, { useState, useEffect, } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import $ from 'jquery';
import { format } from 'util';
import packageInfo from '../../package.json';
import * as Constants from '../Constants';

export default function ForgottenPasswordDialog(props) {
  const { open, onClose, onSuccess } = props;
  const [email, setEmail]            = useState("");

  useEffect(() => {
    setEmail("");
  }, []);

  const handleEmailInputChange = event => {
    setEmail(event.target.value);
  };              

  // Call Reset Password link
  // Returns STATUS = SUCCESS if it works
  // returns STATUS = MISSING EMAIL if the email isn't registered
  // Will send a RESET PASSWORD link if the email is registered
  // Also need RESET PASSWORD app - link on this app? - which runs th app on success, with the user logged in
  // So, two new PHP pages: SEND RESET, which checks if the user is logged in, and RESET which does the reset
  const handleReset = () => {
    if (Constants.pattern.test(email)) {
      $.ajax({
        type: "GET",
        url: packageInfo.actionsUrl + format(Constants.OPERATION_FORGOTTEN_PASSWORD,
                                             encodeURIComponent(email.trim())),
        dataType: "json",
        xhrFields: { withCredentials: true, credentials: 'include' },
        success(json, textStatus, request) {
          if (json["result"] === "success") {
            alert("Please check your email for a link to the RESET PASSWORD page");
            onClose();
          } else if (json["result"] === "InvalidEmail") {
            alert("Password reset failed - this account does not have a valid email address. Please contact the administrator to reset the email address");
          } else if (json["result"] === "AccountNotActivated") {
            alert("Password reset failed - this account is not yet activated");
          } else if (json["result"] === "UnknownUser") {
            alert("Password reset failed - this user is not known to the system");
          }
        }
      });
    } else {
      alert("Please enter a valid email address");
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your email address and press the Reset button. You will receive a link to change your password in your email.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="text"
          fullWidth
          variant="standard"
          value={email}
          onChange={handleEmailInputChange}
          inputProps={{maxLength: Constants.EMAIL_LEN}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
