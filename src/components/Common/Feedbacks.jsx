import React from "react";
import quotationimg from "../../assets/image/quotationimg.png";
import avatar from "../../assets/image/avatar.png";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { LinearProgress } from "@mui/material";
export const Quotations = ({ text, by }) => {
  return (
    <div className="d-flex p-3 " style={{ backgroundColor: "#F5F8FF" }}>
      <div className="col-2">
        <img src={quotationimg} alt="" className="" />
      </div>
      <div className="col-10 px-1">
        <p className=" text-basic text-black mb-0" 
       
        >
          <strong>{text}</strong>
        </p>
        <p className="text-basic text-secondary mb-0">- <i>{by}</i></p>
      </div>
    </div>
  );
};

export const Ratings = ({ text, heading }) => {
  return (
    <div className="d-flex pl-0">
      <div className="col-2 text-center p-0">
        <img
          src={avatar}
          alt=""
          className=""
          style={{ borderRadius: "500px" }}
        />
      </div>
      <div className="col-10 pl-0">
        <Rating
          name="text-feedback"
          value={5}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55, fontSize: 1 }} />}
        />
        <p className=" text-basic text-dark mb-0">
          <strong className="bold-5">{heading}</strong>
        </p>
        {text.map((line, index) => (
          <p style={{fontSize:"11px"}}  className="mb-0 LightText Opacity" key={index}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};
export const RatingsTotal = ({ text, heading }) => {
  return (
    <div
      className="d-flex p-3 "
      style={{ backgroundColor: "#F1F5FF", borderRadius: "5px" }}
    >
      <div
        className="col-4 text-center bg-white py-5"
        style={{ borderRadius: "5px" }}
      >
        <h4 className="mont-font bold-5">4.0</h4>
        <Rating name="text-feedback" value={4} readOnly precision={0.5} />
        <h6 className="text-sm tex-dark Opacity mt-2">234 Ratings</h6>
      </div>
      <div className="col-8 row align-items-center">
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
