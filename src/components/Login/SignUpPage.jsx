import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { SimpleInput, PasswordInput } from "../Common/Inputs";
import { useNavigate } from "react-router-dom";
import { LargeButton } from "../Common/Buttons";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MaterialModal from "../Common/MaterialModal";
import { appData } from "../Context/AppContext";
import useApi from "../Hooks/useApi";
import { validateFormData, validatePassword } from "../Common/Validations";
import validator from "validator";
import { CountryAutocomplete } from "../Common/AutoCompletes";
import { CustomizedLoader } from "../Common/MiniComponents";
import { Box, Button, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import image from "../../assets/images/HeaderLogo.png";
const SignUpPage = () => {
  const { setSnackBarData, setUserData, userData } = appData();
  const { mutate: signup, isPending: isSignupLoading, error } = useApi();
  const { mutate: sendUsMail, isPending: isSendUsMailLoading } = useApi();
  const {
    mutate: sendVerificationMail,
    isPending: isSendVerificationMailLoading,
  } = useApi();
  const { mutate: getData, isPending: isProfileLoading } = useApi();
  const [submitclicked, setSubmitclicked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [usCitizenModal, setUsCitizenModal] = useState(true);
  const [uSEmail, setUSEmail] = useState("");
  const [LoaderModal, setLoaderModal] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [countdown, setCountdown] = useState(60); // Countdown timer (60s)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [profileData, setProfileData] = useState({});
  const handleChange = (e) => {
    e.preventDefault();
    setSubmitclicked(false);
    const { name, value } = e.target;
    if (name === "city" && /\d/.test(value)) {
      // Prevent the user from entering numbers
      return;
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  // useEffect(() => {
  //   if (profileData && !profileData.email_verified_at) {
  //     setWalletModalOpen(true);
  //   }
  // }, [userData]);

  useEffect(() => {
    getData(
      {
        url: "profile",
        method: "GET",
        sendHeaders: true,
      },
      {
        onSuccess: (data) => {
          console.log("get data", data);
          setProfileData(data);
          // localStorage.setItem("userData", JSON.stringify(data));
          // setUserData(data);
          // navigate("/");
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }, []);
  useEffect(() => {
    let timer;
    if (walletModalOpen && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsButtonDisabled(false); // Enable button when countdown reaches 0
    }
    return () => clearInterval(timer);
  }, [walletModalOpen, countdown]);
  const navigate = useNavigate();
  const handleSignup = (e) => {
    e.preventDefault();

    setSubmitclicked(true);
    const keysToValidate = [
      { name: "FirstName", errorMessage: "Please enter First Name." },
      { name: "LastName", errorMessage: "Please enter Last Name." },
      { name: "username", errorMessage: "Please enter Username." },
      { name: "email", errorMessage: "Please enter Email Address." },
      { name: "password", errorMessage: "Please enter Password." },
      {
        name: "password_confirmation",
        errorMessage: "Please enter Confirm Password.",
      },
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
    setLoaderModal(true);
    // const keysToClear = [
    //   "name",
    //   "recipentWalletAddress",
    //   "userData",
    //   "verify",
    //   "walletData",
    // ];

    // keysToClear.forEach((key) => localStorage.removeItem(key));
    signup(
      {
        url: "register",
        method: "POST",
        data: formData,
      },
      {
        onSuccess: (data) => {
          const userData = {
            firstname: data.FirstName ,
            lastname: data.LastName ,
          };
   
        
          localStorage.setItem("name", JSON.stringify(userData));
          console.log(data);
          localStorage.setItem("userData", JSON.stringify(data));
          setUserData(data);

          setTimeout(() => {
            handleVerifyMail();
          }, 2000);

          // setSnackBarData({
          //   visibility: true,
          //   // error: "info",
          //   text: "Successfully Registered",
          // });
        },
        onError: (error) => {
          setSnackBarData({
            visibility: true,
            error: "error",
            text: error?.response?.data?.message,
          });
          setLoaderModal(false);
        },
      }
    );
  };

  const handleVerifyMail = () => {
    setLoaderModal(true);
    sendVerificationMail(
      {
        url: "send-verify-email",
        method: "POST",
        sendHeaders: true,
      },
      {
        onSuccess: (data) => {
          console.log(data);

          setLoaderModal(false);
          setWalletModalOpen(true);
          setCountdown(60); // Reset countdown on resend
          setIsButtonDisabled(true); // Disable button again
          setSnackBarData({
            visibility: true,
            // error: "info",
            text: "Verification Email Sent Successfully",
          });
        },
        onError: (error) => {
          console.log(error);
          setLoaderModal(false);
        },
      }
    );
  };

  const handleSendUsMail = (e) => {
    e.preventDefault();

    if (!validator.isEmail(uSEmail)) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Please enter a valid email",
      });
      return;
    }

    sendUsMail(
      {
        url: "us-citizen",
        method: "POST",
        data: { email: uSEmail },
      },
      {
        onSuccess: (data) => {
          console.log(data);

          setSnackBarData({
            visibility: true,
            // error: "info",
            text: "Successfully Sent Email",
          });
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

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
              onChange={(e) => {
                setUSEmail(e.target.value);
              }}
              value={uSEmail || ""}
            />
          </div>
          <div className="col-12 mt-4 text-center">
            <LargeButton
              text={isSendUsMailLoading ? "Sending Mail" : "Submit"}
              loading={isSendUsMailLoading}
              onClick={handleSendUsMail}
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
      <MaterialModal open={usCitizenModal}>
        <div className="row">
          <div className="col-12 text-center">
            <h4>
              <strong>Are You A US Citizen?</strong>
            </h4>
          </div>
          <div className="col-12">
            <p className="text-basic">
              iVestClub is currently not available in the US or for US
              residents. Please submit your email to be informed when iVestClub
              is available for you!
            </p>
          </div>

          <div className="col-6 mt-4 text-center">
            <p
              className="text-basic mt-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setUsCitizenModal(false);
              }}
            >
              No
            </p>
          </div>
          <div className="col-6 mt-4 text-center">
            <LargeButton
              text={"Yes"}
              onClick={() => {
                setUsCitizenModal(false);
                setOpenModal(true);
              }}
            />
          </div>
        </div>
      </MaterialModal>
      <MaterialModal open={LoaderModal}>
        <CustomizedLoader />
      </MaterialModal>
      <MaterialModal open={walletModalOpen}>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          {/* Image */}
          <img
            src={image} // Replace with your image path
            alt="Email Verification"
            style={{ width: "80px", marginBottom: "16px" }}
          />

          {/* Text */}
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "rgb(42,42,42)",
              lineHeight: "21px",
              mb: 2,
            }}
          >
            Thank you for registering. A verification email has been sent to
            your inbox. Please follow the instructions in the email to activate
            your account.
          </Typography>

          {/* Resend Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: isButtonDisabled ? "#C2B5E2" : "#6A5ACD",
              color: "#2c2c2c",
              textTransform: "none",
              fontWeight: "500",
              borderRadius: "20px",
              padding: "8px 16px",
              "&:hover": {
                backgroundColor: isButtonDisabled ? "#C2B5E2" : "#5A4ACD",
              },
            }}
            onClick={handleVerifyMail}
            disabled={isButtonDisabled}
          >
            Resend Email
          </Button>
          <Typography
          sx={{
            fontSize: "10px",
            color: "rgb(42,42,42)",
            mt: 1,
          }}
        >
          {countdown > 0 ? `Resend in ${countdown}s` : "You can resend now"}
        </Typography>
        </Box>
      </MaterialModal>
      ;
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
          <div className="bold-6 text-dark mont-font LoginHead">
            Create Your Free Account
          </div>
          <p className="LoginSubHead mt-2">
            Please verify that all fields are completed before proceeding
          </p>
          <hr />
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
                  value={formData.username || ""}
                  error={submitclicked && !formData.username}
                  helperText={"Username is Required"}
                  required
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
                {/* <SimpleInput
                  lable="Country"
                  name="country"
                  onChange={handleChange}
                  value={formData.country || ""}
                /> */}
                <CountryAutocomplete
                  selectedCountry={formData}
                  setSelectedCountry={setFormData}
                />
              </div>
              <div className="col-6 pr-0">
                <SimpleInput
                required
                  lable="City"
                  name="city"
                  onChange={handleChange}
                  value={formData.city || ""}
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
          <p className="mt-2 mb-1 LoginSubHead">
            &#8226; At least 8 characters
          </p>
          <p className="mb-1 LoginSubHead">&#8226; At least 1 number</p>
          <p className=" LoginSubHead">&#8226; At least 1 upper case letter</p>
          <LargeButton
            text={isSignupLoading ? "Registering" : "Register for Free"}
            loading={isSignupLoading}
            onClick={(e) => {
              handleSignup(e);
            }}
          />

          <div className="w-100 mt-1 align-items-center d-flex justify-content-center">
            <p className="text-basic loginBottomDes">
              Already have an account?{" "}
              <span
                className="loginBottomDes"
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
    </>
  );
};

export default SignUpPage;
