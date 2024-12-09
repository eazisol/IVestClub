import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { SimpleInput, PasswordInput } from "../Common/Inputs";
import { LargeButton } from "../Common/Buttons";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { appData } from "../Context/AppContext";
import useApi from "../Hooks/useApi";

const ResetPassword = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get("email");
    const token = queryParams.get("token");
    const [formData, setFormData] = useState({});
    const {setSnackBarData,setUserData } = appData();
    const { mutate: login, isPending: isLoginLoading, error } = useApi();
    const handleChange = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleLogin = (e) => {
      e.preventDefault(); 
      login({
        url: 'reset-password',
        method: 'POST',
        data: {...formData, email : email, token, token},
      }, {
        onSuccess: (data) => {
         
         console.log(data)
         localStorage.setItem('userData', JSON.stringify(data)); 
         setUserData(data)
         navigate("/")
         setSnackBarData({
          visibility: true,
          // error: "info",
          text: "Password changed Successfully",
        });
        },
        onError: (error) => {
          console.log(error)
        },
      });
    };
    const navigate = useNavigate();
    return (
        <div
          className="container-fluid row justify-content-center"
          style={{ backgroundColor: "#fff" }}
        >
          {/* <div
            className="w-100 pl-xl-5 pl-0  d-flex login-mt"
            onClick={() => {
              // window.history.back();
              navigate("/")
            }}
          >
            <ArrowBackOutlinedIcon className="cursor-pointer" sx={{ fontSize: 18, ml: { lg: 9 } }} />
            <p className="text-basic w-20 ml-1 cursor-pointer">Back</p>
          </div> */}
          <div className="card login-container">
            <div className="bold-6 text-dark mont-font LoginHead">Reset Password</div>
            <p className="LoginSubHead mt-2">{email}</p>
            <hr />
            <FormControl variant="standard">
            
    
              <PasswordInput
                lable={"Password"}
                onChange={handleChange}
                name="password"
                value={formData.password || ""}
              />
              <PasswordInput
                lable={"Confirm Password"}
                onChange={handleChange}
                name="password_confirmation"
                value={formData.password_confirmation || ""}
              />
            </FormControl>
            
            <div className="mt-4">
            <LargeButton onClick={handleLogin}    text={isLoginLoading ? 'Resetting in...' : 'Reset'} /></div>
    
           
          </div>
        </div>
      );
}

export default ResetPassword