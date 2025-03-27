import React, { useRef, useEffect, useState } from "react";
import { Avatar } from "../Common/Icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { appData } from "../Context/AppContext";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { imgUrl } from "../../../apiConfig";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import { Chip, Tooltip } from "@mui/material";
import useApi from "../Hooks/useApi";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
const ProfileCard = ({
  enableEdit = true,
  profilePic,
  setProfilePic,
  prevPic,
}) => {
  const {
    handleLogout,
    userData,
    showPassword,
    setShowPassword,
    setSnackBarData,
  } = appData();
  const [profiledata, setProfileData] = useState({});

  const { mutate: getData, isPending: isProfileLoading } = useApi();
  const {
    mutate: sendVerificationMail,
    isPending: isSendVerificationMailLoading,
  } = useApi();
  const location = useLocation();
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    const maxSize = 3 * 1024 * 1024; // 3 MB in bytes

    if (file) {
      if (file.size > maxSize) {
        setSnackBarData({
          visibility: true,
          error: "error",
          text: "File size exceeds 3 MB. Please upload a smaller file.",
        });
        return; // Stop further processing if the file is too large
      }

      console.log("Selected file:", file);
      setProfilePic(file);
      // You can process the file further here (e.g., upload it to a server)
    }
  };
  const fileInputRef = useRef(null);
  const storedUser = JSON.parse(localStorage.getItem("name"));
  const verify = JSON.parse(localStorage.getItem("verify"));

  // Function to handle button click and trigger file input click
  const handleButtonClick = () => {
    console.log("Selected file:");
    fileInputRef.current.click(); // This will trigger the hidden file input
  };

  useEffect(() => {
    getData(
      {
        url: "profile",
        method: "GET",
        sendHeaders: true,
      },
      {
        onSuccess: (data) => {
          setProfileData(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }, []);
  const handleVerifyMail = () => {
    sendVerificationMail(
      {
        url: "send-verify-email",
        method: "POST",
        sendHeaders: true,
      },
      {
        onSuccess: (data) => {
          setSnackBarData({
            visibility: true,
            // error: "info",
            text: "Sent Verification Mail Successfully",
          });
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };
  return (
    <div className="card card-border-c">
      <div className="w-100 d-flex flex-column align-items-center justify-content-center mt-5">
        {/* <img src="/src/dash.png" alt="dashPic" /> */}

        {profilePic ? (
          <div>
            {profilePic ? (
              <img
                src={URL.createObjectURL(profilePic)}
                alt="Profile Preview"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                }}
              />
            ) : (
              <AccountCircleOutlinedIcon
                sx={{ color: "#ccc", fontSize: 100 }}
              />
            )}
          </div>
        ) : (
          <>
            {userData.profile || prevPic ? (
              <img
                src={imgUrl + (userData.profile || prevPic)}
                alt="Profile Preview"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                }}
              />
            ) : (
              <AccountCircleOutlinedIcon
                sx={{ color: "#ccc", fontSize: 100 }}
              />
            )}
          </>
        )}
        {!enableEdit && (
          <DriveFileRenameOutlineOutlinedIcon
            sx={{ cursor: "pointer" }}
            onClick={handleButtonClick}
          />
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*" // Allows only image files
          onChange={handleFileChange} // Handle file selection
        />
      </div>
      <div
        style={{
          minWidth: "60px",
          height: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
          marginTop: "5px",
        }}
      >
        {!verify && (
          <Chip
            label={"Unverified"}
            color={"error"}
            size="small"
            sx={{
              fontSize: "10px",
              height: "16px",
              padding: "1px 1px",
            }}
          />
        )}
        {!verify && (
          <Tooltip title="This is the email verification button" arrow>
            <CachedOutlinedIcon
              onClick={handleVerifyMail}
              sx={{ cursor: "pointer" }}
            />
          </Tooltip>
        )}
      </div>

      <div className="w-100 text-center mt-2 d-flex align-items-center justify-content-center">
        <div className="profileName pop-font DarkText bold-5">
          {`${storedUser?.firstname} ${storedUser?.lastname}`}
        </div>
        <div className="ml-1">
          {verify && <VerifiedIcon sx={{ color: "#F7B138" }} />}
        </div>
      </div>
      <div className="w-100 mt-2 mb-5 text-center LightText">
        {userData.email}
      </div>

      <button
        className={
          location.pathname == "/Dashboard" ? "dashBtn btn-active" : "dashBtn  "
        }
        onClick={() => {
          setShowPassword(false);
          navigate("/Dashboard");
        }}
      >
        <i className="fa-solid fa-wallet LightText-2 dashCardIcon"></i> &nbsp;{" "}
        <span className="dashCardText bold-6 LightText-2"> My Wallet</span>
      </button>
      <button
        className={
          location.pathname == "/Dashboard/MyMemberShipClubs"
            ? "dashBtn btn-active"
            : "dashBtn  "
        }
        onClick={() => {
          setShowPassword(false);
          navigate("/Dashboard/MyMemberShipClubs");
        }}
      >
        <i className="fa-regular LightText-1 dashCardIcon fa-address-card"></i>
        &nbsp;{" "}
        <span className="dashCardText bold-5 LightText-1">
          {" "}
          My Membership Club
        </span>
      </button>
      <button
        className={
          location.pathname == "/Dashboard/MyAccount" && !showPassword
            ? "dashBtn btn-active"
            : "dashBtn  "
        }
        onClick={() => {
          setShowPassword(false);
          navigate("/Dashboard/MyAccount");
        }}
      >
        <i className="fa-regular fa-user LightText-1 dashCardIcon"></i> &nbsp;
        <span className="dashCardText LightText-1 bold-5"> My Account/KYC</span>
      </button>
      <button
        className={
          location.pathname == "/Dashboard/TransactionHistory"
            ? "dashBtn btn-active"
            : "dashBtn  "
        }
        onClick={() => {
          navigate("/Dashboard/TransactionHistory");
        }}
      >
        <i className="fa-regular LightText-1 dashCardIcon fas fa-history"></i>
        {/* <i className="fa-regular LightText-1 dashCardIcon fa-address-card"></i> */}
        &nbsp;{" "}
        <span className="dashCardText bold-5 LightText-1">
          {" "}
          Transaction History
        </span>
      </button>
      <button
        className={showPassword ? "dashBtn btn-active" : "dashBtn  "}
        onClick={() => {
          setShowPassword(true);
          navigate("/Dashboard/MyAccount");
        }}
      >
        <i className="fa-solid fa-lock LightText-1 dashCardIcon"></i> &nbsp;
        <span className="dashCardText LightText-1 bold-5">
          {" "}
          Change Password
        </span>
      </button>
      <button
        className="dashBtn"
        onClick={() => {
          navigate("/");
          handleLogout();
        }}
      >
        <i className="fa-solid dashCardIcon LightText-1 fa-arrow-right-from-bracket"></i>
        &nbsp;
        <span className="dashCardText LightText-1 bold-5"> Log Out</span>
      </button>
    </div>
  );
};

export default ProfileCard;
