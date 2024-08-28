import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { SimpleInput, PasswordInput } from "../Common/Inputs";
import { useNavigate } from "react-router-dom";
import { LargeButton } from "../Common/Buttons";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MaterialModal from "../Common/MaterialModal";
import { appData } from "../Context/AppContext";

const SignUpPage = () => {
  const { openModal, setOpenModal } = appData();
  const { setIsAuthenticated } = appData();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  const navigate = useNavigate();

  return (
    <div
      className="container-fluid row justify-content-center"
      style={{ backgroundColor: "#fff" }}
    >
      <div
        className="w-100 pl-5 d-flex login-mt "
        onClick={() => {
          window.history.back();
        }}
      >
        <ArrowBackOutlinedIcon
          className="cursor-pointer"
          sx={{ fontSize: 18, ml: 9 }}
        />
        <p className="text-basic w-20 ml-1 cursor-pointer">Back</p>
      </div>
      <div className="formContainer">
      
      <div className="card login-container mt-4 ">
      <div className="regHead mont-font">Create Your Free Account</div>
        <p className="LoginSubHead">
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
              />
            </div>
            <div className="col-6 pr-0">
              <SimpleInput
                lable="Last Name"
                name="LastName"
                onChange={handleChange}
                value={formData.LastName || ""}
              />
            </div>
            <div className="col-12 pl-0 pr-0">
              <SimpleInput
                lable="Email address"
                name="Email"
                onChange={handleChange}
                value={formData.Email || ""}
              />
            </div>
            <div className="col-6 pl-0">
              <SimpleInput
                lable="Country"
                name="Country"
                onChange={handleChange}
                value={formData.Country || ""}
              />
            </div>
            <div className="col-6 pr-0">
              <SimpleInput
                lable="City"
                name="City"
                onChange={handleChange}
                value={formData.City || ""}
              />
            </div>
            <div className="col-6 pl-0">
              <PasswordInput
                lable={"Password"}
                onChange={handleChange}
                name="Password"
                value={formData.Password || ""}
              />
            </div>
            <div className="col-6 pr-0">
              <PasswordInput
                lable={"Confirm Password"}
                onChange={handleChange}
                name="ConfirmPassword"
                value={formData.ConfirmPassword || ""}
              />
            </div>
          </div>
        </FormControl>
        <p className="mt-2 mb-1 LoginSubHead">&#8226; At least 8 characters</p>
        <p className="mb-1 LoginSubHead">&#8226; At least 1 number</p>
        <p className=" LoginSubHead">&#8226; At least 1 upper case letter</p>
        <LargeButton
          text="Register for Free"
          onClick={() => {
            navigate("/");
            setIsAuthenticated(true);
         
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
    </div>
  );
};

export default SignUpPage;
