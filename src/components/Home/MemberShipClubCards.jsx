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
import VectorIcon from "../../assets/image/icons/vector.png";
const MemberShipClubCards = ({
  text,
  heading,
  to,
  image,
  col = 4,
  price,
  joined,
  members = 0,
  rating = 0,
  staticImg = false,
  viewStyle = "grid",
}) => {
  const navigate = useNavigate();
  if (viewStyle == "grid") {
    return (
      <div
        className={`col-lg-${col} col-md-12 mb-4 col-sm-12 px-3 cursor-pointer `}
        onClick={() => {
          navigate(to);
        }}
      >
        <div className="card pb-1 p-3 " style={{ height: "30em" }}>
          {staticImg ? (
            <img
              src={image}
              className="card-img-top"
              alt="..."
              style={{ height: "200px", objectFit: "cover" }}
            />
          ) : (
            <>
              {image ? (
                <img
                  src={imgUrl + image}
                  className="card-img-top"
                  alt="..."
                  style={{ height: "200px", objectFit: "cover" }}
                />
              ) : (
                <div className="text-center">
                  <ImageOutlinedIcon sx={{ fontSize: 200, color: "#ccc" }} />
                </div>
              )}
            </>
          )}

          <div className="card-body pb-0 px-0">
            <div className="row pl-0">
              <h6 className="text-black mt-2 ">
                <div className="">{heading}</div>
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
                <span className="iconText pop-font"> {members}</span>
              </div>
              <div className="d-flex align-items-center">
                <Rating
                  name="text-feedback"
                  value={rating}
                  readOnly
                  precision={0.5}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55, fontSize: 15 }} />
                  }
                  icon={<StarIcon style={{ opacity: 1, fontSize: 15 }} />}
                />
                <p className="mb-0 text-basic">
                  {" "}
                  <span className="iconText pop-font"> ({rating?.toFixed(2)})</span>
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
                    padding: 3,
                    backgroundColor: "rgba(72,72,72)",
                    borderRadius: "30px",
                  }}
                >
                  {/* <CurrencyBitcoinOutlinedIcon
                    sx={{ color: "#fff", fontSize: 12 }}
                  /> */}
                  <img src={VectorIcon} alt="IVT Icon" style={{ width: 12, height: 12 }} />
                </div>
                <h6 className="mb-0 text-basic text-dark">
                  {" "}
                  <div className="bitCoinText  LightText">
                    {price ? price : "Price vs IVC"}
                  </div>{" "}
                </h6>
              </div>
              <NavLink
                to={to}
                style={{
                  textDecoration: "underline",
                  fontSize: "14px",
                  color: "#150D30",
                }}
              >
                <span className="bold-5 pop-font">
                  {joined ? "Joined" : "Join Now"}{" "}
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (viewStyle == "list") {
    return (
      <div
        className={`col-lg-12 col-md-12 mb-4 col-sm-12 px-3 cursor-pointer `}
        onClick={() => {
          navigate(to);
        }}
      >
        <div className="card pb-1 p-3 " style={{ height: "15em" }}>
          <div className="row">
            <div className="col-3">
              {staticImg ? (
                <img
                  src={image}
                  className=""
                  alt="..."
                  style={{ height: "200px", objectFit: "cover",width: "100%", }}
                />
              ) : (
                <>
                  {image ? (
                    <img
                      src={imgUrl + image}
                      className=""
                      alt="..."
                      style={{ height: "200px", objectFit: "cover",width: "100%", }}
                    />
                  ) : (
                    <div className="text-center">
                      <ImageOutlinedIcon
                        sx={{ fontSize: 200, color: "#ccc" }}
                      />
                    </div>
                  )}
                </>
              )}
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
              <div className="">
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <div className="">
                    <PeopleAltOutlinedIcon
                      sx={{ color: "#ccc", fontSize: 19 }}
                    />
                    <span className="iconText pop-font"> {members}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Rating
                      name="text-feedback"
                      value={rating}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon style={{ opacity: 0.55, fontSize: 15 }} />
                      }
                      icon={<StarIcon style={{ opacity: 1, fontSize: 15 }} />}
                    />
                    <p className="mb-0 text-basic">
                      {" "}
                      <span className="iconText pop-font"> ({rating?.toFixed(2)})</span>
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
                        padding: 3,
                        backgroundColor: "rgba(72,72,72)",
                        borderRadius: "30px",
                      }}
                    >
                      <CurrencyBitcoinOutlinedIcon
                        sx={{ color: "#fff", fontSize: 12 }}
                      />
                    </div>
                    <h6 className="mb-0 text-basic text-dark">
                      {" "}
                      <div className="bitCoinText  LightText">
                        {price ? price : "Price vs IVC"}
                      </div>{" "}
                    </h6>
                  </div>
                  <NavLink
                    to={to}
                    style={{
                      textDecoration: "underline",
                      fontSize: "14px",
                      color: "#150D30",
                    }}
                  >
                    <span className="bold-5 pop-font">
                      {joined ? "Joined" : "Join Now"}{" "}
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MemberShipClubCards;
