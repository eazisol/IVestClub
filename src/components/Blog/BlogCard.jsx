import React from "react";
import ivctoken from "../../assets/image/ivctoken.png";
import logo from "../../assets/image/icons/cardicon.png";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import { useNavigate, NavLink } from "react-router-dom";
import { imgUrl } from "../../../apiConfig";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { timeAgo } from "../Common/Utills";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
const BlogCard = ({ text, heading, to, image, time }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`col-lg-12 col-md-12 mb-4 col-sm-12 px-3 cursor-pointer `}
      onClick={() => {
        navigate(to);
      }}
    >
      <div className="card pb-1 p-3 " style={{ height: "15em" }}>
        <div className="row ">
          <div className="col-3">
            <>
              {image ? (
                <img
                  src={imgUrl + image}
                  className=""
                  alt="..."
                  style={{ height: "200px", objectFit: "cover", width: "100%" }}
                />
              ) : (
                <div className="text-center">
                  <ImageOutlinedIcon sx={{ fontSize: 200, color: "#ccc" }} />
                </div>
              )}
            </>
          </div>
          <div className="col-9 d-flex flex-column justify-content-between">
            <div className="row pl-0">
              <h4 className="text-black mt-2 ">
                <div className="">{heading}</div>
              </h4>
              <div className="w-100 d-flex ">
                <p className="card-text-list  DarkText ">{text}</p>
              </div>
            </div>
            <div className="row justify-content-between">
              <NavLink
                to={to}
                style={{
                  textDecoration: "underline",
                  fontSize: "14px",
                  color: "#150D30",
                }}
              >
                <span className="bold-5 pop-font">View More</span>
              </NavLink>
              <span className="text-basic align-items-center"><AccessTimeOutlinedIcon />{timeAgo(time)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
