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

export default function TwoPhaseDialog(props) {
  const { open, onClose, onSuccess } = props;
  const [code, setCode]              = useState("");
  const navigate                     = useNavigate();

  const handleCodeChange = event => {
    setCode(event.target.value);
  };              

  const handleResend = event => {
      console.log("Reset");
  };

  const handleCode = () => {
    $.ajax({
      type: "GET",
      url: packageInfo.actionsUrl + format(Constants.OPERATION_TWO_PHASE,
                                           encodeURIComponent(code.trim())),
      xhrFields: { withCredentials: true, credentials: 'include' },
      success(json, textStatus, request) {
        if (json["result"] === "success") {
          onSuccess(json["admin_user"], json["userid"], json["email"], json["two_phase"]);
          setCode("");
          onClose();
        } else if (json["result"] === "AuthNotInProgress") {
          alert("Login failed - authorisation not in progress");
        } else if (json["result"] === "InvalidAuthCode") {
          alert("Login failed - authorisation code invalid");
        } else if (json["result"] === "AuthCodeTimeouts") {
          alert("Login failed - authorisation timed out");
        } else {
          alert("Login failed - unknown error");
        }
      }
    });
  };

  const handleClose = () => {
    setCode("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Authentication Code</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="code"
          label="Code"
          type="text"
          fullWidth
          variant="standard"
          value={code}
          onChange={handleCodeChange}
          inputProps={{maxLength: Constants.AUTH_CODE_LEN}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCode}>Code</Button>
        <Button onClick={handleResend}>Resend Code</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
