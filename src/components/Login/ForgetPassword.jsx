import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { SimpleInput, PasswordInput } from "../Common/Inputs";
import { useNavigate } from "react-router-dom";
import { LargeButton } from "../Common/Buttons";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MaterialModal from "../Common/MaterialModal";
import { appData } from "../Context/AppContext";
import useApi from "../Hooks/useApi";
import validator from "validator";

const ForgetPassword = () => {
  const { setSnackBarData } = appData();
  const {
    mutate: forgetPassword,
    isPending: isforgetLoading,
    error,
  } = useApi();

  const [formData, setFormData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleForgetPassword = () => {
    if (!validator.isEmail(formData.email)) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Please enter a valid email",
      });
      return;
    }
    forgetPassword(
      {
        url: "forgot-password",
        method: "POST",
        data: formData,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          //  localStorage.setItem('userData', JSON.stringify(data));

          navigate("/");
          setSnackBarData({
            visibility: true,
            // error: "info",
            text: "Mail sent Successfully",
          });
          setOpenModal(false);
        },
        onError: (error) => {
          setOpenModal(false);
          console.log(error);
        },
      }
    );
  };

  // useEffect(() => {
  //   setOpenModal(null)
  //   let prevdata = openModal
  //   setOpenModal(prevdata)
  // }, [isforgetLoading])

  const navigate = useNavigate();

  return (
    <>
      <MaterialModal open={openModal}>
        <div className="row">
          <div className="col-12">
            <h4>
              <strong>Stay Updated on iVestClub!</strong>
            </h4>
          </div>
          <div className="col-12">
            <p className="text-basic">
              iVestClub is currently not available in the US or for US
              residents. Please submit your email to be informed when iVestClub
              is available for you!
            </p>
          </div>
          <div className="col-12 ">
            <SimpleInput
              lable="Email address"
              name="Email"
              onChange={handleChange}
              value={formData.email || ""}
            />
          </div>
          <div className="col-12 mt-4 text-center">
            <LargeButton
              text={isforgetLoading ? "Sending Mail" : "Submit"}
              onClick={handleForgetPassword}
            />
            <p
              className="text-basic mt-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Cancel
            </p>
          </div>
        </div>
      </MaterialModal>
      <div
        className="container-fluid row justify-content-center"
        style={{ backgroundColor: "#fff" }}
      >
        {/* <div
        className="w-100 pl-xl-5 pl-0 d-flex login-mt "
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
        <div className="card login-container " style={{ height: "32rem" }}>
          <div className="bold-6 text-dark mont-font LoginHead">
            Forgot Your Password
          </div>
          <p className="LoginSubHead mt-2">
            Don’t worry, happens to all of us. Enter your email below to recover
            your password
          </p>
          <hr />
          <FormControl variant="standard">
            <div className="row ">
              <div className="col-12 p-0">
                <SimpleInput
                  lable="Email address"
                  name="email"
                  onChange={handleChange}
                  value={formData.email || ""}
                />
              </div>
            </div>
          </FormControl>
          <div className="forgetBtns mt-5">
            <LargeButton
              text="Send"
              onClick={(e) => {
                // handleForgetPassword(e)
                setOpenModal(true);
              }}
            />

            <div className="w-100 mt-3 align-items-center d-flex justify-content-center">
              <p
                className="formCancel cursor-pointer"
                onClick={() => {
                  window.history.back();
                }}
              >
                Cancel
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
