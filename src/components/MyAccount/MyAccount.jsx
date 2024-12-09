import React, { useEffect, useState, useRef } from "react";
import { SactionContainer } from "../Common/Containers";
import ProfileCard from "../Dashboard/ProfileCard";
import { PasswordInput, SimpleInput } from "../Common/Inputs";
import AccountCircleOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import { OutlinedButtonDark, LargeButton } from "../Common/Buttons";
import { appData } from "../Context/AppContext";
import useApi from "../Hooks/useApi";
import validator from "validator";
import { validateFormData } from "../Common/Validations";
import { CustomizedLoader } from "../Common/MiniComponents";
import { imgUrl } from "../../../apiConfig";

const MyAccount = () => {
  const { userData, setSnackBarData } = appData();
  const [formData, setFormData] = useState({});
  const [submitClicked, setSubmitclicked] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [passport, setPassport] = useState(null);
  const [selectedUploadId, setSelectedUploadId] = useState("passportUpload");
  // const { data, error, isLoading, isError } = useGetData('profile', {
  //   retry: false, // disable retry
  //   staleTime: 60000, // 1 minute stale time
  //   onSuccess: () => console.log('Custom success handler'),
  // });
  const inputKeys = [
    "email",
    "username",
    "FirstName",
    "LastName",
    "password",
    "password_confirmation",
    "country",
    "city",
    "address",
  ];

  const { mutate: getData, isPending: isProfileLoading, error } = useApi();
  const { mutate: postUserData, isPending: isProfileSendLoading } = useApi();

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
          setFormData(data);
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

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

 
  // Function to handle file selection

  const handlePassportUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Optionally create a preview URL for the image
      // const imageUrl = URL.createObjectURL(file);
      // setImage(imageUrl); // Set image URL in state for preview
      setPassport(file);
    }
  };
  // useEffect(() => {
  //   console.log("passport", passport);

  // }, [passport])

  const triggerPassportInput = () => {
    document.getElementById(selectedUploadId).click();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const postData = new FormData();
    setSubmitclicked(true);
    const keysToValidate = [
      { name: "FirstName", errorMessage: "Please enter First Name." },
      { name: "LastName", errorMessage: "Please enter Last Name." },
      { name: "email", errorMessage: "Please enter Email Address." },
      // {name : "password", errorMessage: "Please enter Password."},
      // {name : "password_confirmation", errorMessage: "Please enter Confirm Password."},
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
    // if (!validatePassword(formData.password)) {
    //   setSnackBarData({
    //     visibility: true,
    //     error: "error",
    //     text: "Please enter a valid Password",
    //   });
    //   return;
    // }
    if (formData.password || formData.password_confirmation) {
      if (formData.password !== formData.password_confirmation) {
        setSnackBarData({
          visibility: true,
          error: "error",
          text: "Password and Confirm Password do not match",
        });
        return;
      }
    }

    console.log("formDataformData", formData);
    inputKeys.forEach((element) => {
      postData.append(element, formData[element] ? formData[element] : "");
    });
    if (profilePic) {
      postData.append("profile", profilePic);
    }
    if (passport) {
      postData.append("passport", passport);
    }

    // postData.append("formData", formData);

    // console.log("formDataformData",formData);
    postUserData(
      {
        url: "profile/save",
        method: "POST",
        data: postData,
        sendHeaders: true,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          //  localStorage.setItem('userData', JSON.stringify(data));
          //  setUserData(data)
          setSnackBarData({
            visibility: true,
            // error: "info",
            text: "Successfully updated profile",
          });
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  if (isProfileLoading) {
    return <CustomizedLoader />;
  } else {
    return (
      <SactionContainer container={false}>
        <div className="d-flex w-100 justify-content-between mt-5 mb-3">
          <div className="w-100 mt-5  mb-3 pt-2 pl-3">
            <h3 className="dashHead">Dashboard</h3>
          </div>
          <div className="w-20 d-flex justify-content-end mr-4 mt-5">
            <div className="w-50">
              <LargeButton
                text={isProfileSendLoading ? "Saving" : "Save"}
                onClick={handleSignup}
              />
            </div>
          </div>
        </div>

        <div className="w-100  mb-5 pb-5">
          <div className="row mb-5">
            <div className="col-lg-3 col-md-12 p-0 col-sm-12">
              <ProfileCard
                enableEdit
                profilePic={profilePic}
                setProfilePic={setProfilePic}
                prevPic={formData.profile}
              />
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12 row">
              <div className="card card-border-c w-100">
                <div className="row p-4">
                  <div className="col-12 ">
                    <h5>My Account</h5>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                    <SimpleInput
                      lable="First Name"
                      name="FirstName"
                      onChange={handleChange}
                      value={formData.FirstName || ""}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                    <SimpleInput
                      lable="Last Name"
                      name="LastName"
                      onChange={handleChange}
                      value={formData.LastName || ""}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                    <SimpleInput
                      lable="User Name"
                      name="username"
                      onChange={handleChange}
                      value={formData.username || ""}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                    <SimpleInput
                      lable="Email address"
                      name="email"
                      onChange={handleChange}
                      value={formData.email || ""}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                    <PasswordInput
                      lable={"Password"}
                      onChange={handleChange}
                      name="password"
                      value={formData.password || ""}
                    />
                  </div>
                  <div className="col-md-6 col-sm-12 mt-2">
                    <PasswordInput
                      lable={"Confirm Password"}
                      onChange={handleChange}
                      name="password_confirmation"
                      value={formData.password_confirmation || ""}
                    />
                  </div>
                </div>
                <hr />
                <div className="row p-4">
                  <div className="col-12 ">
                    <h5>Home Address</h5>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                    <SimpleInput
                      lable="Country"
                      name="country"
                      onChange={handleChange}
                      value={formData.country || ""}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                    <SimpleInput
                      lable="City"
                      name="city"
                      onChange={handleChange}
                      value={formData.city || ""}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                    <SimpleInput
                      lable="Address"
                      name="address"
                      onChange={handleChange}
                      value={formData.address || ""}
                    />
                  </div>
                </div>
                <hr />
                <div className="row m-2  p-4 ">
                  <div className="col-lg-12 col-md-12 ">
                    <h5>ID Verification</h5>
                    <p className="text-basic mt-4 doc-color mb-2">
                      Document Type
                    </p>
                    <div className="card verificarion-card op-3">
                      <div className="row">
                        <div className="col-1 p-3">
                          <div className="icon-wrap">
                            <i className="fa-regular fa-address-card"></i>
                          </div>
                        </div>
                        <div className="col-11 col-sm-11 p-3">
                          <div className=" verificationHeadings  mb-0">
                            ID Card
                          </div>
                          <p className="text-basic verifyText mb-0">
                            Create your account with ID card
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card verificarion-card mt-2 op-3">
                      <div className="row">
                        <div className="col-1  p-3">
                          <div className="icon-wrap">
                            <i className="fa-regular fa-address-card"></i>
                          </div>
                        </div>
                        <div className="col-11 p-3">
                          <div className="mb-0 verificationHeadings">
                            Driving License
                          </div>
                          <p className="text-basic verifyText mb-0">
                            Create your account with Driving License
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="card verificarion-card-active mt-2 "
                      onClick={() => {
                        setSelectedUploadId("passportUpload");
                      }}
                    >
                      <div className="row">
                        <div className="col-1 p-3">
                          <div className="icon-wrap">
                            <i className="fa-regular fa-address-card"></i>
                          </div>
                        </div>
                        <div className="col-11 p-3">
                          <div className="mb-0 verificationHeadings">
                            Passport
                          </div>
                          <p className="text-basic verifyText mb-0">
                            Create your account with Passport
                          </p>
                        </div>
                      </div>
                    </div>
                    <input
                      id="passportUpload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handlePassportUpload}
                    />
                  </div>

                  <div
                    className="p-3 w-100 mt-3 mx-3 my-4"
                    style={{ borderRadius: "10px", backgroundColor: "#F5F8FF" }}
                  >
                    <div
                      className="row bg-white"
                      style={{ borderRadius: "10px" }}
                    >
                      <div className="col-12 d-flex justify-content-center align-items-center py-5">
                        {passport ? (
                          <div>
                            {passport ? (
                              <img
                                src={URL.createObjectURL(passport)}
                                alt="Profile Preview"
                                style={{
                                  width: 300,
                                  height: 200,
                                  borderRadius: 10,
                                }}
                              />
                            ) : (
                              <AccountCircleOutlinedIcon
                                sx={{ color: "#ccc", fontSize: 120 }}
                              />
                            )}
                          </div>
                        ) : (
                          <>
                            {formData.passport ? (
                              <img
                                src={imgUrl + formData.passport}
                                alt="Profile Preview"
                                style={{
                                  width: 300,
                                  height: 200,
                                  borderRadius: 10,
                                }}
                              />
                            ) : (
                              <AccountCircleOutlinedIcon
                                sx={{ color: "#ccc", fontSize: 120 }}
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center mt-4">
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <OutlinedButtonDark
                          text={"Upload Photo"}
                          onClick={triggerPassportInput}
                        />
                      
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12">
                        <OutlinedButtonDark text={"Take Photo"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SactionContainer>
    );
  }
};

export default MyAccount;
