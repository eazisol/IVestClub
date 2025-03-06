import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { SimpleInput, PasswordInput } from "../Common/Inputs";
import { LargeButton } from "../Common/Buttons";
import { appData } from "../Context/AppContext";
import useApi from "../Hooks/useApi";
import { validateFormData, validatePassword } from "../Common/Validations";
import validator from "validator";

const ContactUs = () => {
  const [formData, setFormData] = useState({message:""});
  const [submitclicked, setSubmitclicked] = useState(false);
  const { setSnackBarData, setUserData } = appData();
  const { mutate: login, isPending: isLoginLoading, error } = useApi();
  const handleChange = (e) => {
    e.preventDefault();
    setSubmitclicked(false);
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitclicked(true);
    const keysToValidate = [
      { name: "FirstName", errorMessage: "Please enter First Name." },
      { name: "LastName", errorMessage: "Please enter Last Name." },
      { name: "email", errorMessage: "Please enter Email." },
      { name: "phoneno", errorMessage: "Please enter phone." },
      { name: "subject", errorMessage: "Please enter Subject." },
      { name: "message", errorMessage: "Please enter Message." },
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
 

    login(
      {
        url: "contact",
        method: "POST",
        data: formData,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          setSnackBarData({
            visibility: true,
            error: "success",
            text: "Message sent Successfully",
          });
          setFormData({message:""})
          setSubmitclicked(false)
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <div
      className="container-fluid row justify-content-center"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="card login-container ">
        <div className="bold-6 text-dark mont-font LoginHead">Contact Us</div>
        <p className="LoginSubHead mt-2">
          Feel free to reach out to us with any questions or feedback. we're
          here to help!
        </p>
        <hr />
        <FormControl variant="standard">
          <div className="row">
            <div className="col-md-6">
              <SimpleInput
                lable="First Name"
                name="FirstName"
                onChange={handleChange}
                value={formData.FirstName || ""}
                error={submitclicked && !formData.FirstName}
                helperText={"First Name is Required"}
                required
              />
            </div>
            <div className="col-md-6">
              <SimpleInput
                lable="Last Name"
                name="LastName"
                onChange={handleChange}
                value={formData.LastName || ""}
                error={submitclicked && !formData.LastName}
                helperText={"Last Name is Required"}
                required
              />
            </div>
            <div className="col-md-6">
              <SimpleInput
                lable="Email address"
                name="email"
                onChange={handleChange}
                value={formData.email || ""}
                error={submitclicked && !formData.email}
                helperText={"Email is Required"}
                required
              />
            </div>
            <div className="col-md-6">
              <SimpleInput
                lable="Phone"
                name="phoneno"
                onChange={handleChange}
                value={formData.phoneno || ""}
                error={submitclicked && !formData.phoneno}
                helperText={"Phone is Required"}
                required
              />
            </div>
            <div className="col-md-12">
              <SimpleInput
                lable="Subject"
                name="subject"
                onChange={handleChange}
                value={formData.subject || ""}
                error={submitclicked && !formData.subject}
                helperText={"Subject is Required"}
                required
              />
            </div>
            <div className="col-md-12">
              <label className="text-basic-lable mt-2 pop-font LoginSubHead">
                Message <span className="text-danger">*</span>
              </label>
              <textarea
                value={formData.message || ""}
                className={
                  submitclicked && formData.message == ""
                    ? "form-control border-danger"
                    : "form-control "
                }
                style={{ height: "150px" }}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    message: e.target.value,
                  }));
                  setSubmitclicked(false);
                }}
              ></textarea>
              {submitclicked &&formData.message ==""&& <span className="text-danger text-basic-sm">Please write comments</span>}
            </div>
          </div>
        </FormControl>

        <div className="mt-4">
          <LargeButton
            onClick={handleSubmit}
            text={isLoginLoading ? "Submiting..." : "Submit"}
            loading={isLoginLoading}
          />
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
