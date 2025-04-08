import React, { useEffect, useState } from "react";
import {
  FilledButtonLight,
  OutlinedButtonLight,
  LargeButton,
  OutlinedButtonDark,
} from "./Buttons";
import { SimpleInput, DatePicker, PasswordInput } from "../Common/Inputs";
import { appData } from "../Context/AppContext";
import MaterialModal from "./MaterialModal";
import useApi from "../Hooks/useApi";
import { validateFormData } from "./Validations";
import { calculateAge, formatDateToDDMMYYYY } from "./Utills";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import ModalAlert from "./ModalAlert";

const CreateAccountModal = ({ text, Component = FilledButtonLight }) => {
  const {  setUserData,showHeader, setShowHeader } = appData();
  const [snackBarData, setSnackBarData] = useState({
    text: "test",
    error: "error",
    visibility: false,
  })
  const { mutate: sendOTP, isPending: isRegisterLoading, error } = useApi(false);
  const { mutate: verifyOTP, isPending: isVerifyingOTP } = useApi(false);
  const { mutate: resendOTP, isPending: isResendingOTP } = useApi(false);
  const { mutate: sendPassword, isPending: isSendingPassword } = useApi(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  // State to track the timer (in seconds)
  const [timer, setTimer] = useState(60);

  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);
  const [openModal5, setOpenModal5] = useState(false);
  const [pwdModal, setPwdModal] = useState(false)
  const [submitclicked, setSubmitclicked] = useState(false);
  const [submitclicked2, setSubmitclicked2] = useState(false);

  const [responseUserData, setResponseUserData] = useState({})

  const [formData, setFormData] = useState({});
  const [OTP, setOTP] = useState(["", "", "", ""]);

  const navigate = useNavigate();

  const errorHandler = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: error.response.data.message,
      });
    } 
    // Check if error has a message property
    else if (error.message) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: error.message,
      });
    } 
    // Fallback for unexpected error structures
    else {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Something went wrong",
      });
    }
  };

  const handleOTPChange = (e, index) => {
    const value = e.target.value;

    // Only allow numeric input and ensure a single digit
    if (!isNaN(value) && value.length <= 1) {
      const newOTP = [...OTP];
      newOTP[index] = value;
      setOTP(newOTP);

      // Automatically focus the next input if a digit is entered
      if (value !== "" && index < 3) {
        document.getElementById(`Number${index + 2}`).focus();
      }
    }
  };

  // Handle backspace to move to the previous input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !OTP[index] && index > 0) {
      document.getElementById(`Number${index}`).focus();
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSubmitclicked(false);
    setSubmitclicked2(false);
    // console.log("e.target", e.target);
    const { name, value, type } = e.target;
    if (type == "date") {
      const age =  calculateAge(value)
      if (age < 16) {
        console.log("Age should more than 16 years.");
        setSnackBarData({
          visibility: true,
          error: "error",
          text: "Age should more than 16 years.",
        });
        return
      }
      const formattedDate = formatDateToDDMMYYYY(value);
      setFormData((prevData) => ({ ...prevData, [name]: formattedDate }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  useEffect(() => {
    if (isResendDisabled && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      // Clear the interval once the timer reaches 0
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setIsResendDisabled(false); // Re-enable the button after the countdown
    }
  }, [isResendDisabled, timer]);

  const handleSubmitFirstDetails = (e) => {
    setSubmitclicked(true);
    const keysToValidate = [
      { name: "FirstName", errorMessage: "Please enter First Name." },
      { name: "LastName", errorMessage: "Please enter Surname." },
      { name: "dob", errorMessage: "Please enter Date of Birth." },
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

    if (!validator.isAlpha(formData.FirstName)) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Please enter a valid First name",
      });
      return;
    }
    if (!validator.isAlpha(formData.LastName)) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Please enter a valid Last Name",
      });
      return;
    }
    setOpenModal1(false);
    setOpenModal2(true);
  };

  const handleSendOTP = (e) => {
    if (OTP.length < 4) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Please enter OTP",
      });
    }

    const otpString = OTP.join("");

    // Convert the OTP string into a number
    const otpNumber = parseInt(otpString, 10);
    verifyOTP(
      {
        url: "check-otp",
        method: "POST",
        data: { email: formData.email, code: otpNumber },
      },
      {
        onSuccess: (data) => {
          console.log(data);
          // localStorage.setItem("userData", JSON.stringify({...data,...formData}));
          // setUserData({...data,...formData});
          setResponseUserData({...data,...formData})
          setOpenModal3(false);
          // setOpenModal4(true);
          setPwdModal(true);
          setSnackBarData({
            visibility: true,
            // error: "info",
            text: "OTP Verified Successfully",
          });
        },
        onError: (error) => {
          console.log(error);
          errorHandler(error)
        },
      }
    );
  };
  const handleVerifyOTP = (e) => {
    // setOpenModal2(false);
    // setOpenModal3(true);
    // return
    e.preventDefault();
    setSubmitclicked2(true);
    const keysToValidate = [
      { name: "username", errorMessage: "Please enter username." },
      // {name : "password", errorMessage: "Please enter Password."}
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
    if (!validator.isAlphanumeric(formData.username.replace(/ /g, ''))) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Please enter a valid User name",
      });
      return;
    }

    sendOTP(
      {
        url: "register-with-otp",
        method: "POST",
        data: formData,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          setOpenModal2(false);
          setOpenModal3(true);
          

          setSnackBarData({
            visibility: true,
            // error: "info",
            text: "OTP sent Successfully",
          });
        },
        onError: (error) => {
          console.log(error);
          errorHandler(error)
        },
      }
    );
  };
  const handleResendOTP = (e) => {
    // setOpenModal2(false);
    // setOpenModal3(true);
    // return
    e.preventDefault();
if (isResendDisabled) {
  return
}
    resendOTP(
      {
        url: "resend-otp",
        method: "POST",
        data: { email: formData.email },
      },
      {
        onSuccess: (data) => {
          console.log(data);

          setSnackBarData({
            visibility: true,
            // error: "info",
            text: "OTP sent Successfully",
          });
          setIsResendDisabled(true);
          setTimer(60); // Set timer to 60 seconds
        },
        onError: (error) => {
          console.log(error);
          errorHandler(error)
        },
      }
    );
  };
  const handleSubmitPassword = (e) => {
    if (!formData.password ) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Password is Required",
      });
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Password and Confirm Password do not match",
      });
      return;
    }
    sendPassword(
      {
        url: "set-password",
        method: "POST",
        data: { password: formData.password,
          password_confirmation: formData.password_confirmation
         },
        sendHeaders: false,
        customHeaders:responseUserData
      },
      {
        onSuccess: (data) => {
          console.log(data);

          setSnackBarData({
            visibility: true,
            // error: "info",
            text: "Password Set Successfully",
          });
          //  localStorage.setItem("userData", JSON.stringify(responseUserData));
          // setUserData(responseUserData);
          setPwdModal(false);
          setShowHeader(true)
          setOpenModal4(true)
        
        },
        onError: (error) => {
          console.log(error);
          errorHandler(error)
        },
      }
    );
  };
  useEffect(() => {
    setSnackBarData({ text: "test",
      error: "error",
      visibility: false,})
  
  
  }, [openModal1,openModal2,openModal3,pwdModal,openModal4,openModal5])
  

  return (
    <>
      <MaterialModal open={openModal1}>
        <>
        <ModalAlert setSnackBarData={setSnackBarData} snackBarData={snackBarData}/>
          <div className="ModalContainer p-3 z-index-0">
            <div className="row">
              <div className="col-12">
                <div className="text-dark modalHeading">
                  {" "}
                  Great - Let's get you started on Your Journey!
                </div>
              </div>

              <div className="modalSection">
                <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
                  <p className="text-basic">
                    Please let us know a little bit more about yourself, so that
                    we can start creating your Free Account:
                  </p>
                </div>

                <div className="row">
                  <div className="col-md-6 modal-input">
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
                  <div className="col-md-6 modal-input">
                    <SimpleInput
                      lable="Surname"
                      name="LastName"
                      onChange={handleChange}
                      value={formData.LastName || ""}
                      required
                      error={submitclicked && !formData.LastName }
                      helperText={"Surname is Required"}
                    />
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-12 modal-input">
                    <DatePicker
                      lable="Date of Birth"
                      name="dob"
                      onChange={handleChange}
                      value={formData.dob || ""}
                      required
                      error={submitclicked && !formData.dob}
                      helperText={"Date of Birth is Required"}
                      futureDates={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modalBtns row text-center mt-3 p-3 justify-content-center">
              <LargeButton text={"Submit"} onClick={handleSubmitFirstDetails} />

              <p
                className="text-basic text-dark w-auto mt-3"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenModal1(false);
                  setShowHeader(true)
                }}
              >
                Cancel
              </p>
            </div>
          </div>
        </>
      </MaterialModal>
      <MaterialModal open={openModal2}>
      <ModalAlert setSnackBarData={setSnackBarData} snackBarData={snackBarData}/>
        <>
          <div className="ModalContainer p-3 z-0 container ">
            <div className="row">
              <div className="col-12">
                <div className="text-dark modalHeading">
                  Please Enter Your Email and Username!
                </div>
              </div>

              <div className="modalSection">
                <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
                  <p className="text-basic">
                    Let us know your email so we can verify you and also the
                    username You would like to use on the platform!
                  </p>
                </div>

                <div className="row">
                  <div className="col-12 modal-input">
                    <SimpleInput
                      lable={"Username"}
                      name="username"
                      onChange={handleChange}
                      value={formData.username || ""}
                      required
                      error={submitclicked2 && !formData.username}
                      helperText={"Username is Required"}
                    />
                  </div>
                  <div className="col-12 modal-input">
                    <SimpleInput
                      lable={"Email"}
                      name="email"
                      onChange={handleChange}
                      value={formData.email || ""}
                      required
                      error={submitclicked2 && !formData.email}
                      helperText={"Email is Required"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modalBtns row text-center mt-3 p-3 justify-content-center">
              <LargeButton
                text={isRegisterLoading ? "Submitting..." : "Submit"}
                onClick={handleVerifyOTP}
                loading={isRegisterLoading}
              />

              <p
                className="text-basic text-dark w-auto mt-3"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenModal2(false);
                  setShowHeader(true)
                }}
              >
                Cancel
              </p>
            </div>
          </div>
        </>
      </MaterialModal>
      <MaterialModal open={openModal3}>
      <ModalAlert setSnackBarData={setSnackBarData} snackBarData={snackBarData}/>
        <>
          <div className="ModalContainer p-3 z-0">
            <div className="row">
              <div className="col-12">
                <div className="text-dark modalHeading">
                  {" "}
                  You’re all set {formData.FirstName}! <br />
                  Let’s verify your email.
                </div>
              </div>

              <div className="modalSection">
                <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
                  <p className="text-basic">
                    Please enter the 4 digit code sent to <br />
                    {formData.email}
                  </p>
                </div>

                <div className="row verify-modal mt-5">
                  {OTP.map((digit, index) => (
                    <div className="col-3" key={index}>
                      <input
                        type="text"
                        className="form-control"
                        id={`Number${index + 1}`}
                        value={digit}
                        onChange={(e) => handleOTPChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        maxLength={1}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modalBtns row text-center mt-3 p-3 justify-content-center">
              <LargeButton
                text={isVerifyingOTP ? "Verifying..." : "Verify"}
                onClick={handleSendOTP}
                loading={isVerifyingOTP}
              />
            </div>
            <div className="container col-12 verify-btn d-flex justify-content-between ">
              {/* <p
                className="text-basic text-dark w-auto mt-3"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenModal3(false);
                  setShowHeader(true)
                }}
              >
                Cancel
              </p> */}
              
              <span
                className="text-basic text-dark w-auto mt-3 row"
                onClick={handleResendOTP}
                style={{
                  cursor: isResendDisabled ? "not-allowed" : "pointer",
                  color: isResendDisabled ? "gray" : "black",
                }}
              >
                {isResendDisabled ? `Resend Code (${timer}s)` : "Resend Code"}{isResendingOTP&& <div className="loader"></div> }
              </span>
            </div>
          </div>
        </>
      </MaterialModal>
      <MaterialModal open={pwdModal}>
      <ModalAlert setSnackBarData={setSnackBarData} snackBarData={snackBarData}/>
        <>
          <div className="ModalContainer p-3 z-index-0">
            <div className="row">
              <div className="col-12">
                <div className="text-dark modalHeading">
                  {" "}
                  Please set your password
                </div>
              </div>

              <div className="modalSection">
                {/* <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
                  <p className="text-basic">
                    Please let us know a little bit more about yourself, so that
                    we can start creating your Free Account:
                  </p>
                </div> */}

                <div className="row">
                  <div className="col-md-12 modal-input">
                    <PasswordInput
                      lable="Password"
                      name="password"
                      onChange={handleChange}
                      value={formData.password || ""}
                      required
                     
                      helperText={"Password is Required"}
                    />
                  </div>
                  <div className="col-md-12 modal-input">
                    <PasswordInput
                      lable="Confirm Password"
                      name="password_confirmation"
                      onChange={handleChange}
                      value={formData.password_confirmation || ""}
                      required
                      // error={submitclicked && !formData.password_confirmation}
                      helperText={"Confirm Password is Required"}
                    />
                  </div>
                </div>
               
              </div>
            </div>

            <div className="modalBtns row text-center mt-3 p-3 justify-content-center">
              <LargeButton text={"Submit"} onClick={handleSubmitPassword} loading={isSendingPassword}/>

              {/* <p
                className="text-basic text-dark w-auto mt-3"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setPwdModal(false);
                  setShowHeader(true)
                }}
              >
                Cancel
              </p> */}
            </div>
          </div>
        </>
      </MaterialModal>
      <MaterialModal open={openModal4}>
      <ModalAlert setSnackBarData={setSnackBarData} snackBarData={snackBarData}/>
        <>
          <div className="ModalContainer p-3 container z-0">
            <div className="row">
              <div className="col-12">
                <div className="text-dark modalHeading">
                  {" "}
                  Now tell us about your current Financial knowledge!
                </div>
              </div>

              <div className="modalSection">
                <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
                  <p className="text-basic">
                  
                    Do you currently own any Cryptocurrencies, stocks, bonds,
                    real estate or any other investments?
                  </p>
                </div>
              </div>

              <div className="row container dash-form-check">
                <div class="form-check  col-3 dash-check d-flex justify-content-around">
                  <input
                    class="form-check-input dash-radio"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Yes
                  </label>
                </div>
                <div class="form-check  col-3 dash-check d-flex justify-content-around">
                  <input
                    class="form-check-input dash-radio"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    No
                  </label>
                </div>
              </div>
            </div>

            <div className="modalBtns row text-center mt-3 p-3 justify-content-center">
              <LargeButton
                text={"Submit"}
                onClick={() => {
                  setOpenModal4(false);
                  setOpenModal5(true);
                }}
              />

              <p
                className="text-basic text-dark w-auto mt-3"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenModal4(false);
                  setShowHeader(true)
                }}
              >
                Cancel
              </p>
            </div>
          </div>
        </>
      </MaterialModal>
      <MaterialModal open={openModal5}>
      <ModalAlert setSnackBarData={setSnackBarData} snackBarData={snackBarData}/>
        <>
          <div className="CompanyModalContainer container">
            <div className="row">
              <div className="col-12">
                <div className="modalHeading text-dark">
                  {" "}
                  Let’s find out about Pre-IPO companies!
                </div>
              </div>

              <div className="modalSection">
                <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
                  <p className="text-basic">
                    Do you know how and why companies do an IPO (become listed)?
                  </p>
                </div>

                <div className="row container dash-form-check">
                  <div class="form-check  col-3 dash-check d-flex justify-content-around">
                    <input
                      class="form-check-input dash-radio"
                      type="radio"
                      name="flexRadioDefault-1"
                      id="flexRadioDefault1"
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      Yes
                    </label>
                  </div>
                  <div class="form-check  col-3 dash-check d-flex justify-content-around">
                    <input
                      class="form-check-input dash-radio"
                      type="radio"
                      name="flexRadioDefault-1"
                      id="flexRadioDefault2"
                    />
                    <label class="form-check-label" for="flexRadioDefault2">
                      No
                    </label>
                  </div>
                </div>

                <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
                  <p className="text-basic">
                    Did you know that Facebook made their backers a 100% return
                    in one year and 1,000% in 3 years before their IPO?
                  </p>
                </div>

                <div className="row container dash-form-check">
                  <div class="form-check  col-3 dash-check d-flex justify-content-around">
                    <input
                      class="form-check-input dash-radio"
                      type="radio"
                      name="flexRadioDefault-2"
                      id="flexRadioDefault3"
                    />
                    <label class="form-check-label" for="flexRadioDefault3">
                      Yes
                    </label>
                  </div>
                  <div class="form-check  col-3 dash-check d-flex justify-content-around">
                    <input
                      class="form-check-input dash-radio"
                      type="radio"
                      name="flexRadioDefault-2"
                      id="flexRadioDefault4"
                    />
                    <label class="form-check-label" for="flexRadioDefault4">
                      No
                    </label>
                  </div>
                </div>

                <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
                  <p className="text-basic">
                    Are you ready to become an exclusive member and start
                    enjoying the same benefits as the ultra-rich?
                  </p>
                </div>

                <div className="row container dash-form-check">
                  <div class="form-check  col-3 dash-check d-flex justify-content-around">
                    <input
                      class="form-check-input dash-radio"
                      type="radio"
                      name="flexRadioDefault-3"
                      id="flexRadioDefault5"
                    />
                    <label class="form-check-label" for="flexRadioDefault5">
                      Yes
                    </label>
                  </div>
                  <div class="form-check  col-3 dash-check d-flex justify-content-around">
                    <input
                      class="form-check-input dash-radio"
                      type="radio"
                      name="flexRadioDefault-3"
                      id="flexRadioDefault6"
                    />
                    <label class="form-check-label" for="flexRadioDefault6">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modalBtns row text-center  mt-3 p-3 justify-content-center">
              <LargeButton
                text={
                  "Click here to activate your Free account & start your journey"
                }
                onClick={() => {
                  setOpenModal5(false);
                  setShowHeader(true)
                  // navigate("/Dashboard/MyAccount")
                }}
              />

              <p
                className="text-basic text-dark w-auto mt-3"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenModal5(false);
                  setShowHeader(true)
                }}
              >
                Cancel
              </p>
            </div>
          </div>
        </>
      </MaterialModal>
      <Component
        text={text}
        onClick={() => {
          // setOpenModal({
          //   open: true,

          // });
          setOpenModal1(true);
          setShowHeader(false)
          window.scrollTo({ top: 0 });
        }}
      />
    </>
  );
};

export default CreateAccountModal;
