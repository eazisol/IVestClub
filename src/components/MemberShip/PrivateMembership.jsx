import React, { useEffect, useState } from "react";
import { SactionContainer } from "../Common/Containers";
import SideBarMembership from "./SideBarMembership";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import avatar from "../../assets/image/avatar.png";
import spaceximg1 from "../../assets/image/spaceximg1.png";
import spaceximg2 from "../../assets/image/spaceximg2.png";
import openaiimg3 from "../../assets/image/openaiimg3.png";
import { Quotations, Ratings, RatingsTotal } from "../Common/Feedbacks";
import { NavLink } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import { OutlinedButtonDark } from "../Common/Buttons";
import useApi from "../Hooks/useApi";
import { decryptNumber, formatdateHeading } from "../Common/Utills";
import { imgUrl } from "../../../apiConfig";
import { CustomizedLoader } from "../Common/MiniComponents";
import { appData } from "../Context/AppContext";
import { InputAdornment } from "@mui/material";
import WidgetBot from "@widgetbot/react-embed";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { TextField, Button } from "@mui/material";
const PrivateMembership = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const idParam = queryParams.get("id");
  const { setSnackBarData } = appData();
  const { mutate: getData, isPending: isMembershipLoading, error } = useApi();
  const { mutate: sendReview, isPending: isSendingReview } = useApi();
  const [data, setData] = useState({});
  const [ratingData, setRatingData] = useState({ comment: "" });
  const [commentLimit, setCommentLimit] = useState(3);
  const { mutate: getProfileData, isPending: isProfileLoading } = useApi();
  const { mutate: discordJoin, isPending: isdiscordLoading } = useApi();
    const [profiledata, setProfileData] = useState({});
    const [discordId, setDiscordId] = useState("");
   

  const getMembershipData = () => {
    getData(
      {
        url: `membershipclub/details/${decryptNumber(idParam)}`,
        method: "GET",
        sendHeaders: true,
      },
      {
        onSuccess: (data) => {
          console.log("get data", data);
          setData(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };
  useEffect(() => {
    getMembershipData();
    console.log(
      "import.meta.env.VITE_APP_API_IMG_URL",
      import.meta.env.VITE_APP_DISCORD_SERVER_ID
    );
  }, []);
  const handleJoin = () => {
    window.open("https://discord.gg/MfXhJasq4W", "_blank"); // Open link immediately
  
    const postData = {
      discord_userid: profiledata?.discord_userid?profiledata?.discord_userid:discordId,
      user_id: profiledata?.id,
      membership_club_id: decryptNumber(idParam),
    };
  
    discordJoin(
      {
        url: "add-user-discord-id",
        method: "POST",
        data: postData,
        sendHeaders: true,
      },
      {
        onSuccess: (data) => {
        setDiscordId("");
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };
  
 useEffect(() => {
  getProfileData(
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
  // useEffect(() => {
  //   console.log("ratingData",ratingData);

  // }, [ratingData])

  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const hanadleSendReview = () => {
    setCommentSubmitted(true);
    if (!ratingData.comment) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Please enter comment",
      });
      return;
    }
    if (ratingData.comment == "") {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Please enter comment",
      });
      return;
    }
    sendReview(
      {
        url: `membershipclub/comment/save/${decryptNumber(idParam)}`,
        method: "POST",
        data: ratingData,
        sendHeaders: true,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          setRatingData({});

          setSnackBarData({
            visibility: true,
            // error: "info",
            text: "Successfully Sent Review",
          });
          setCommentSubmitted(false);
          getMembershipData();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  if (isMembershipLoading) {
    return <CustomizedLoader />;
  } else {
    return (
      <SactionContainer bgColor="#F5F8FF" container={false}>
        <div className="col-md-8  col-sm-12 extraMg pt-5 mb-5 pb-5 px-1 px-xl-4">
          <div className="card card-border-c ">
            <div className="card-body p-2 px-xl-5 pt-xl-4">
              <h3 className="mb-3 px-1 pt-3">
                <strong>{data.title}</strong>
              </h3>

              <div className="d-flex align-items-center mb-3 ">
                <p className="text-basic  mb-0 ml-1 Opacity">
                  {" "}
                  Admin:{" "}
                  <strong className="DarkText bold-5">
                    {data.username}
                  </strong>{" "}
                  <span>&#8226;</span>
                </p>
                <CalendarTodayOutlinedIcon
                  sx={{ color: "#888", ml: 1, fontSize: "15px" }}
                />
                <p className="text-basic  mb-0 ml-1 Opacity">
                  {" "}
                  {formatdateHeading(data.updated_at)} <span>&#8226;</span>{" "}
                </p>{" "}
                <GroupsOutlinedIcon
                  sx={{ color: "#888", ml: 1, fontSize: "25px" }}
                />
                <p className="text-basic mb-0 ml-1 Opacity">
                  {" "}
                  {data.members} Members{" "}
                </p>{" "}
              </div>

              <img
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "auto",
                  borderRadius: "15px",
                }}
                src={imgUrl + data.img}
                alt=""
                className=" mt-2 mb-3"
              />
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
          </div>
          <div className="card card-border-c mt-4">
            <div className="card-body p-2 p-xl-5">
              <h5 className="text-dark mont-font">
                <strong>{data.VideoTitle}</strong>
              </h5>
              <div dangerouslySetInnerHTML={{ __html: data.privateYTembed }} />
            </div>
          </div>
          <div className="card card-border-c mt-4">
            <div className="card-body p-2 p-xl-5">
              <h5 className="text-dark mont-font">
                <strong>ChatGPT Box Here</strong>
              </h5>

              {[
                "Ask ChatGPT a question abut the company?",
                "Suggested questions list here.",
                "Nam libero justo laoreet sit amet.",
                "Tempus imperdiet nulla malesuada",
                "eque sodales ut etiam sit amet nisl",
                "Tristique nulla aliquet enim tortor at auctor",
                "Nam libero justo laoreet sit amet.",
                "Tempus imperdiet nulla malesuada",
              ].map((text, index) => (
                <div
                  className="d-flex mt-3 align-align-items-center"
                  key={index}
                >
                  <div className="col-1 pl-0">
                    <h4 className="text-warning warning-bullet mb-0">{">"}</h4>
                  </div>
                  <div className="col-11 pl-0">
                    <h6 className="mb-0 h5-sm bold-5 mont-font">{text}</h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card card-border-c mt-3">
            <div className="card-body p-2 p-xl-5">
              <div className="d-flex align-items-center justify-content-between pb-2">
                <h5 className="text-dark mont-font mb-0">
                  <strong>{data.title} Discussion Channel</strong>
                </h5>

              <div className="d-flex align-items-center">
  {/* !profiledata?.discord_userid && */}
  {( 
    <TextField
      variant="outlined"
      size="small"
      onChange={(e) => setDiscordId(e.target.value)}
      sx={{
        width: "200px",
        height: "36px",
        marginRight: "5px",
        marginLeft: "5px",
        borderRadius: "50px", // Rounded corners
        backgroundColor: "white", // Match Bootstrap input
        "& .MuiOutlinedInput-root": {
          borderRadius: "50px", // Rounded corners
          height: "36px",
          paddingLeft: "12px", // Inner left padding
          "& fieldset": {
            border: "1px solid #ccc", // Border color
          },
          "&:hover fieldset": {
            borderColor: "#aaa", // Slightly darker on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "#007bff", // Focus color
          },
        },
        "& input": {
          fontSize: "14px", // Input text size
          paddingLeft: "2px", // Ensure text starts from left
          textAlign: "left",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Tooltip
              title={
                <div style={{ fontSize: "12px", padding: "1px" }}>
                  • Go to User Settings (gear icon near your username). <br />
                  • Scroll to Advanced under App Settings. <br />
                  • Enable Developer Mode. <br />
                  • Click on your username. <br />
                  • Click on Copy User ID. <br />
                  • Paste the User ID below.
                </div>
              }
              arrow
            >
              <InfoOutlinedIcon
                sx={{ color: "gray", cursor: "pointer", fontSize: 20 }}
              />
            </Tooltip>
          </InputAdornment>
        ),
      }}
      placeholder="Enter your Discord ID"
    />
  )}
                  <Button
                    disabled={!discordId }
                    onClick={handleJoin}
                    variant="contained"
                    sx={{
                      borderRadius: "50px",
                      padding: "6px 20px",
                      textTransform: "none",
                      fontSize: "14px",
                      backgroundColor: "#3A407B",
                    
                    
                    }}
                  >
                    Join
                  </Button>

                </div>
              </div>
              {/* <div dangerouslySetInnerHTML={{ __html: data.discordwidget }} /> */}
              <WidgetBot
                server={import.meta.env.VITE_APP_DISCORD_SERVER_ID}
                width={"100%"} // Set the width (default: 100%)
                height={500} // Set the height (default: 500px)
              />
            </div>
          </div>
          <div className="card card-border-c mt-3 ">
            <div className="card-body p-2 p-xl-4">
              <h5 className=" text-dark mont-font mt-4">
                <>Learn About Different Aspects Of IVestClub Technologies</>
              </h5>
              <div className="">
                {/* <RatingsTotal /> */}
                <div className="mt-3">
                  {data?.commentlist
                    ?.slice(0, commentLimit)
                    ?.map((comment, index) => (
                      <React.Fragment key={{ index }}>
                        <Ratings
                          heading={comment.user.username}
                          text={[comment.comment]}
                          value={comment.rating}
                          profilePic={
                            comment.user.profileimg
                              ? imgUrl + comment.user.profileimg
                              : null
                          }
                          date={formatdateHeading(data.updated_at)}
                        />
                        {index !==
                          data.commentlist.slice(0, commentLimit).length -
                            1 && <hr />}
                      </React.Fragment>
                    ))}
                  {/* <Ratings
                    heading={"Shareholders / Investors"}
                    text={[
                      "OpenAI has total 34 investors",
                      "9 are institutional investors including Microsoft and 28 others (nb click to expand list etc)",
                      "5 are Angel investors including Peter Thiel and 4 others.",
                    ]}
                  />
                  <hr />
                  <Ratings
                    heading={"Valuations and  Funding rounds"}
                    text={[
                      "OpenAI has total 7 funding rounds",
                      "OpenAI's largest funding round was a Series E round held on Jan 23, 2023 for $10B.",
                      "OpenAI' valuation is $80B as on Feb 20, 2024.",

                      ".",
                      "Create another section here for Competitors",
                    ]}
                  /> */}
                  {commentLimit < data.commentlist?.length ? (
                    <div className="text-center">
                      <hr />
                      <NavLink
                        to={"/"}
                        style={{ textDecoration: "underline" }}
                        className="pt-0  mb-3 mt-3"
                        onClick={(e) => {
                          e.preventDefault();
                          setCommentLimit(commentLimit + 3);
                        }}
                      >
                        Load More
                      </NavLink>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="card card-border-c mt-3">
            <div className="card-body p-2 p-xl-5">
              <div className="feedbackHeading">
                Ask For Information About IVestClub Technologies
              </div>
              <p className="text-basic mb-0 mt-3">Rate This Club</p>
              <Rating
                name="half-rating"
                value={ratingData.rating || 0}
                precision={0.5}
                icon={<StarIcon sx={{ fontSize: 20, color: "gold" }} />}
                emptyIcon={<StarBorder sx={{ fontSize: 20, color: "gold" }} />}
                onChange={(event, newValue) => {
                  setRatingData((prevData) => ({
                    ...prevData,
                    rating: newValue,
                  }));
                }}
              />
              <p className="mb-0 text-basic  mt-3 ">Your Feed Back</p>
              <textarea
                value={ratingData.comment || ""}
                className={
                  commentSubmitted && ratingData.comment == ""
                    ? "form-control border-danger"
                    : "form-control "
                }
                style={{ height: "150px" }}
                onChange={(e) => {
                  setRatingData((prevData) => ({
                    ...prevData,
                    comment: e.target.value,
                  }));
                  setCommentSubmitted(false);
                }}
              ></textarea>
              {commentSubmitted && ratingData.comment == "" && (
                <span className="text-danger text-basic-sm">
                  Please write comments
                </span>
              )}
              <div className="my-5">
                <OutlinedButtonDark
                  text={isSendingReview ? "Submitting..." : "Submit"}
                  onClick={hanadleSendReview}
                />
              </div>
            </div>
          </div> */}
        </div>

        <div className="col-md-4 col-sm-12 extraMg px-1 pt-5 mb-5">
          <SideBarMembership
            memberorlist={data.memberorlist}
            files={data.files}
            bloglist={data.bloglist}
            newslist={data.newslist}
            membershipData={{
              title: data.title,
              username: data.username,
              img: data.img,
              members: data.members,
              updated_at: data.updated_at,
            }}
          />
        </div>
      </SactionContainer>
    );
  }
};

export default PrivateMembership;
