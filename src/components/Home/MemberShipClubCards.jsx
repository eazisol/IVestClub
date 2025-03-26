import React from "react";
import { useNavigate } from "react-router-dom";
import { imgUrl } from "../../../apiConfig";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import VectorIcon from "../../assets/image/icons/vector.png";
import useApi from "../Hooks/useApi";
import { appData } from "../Context/AppContext";
import { decryptNumber } from "../Common/Utills";

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
}) => {
  const navigate = useNavigate();
  const { mutate: joinMembership } = useApi();
  const { mutate: checkTokens } = useApi();
  const { userData, setSnackBarData } = appData();

  const handleMembershipJoin = () => {
    // If user is not logged in, navigate to dashboard or login
    if (!userData?.access_token) {
      navigate('/Dashboard');
      return;
    }

    // First, check if user has required tokens
    checkTokens(
      {
        url: `user-has-club-token`,
        method: "POST",
        sendHeaders: true,
        data: { 
          user_id: userData.user_id, 
          membership_club_id: (decryptNumber(id)/1)
        },
      },
      {
        onSuccess: (tokenData) => {
          if (tokenData?.has_club_token) {
            // If user has tokens, proceed to join the membership
            joinMembership(
              {
                url: `membershipclub/joining/${(decryptNumber(id)/1)}`,
                method: "GET",
                sendHeaders: true,
              },
              {
                onSuccess: (joinData) => {
                  // Successfully joined the membership
                  setSnackBarData({
                    visibility: true,
                    error: "success",
                    text: "Successfully joined the membership club",
                  });
                  
                  // Navigate to private membership page
                  navigate(`/Membership/Private?id=${id}`);
                },
                onError: (joinError) => {
                  console.error("Membership joining error", joinError);
                  setSnackBarData({
                    visibility: true,
                    error: "error",
                    text: "Failed to join membership club",
                  });
                }
              }
            );
          } else {
            // If user doesn't have tokens, show error snackbar
            setSnackBarData({
              visibility: true,
              error: "error",
              text: "You don't have required tokens to join this membership club",
            });
          }
        },
        onError: (tokenError) => {
          console.error("Token check error", tokenError);
          setSnackBarData({
            visibility: true,
            error: "error",
            text: "An error occurred while checking membership eligibility",
          });
        }
      }
    );
  };

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
              {/* <div className="d-flex align-items-center">
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
              </div> */}
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
                <img src={VectorIcon} alt="IVT Icon" style={{ width: 12, height: 12 }} />
                </div>
                <h6 className="mb-0 text-basic text-dark">
                  {" "}
                  <div className="bitCoinText  LightText">
                    {price ? price : "Price vs IVC"}
                  </div>{" "}
                </h6>
              </div>
              <div
                style={{
                  textDecoration: "underline",
                  fontSize: "14px",
                  color: "#150D30",
                }}
              >
                <span className="bold-5 pop-font">
                      {joined ? "Joined" : "Join Now"}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (viewStyle === "list") {
    return (
      <div
        className={`col-lg-12 col-md-12 mb-4 col-sm-12 px-3 cursor-pointer`}
        onClick={handleMembershipJoin}
      >
        <div className="card pb-1 p-3 " style={{ height: "15em" }}>
          <div className="row">
            <div className="col-3">
              {staticImg ? (
                <img
                  src={image}
                  className=""
                  alt="..."
                  style={{ height: "200px", objectFit: "cover", width: "100%" }}
                />
              ) : (
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
                      <img src={VectorIcon} alt="IVT Icon" style={{ width: 12, height: 12 }} />
                    </div>
                    <h6 className="mb-0 text-basic text-dark">
                      {" "}
                      <div className="bitCoinText  LightText">
                        {price ? price : "Price vs IVC"}
                      </div>{" "}
                    </h6>
                  </div>
                  <div
                    style={{
                      textDecoration: "underline",
                      fontSize: "14px",
                      color: "#150D30",
                    }}
                  >
                    <span className="bold-5 pop-font">
                      {joined ? "Joined" : "Join Now"}{" "}
                    </span>
                  </div>
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