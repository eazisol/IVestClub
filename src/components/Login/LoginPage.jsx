import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { SimpleInput, PasswordInput } from "../Common/Inputs";
import { LargeButton } from "../Common/Buttons";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { appData } from "../Context/AppContext";
import useApi from "../Hooks/useApi";
import { validateFormData, validatePassword } from "../Common/Validations";
import validator from "validator";
import MaterialModal from "../Common/MaterialModal";
import { Typography } from "@mui/material";
import { baseUrl } from "../../../apiConfig";

const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const [usdtAmount, setustdAmount] = useState("");
  const [userWallet, setUserWallet] = useState("");
  const [submitclicked, setSubmitclicked] = useState(false);

  const { setSnackBarData, setUserData } = appData();
  const { mutate: login, isPending: isLoginLoading, error } = useApi();
  const handleChange = (e) => {
    e.preventDefault();
    setSubmitclicked(false);
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const onkeyEnter = (e) => {
    if (
      e.key === "Enter" &&
      (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
    ) {
      e.preventDefault();
      handleLogin(e);
    }
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   setSubmitclicked(true);
  //   const keysToValidate = [
  //     { name: "email", errorMessage: "Please enter Email Address." },
  //     { name: "password", errorMessage: "Please enter Password." },
  //   ];

  //   const validationResult = validateFormData({
  //     formData,
  //     keys: keysToValidate,
  //   });
  //   if (!validationResult.isValid) {
  //     setSnackBarData({
  //       visibility: true,
  //       error: "error",
  //       text: validationResult.errorMessage,
  //     });
  //     return;
  //   }
  //   if (!validator.isEmail(formData.email)) {
  //     setSnackBarData({
  //       visibility: true,
  //       error: "error",
  //       text: "Please enter a valid email",
  //     });
  //     return;
  //   }
  //   if (!validatePassword(formData.password)) {
  //     setSnackBarData({
  //       visibility: true,
  //       error: "error",
  //       text: "Please enter a valid Password",
  //     });
  //     return;
  //   }

  //   login(
  //     {
  //       url: "login",
  //       method: "POST",
  //       data: formData,
  //     },
  //     {
  //       onSuccess: (data) => {
  //         console.log(data);
  //         localStorage.setItem("userData", JSON.stringify(data));
  //         setUserData(data);
  //         navigate(userWallet || usdtAmount ? "/Dashboard" : "/");
  //         // setSnackBarData({
  //         //   visibility: true,
  //         //   // error: "info",
  //         //   text: "Successfully logged in",
  //         // });
  //       },
  //       onError: (error) => {
  //         console.log(error);
  //       },
  //     }
  //   );
  // };
  
  const handleLogin = (e) => {
    e.preventDefault();
    setSubmitclicked(true);
    const keysToValidate = [
      { name: "email", errorMessage: "Please enter Email Address." },
      { name: "password", errorMessage: "Please enter Password." },
    ];
  
    const validationResult = validateFormData({
      formData,
      keys: keysToValidate,
    });
    if (!validationResult.isValid) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: validationResult.errorMessage,
      });
      return;
    }
    if (!validator.isEmail(formData.email)) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Please enter a valid email",
      });
      return;
    }
    if (!validatePassword(formData.password)) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Please enter a valid Password",
      });
      return;
    }
  
    login(
      {
        url: "login",
        method: "POST",
        data: formData,
      },
      {
        onSuccess: async (data) => {
          const userData = {
            firstname: data.firstname ,
            lastname: data.lastname ,
          };
   
        
          localStorage.setItem("name", JSON.stringify(userData));
          localStorage.setItem("userData", JSON.stringify(data));
          setUserData(data);
  
          try {
            const response = await fetch(`${baseUrl}token/getAllTokenData`);
            if (!response.ok) {
              throw new Error("Failed to fetch token data");
            }
            const tokenData = await response.json();
            localStorage.setItem("tokenData", JSON.stringify(tokenData));
            console.log("Token Data Saved:", tokenData);
          } catch (err) {
            console.error("Error fetching token data:", err);
          }
  
          navigate(userWallet || usdtAmount ? "/Dashboard" : "/");
        },
        onError: (error) => {
          console.log("Login Error:", error);
        },
      }
    );
  };
  

  const navigate = useNavigate();

  useEffect(() => {
    const usdtAmount = JSON.parse(localStorage.getItem("usdtAmount"));
    const userWalletAddress = JSON.parse(
      localStorage.getItem("userWalletAddress")
    );
    setustdAmount(usdtAmount);
    setUserWallet(userWalletAddress);
  }, []);

  return (
    <>
  
      <div
        className="container-fluid row justify-content-center"
        style={{ backgroundColor: "#fff" }}
        onKeyDown={onkeyEnter}
      >
        {/* <div
        className="w-100 pl-xl-5 pl-0  d-flex login-mt"
        onClick={() => {
          // window.history.back();
          navigate("/")
        }}
      >
        <ArrowBackOutlinedIcon className="cursor-pointer" sx={{ fontSize: 18, ml: { lg: 9 }  }} />
        <p className="text-basic w-20 ml-1 cursor-pointer">Back</p>
      </div> */}

        <div className="card login-container ">
          <div className="bold-6 text-dark mont-font LoginHead">
            Log In To iVestClub
          </div>
          <p className="LoginSubHead mt-2">Welcome Back</p>
          <hr />
          <FormControl variant="standard">
            <SimpleInput
              lable="Email address"
              name="email"
              onChange={handleChange}
              value={formData.email || ""}
              error={submitclicked && !formData.email}
              helperText={"Email is Required"}
              required
            />

            <PasswordInput
              lable={"Password"}
              onChange={handleChange}
              name="password"
              value={formData.password || ""}
              error={submitclicked && !formData.password}
              helperText={"Password is Required"}
              required
            />
          </FormControl>
          <p
            className="mt-4 bold-4"
            style={{ color: "#4E55FF", fontSize: "14px", cursor: "pointer" }}
            onClick={() => {
              navigate(`/Forget`);
            }}
          >
            Forgot Your Password
          </p>
          <div className="mt-4">
            <LargeButton
              onClick={handleLogin}
              text={isLoginLoading ? "Logging in..." : "Login"}
            />
          </div>

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
    </>
  );
};

export default LoginPage;
