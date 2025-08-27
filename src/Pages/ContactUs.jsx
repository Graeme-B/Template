import { useState, } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import $ from 'jquery';
import { format } from 'util';
import packageInfo from '../../package.json';
import * as Constants from '../Constants';

const ContactUs = (props) => {
  const navigate                = useNavigate();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [message, setMessage]   = useState("");
  const [captcha, setCaptcha]   = useState("");
  const [imageKey, setImageKey] = useState(Date.now());

  const handleNameChange = event => {
    setName(event.target.value);
  };          
  const handleEmailChange = event => {
    setEmail(event.target.value);
  };          
  const handleMessageChange = event => {
    setMessage(event.target.value);
  };          
  const handleCaptchaChange = event => {
    setCaptcha(event.target.value);
  };          
  const refreshCaptcha = () => {
    setImageKey(Date.now());
  };          

  const handleSend = () => {
    if (Constants.pattern.test(email)) {
      $.ajax({
        type: "GET",
        url: packageInfo.actionsUrl + format(Constants.OPERATION_SEND_MESSAGE,
                                             encodeURIComponent(name.trim()),
                                             encodeURIComponent(email.trim()),
                                             encodeURIComponent(message.trim()),
                                             encodeURIComponent(captcha.trim())),
        xhrFields: { withCredentials: true, credentials: 'include' },
        success(json, textStatus, request) {
          if (json["result"] === "success") {
            setName("");
            setEmail("");
            setMessage("");
            setCaptcha("");
            alert("Your message was sent to the administrator");
            navigate("/");
          } else if (json["result"] === "InvalidCaptcha") {
            alert("Message sending failed - the captcha is invalid");
          } else {
            alert("Message sending failed");
            email.focus();
          }
        }
      });
    } else {
      alert("Please enter a valid email address");
    }
  };
/*
        <textarea
          rows = {6}    // Specifies the number of visible text lines
          cols = {150}    // Specifies the width of the textarea in characters
          placeholder = "Add your message"   // Specifies a short hint that describes the expected value of the textarea
          wrap = "soft"   // Specifies how the text in the textarea should be wrapped
          name = "message"   // Specifies the name of the textarea, which can be used when submitting a form
          minLength = {150}   // Specifies the minimum number of characters required in the textarea
          maxLength = {200}   // Specifies the maximum number of characters allowed in the textarea
        />
*/
  return (
    <div>
      <Box m={2} sx={{ flexGrow: 1 }}>
        <TextField
	  margin="dense"
	  id="name"
	  label="Name"
	  type="text"
	  fullWidth
	  variant="standard"
	  value={name}
	  onChange={handleNameChange}
          inputProps={{maxLength: Constants.NAME_LEN}}
          required
        />
        <TextField
	  margin="dense"
	  id="email"
	  label="Email"
	  type="text"
	  fullWidth
	  variant="standard"
	  value={email}
	  onChange={handleEmailChange}
          inputProps={{maxLength: Constants.EMAIL_LEN}}
          required
        />
        <TextField 
	  margin="dense"
	  id="message"
	  label="Message"
	  type="text"
	  fullWidth
	  variant="standard"
	  value={message}
          multiline={true}
	  onChange={handleMessageChange}
          required
          inputProps={{maxLength: Constants.MESSAGE_LEN}}
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
          required
          inputProps={{maxLength: Constants.CAPTCHA_LEN}}
        />
        <div><img src="captcha.php" id='captcha_image' key={imageKey}/></div>
        <div>
          Can't read the image? <Button onClick={refreshCaptcha}>Refresh</Button>
        </div>
        <div>
          <Button onClick={handleSend}>Send</Button>
        </div>
      </Box>
    </div>
  );
};

export default ContactUs;
