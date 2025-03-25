import React, { useState, useEffect } from "react";
import about from "../../assets/image/about.png";
import about1 from "../../assets/image/about1.png";
import about2 from "../../assets/image/about2.png";
import landingbg2 from "../../assets/image/membershipimg45.png";
import goldicon9 from "../../assets/image/icons/goldicon9.png";
import avatar from "../../assets/image/avatar.png";
import quotationimg from "../../assets/image/quotationimg.png";
import membershipvideo1 from "../../assets/image/membershipvideo1.png";
import membershipimgpublic1 from "../../assets/image/membershipimgpublic1.png";
import MemberShipClubSaction from "../Home/MemberShipClubSaction";
import { SactionContainer, ImgBgSactionContainer } from "../Common/Containers";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import {
  FilledButtonLight,
  OutlinedButtonLight,
  OutlinedButtonDark,
  LargeButton,
} from "../Common/Buttons";
import ExclusiveAccess from "../Home/ExclusiveAccess";
import { Quotations } from "../Common/Feedbacks";
import { TextUnderWrap } from "../Common/MiniComponents";
import useApi from "../Hooks/useApi";
import { decryptNumber, formatdateHeading } from "../Common/Utills";
import { imgUrl } from "../../../apiConfig";
import { CustomizedLoader } from "../Common/MiniComponents";
import { useNavigate } from "react-router-dom";
import { appData } from "../Context/AppContext";
import JoinMembership from "../Common/JoinMembership";

