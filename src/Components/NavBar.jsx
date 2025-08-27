import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Drawer, List, ListItem, Toolbar, IconButton, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginDialog from '../Pages/LoginDialog.jsx';
import TwoPhaseDialog from '../Pages/TwoPhaseDialog.jsx';
import RegisterDialog from '../Pages/RegisterDialog.jsx';
import ForgottenPasswordDialog from '../Pages/ForgottenPasswordDialog.jsx';
import ForgottenUseridDialog from '../Pages/ForgottenUseridDialog.jsx';
import ResetPasswordDialog from '../Pages/ResetPasswordDialog.jsx';
import ChangePasswordDialog from '../Pages/ChangePasswordDialog.jsx';
import RegisterCompletionDialog from '../Pages/RegisterCompletionDialog.jsx';
import { useAuthContext } from '../AuthContext'
import packageInfo from '../../package.json';
import * as Constants from '../Constants';

export default function NavBar ({setParentState}) {

  const unauthMenuItems = [{"key": Math.floor(Math.random() * 999999), "text": Constants.MENU_ITEM_LOGIN, "link":"/"},
                           {"key": Math.floor(Math.random() * 999999), "text": Constants.MENU_ITEM_REGISTER,  "link":"/"},
                           {"key": Math.floor(Math.random() * 999999), "text": Constants.MENU_ITEM_HOME,  "link":"/"},
                           {"key": Math.floor(Math.random() * 999999), "text": Constants.MENU_ITEM_ABOUT, "link":"/about"},
                           {"key": Math.floor(Math.random() * 999999), "text": Constants.MENU_ITEM_CONTACT_US, "link":"/contact_us"},
                           {"key": Math.floor(Math.random() * 999999), "text": Constants.MENU_ITEM_HELP, "link":"/help"}];
  const adminMenuItems  = [{"key": Math.floor(Math.random() * 999999), "text": Constants.MENU_ITEM_LOGOUT, "link":"/"},
                           {"key": Math.floor(Math.random() * 999999), "text": Constants.MENU_ITEM_CHANGE_PASSWORD, "link":"/ChangePassword"}];
  const userMenuItems   = [{"key": Math.floor(Math.random() * 999999), "text": Constants.MENU_ITEM_LOGOUT, "link":"/"},
                           {"key": Math.floor(Math.random() * 999999), "text": Constants.MENU_ITEM_HOME,  "link":"/"},
                           {"key": Math.floor(Math.random() * 999999), "text": Constants.MENU_ITEM_CHANGE_PASSWORD, "link":"/ChangePassword"},
                           {"key": Math.floor(Math.random() * 999999), "text": Constants.MENU_ITEM_ABOUT, "link":"/about"},
                           {"key": Math.floor(Math.random() * 999999), "text": Constants.MENU_ITEM_CONTACT_US, "link":"/contact_us"},
                           {"key": Math.floor(Math.random() * 999999), "text": Constants.MENU_ITEM_HELP, "link":"/help"}];
  const [isDrawerOpen, setIsDrawerOpen]                                     = useState(false);
  const [loginDialogIsOpen, setLoginDialogIsOpen]                           = React.useState(false);
  const [twoPhaseDialogIsOpen, setTwoPhaseDialogIsOpen]                     = React.useState(false);
  const [registerDialogIsOpen, setRegisterDialogIsOpen]                     = React.useState(false);
  const [forgottenPasswordDialogIsOpen, setForgottenPasswordDialogIsOpen]   = React.useState(false);
  const [forgottenUseridDialogIsOpen, setForgottenUseridDialogIsOpen]       = React.useState(false);
  const [resetPasswordDialogIsOpen, setResetPasswordDialogIsOpen]           = React.useState(false);
  const [changePasswordDialogIsOpen, setChangePasswordDialogIsOpen]         = React.useState(false);
  const [registerCompletionDialogIsOpen, setRegisterCompletionDialogIsOpen] = React.useState(false);
  const [menuItems, setMenuItems]                                           = useState(unauthMenuItems);
  const {authenticated, setAuthenticated, name, setName, email, setEmail}   = useAuthContext();
  let navigate = useNavigate();

  const closeLoginDialog               = () => setLoginDialogIsOpen(false)
  const closeTwoPhaseDialog            = () => setTwoPhaseDialogIsOpen(false)
  const closeRegisterDialog            = () => setRegisterDialogIsOpen(false)
  const closeForgottenPasswordDialog   = () => setForgottenPasswordDialogIsOpen(false)
  const closeForgottenUseridDialog     = () => setForgottenUseridDialogIsOpen(false)
  const closeResetPasswordDialog       = () => setResetPasswordDialogIsOpen(false)
  const closeChangePasswordDialog      = () => setChangePasswordDialogIsOpen(false)
  const closeRegisterCompletionDialog  = () => setRegisterCompletionDialogIsOpen(false)

  const loginSuccess = (adminUser, userName, userEmail, twoPhase) => {
    if (adminUser === "TRUE") {
      setAuthenticated(Constants.USER_TYPE_ADMIN);
      setMenuItems(adminMenuItems);
    } else {
      setAuthenticated(Constants.USER_TYPE_ORDINARY);
      setMenuItems(userMenuItems);
    }
    setName(userName);
    setEmail(userEmail);
    setParentState( Math.floor(Math.random() * 999999));
  }
  const registerSuccess = () => {
  }
  const forgottenPasswordSuccess = () => {
  }
  const forgottenUseridSuccess = () => {
  }
  const changePasswordSuccess = () => {
  }

  const twoPhase = () => {
    closeLoginDialog();
    setTwoPhaseDialogIsOpen(true);
  }
  const forgottenPassword = () => {
    closeLoginDialog();
    setForgottenPasswordDialogIsOpen(true);
  }
  const forgottenUserid = () => {
    closeLoginDialog();
    setForgottenUseridDialogIsOpen(true);
  }

  const listItemSelected = (item, link) => {
    setIsDrawerOpen(false);
    if (item === Constants.MENU_ITEM_LOGIN) {
      setLoginDialogIsOpen(true);
    } else if (item === Constants.MENU_ITEM_LOGOUT) {
      fetch(packageInfo.actionsUrl + Constants.OPERATION_LOGOFF)
      .then((res) => res.json())
      .then((json) => {
        setAuthenticated(Constants.USER_TYPE_UNAUTHENTICATED);
        setMenuItems(unauthMenuItems);
        setParentState( Math.floor(Math.random() * 999999));
      })
      .catch((error) => {
        console.log(error);
      });
    } else if (item === Constants.MENU_ITEM_REGISTER) {
      setRegisterDialogIsOpen(true);
    } else if (item === Constants.MENU_ITEM_CHANGE_PASSWORD) {
      setChangePasswordDialogIsOpen(true);
    } else {
      setParentState( Math.floor(Math.random() * 999999));
      navigate(link);
    }
  }

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    if (queryParameters != null) {
      const action       = queryParameters.get('action');
      const email        = queryParameters.get('email');
      const resetCode    = queryParameters.get('reset_code');
      const registerCode = queryParameters.get('register_code');
      if (action === 'password_reset' && email != null && resetCode != null) {
        setResetPasswordDialogIsOpen(true);
      } else if (action === 'account_activation' && email != null && registerCode != null) {
        setRegisterCompletionDialogIsOpen(true);
      }
    }

  }, []);

  return (
    <div>
      <div>
        <LoginDialog open={loginDialogIsOpen} onClose={closeLoginDialog} onSuccess={loginSuccess} onForgottenPassword={forgottenPassword} onForgottenUserid={forgottenUserid} onTwoPhase={twoPhase}/>
      </div>
      <div>
        <TwoPhaseDialog open={twoPhaseDialogIsOpen} onClose={closeTwoPhaseDialog} onSuccess={loginSuccess}/>
      </div>
      <div>
        <RegisterDialog open={registerDialogIsOpen} onClose={closeRegisterDialog} onSuccess={registerSuccess}/>
      </div>
      <div>
        <ForgottenPasswordDialog open={forgottenPasswordDialogIsOpen} onClose={closeForgottenPasswordDialog} onSuccess={forgottenPasswordSuccess}/>
      </div>
      <div>
        <ForgottenUseridDialog open={forgottenUseridDialogIsOpen} onClose={closeForgottenUseridDialog} onSuccess={forgottenUseridSuccess}/>
      </div>
      <div>
        <ResetPasswordDialog open={resetPasswordDialogIsOpen} onClose={closeResetPasswordDialog} onSuccess={loginSuccess}/>
      </div>
      <div>
        <RegisterDialog open={registerDialogIsOpen} onClose={closeRegisterDialog} onSuccess={registerSuccess}/>
      </div>
      <div>
        <ChangePasswordDialog open={changePasswordDialogIsOpen} onClose={closeChangePasswordDialog} onSuccess={changePasswordSuccess}/>
      </div>
      <div>
        <RegisterCompletionDialog open={registerCompletionDialogIsOpen} onClose={closeRegisterCompletionDialog} onSuccess={loginSuccess}/>
      </div>
      <nav>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setIsDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>

              <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <List style={{width : '250px'}}>
                  {menuItems.map(currentOption => (
                    <ListItem button onClick={() => listItemSelected(currentOption.text, currentOption.link)}>{currentOption.text}</ListItem>
                  ))}
                </List>
              </Drawer>

            </Toolbar>
          </AppBar>
        </Box>
      </nav>
    </div>
  );
};
