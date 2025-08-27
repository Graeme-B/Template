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

  // Call Determine Userid link
  // Returns STATUS = SUCCESS if it works
  // returns STATUS = MISSING EMAIL if the email isn't registered
  // Will send an email containing the userid if the email is registered
  const handleReset = () => {
    if (Constants.pattern.test(email)) {
      $.ajax({
        type: "GET",
        url: packageInfo.actionsUrl + format(Constants.OPERATION_FORGOTTEN_USERID,
                                             encodeURIComponent(email.trim())),
        dataType: "json",
        xhrFields: { withCredentials: true, credentials: 'include' },
        success(json, textStatus, request) {
          if (json["result"] === "success") {
            alert("Please check your email to find your userid");
            onClose();
          } else if (json["result"] === "InvalidEmail") {
            alert("Userid query failed - either the email is unknown or it is locked. Please contact the administrator to resolve the problem");
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
      <DialogTitle>Forgotten Userid</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your email address and press the Remind button. You will receive an email containing your userid.
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
        <Button onClick={handleReset}>Remind</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
