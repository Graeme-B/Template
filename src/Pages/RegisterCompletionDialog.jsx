import React, { useState, useEffect, } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import $ from 'jquery';
import { format } from 'util';
import packageInfo from '../../package.json';
import * as Constants from '../Constants';
import Typography from '@mui/material/Typography';

export default function ResetPasswordDialog(props) {
  const { open, onClose, onSuccess }    = props;
  const [email, setEmail]               = useState("");
  const [registerCode, setRegisterCode] = useState("");

  // The HANDLE CLOSE bit fails - probably because it's called before the OPEN REGISTRATION is set in NavBar.jsx
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    if (queryParameters != null) {
      const action           = queryParameters.get('action');
      const emailParm        = queryParameters.get('email');
      const registerCodeParm = queryParameters.get('register_code');
      if (action === 'account_activation' && emailParm != null && registerCodeParm != null) {
        setEmail(emailParm);
        setRegisterCode(registerCodeParm);
      } else {
        handleClose();
      }
    } else {
      handleClose();
    }
  }, []);

  const handleCompleteRegistration = () => {
    $.ajax({
      type: "GET",
      url: packageInfo.actionsUrl + format(Constants.OPERATION_REGISTRATION_COMPLETE,
                                           encodeURIComponent(email),
                                           encodeURIComponent(registerCode)),
      xhrFields: { withCredentials: true, credentials: 'include' },
      success(json, textStatus, request) {
        if (json["result"] === "success") {
          onSuccess(json["admin_user"], json["name"], json["email"]);
          alert("Registration completed for user " + json["name"]);
          onClose();
        } else {
          alert("Registration failed - please contact the administrator");
        }
      }
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Registration</DialogTitle>
      <DialogContent>
        <Typography paragraph>
          Press the COMPLETE REGISTRATION button to confirm registration
        </Typography>

      </DialogContent>
      <DialogActions>
        <Button onClick={handleCompleteRegistration}>Complete Registration</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
