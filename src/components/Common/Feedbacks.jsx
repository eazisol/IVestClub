import React from "react";
import quotationimg from "../../assets/image/quotationimg.png";
import avatar from "../../assets/image/avatar.png";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import { LinearProgress } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export const Quotations = ({ text, by }) => {
  return (
    <div className="d-flex p-3 mt-3" style={{ backgroundColor: "#F5F8FF" }}>
      <div className="col-2">
        <img src={quotationimg} alt="" className="" />
      </div>
      <div className="col-10 px-1">
        <p className=" text-basic text-black mb-0" 
       
        >
          <>{text}</>
        </p>
        <p className="text-basic text-secondary mb-0 mt-2">- <i>{by}</i></p>
      </div>
    </div>
  );
};

export const Ratings = ({ text, heading,value,profilePic, date }) => {
  return (
    <div className="d-flex pl-0">
      <div className="col-2 text-center p-0">
        {profilePic ? 
        <img
          src={profilePic}
          alt=""
          className=""
          style={{ borderRadius: "500px", height : "50px", width : "50px" }}
        />:<>
         <AccountCircleOutlinedIcon
                sx={{ color: "#ccc", fontSize: 50 }}
              /></>}
      </div>
      <div className="col-10 ">
        <Rating
          name="text-feedback"
          value={value||0}
          readOnly
          precision={0.5}
          icon={<StarIcon sx={{ fontSize: 20, color: "gold" }} />}
          emptyIcon={<StarBorder sx={{ fontSize: 20, color: "gold" }} />}
        />
        <p className=" text-basic text-dark mb-0">
          <strong className="bold-5">{heading}</strong>
        </p>
        {text.map((line, index) => (
          <p style={{fontSize:"11px"}}  className="mb-0 LightText Opacity" key={index}>
            {line}
          </p>
        ))}
        <p style={{fontSize:"10px"}}  className="mb-0 LightText Opacity" >
            {date}
          </p>
      </div>
    </div>
  );
};
export const Privaterating = ({ text, heading,value,profilePic,date,index}) => {
  return (
    <div className="d-flex pl-0">
      <div className={`col-0  p-0 `}>
        {profilePic ? 
        <img
          src={profilePic}
          alt=""
          className=""
          style={{ borderRadius: "500px", height : "50px", width : "50px" }}
        />:<>
         <AccountCircleOutlinedIcon
                sx={{ color: "#ccc", fontSize: 50 }}
              /></>}
      </div>
      <div className={`${'col-11'}`}>
      
        <p className=" text-basic text-dark mb-0">
          <strong className="bold-5">{heading}</strong>
        </p>
       
          <p style={{fontSize:"11px"}}  className="mb-0 LightText Opacity" key={index}>
            {value}
          </p>
      
        <p style={{fontSize:"10px"}}  className="mb-0 LightText Opacity" >
            {date}
          </p>
      </div>
    </div>
  );
};

export const RatingsTotal = ({ text, heading }) => {
  return (
    <div
      className="row p-3 "
      style={{ backgroundColor: "#F1F5FF", borderRadius: "5px" }}
    >
      <div
        className="col-xl-4 col-12 text-center bg-white py-5 mb-3 mb-xl-0"
        style={{ borderRadius: "5px" }}
      >
        <h4 className="mont-font bold-5">4.0</h4>
        <Rating name="text-feedback" value={4} readOnly precision={0.5} />
        <h6 className="text-sm tex-dark Opacity mt-2">234 Ratings</h6>
      </div>
      <div className="col-xl-8 col-12 row align-items-center ">
        {[
          { progress: 60, amount: 110, rating : 5 },
          { progress: 50, amount: 80 , rating : 4},
          { progress: 0, amount: 0 , rating : 3},
          { progress: 10, amount: 20 , rating : 2},
          { progress: 0, amount: 0 , rating : 1},
        ].map((item, index) => (
          <React.Fragment key={index}>
            {" "}
            <h6 className="mb-0 d-flex col-2 text-md align-items-center">
              {item.rating} <StarIcon style={{ color: "#FAAF00" }} />
            </h6>
            <div className="progress col-9 p-0">
              <div
                className={`progress-bar `}
                style={{
                  width: `${item.progress}%`,
                  height: "5px",
                  borderRadius: "4px",
                  backgroundColor: "#FAAF00",
                }}
                role="progressbar"
              ></div>
            </div>
            <div className="col-1 p-0 pl-1">
              <h6 className="text-md">{item.amount}</h6>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
