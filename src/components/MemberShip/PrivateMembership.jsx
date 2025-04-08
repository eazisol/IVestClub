import React, { useEffect, useState } from "react";
import { SactionContainer } from "../Common/Containers";
import SideBarMembership from "./SideBarMembership";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import avatar from "../../assets/image/avatar.png";
import spaceximg1 from "../../assets/image/spaceximg1.png";
import spaceximg2 from "../../assets/image/spaceximg2.png";
import openaiimg3 from "../../assets/image/openaiimg3.png";
import {
  Privaterating,
  Quotations,
  Ratings,
  RatingsTotal,
} from "../Common/Feedbacks";
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
  const [feedBackdata, setFeedBackData] = useState([]);
  const { mutate: getProfileData, isPending: isProfileLoading } = useApi();
  const { mutate: discordJoin, isPending: isdiscordLoading } = useApi();
  const { mutate: getFeedback, isPending: isdgetFeedbackDataLoading } =
    useApi();
  const [profiledata, setProfileData] = useState({});
  const [discordId, setDiscordId] = useState("");

  const handleLoadMore = (e) => {
    e.preventDefault();
    setCommentLimit((prevLimit) => prevLimit + 3); // Increase the limit by 3 on each click
  };
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
  const getFeedbackData = () => {
    getFeedback(
      {
        url: `instructions/${decryptNumber(idParam)}`,
        method: "GET",
        sendHeaders: true,
      },
      {
        onSuccess: ({ data }) => {
          setFeedBackData(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };
  useEffect(() => {
    getFeedbackData();
    getMembershipData();
    console.log(
      "import.meta.env.VITE_APP_API_IMG_URL",
      import.meta.env.VITE_APP_DISCORD_SERVER_ID
    );
  }, []);
  const handleJoin = () => {
    window.open("https://discord.gg/MfXhJasq4W", "_blank"); // Open link immediately

    const postData = {
      discord_userid: profiledata?.discord_userid
        ? profiledata?.discord_userid
        : discordId,
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
              {/* {decryptNumber(idParam) / 1 == 7 && (
                <>
                  {" "}
                  <h5 className="mt-4 text-dark mont-font">
                    <strong>Who are SpaceX?</strong>
                  </h5>
                  <p className=" LightText mt-3" style={{ fontSize: "12px" }}>
                    SpaceX, founded by Elon Musk in 2002, is a trailblazing
                    aerospace manufacturer and space transportation company that
                    has transformed the space industry with its cutting-edge
                    technology and ambitious missions. Its development of
                    reusable rockets, notably the Falcon 9, has significantly
                    lowered the cost of accessing space, facilitating a wide
                    array of missions including satellite deployments,
                    International Space Station resupply, and the ambitious goal
                    of interplanetary exploration with the Starship project.
                    SpaceX’s vision extends beyond Earth's orbit, aiming to make
                    life multiplanetary by establishing a human presence on
                    Mars.
                  </p>
                  <p className=" LightText" style={{ fontSize: "12px" }}>
                    Starlink, a subsidiary project of SpaceX, aims to provide
                    global high-speed internet coverage through a constellation
                    of low Earth orbit (LEO) satellites. Launched in 2015,
                    Starlink addresses the challenge of providing internet
                    access to remote and underserved areas around the world. By
                    deploying thousands of small satellites, Starlink creates a
                    network that can deliver fast and reliable internet services
                    with low latency, which is particularly beneficial for
                    regions with poor terrestrial infrastructure. This
                    initiative not only enhances global connectivity but also
                    generates substantial revenue to support SpaceX’s broader
                    space exploration goals.
                  </p>
                  <hr />
                  <div className="p-0 p-xl-3">
                    <h5 className="mt-4 text-dark mont-font ">
                      <strong>Elon Musk presentation on SPaceX</strong>
                    </h5>
                  
                    <iframe
                      width="100%"
                      height="315"
                      src="https://www.youtube.com/embed/6xLmBLWDSHo?si=m1jg2sZO8gLC2IrB"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ borderRadius: "10px",marginTop:"5px" }} 
                    ></iframe>
                    <p className="text-basic text-dark mt-3 bold-5">
                      Space travel is crucial for advancing scientific
                      knowledge, fostering technological innovation, and
                      ensuring the long-term survival and expansion of humanity
                      beyond Earth.
                    </p>
                    <div className="">
                      <Quotations
                        text={
                          <span
                            className="bold-5"
                            style={{
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: 500,
                              fontSize: "12px",
                              color: "#202327",
                              lineHeight: "0",
                              letterSpacing: "0%",
                            }}
                          >
                            SpaceX is a once-in-a-lifetime company because it’s
                            fundamentally changing humanity’s destiny.
                          </span>
                        }
                        by={"Chamath Palihapitiya"}
                      />
                      <Quotations
                        text={
                          <span
                            className="bold-5"
                            style={{
                              fontFamily: "Poppins, sans-serif", 
                              fontWeight: 500,
                              fontSize: "12px",
                              color: "#202327",
                              lineHeight: "0",
                              letterSpacing: "0%",
                            }}
                          >
                            I think space is our only hope, and we are on the
                            verge of commercializing it.
                          </span>
                        }
                        by={"Jeff Bezos"}
                      />
                    </div>
                  </div>
                </>
              )} */}
              {/* {decryptNumber(idParam) / 1 != 7 && ( */}
                <>
                  {/* <div dangerouslySetInnerHTML={{ __html: data.content }} /> */}

                  {/* <h3 className="mt-4">
                    <strong>What is iVestClub Technologies?</strong>
                  </h3>
                  <p className="text-basic mt-4" style={{color:"#555555"}}>
                    ivestClub technologies aims to be the premier membership
                    club service. By utilising the latest blockchain technology,
                    the platform seeks to revolutionize membership clubs by
                    enhancing security, transparency, and efficiency. IvestClub
                    Technlogies seeks to put the members in control of their
                    club whilst reducing the administrative burden required to
                    run any club.
                  </p>
                  <p className="text-basic  mt-4" style={{color:"#555555"}}>
                    The platform promotes the following for each club:
                  </p>
                  {[
                    "Immutable Records: Blockchain's immutable ledger ensures that membership records cannot be altered or tampered with, providing a high level of security.",
                    "Smart Contracts: Membership agreements and renewals are automated through smart contracts ensures that terms are enforced transparently and without bias.",
                    "Automated Processes: Membership renewals, event registrations, and reward distributions are automated, reducing administrative burdens and operational costs.",
                    "Tokenization: Members use tokens to access services of the clubs and pay their fees as well as representing voting rights on club matters.",
                    "Loyalty Programs: Blockchain supports robust loyalty programs where you can earn tokens for participation.",
                    "Equal Access: The decentralized nature of blockchain ensures that all members have equal access to information and decision-making processes, fostering a more inclusive environment.",
                  ].map((text, index) => (
                    <div className="d-flex mt-3" key={index}>
                     
                        <h4 className="warning-bullet text-warning">{">"}</h4>
                      
                    
                        <h6
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 500, // Medium weight
                            fontStyle: "italic",
                            color:"#333333",
                            marginLeft:"20px",
                            lineHeight:"auto"
                          }}
                        >
                          {text}
                        </h6>
                      
                    </div>
                  ))}
                  <hr />
                  <div className="p-3">
                    <h3 className="mt-4">
                      <strong>
                        What is the Blockchain that drives the membership club?{" "}
                      </strong>
                    </h3>
                    <iframe
                      width="100%"
                      height="315"
                      src="https://www.youtube.com/embed/QJn28fFKUR0?si=J7Vw_jvPVkUjJ-4y"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      style={{ borderRadius: "10px" }} // Add border radius here
                    ></iframe> */}
                    {/* <img src={openaiimg1} alt="" className="img-fluid mt-2" /> */}
                    {/* <p className="text-basic-ivt mt-3">
                      The transformative potential of blockchain technology in
                      creating more efficient and innovative systems, which
                      could greatly benefit membership clubs by enhancing
                      transparency, security, and overall member engagement..
                    </p>
                    <div className="">
                      <Quotations
                        text={
                          "You Could Imagine Something Like A Completely Automated System For Renting Bikes That’s Just Done Completely Over Blockchain Crypto-Payments. And Theoretically Just Sort Of Start It Up, And It Works Completely Autonomously"
                        }
                        by={"Vitalik Buterin, co-founder of Ethereum"}
                      />
                    </div>
                    <p className="mt-3 text-basic-ivt">
                      Blockchain is a decentralized, digital ledger technology
                      that records transactions across multiple computers in a
                      way that ensures the data's security, transparency, and
                      immutability. Each transaction is grouped into a "block"
                      and linked to the previous one, forming a "chain" of
                      blocks. This structure prevents alterations once a
                      transaction is recorded, as changing any block would
                      require altering all subsequent blocks on all networked
                      computers simultaneously. Blockchain's decentralized
                      nature eliminates the need for intermediaries, enhances
                      trust through transparent verification processes, and has
                      applications ranging from financial services and supply
                      chain management to voting systems and membership
                      organizations.
                    </p>
                  </div> */}
                </>
              {/* )} */}
            </div>
          </div>
          {/* <div className="card card-border-c mt-4">
            <div className="card-body p-2 p-xl-5">
              <h5 className="text-dark mont-font">
                <strong>{data.VideoTitle}</strong>
              </h5>
              <div dangerouslySetInnerHTML={{ __html: data.privateYTembed }} />
            </div>
          </div> */}
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
                  {
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
                                <div
                                  style={{ fontSize: "12px", padding: "1px" }}
                                >
                                  • Go to User Settings (gear icon near your
                                  username). <br />• Scroll to Advanced under
                                  App Settings. <br />
                                  • Enable Developer Mode. <br />
                                  • Click on your username. <br />
                                  • Click on Copy User ID. <br />• Paste the
                                  User ID below.
                                </div>
                              }
                              arrow
                            >
                              <InfoOutlinedIcon
                                sx={{
                                  color: "gray",
                                  cursor: "pointer",
                                  fontSize: 20,
                                }}
                              />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      placeholder="Enter your Discord ID"
                    />
                  }
                  <Button
                    disabled={!discordId}
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
                <>{`Learn About Different Aspects Of ${decryptNumber(idParam) / 1==7?'SpaceX':"iVestClub Technologies"}`}</>
              </h5>
              <div className="">
                {/* <RatingsTotal /> */}
                <div className="mt-3">
                  {feedBackdata
                    ?.slice(0, commentLimit)
                    .map((comment, index) => {
                      return (
                        <React.Fragment key={index}>
                          <Privaterating
                            heading={comment.title}
                            value={comment.description}
                            index={index}
                            date={formatdateHeading(comment.updated_at)}
                          />
                          {/* Add a horizontal line between comments, but not after the last one */}
                          {index !==
                            feedBackdata?.slice(0, commentLimit).length - 1 && (
                            <hr />
                          )}
                        </React.Fragment>
                      );
                    })}
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
                  {feedBackdata?.length>3 ? (
                    <div className="text-center">
                      <hr />
                      <NavLink
                        to={"/"}
                        style={{ textDecoration: "underline" }}
                        className="pt-0 mb-3 mt-3"
                        onClick={handleLoadMore} // Handle the Load More click
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
              username: data?.username,
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
