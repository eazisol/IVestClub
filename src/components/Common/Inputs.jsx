import { TextField } from "@mui/material";
import React from "react";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
export const SimpleInput = ({ lable, onChange = () => {}, value, name }) => {
  return (
    <>
      <label
        htmlFor={`input-with-icon-adornment-${name}`}
        className="text-basic-lable mt-2 pop-font LoginSubHead"
      >
        {lable}
      </label>
      <TextField
       className="inputField"
        id={`input-with-icon-adornment-${name}`}
        // placeholder={lable} 
        variant="outlined"
        fullWidth
        size="small"
        name={name}
        onChange={onChange}
        value={value || ""}
      />
    </>
  );
};

export const PasswordInput = ({ lable, onChange = () => {}, name, value }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <label htmlFor={`input-Password-${name}`} className="text-basic-lable mt-2 pop-font LoginSubHead">
        {lable}
      </label>
      <OutlinedInput
        id={`input-Password-${name}`}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        onChange={onChange}
        // placeholder={lable}
        fullWidth
        size="small"
        name={name}
        value={value}
      />
    </>
  );
};
