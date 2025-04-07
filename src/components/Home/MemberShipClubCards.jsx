import React from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl, imgUrl } from "../../../apiConfig";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import VectorIcon from "../../assets/image/icons/vector.png";
import useApi from "../Hooks/useApi";
import { appData } from "../Context/AppContext";
import { decryptNumber } from "../Common/Utills";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { use } from "react";
import { useEffect,useState } from "react";
import axios from "axios";
// 🔑 Auto Join Logic
const walletData = JSON.parse(localStorage.getItem("walletData"));

// const tokenDataObj = JSON.parse(localStorage.getItem("tokenData"));
const tokenHoldings = JSON.parse(localStorage.getItem("tokenHoldings"));
// const tokenDataObj=selectToken


const MemberShipClubCards = ({
  text,
  heading,
  id,
  image,
  col = 4,
  price,
  joined,
  members = 0,
  rating = 0,
  staticImg = false,
  viewStyle = "grid",
  symbol,
  to, // 👈 optional prop for custom route
  isSuggestCard = false, // 👈 identifies this is the special card
}) => {
  const navigate = useNavigate();
  const { mutate: joinMembership } = useApi();
  const { mutate: checkTokens } = useApi();
  const { userData, setSnackBarData,userHoldings } = appData();
const [tokenDataObj,setTokenDataList]=useState('')
const isAutoJoined = (clubId) => {
  if (
    !walletData?.address  ||
    !tokenDataObj?.data ||
    !Array.isArray(tokenDataObj.data) ||
    userHoldings.length<=0
  ) {
    return false;
  }

  const tokensForClub = tokenDataObj.data.filter(
    (token) => token.membershipclub_id === decryptNumber(clubId) / 1
  );

  for (const token of tokensForClub) {
    const holding = userHoldings.find(
      (h) => h.symbol.toLowerCase() === token.symbol.toLowerCase()
    );

    if (holding && parseFloat(holding.balance) > 0) {
      return true;
    }
  }

  return false;
};
  // const autoJoined = isAutoJoined(id);
  const autoJoined = !isSuggestCard && isAutoJoined(id);
 // Fetch token data and set the first token as the selected token
 const handleTokenApi = async () => {
  const { data } = await axios.get(`${baseUrl}token/getAllTokenData`);
  setTokenDataList(data);


};
useEffect(()=>{
  handleTokenApi()
},[])
  const handleMembershipJoin = () => {

    if (isSuggestCard) {
      navigate(to); // `to` is the route passed (e.g. /Membership/FutureClubs)
      return;
    }


   
    if (!userData?.access_token) {
      navigate(`/Membership/Public?id=${id}`);
      return;
    }

    if (joined || autoJoined) {
      navigate(`/Membership/Private?id=${id}`);
      return;
    } else {
      navigate(`/Membership/Public?id=${id}`);
      return;
    }

  //   checkTokens(
  //     {
  //       url: `user-has-club-token`,
  //       method: "POST",
  //       sendHeaders: true,
  //       data: {
  //         user_id: userData.user_id,
  //         membership_club_id: decryptNumber(id) / 1
  //       },
  //     },
  //     {
  //       onSuccess: (tokenData) => {
  //         if (tokenData?.has_club_token) {
  //           joinMembership(
  //             {
  //               url: `membershipclub/joining/${decryptNumber(id) / 1}`,
  //               method: "GET",
  //               sendHeaders: true,
  //             },
  //             {
  //               onSuccess: () => {
  //                 setSnackBarData({
  //                   visibility: true,
  //                   error: "success",
  //                   text: "Successfully joined the membership club",
  //                 });
  //                 navigate(`/Membership/Private?id=${id}`);
  //               },
  //               onError: () => {
  //                 setSnackBarData({
  //                   visibility: true,
  //                   error: "error",
  //                   text: "Failed to join membership club",
  //                 });
  //               },
  //             }
  //           );
  //         } else {
  //           setSnackBarData({
  //             visibility: true,
  //             error: "error",
  //             text: "You don't have required token transactions to join this membership club",
  //           });
  //           setTimeout(() => {
  //             navigate(`/Membership/Public?id=${id}`);
  //           }, 1500);
  //         }
  //       },
  //       onError: () => {
  //         setSnackBarData({
  //           visibility: true,
  //           error: "error",
  //           text: "Cant check membership eligibility of club with no token associated",
  //         });
  //         setTimeout(() => {
  //           navigate(`/Membership/Public?id=${id}`);
  //         }, 1500);
  //       },
  //     }
  //   );
  };
  const displayJoinStatus = joined || autoJoined ? "Joined" : "Join Now";

  // 🔳 Grid View
  if (viewStyle === "grid") {
    return (
      <div
        className={`col-lg-${col} col-md-12 mb-4 col-sm-12 px-3 cursor-pointer`}
        onClick={handleMembershipJoin}
      >
        <div className="card pb-1 p-3" style={{ height: "30em" }}>
          {staticImg ? (
            <img
              src={image}
              className="card-img-top"
              alt="..."
              style={{ height: "200px", objectFit: "cover" }}
            />
          ) : image ? (
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

          <div className="card-body pb-0 px-0">
            <div className="row pl-0">
              <h6 className="text-black mt-2 ">{heading}</h6>
              <div className="w-100 d-flex ">
                <p className="card-text DarkText">{text}</p>
              </div>
            </div>
          </div>

          <div className="card-footer border-0 bg-white px-0">
            <div className="w-100 d-flex justify-content-between align-items-center">
              {!isSuggestCard && (
                <div>
                <PeopleAltOutlinedIcon sx={{ color: "#ccc", fontSize: 19 }} />
                <span className="iconText pop-font"> {members}</span>
              </div>
              )}
              
            </div>

            <div
              className="w-100 d-flex justify-content-between align-items-center mt-2 pt-2"
              style={{ borderTop: "1px solid #ccc" }}
            >
              {!isSuggestCard && (
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex align-items-center mr-2"
                      style={{
                        padding: 3,
                        backgroundColor: "rgba(72,72,72)",
                        borderRadius: "30px",
                      }}
                    >
                      <img src={VectorIcon} alt="IVT Icon" style={{ width: 12, height: 12 }} />
                    </div>
                    <h6 className="mb-0 text-basic text-dark bitCoinText LightText">
                      {price ? price + `  ${symbol ? symbol : ''}` : "Price vs IVT"}
                    </h6>
                  </div>
                )}

              {isSuggestCard ? (
                  <div className="w-100 d-flex justify-content-center align-items-center bold-5 pop-font"   style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#150D30",
                    textDecoration: "underline",
                  }}>
                  
                      Suggest Now
                   
                  </div>
                ) : (
                  <div
                    style={{
                      textDecoration: "underline",
                      fontSize: "14px",
                      color: "#150D30",
                    }}
                  >
                    <span className="bold-5 pop-font">{displayJoinStatus}</span>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 📋 List View
  if (viewStyle === "list") {
    return (
      <div
        className={`col-lg-12 col-md-12 mb-4 col-sm-12 px-3 cursor-pointer`}
        onClick={handleMembershipJoin}
      >
        <div className="card pb-1 p-3" style={{ height: "15em" }}>
          <div className="row">
            <div className="col-3">
              {staticImg ? (
                <img
                  src={image}
                  alt="..."
                  style={{ height: "200px", objectFit: "cover", width: "100%" }}
                />
              ) : image ? (
                <img
                  src={imgUrl + image}
                  alt="..."
                  style={{ height: "200px", objectFit: "cover", width: "100%" }}
                />
              ) : (
                <div className="text-center">
                  <ImageOutlinedIcon sx={{ fontSize: 200, color: "#ccc" }} />
                </div>
              )}
            </div>

            <div className="col-9 d-flex flex-column justify-content-between">
              <div>
                <h4 className="text-black mt-2">{heading}</h4>
                <p className="card-text-list DarkText">{text}</p>
              </div>

              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <PeopleAltOutlinedIcon sx={{ color: "#ccc", fontSize: 19 }} />
                    <span className="iconText pop-font"> {members}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Rating
                      name="text-feedback"
                      value={rating}
                      readOnly
                      precision={0.5}
                      emptyIcon={<StarIcon style={{ opacity: 0.55, fontSize: 15 }} />}
                      icon={<StarIcon style={{ opacity: 1, fontSize: 15 }} />}
                    />
                    <p className="mb-0 text-basic">
                      <span className="iconText pop-font"> ({rating?.toFixed(2)})</span>
                    </p>
                  </div>
                </div>

                <div
                  className="w-100 d-flex justify-content-between align-items-center mt-2 pt-2"
                  style={{ borderTop: "1px solid #ccc" }}
                >
                  {!isSuggestCard && (
                      <div className="d-flex align-items-center">
                        <div
                          className="d-flex align-items-center mr-2"
                          style={{
                            padding: 3,
                            backgroundColor: "rgba(72,72,72)",
                            borderRadius: "30px",
                          }}
                        >
                          <img src={VectorIcon} alt="IVT Icon" style={{ width: 12, height: 12 }} />
                        </div>
                        <h6 className="mb-0 text-basic text-dark bitCoinText LightText">
                          {price ? price + `  ${symbol ? symbol : ''}` : "Price vs IVT"}
                        </h6>
                      </div>
                    )}

                  {isSuggestCard ? (
                    <div className="w-100 d-flex justify-content-center align-items-center mt-3">
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#150D30",
                          textDecoration: "underline",
                        }}
                      >
                        Suggest Now
                      </span>
                    </div>
                  ) : (
                    <div
                      style={{
                        textDecoration: "underline",
                        fontSize: "14px",
                        color: "#150D30",
                      }}
                    >
                      <span className="bold-5 pop-font">{displayJoinStatus}</span>
                    </div>
                  )}

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
