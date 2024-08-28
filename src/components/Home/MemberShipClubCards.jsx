import React from "react";
import ivctoken from "../../assets/image/ivctoken.png";
import logo from "../../assets/image/icons/cardicon.png";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import { useNavigate, NavLink } from "react-router-dom";

const MemberShipClubCards = ({ text, heading, to, image, col = 4 }) => {
  const navigate = useNavigate();

  return (
    <div className={`col-md-${col} col-sm-12 p-2 ExclusiveAccessCard`}>
      <div
        className="card  p-3 "
        style={{ position: "relative", height: "30em", width : "22em" }}
      >
        <img src={image} className="card-img-top" alt="..." />

        <div className="card-body pb-0 px-0">
          <div className="row pl-0">
            <h6 className="text-black mt-2 ">
              <div className="bold-6">{heading}</div>
            </h6>
            <div className="w-100 d-flex ">
              <p className="card-text  DarkText ">{text}</p>
            </div>
          </div>
        </div>
        <div className="card-footer border-0 bg-white px-0">
          <div className="w-100 d-flex justify-content-between align-items-center">
            <div className="">
              <PeopleAltOutlinedIcon sx={{ color: "#ccc", fontSize: 19 }} />
              <span className="iconText pop-font"> 250</span>
            </div>
            <div className="d-flex align-items-center">
              <Rating
                name="text-feedback"
                value={5}
                readOnly
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55, fontSize: 15 }} />}
                icon={<StarIcon style={{ opacity: 1, fontSize: 15 }} />}
              />
              <p className="mb-0 text-basic">
                {" "}
                <span className="iconText pop-font"> (???)</span>
              </p>
            </div>
          </div>

          <div
            className="w-100 d-flex justify-content-between align-items-center mt-2 pt-2"
            style={{ borderTop: "1px solid #ccc" }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div
                className=" d-flex justify-content-between align-items-center mr-2"
                style={{
                  padding: 5,
                  backgroundColor: "rgba(72,72,72)",
                  borderRadius: "30px",
                 
                }}
              >
                <CurrencyBitcoinOutlinedIcon
                  sx={{ color: "#fff", fontSize: 14 }}
                />
              </div>
              <h6 className="mb-0 text-basic text-dark"> <div className="bitCoinText bold-6 LightText">Price vs IVC</div> </h6>
            </div>
            <NavLink to={to} style={{ textDecoration: "underline", fontSize : "14px" ,color:"#150D30"}}>
           <span className="bold-5 pop-font"> Join Now </span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberShipClubCards;
