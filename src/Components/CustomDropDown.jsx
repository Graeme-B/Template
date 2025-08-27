import { useState, useEffect } from "react";
import {  Select, MenuItem } from '@mui/material'
import TextField from '@mui/material/TextField';

function CustomDropDown({initialValue, initialValueList, onChangeFn}) {
  const [activeElementType, setActiveElementType] = useState("dropdown");
  const [value, setValue]                         = useState('');
  const [values, setValues]                       = useState([]);
  const [changeFn, setChangeFn]                   = useState(null);

  useEffect(() => {

    if (initialValue === undefined && initialValueList !== undefined && initialValueList.length > 0) {
      initialValue = initialValueList[0];
    }
    setValue(initialValue);
    if (initialValueList.indexOf(initialValue) < 0) {
      initialValueList.push(initialValue);
    }

    let y = [];
    initialValueList.forEach((item) => {
      y.push({"key": Math.floor(Math.random() * 999999), "text": item });
    });
    setValues(y);
  }, []);

// PointerEvent
  const handleItemChange = (event) => {
    if (event != null && event.target != null && event.target.value != null) {
      if (event.target.value === "custom") {
        setActiveElementType("input");
      } else {
        setValue(event.target.value);
        onChangeFn(event);
      }
    }
  }

 /* The handleChange() function to set a new state for input */
  const handleChange = (event) => {
    if (event != null && event.target != null && event.target.value != null) {
      setValue(event.target.value);
      onChangeFn(event);
    }
  }

  const handleBlur = (event) => {
    var found = 0;
    for (var i = 0; i < values.length && !found; i++) {
      if (values[i].text === value) {
        found = 1;
      }
    }
    if (!found) {
      const newValue = {"key": Math.floor(Math.random() * 999999), "text": value};
      setValues([...values, newValue]);
    }
    setActiveElementType("dropdown");
  }

  const handleFocus = (event) => {
  }

  const dropDownComp = () => {
    return (
      <Select sx={{width: 100}} value={value} onChange={handleItemChange}>
        {values.map(currentOption => (
          <MenuItem key={currentOption.key} value={currentOption.text}>
            {currentOption.text}
          </MenuItem>
        ))}
        <MenuItem key={Math.floor(Math.random() * 999999)} value="custom">Type your own</MenuItem>
      </Select>
    );
  }

  const inputFieldComp = () => {
    return(
        <TextField
          autoFocus
          margin="dense"
          id="input"
          type="text"
          fullWidth
          variant="standard"
          value={value}
          onChange= {handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />);
  }

  return (
    <span>
      {activeElementType === "dropdown"
        ? dropDownComp()
        : inputFieldComp()
      }
    </span>
  );
}

export default CustomDropDown;

