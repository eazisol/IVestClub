import React from "react";
import { Avatar } from "../Common/Icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const ProfileCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="card card-border-c">
      <div className="w-100 d-flex justify-content-center mt-5">
        {/* <img src="/src/dash.png" alt="dashPic" /> */}
        <Avatar size={100} />
      </div>
      <div className="w-100 text-center mt-2">
        <div className="profileName pop-font DarkText bold-5">John Doe</div>
      </div>
      <div className="w-100 mt-2 mb-5 text-center LightText">
      youremail@gmail.com
      </div>

      <button
        className={
          location.pathname == "/Dashboard" ? "dashBtn btn-active" : "dashBtn  "
        }
        onClick={() => {
          navigate("/Dashboard");
        }}
      >
        <i className="fa-solid fa-wallet LightText-2 dashCardIcon"></i> &nbsp; <span className="dashCardText bold-6 LightText-2"> My Wallet</span>
      </button>
      <button
        className={
          location.pathname == "/Dashboard/MyMemberShipClubs"
            ? "dashBtn btn-active"
            : "dashBtn  "
        }
        onClick={() => {
          navigate("/Dashboard/MyMemberShipClubs");
        }}
      >
        <i className="fa-regular LightText-1 dashCardIcon fa-address-card"></i>&nbsp; <span className="dashCardText bold-5 LightText-1"> My Membership Club</span>
      </button>
      <button
        className={
          location.pathname == "/Dashboard/MyAccount"
            ? "dashBtn btn-active"
            : "dashBtn  "
        }
        onClick={() => {
          navigate("/Dashboard/MyAccount");
        }}
      >
        <i className="fa-regular fa-user LightText-1 dashCardIcon"></i> &nbsp;
        <span className="dashCardText LightText-1 bold-5"> My Account</span>
      </button>
      <button
        className="dashBtn"
        onClick={() => {
          navigate("/Login");
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
