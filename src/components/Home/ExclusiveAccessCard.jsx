import React from "react";
import ivctoken from "../../assets/image/ivctoken.png";
import logo from "../../assets/image/icons/cardicon.png";
import { NavLink } from "react-router-dom";
const ExclusiveAccessCard = ({ text, heading, linkText, image, to }) => {
  return (
    <div  className="col-lg-4 col-md-4 col-sm-6 ExclusiveAccessCard px-0 mx-0">
      <div
        className="card  m-2 p-3"
        style={{ position: "relative", height: "90%", width: "92%" }}
      >
        <img src={image} className="card-img-top" alt="..." />
        <img
          src={logo}
          className="img-fluid logoPic"
          style={{
            width: "80px",
            height: "80px",
            position: "absolute",
            top: "35%",
            left: "38%",
          }}
        />
        <div className="card-body">
          <div className="row text-center justify-content-center ">
           <div className="d-flex flex-column">
            <h5 className="text-black mt-4 pt-3 pb-2">
              <div className="mont-font card-head-text">{heading}</div>
            </h5>
            <div className="w-100  d-flex justify-content-center mb-0">
              <p className="text-basic w-100 card-body-text">{text}</p>
            </div>
            <NavLink to={to} style={{ textDecoration: "underline" }}>
             <div className="mt-5 pb-4 pop-font card-body-link"> {linkText} </div>
            </NavLink>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ExclusiveAccessCard;
