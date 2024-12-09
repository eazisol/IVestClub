import { TextField } from "@mui/material";
import React from "react";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";

export const SimpleInput = ({ lable, onChange = () => {}, value, name, error,helperText, required }) => {
  return (
    <>
      <label
        htmlFor={`input-with-icon-adornment-${name}`}
        className="text-basic-lable mt-2 pop-font LoginSubHead"
      >
        {lable} {required &&<span className="text-danger">*</span>}
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
        error={error}
        helperText={error ? helperText:null}
        
      />
    </>
  );
};

export const DatePicker = ({ lable, onChange = () => {}, value, name, error,helperText, required }) => {
  const formatDateToYYYYMMDD = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };
  
  return (
    <>
      <label
        htmlFor={`input-with-icon-adornment-${name}`}
        className="text-basic-lable mt-2 pop-font LoginSubHead"
      >
        {lable} {required &&<span className="text-danger">*</span>}
      </label>
      <TextField
       className="inputField"
        id={`input-with-icon-adornment-${name}`}
        // placeholder={lable} 
        variant="outlined"
        fullWidth
        size="small"
        type="date"
        name={name}
        onChange={onChange}
        value={formatDateToYYYYMMDD(value) || ""}
        error={error}
        helperText={error ? helperText:null}
        
      />
    </>
  );
};

export const PasswordInput = ({ lable, onChange = () => {}, name, value,error,helperText,required }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <label htmlFor={`input-Password-${name}`} className="text-basic-lable mt-2 pop-font LoginSubHead">
        {lable} {required &&<span className="text-danger">*</span>}
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
        error={error}
       
      />
      {error && <FormHelperText sx={{ml : 2}} error={error}>{helperText}</FormHelperText>}
    </>
  );
};
