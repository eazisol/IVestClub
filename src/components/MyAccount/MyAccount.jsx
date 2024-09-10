import React, { useState, useRef } from "react";
import { SactionContainer } from "../Common/Containers";
import ProfileCard from "../Dashboard/ProfileCard";
import { PasswordInput, SimpleInput } from "../Common/Inputs";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { OutlinedButtonDark, LargeButton } from "../Common/Buttons";

const MyAccount = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const fileInputRef = useRef(null);

  // Function to handle button click and trigger file input click
  const handleButtonClick = () => {
    console.log("Selected file:");
    fileInputRef.current.click(); // This will trigger the hidden file input
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      console.log("Selected file:", file);
      // You can process the file further here (e.g., upload it to a server)
    }
  };
  return (
    <SactionContainer container={false}>
      <div className="d-flex w-100 justify-content-between mt-5 mb-3">
        <div className="w-100 mt-5  mb-3 pt-2 pl-3">
          <h3 className="dashHead">Dashboard</h3>
        </div>
        <div className="w-20 d-flex justify-content-end mr-4 mt-5">
          <div className="w-50">
            <LargeButton text={"Save"} />
          </div>
        </div>
      </div>

      <div className="w-100  mb-5 pb-5">
        <div className="row mb-5">
          <div className="col-lg-3 col-md-12 p-0 col-sm-12">
            <ProfileCard />
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
                    value={formData.Email || ""}
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                  <SimpleInput
                    lable="Last Name"
                    name="LastName"
                    onChange={handleChange}
                    value={formData.Email || ""}
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                  <SimpleInput
                    lable="User Name"
                    name="UserName"
                    onChange={handleChange}
                    value={formData.Email || ""}
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                  <SimpleInput
                    lable="Email address"
                    name="Email"
                    onChange={handleChange}
                    value={formData.Email || ""}
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                  <PasswordInput
                    lable={"Password"}
                    onChange={handleChange}
                    name="Password"
                    value={formData.Password || ""}
                  />
                </div>
                <div className="col-md-6 col-sm-12 mt-2">
                  <PasswordInput
                    lable={"Confirm Password"}
                    onChange={handleChange}
                    name="ConfirmPassword"
                    value={formData.ConfirmPassword || ""}
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
                    name="FirstName"
                    onChange={handleChange}
                    value={formData.Email || ""}
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                  <SimpleInput
                    lable="City"
                    name="LastName"
                    onChange={handleChange}
                    value={formData.Email || ""}
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 mt-2">
                  <SimpleInput
                    lable="Address"
                    name="LastName"
                    onChange={handleChange}
                    value={formData.Email || ""}
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
                  <div className="card verificarion-card-active">
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
                  <div className="card verificarion-card mt-2">
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
                  <div className="card verificarion-card mt-2">
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
                      <AccountCircleOutlinedIcon
                        sx={{ color: "#ccc", fontSize: 120 }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center mt-4">
                    <div className="col-lg-3 col-md-6 col-sm-12">
                      <OutlinedButtonDark
                        text={"Upload Photo"}
                        onClick={handleButtonClick}
                      />
                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*" // Allows only image files
                        onChange={handleFileChange} // Handle file selection
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
};

export default MyAccount;
