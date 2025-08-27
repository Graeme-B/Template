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
import { useAuthContext } from '../AuthContext'
import * as Constants from '../Constants';

export default function ChangePasswordDialog(props) {
  const { open, onClose, onSuccess }    = props;
  const [oldPassword, setOldPassword]   = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [resetCode, setResetCode]       = useState("");
  const {authenticated, setAuthenticated,
         name, setName,
         email, setEmail}               = useAuthContext();

  const handleOldPasswordInputChange = event => {
    setOldPassword(event.target.value);
  };          
  const handleNewPassword1InputChange = event => {
    setNewPassword1(event.target.value);
  };          
  const handleNewPassword2InputChange = event => {
    setNewPassword2(event.target.value);
  };          

  const handleChangePassword = () => {
    if (newPassword1 === newPassword2) {
    $.ajax({
      type: "GET",
      url: packageInfo.actionsUrl + format(Constants.OPERATION_CHANGE_PASSWORD,
                                           encodeURIComponent(email),
                                           encodeURIComponent(oldPassword.trim()),
                                           encodeURIComponent(newPassword1.trim()),
                                           encodeURIComponent(resetCode)),
      xhrFields: { withCredentials: true, credentials: 'include' },
      success(json, textStatus, request) {
        if (json["result"] === "success") {
          setOldPassword("");
          setNewPassword1("");
          setNewPassword2("");
          alert("Password changed");
          onClose();
        } else {
          alert("Password change failed");
        }
      }
    });
    } else {
      alert("Error - passwords do not match");
    }
  };

  const handleClose = () => {
    setOldPassword("");
    setNewPassword1("");
    setNewPassword2("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="oldPassword"
          label="Current password"
          type="password"
          fullWidth
          variant="standard"
          value={oldPassword}
          onChange={handleOldPasswordInputChange}
          inputProps={{maxLength: Constants.PASSWORD_LEN}}
        />
        <TextField
          margin="dense"
          id="newPassword1"
          label="New password"
          type="password"
          fullWidth
          variant="standard"
          value={newPassword1}
          onChange={handleNewPassword1InputChange}
          inputProps={{maxLength: Constants.PASSWORD_LEN}}
        />
        <TextField
          margin="dense"
          id="newPassword2"
          label="Reenter password"
          type="password"
          fullWidth
          variant="standard"
          value={newPassword2}
          onChange={handleNewPassword2InputChange}
          inputProps={{maxLength: Constants.PASSWORD_LEN}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleChangePassword}>Update Password</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
