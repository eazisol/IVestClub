import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { SimpleInput, PasswordInput } from "../Common/Inputs";
import { LargeButton } from "../Common/Buttons";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { appData } from "../Context/AppContext";
const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const { isAuthenticated,setIsAuthenticated } = appData();
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = (e) => {
    // e.preventDefault();
    // Logic for user authentication goes here
    navigate("/");
    console.log(isAuthenticated);
    setIsAuthenticated(true); 
    console.log(isAuthenticated);
     // Redirect to home page
  };
  const navigate = useNavigate();

  return (
    <div
      className="container-fluid row justify-content-center"
      style={{ backgroundColor: "#fff" }}
    >
      <div
        className="w-100 pl-5 d-flex login-mt"
        onClick={() => {
          window.history.back();
        }}
      >
        <ArrowBackOutlinedIcon className="cursor-pointer" sx={{ fontSize: 18, ml: 9 }} />
        <p className="text-basic w-20 ml-1 cursor-pointer">Back</p>
      </div>
      <div className="card login-container mt-4">
        <div className="bold-6 text-dark mont-font LoginHead">Log In To iVestClub</div>
        <p className="LoginSubHead mt-2">Welcome Back</p>
        <hr />
        <FormControl variant="standard">
          <SimpleInput
          
            lable="Email address"
            name="Email"
            onChange={handleChange}
            value={formData.Email || ""}
          />

          <PasswordInput
            lable={"Password"}
            onChange={handleChange}
            name="Password"
            value={formData.Password || ""}
          />
        </FormControl>
        <p className="mt-4 bold-4" style={{ color: "#4E55FF", fontSize: "14px" , cursor:"pointer" }} onClick={() => {
                navigate(`/Forget`);
              }}>
          Forgot Your Password
        </p>
        <div className="mt-4">
        <LargeButton onClick={handleLogin}    text="Log In" /></div>

        <div className="w-100 mt-2 align-items-center d-flex justify-content-center">
          <p className="text-basic loginBottomDes">
            Don't have an account?{" "}
            <span
            className="loginBottomDes"
              style={{ fontWeight: "400", color: "#000", cursor: "pointer" }}
              onClick={() => {
                navigate(`/SignUp`);
              }}
              
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
