export const MENU_ITEM_LOGIN           = 'Login';
export const MENU_ITEM_LOGOUT          = 'Logout';
export const MENU_ITEM_REGISTER        = 'Register';
export const MENU_ITEM_HOME            = 'Home';
export const MENU_ITEM_CONTACT_US      = 'Contact Us';
export const MENU_ITEM_HELP            = 'Help';
export const MENU_ITEM_ABOUT           = 'About';
export const MENU_ITEM_CHANGE_PASSWORD = 'Change password';

export const USER_TYPE_ADMIN           = 'admin';
export const USER_TYPE_ORDINARY        = 'ordinary';
export const USER_TYPE_UNAUTHENTICATED = 'unauthenticated';

export const OPERATION_LOGOFF                = '?operation=logoff';
export const OPERATION_LOGON                 = '?operation=logon&userid=%s&password=%s';
export const OPERATION_TWO_PHASE             = '?operation=two_phase_auth_code&code=%s';
export const OPERATION_FORGOTTEN_PASSWORD    = '?operation=forgotten_password&email=%s';
export const OPERATION_FORGOTTEN_USERID      = '?operation=forgotten_userid&email=%s';
export const OPERATION_RESET_PASSWORD        = '?operation=reset_password&email=%s&password=%s&reset_code=%s';
export const OPERATION_CHANGE_PASSWORD       = '?operation=change_password&email=%s&old_password=%s&new_password=%s';
export const OPERATION_REGISTER              = '?operation=register&userid=%s&forename=%s&surname=%s&telno=%s&email=%s&password=%s&captcha=%s';
export const OPERATION_REGISTRATION_COMPLETE = '?operation=complete_registration&email=%s&registration_code=%s';
export const OPERATION_SEND_MESSAGE          = '?operation=send_message&name=%s&email=%s&message=%s&captcha=%s';

// These must match the corresponding state values for the walks on the server
export const DISPLAY_APPROVED   = 'approved';
export const DISPLAY_UNAPPROVED = 'unapproved';
export const DISPLAY_DELETED    = 'deleted';

// Length of variable fields
export const USERID_LEN    = 255;
export const AUTH_CODE_LEN = 6;
export const FORENAME_LEN  = 255;
export const SURNAME_LEN   = 255;
export const TELNO_LEN     = 255;
export const PASSWORD_LEN  = 255;
export const EMAIL_LEN     = 255;
export const CAPTCHA_LEN   = 6;
export const NAME_LEN      = 255;
export const MESSAGE_LEN   = 1024;

export const pattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