const PublicMemberShip = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const idParam = queryParams.get("id");
  const navigate = useNavigate();
  const { mutate: getData, isPending: isMembershipLoading, error } = useApi();
  const [data, setData] = useState({});
  useEffect(() => {
   
    getData(
      {
        url: `membershipclub/public-view/${decryptNumber(idParam)}`,
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
  }, [idParam]);

  if (isMembershipLoading) {
    return <CustomizedLoader />;
  } else {
    return (
      <>
        <section className="page-banner">
          <div
            className="image-layer"
            style={{
              backgroundImage: `url(${about})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="bannerHead mb-0 ">
            {" "}
            <h2 className="bold-7">IVest Membership Clubs</h2>{" "}
          </div>

          <div className="">
            <div className="">
              <ul className="bread-crumb clearfix">
                <li>
                  <a
                    onClick={() => {
                      navigate("/");
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    Home
                  </a>
                </li>
                <li className="active">Membership Clubs</li>
              </ul>
            </div>
          </div>
        </section>
        <SactionContainer container={false}>
          <div className="card card-border-c w-100 px-1 pt-3  ml-3 mt-5">
            <h2 className="mx-4 mt-3">
              <strong>Membership Clubs</strong>
            </h2>
            <div className="d-flex align-items-center mx-0 mx-xl-4 mt-3 mb-2">
              <img
                src={avatar}
                alt=""
                style={{ width: "40px", height: "40px", borderRadius: "35px" }}
              />{" "}
              <p className="text-basic mb-0 ml-1">
                {" "}
                By <strong className=" DarkText bold-4">
                  {data.username}
                </strong>{" "}
                &nbsp;&nbsp;
                <span>&#8226;</span>
              </p>
              <CalendarTodayOutlinedIcon
                sx={{ color: "#888", ml: 1, fontSize: "15px" }}
              />
              <p className="text-basic mb-0 ml-1">
                {" "}
                {formatdateHeading(data.created_at)} &nbsp;&nbsp;
                <span>&#8226;</span>{" "}
              </p>{" "}
              <GroupsOutlinedIcon
                sx={{ color: "#888", ml: 1, fontSize: "25px" }}
              />
              <p className="text-basic mb-0 ml-1"> {data.members} Members </p>{" "}
            </div>
            <div className="mt-2 mx-4">
              <img
                src={imgUrl + data.img}
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
                alt=""
                className="mb-3"
              />
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
            <hr />
            <div className="mt-4 mx-4">
              <h3 className="mt-2 mb-5">
                <strong className="bold-6">
                  Why you should join a membership club?
                </strong>
              </h3>
              <>
                <div className="row">
                  <div className="image-column px-0 col-lg-7 col-md-7 col-sm-12 mb-2 pr-4">
                    <figure
                      className="image wow d-flex justify-content-center slideInLeft animated"
                      data-wow-delay="0ms"
                      style={{
                        visibility: "visible",
                        animationDelay: "0ms",
                        animationName: "slideInLeft",
                      }}
                    >
                      <img src={membershipvideo1} alt="" className="" />
                    </figure>
                    <div className="mt-5 ">
                      <Quotations
                        by={"Toney Robbins"}
                        text={
                          <span className="pop-font qouteFont ">
                            Membership clubs offer a unique environment where
                            like-minded individuals come together to share
                            knowledge, resources, and opportunities. They
                            provide a platform for collaboration, networking,
                            and personal growth that can accelerate one's
                            success and elevate their professional and personal
                            endeavors.{" "}
                          </span>
                        }
                      />
                    </div>
                  </div>
                  <div className="text-column pl-1  col-lg-5 col-md-5 col-sm-12 px-0">
                    <h5 className="mb-3 pb-3">
                      {" "}
                      <div className="mont-font">
                        {" "}
                        <i className=" bold-8 DarkText goalHeading">
                          {" "}
                          Goals of the membership club:
                        </i>
                      </div>
                    </h5>
                    <div className="d-flex  mt-4">
                      <h5 className="col-1 text-center p-0">
                        <span className="text-warning warning-bullet">
                          {">"}
                        </span>
                      </h5>{" "}
                      <h5 className="goalText  col-11">
                        Provide access to a specific Pre-IPO company
                      </h5>
                    </div>
                    <div className="d-flex  mt-2 pt-2">
                      <h5 className="col-1 text-center p-0">
                        <span className="text-warning warning-bullet">
                          {">"}
                        </span>
                      </h5>{" "}
                      <h5 className="goalText  col-11">
                        Operate as a collaborative community
                      </h5>
                    </div>
                    <div className="d-flex  mt-2 pt-2">
                      <h5 className="col-1 text-center p-0">
                        <span className="text-warning warning-bullet">
                          {">"}
                        </span>
                      </h5>{" "}
                      <h5 className="goalText  col-11">
                        Foster an environment to share knowledge, resources, and
                        opportunities
                      </h5>
                    </div>
                    <div className="d-flex  mt-2 pt-2">
                      <h5 className="col-1 text-center p-0">
                        <span className="text-warning warning-bullet">
                          {">"}
                        </span>
                      </h5>{" "}
                      <h5 className="goalText  col-11">
                        Uphold values of inclusivity, integrity, and mutual
                        support
                      </h5>
                    </div>
                    <div className="d-flex  mt-2 pt-2">
                      <h5 className="col-1 text-center p-0">
                        <span className="text-warning warning-bullet">
                          {">"}
                        </span>
                      </h5>{" "}
                      <h5 className="goalText  col-11">
                        Offer rewards for your membership
                      </h5>
                    </div>
                  </div>
                  <p className="text-basic bold-4 DarkText mb-4 mt-4">
                    Our exclusive membership clubs are supported by a limited
                    issuance of membership club tokens on the blockchain,
                    serving as the club's currency. These tokens, purchasable
                    with the IVestClub Token (IVC), represent your membership
                    stake and can be acquired through our platform. They play a
                    crucial role in club development, aligning with your
                    collective objectives. The quantity of tokens you possess
                    correlates with the potential rewards you stand to gain.
                    Additionally, there's a yearly membership fee, paid using
                    the tokens you hold, charged to maintain club membership. As
                    existing members hold all tokens, new membership acceptance
                    relies on the sale of existing stakes, preserving the club's
                    exclusivity
                  </p>
                </div>
              </>
            </div>
          </div>
        </SactionContainer>
        <SactionContainer container={false}>
          <div className="card card-border-c w-100 ml-3">
            <h5 className=" ml-4 pl-2 mt-4">
              <strong className="bold-7 ">Features</strong>
            </h5>
            <div className="row mx-2 mb-4">
              <div className="col-md-6 col-sm-12">
                <div className="d-flex  mt-2 pt-2">
                  <h5 className="col-1 text-center p-0">
                    <span className="text-warning warning-bullet">{">"}</span>
                  </h5>{" "}
                  <h5 className="goalText col-11 ">
                    Limited number of Members
                  </h5>
                </div>
                <div className="d-flex   mt-2 pt-2">
                  <h5 className="col-1 text-center p-0">
                    <span className="text-warning warning-bullet">{">"}</span>
                  </h5>{" "}
                  <h5 className="goalText col-11">
                    Access to Specific companies
                  </h5>
                </div>
                <div className="d-flex  mt-2 pt-2">
                  <h5 className="col-1 text-center p-0">
                    <span className="text-warning warning-bullet">{">"}</span>
                  </h5>{" "}
                  <h5 className="goalText col-11">Membership rewards</h5>
                </div>
                <div className="d-flex  mt-2 pt-2">
                  <h5 className="col-1 text-center p-0">
                    <span className="text-warning warning-bullet">{">"}</span>
                  </h5>{" "}
                  <h5 className="goalText col-11">
                    Limited number of Tokens for each membership CLub
                  </h5>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="d-flex  mt-2 pt-2">
                  <h5 className="col-1 text-center p-0">
                    <span className="text-warning warning-bullet">{">"}</span>
                  </h5>{" "}
                  <h5 className="goalText col-11">
                    Unique Competitions and opportunities
                  </h5>
                </div>
                <div className="d-flex  mt-2 pt-2">
                  <h5 className="col-1 text-center p-0">
                    <span className="text-warning warning-bullet">{">"}</span>
                  </h5>{" "}
                  <h5 className="goalText col-11">
                    Educate yourself about the specific Company
                  </h5>
                </div>
                <div className="d-flex mt-2 pt-2">
                  <h5 className="col-1 text-center p-0">
                    <span className="text-warning warning-bullet">{">"}</span>
                  </h5>{" "}
                  <h5 className="goalText col-11">
                    Collaborate with other like minded people
                  </h5>
                </div>
                <div className="d-flex  mt-2 pt-2">
                  <h5 className="col-1 text-center p-0">
                    <span className="text-warning warning-bullet">{">"}</span>
                  </h5>{" "}
                  <h5 className="goalText  col-11">
                    Get informed about best way to participate in the IPO
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </SactionContainer>
        <SactionContainer container={false}>
          <div className="text-column col-lg-6 col-md-12 col-sm-12">
            <div className="inner">
              <div className="mt-4 pt-2">
                <h3>
                  {" "}
                  <strong className="bold-6">
                    Starting your{" "}
                    <TextUnderWrap padding={7}>journey!</TextUnderWrap>
                  </strong>
                </h3>
              </div>

              <div className=" mt-5 ">
                <h6 className=" mb-0 mont-font membership-text-head">
                  <strong className="text-black text-bold">Register:</strong>{" "}
                  Provide your details and get verified
                </h6>
              </div>
              <div className=" mt-4 ">
                <h6 className=" mb-0 mont-font membership-text-head">
                  <strong className="text-black text-bold">Explore:</strong>{" "}
                  Decide which exclusive membership clubs you are interested in
                </h6>
              </div>
              <div className=" mt-4  ">
                <h6 className=" mb-0 mont-font membership-text-head">
                  <strong className="text-black text-bold">Connect:</strong>{" "}
                  Ensure that you have IVC tokens to enter the club. Need to buy
                  IVC tokens - click here!
                </h6>
              </div>
              <div className=" mt-4  ">
                <h6 className=" mb-0 mont-font membership-text-head">
                  <strong className="text-black text-bold">Allocate:</strong>{" "}
                  Determine how many membership club tokens you wish to hold.
                </h6>
              </div>
              <div className=" mt-4  ">
                <h6 className=" mb-0 mont-font membership-text-head">
                  <strong className="text-black text-bold">Particapte:</strong>{" "}
                  Start contributing and learning more about your chosen Pre-IPO
                  company as a member.
                </h6>
              </div>
            </div>
          </div>

          <div className="image-column col-lg-6 col-md-12 col-sm-12 mt-4 pt-2 pl-4 pl-xl-5">
            <figure
              className="image wow d-flex justify-content-center slideInRight animated"
              data-wow-delay="0ms"
              style={{
                visibility: "visible",
                animationDelay: "0ms",
                animationName: "slideInRight",
                height: "18em",
              }}
            >
              <img src={about1} alt="" className="MemberSliderImage" />
            </figure>
          </div>
        </SactionContainer>
        <SactionContainer container={false}>
          <div className="image-column col-lg-6 col-md-12 col-sm-12 mb-5 mt-5">
            <figure
              className="image wow d-flex justify-content-center slideInLeft animated"
              data-wow-delay="0ms"
              style={{
                visibility: "visible",
                animationDelay: "0ms",
                animationName: "slideInLeft",
              }}
            >
              <img src={about2} alt="" className="MemberSliderImage" />
            </figure>
            <h3 className="mt-4 pt-3">
              {" "}
              <strong className="bold-6">Don't Miss out on Your Tokens</strong>
            </h3>
            <p className="DarkText mt-3" style={{ fontSize: "12.3px" }}>
              Tokens are limited, so secure your access to current and future
              membership clubs now.{" "}
            </p>
            <div className="mt-4 pt-2 mb-4 pb-2 d-flex row ">
              <div className="col-lg-4 col-sm-12 mt-1 ">
              <LargeButton
                text="Buy your IVT tokens"
                onClick={() => {
                  const userData = localStorage.getItem("userData");

                  if (!userData) {
                    navigate("/shop"); // Navigate to Dashboard if userData exists
                  } else {
                    navigate("/Dashboard"); // Navigate to Shop if userData does not exist
                  }
                }}
              />
              </div>
              <div className="col-lg-8 col-sm-12 mt-1">
              <JoinMembership />
              </div>
            </div>
          </div>
          <div className="text-column col-lg-6 col-md-12 col-sm-12 mb-5 pl-5 mt-5">
            <div className="inner">
              <div className="">
                <h4 className="DarkText">
                  {" "}
                  <strong className="UttilyText">
                    Utilise your tokens for the following:
                  </strong>
                </h4>
              </div>

              <div className="d-flex mt-4">
                <h5 className="col-1 text-center p-0">
                  <strong className="text-warning warning-bullet warningDig text-bold">
                    01
                  </strong>
                </h5>{" "}
                <h5 className="text-dig  col-11">
                  Payment of Membership Fee Automatically
                </h5>
              </div>

              <div className="d-flex mt-2">
                <h5 className="col-1 text-center p-0">
                  <strong className="text-warning warning-bullet warningDig text-bold">
                    02
                  </strong>
                </h5>{" "}
                <h5 className="text-dig  col-11">
                  Purchase of exclusive club related NFTs and merchandise
                </h5>
              </div>

              <div className="d-flex mt-2">
                <h5 className="col-1 text-center p-0">
                  <strong className="text-warning warning-bullet warningDig text-bold">
                    03
                  </strong>
                </h5>{" "}
                <h5 className="text-dig  col-11">
                  Entry into company specific competitions
                </h5>
              </div>

              <div className="d-flex mt-2">
                <h5 className="col-1 text-center p-0">
                  <strong className="text-warning warning-bullet warningDig text-bold">
                    04
                  </strong>
                </h5>{" "}
                <h5 className="text-dig  col-11" style={{ fontSize: "18px" }}>
                  Voting on membership events
                </h5>
              </div>

              <div className="d-flex mt-2">
                <h5 className="col-1 text-center p-0">
                  <strong className="text-warning warning-bullet warningDig text-bold">
                    05
                  </strong>
                </h5>{" "}
                <h5 className="text-dig  col-11">
                  Hold or purchase more to get more rewards in the future
                </h5>
              </div>
            </div>

            <div className="inner">
              <div className="">
                <h4 className="DarkText">
                  {" "}
                  <strong className="UttilyText">
                    Getting rewarded as a member
                  </strong>
                </h4>
              </div>
              <p className="text-basic text-black mt-3">
                During the course of your membership, you may get rewarded with
                more tokens (or NFTs) via airdrops for the following events
              </p>

              <div className="d-flex mt-4">
                <h5 className="col-1 text-center p-0">
                  <strong className="text-warning warning-bullet warningDig text-bold">
                    01
                  </strong>
                </h5>{" "}
                <h5 className="text-dig  col-11">
                  Celebrate a milestone / event from the company (i.e. a launch
                  of a new product by your chosen company
                </h5>
              </div>

              <div className="d-flex mt-2">
                <h5 className="col-1 text-center p-0">
                  <strong className="text-warning warning-bullet warningDig text-bold">
                    02
                  </strong>
                </h5>{" "}
                <h5 className="text-dig  col-11">
                  Collaborating and sharing insights with your fellow members
                </h5>
              </div>

              <div className="d-flex mt-2">
                <h5 className="col-1 text-center p-0">
                  <strong className="text-warning warning-bullet warningDig text-bold">
                    03
                  </strong>
                </h5>{" "}
                <h5 className="text-dig  col-11">
                  Entering competitions and or quizzes related to the company
                </h5>
              </div>

              <p className="text-basic DarkText mt-3">
                Additionally, if the company does decide to go Public, the
                membership club is positioned to assist you in the IPO process
                and hopefully help you to get shares in your chosen company!
              </p>
              <p className="text-basic DarkText">
                Please note that you membership token does not constitute any
                shares or economic rights to SpaceX and IVestClub does not
                guarantee that you will be able to get any shares at an IPO
                should it happen. IVestClub provides a service where you can
                benefit from your membership to your chosen company and position
                yourself in the best possible way to participate and obtain
                shares in the IPO.
              </p>
            </div>
          </div>
        </SactionContainer>

        <ImgBgSactionContainer bgImage={landingbg2} showPadding={false}>
          <div className="row  justify-content-center mx-2">
            <div className="text-center mb-3 d-flex justify-content-center">
              <h3 className="col-12 ">
                Example of you as a{" "}
                <TextUnderWrap padding={7}>SpaceX</TextUnderWrap> member
              </h3>
            </div>
            <div className="col-12 d-flex justify-content-center text-center">
              <p className="exText WhiteText mt-2  w-40">
                You decide to exchange USD 100 for 100 IVC tokens You decides to
                get exclusive access to SpaceX You exchange yur IVC tokens for
                100 SpaceX tokens
              </p>
            </div>
            <div className="row  w-100 justify-content-center  mb-4 pb-3">
              <ExclusiveAccess
                icon={goldicon9}
                size={70}
                col={4}
                heading={
                  <span className="bold-5">
                    Example Events during yor membership
                  </span>
                }
                text1="SpaceX launches a new rocket - you get an airdrop of 10 tokens You get rewarded for collaborating - reward of 2 tokens You enter SpaceX competition - you pay 10 tokens You win SpaceX competition - you visit the company  You participate in a SpaceX call - you get 2 token SpaceX IPOs - you get 40 tokens Total number of SpaceX tokens you now hold is 144 tokens"
              />
              <ExclusiveAccess
                icon={goldicon9}
                size={70}
                col={4}
                heading={
                  <span className="bold-5">
                    Other uses of your membership tokens
                  </span>
                }
                text1="Exchange your SpaceX membership token for another membership token Exchange your membership token for IVC tokens"
              />
              <ExclusiveAccess
                icon={goldicon9}
                size={70}
                col={4}
                heading={
                  <span className="bold-5">
                    How can being a member help in IPO
                  </span>
                }
                text1="Receive details on the upcoming IPO Get introduced to IVestClub partners that will allow you to participate in the IPO. Sell you SPaceX tokens and use the proceeds to subscribe to the IPO"
              />
            </div>
          </div>
        </ImgBgSactionContainer>

        <MemberShipClubSaction />
      </>
    );
  }
};

export default PublicMemberShip;
