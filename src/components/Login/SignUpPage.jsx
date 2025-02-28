import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { SimpleInput, PasswordInput } from "../Common/Inputs";
import { useNavigate } from "react-router-dom";
import { LargeButton } from "../Common/Buttons";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MaterialModal from "../Common/MaterialModal";
import { appData } from "../Context/AppContext";
import useApi from "../Hooks/useApi";
import { validateFormData ,validatePassword} from "../Common/Validations";
import validator from "validator";

const SignUpPage = () => {
  const { openModal, setSnackBarData, setUserData } = appData();
  const { mutate: signup, isPending: isSignupLoading, error } = useApi();
  const [submitclicked, setSubmitclicked] = useState(false);


  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    e.preventDefault();
    setSubmitclicked(false)
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const navigate = useNavigate();
  const handleSignup = (e) => {
    e.preventDefault(); 

    setSubmitclicked(true)
    const keysToValidate = [
      {name: "FirstName", errorMessage: "Please enter First Name." },
      {name : "LastName", errorMessage: "Please enter Last Name."},
      {name : "username", errorMessage: "Please enter User Name."},
      {name : "email", errorMessage: "Please enter Email Address."},
      {name : "password", errorMessage: "Please enter Password."},
      {name : "password_confirmation", errorMessage: "Please enter Confirm Password."},
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
    if (!validator.isLength(formData.FirstName, { min: 3, max: 100 })) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Please enter a valid First name",
      });
      return;
    }
    if (!validator.isLength(formData.LastName, { min: 3, max: 100 })) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Please enter a valid Last name",
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
    const usernameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!usernameRegex.test(formData.username)) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Username should not contain special characters (only letters, numbers).",
      });
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Password and Confirm Password does not match",
      });
      return;
    }


    signup({
      url: 'register',
      method: 'POST',
      data: formData,
    }, {
      onSuccess: (data) => {
       
       console.log(data)
      //  localStorage.setItem('userData', JSON.stringify(data)); 
       setUserData(data)
       navigate("/")
       setSnackBarData({
        visibility: true,
        // error: "info",
        text: "Successfully Registered",
      });
      },
      onError: (error) => {
        console.log(error)
      },
    });
  };

  return (
    <div
      className="container-fluid row justify-content-center"
      style={{ backgroundColor: "#fff" }}
    >
      {/* <div
        className="w-100 pl-xl-5 pl-0  d-flex login-mt "
        onClick={() => {
          // window.history.back();
          navigate("/")
        }}
      >
        <ArrowBackOutlinedIcon
          className="cursor-pointer"
          sx={{ fontSize: 18, ml: { lg: 9 }  }}
        />
        <p className="text-basic w-20 ml-1 cursor-pointer">Back</p>
      </div> */}
     
      
      <div className="card login-container ">
      <div className="bold-6 text-dark mont-font LoginHead">Create Your Free Account</div>
        <p className="LoginSubHead mt-2">
          Please verify that all fields are completed before proceeding
        </p>
        <hr/>
        <FormControl className="formBox" variant="standard">
          <div className="row">
            <div className="col-6 pl-0">
              <SimpleInput
                lable="First Name"
                name="FirstName"
                onChange={handleChange}
                value={formData.FirstName || ""}
                required
                error={submitclicked && !formData.FirstName}
            helperText={"First Name is Required"}
              />
            </div>
            <div className="col-6 pr-0">
              <SimpleInput
                lable="Last Name"
                name="LastName"
                onChange={handleChange}
                value={formData.LastName || ""}
                required
                error={submitclicked && !formData.LastName}
            helperText={"Last Name is Required"}
              />
            </div>
            <div className="col-12 pl-0 pr-0">
              <SimpleInput
                lable="User Name"
                name="username"
                onChange={handleChange}
                required
                value={formData.username || ""}
                helperText={"User Name is Required"}
                error={submitclicked && !formData.username}
              />
            </div>
            <div className="col-12 pl-0 pr-0">
              <SimpleInput
                lable="Email address"
                name="email"
                onChange={handleChange}
                value={formData.email || ""}
                required
                error={submitclicked && !formData.email}
            helperText={"Email is Required"}
              />
            </div>
            <div className="col-6 pl-0">
              <SimpleInput
                lable="Country"
                name="country"
                onChange={handleChange}
                value={formData.country || ""}
                required
              />
            </div>
            <div className="col-6 pr-0">
              <SimpleInput
                lable="City"
                name="city"
                onChange={handleChange}
                value={formData.city || ""}
                required
              />
            </div>
            <div className="col-6 pl-0">
              <PasswordInput
                lable={"Password"}
                onChange={handleChange}
                name="password"
                value={formData.password || ""}
                required
                error={submitclicked && !formData.password}
            helperText={"Password is Required"}
              />
            </div>
            <div className="col-6 pr-0">
              <PasswordInput
                lable={"Confirm Password"}
                onChange={handleChange}
                name="password_confirmation"
                value={formData.password_confirmation || ""}
                required
                error={submitclicked && !formData.password_confirmation}
            helperText={"Confirm Password is Required"}
              />
            </div>
          </div>
        </FormControl>
        <p className="mt-2 mb-1 LoginSubHead">&#8226; At least 8 characters</p>
        <p className="mb-1 LoginSubHead">&#8226; At least 1 number</p>
        <p className=" LoginSubHead">&#8226; At least 1 upper case letter</p>
        <LargeButton
          text={isSignupLoading? "Registering":"Register for Free"}
          onClick={(e) => {
          
            
            handleSignup(e)
         
            // This is the Stay Updated Modal which appears when we submit the Sign Up Form 
            // setOpenModal(() => ({
            //   open: true,
            //   content: (
            //     <div className="row">
            //       <div className="col-12">
            //         <h4>
            //           <strong>Stay Updated on iVestClub!</strong>
            //         </h4>
            //       </div>
            //       <div className="col-12">
            //         <p className="text-basic">
            //           iVestClub is currently not available in the US or for US
            //           residents. Please submit your email to be informed when
            //           iVestClub is available for you!
            //         </p>
            //       </div>
            //       <div className="col-12 ">
            //         <SimpleInput
            //           lable="Email address"
            //           name="Email"
            //           onChange={handleChange}
            //           value={formData.Email || ""}
            //         />
            //       </div>
            //       <div className="col-12 mt-4 text-center">
            //         <LargeButton text="Submit" />
            //         <p className="text-basic mt-2" onClick={()=>{ setOpenModal({open: false, content: null})}}>Cancel</p>
            //       </div>
            //     </div>
            //   ),
            // }));
          /////////////////////////////////
          }}
        />

        <div className="w-100 mt-1 align-items-center d-flex justify-content-center">
          <p className="text-basic loginBottomDes">
            Already have an account?{" "}
            <span className="loginBottomDes"
              style={{ fontWeight: "400", color: "#000", cursor: "pointer" }}
              onClick={() => {
                navigate(`/Login`);
                }}
            >
              Log In
            </span>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default SignUpPage;
