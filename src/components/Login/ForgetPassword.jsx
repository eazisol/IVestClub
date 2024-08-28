import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { SimpleInput, PasswordInput } from "../Common/Inputs";
import { useNavigate } from "react-router-dom";
import { LargeButton } from "../Common/Buttons";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MaterialModal from "../Common/MaterialModal";
import { appData } from "../Context/AppContext";

const ForgetPassword = () => {
  const { openModal, setOpenModal } = appData();
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
      <div className="card login-container  mt-4" style={{height:"32rem"}}>
        <div className="bold-6 text-dark mont-font LoginHead">Forgot Your Password</div>
        <p className="LoginSubHead mt-2">
        Don’t worry, happens to all of us. Enter your email below to recover your password
        </p>
        <hr />
        <FormControl variant="standard">
          <div className="row ">
            
           
            <div className="col-12 p-0">
              <SimpleInput
                lable="Email address"
                name="Email"
                onChange={handleChange}
                value={formData.Email || ""}
              />
            </div>
     
          </div>
        </FormControl>
       <div className="forgetBtns mt-5">
        <LargeButton
          text="Send"
          onClick={() => {
            setOpenModal(() => ({
              open: true,
              content: (
                <div className="row">
                  <div className="col-12">
                    <h4>
                      <strong>Stay Updated on iVestClub!</strong>
                    </h4>
                  </div>
                  <div className="col-12">
                    <p className="text-basic">
                      iVestClub is currently not available in the US or for US
                      residents. Please submit your email to be informed when
                      iVestClub is available for you!
                    </p>
                  </div>
                  <div className="col-12 ">
                    <SimpleInput
                      lable="Email address"
                      name="Email"
                      onChange={handleChange}
                      value={formData.Email || ""}
                    />
                  </div>
                  <div className="col-12 mt-4 text-center">
                    <LargeButton text="Submit" />
                    <p className="text-basic mt-2">Cancel</p>
                  </div>
                </div>
              ),
            }));
          }}
        />

        <div className="w-100 mt-1 align-items-center d-flex justify-content-center">
          <p className="formCancel">
           Cancel
           
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
