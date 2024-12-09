import React from "react";
import { useNavigate } from "react-router-dom";
import landingimg from "../../assets/image/landingimg.png";
import landingbg2 from "../../assets/image/landingbg2.png";
import landingbg3 from "../../assets/image/landingbg3.png";
import landingbg5 from "../../assets/image/landingbg5.png";
import landingimg3 from "../../assets/image/landingimg3.png";
import homeimg45 from "../../assets/image/homeimg45.png";
import landingimg4 from "../../assets/image/landingimg4.png";
import landingimg5 from "../../assets/image/landingimg5.png";
import wave from "../../assets/image/wave.png";
import goldicon1 from "../../assets/image/icons/goldicon1.png";
import goldicon2 from "../../assets/image/icons/goldicon2.png";
import goldicon3 from "../../assets/image/icons/goldicon3.png";
import goldicon4 from "../../assets/image/icons/goldicon4.png";
import goldicon5 from "../../assets/image/icons/goldicon5.png";
import goldicon6 from "../../assets/image/icons/goldicon6.png";
import goldicon7 from "../../assets/image/icons/goldicon7.png";
import goldicon8 from "../../assets/image/icons/goldicon8.png";
import home2 from "../../assets/image/home2.png";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import {
  FilledButtonLight,
  OutlinedButtonLight,
  OutlinedButtonDark,
  LargeButton,
} from "../Common/Buttons";
import about1 from "../../assets/image/about1.png";
import ExclusiveAccess from "./ExclusiveAccess";
import LandingTimeLine from "./LandingTimeLine";
import {
  ImgBgSactionContainer,
  ImgBgSectionContainer,
  SactionContainer,
} from "../Common/Containers";
import ExclusiveAccessCard from "./ExclusiveAccessCard";
import ivctoken from "../../assets/image/ivctoken.png";
import cardimg2 from "../../assets/image/cardimg2.png";
import cardimg3 from "../../assets/image/cardimg3.png";
import MemberShip from "../About/MemberShip";
import MemberShipClubSaction from "./MemberShipClubSaction";
import { TextUnderWrap } from "../Common/MiniComponents";
import HeroSaction from "./HeroSaction";
import { Height, Margin, Opacity, Padding } from "@mui/icons-material";
import { colors } from "@mui/material";
import { appData } from "../Context/AppContext";
import CreateAccountModal from "../Common/CreateAccountModal";


const Home = () => {
  const navigate = useNavigate();
  const { showLandingSaction, setShowLandingSaction,setOpenModal } = appData();


  return (
    <>
      <HeroSaction />
      {showLandingSaction && (
        <>
          <SactionContainer container={false} pt={"3"}>
            <div className="text-column col-lg-6 col-md-12  col-sm-12 ">
              <div className="inner  px-0 ml-0">
                <div className="sec-title">
                  <h3>
                    {" "}
                    <div className="bold-sec-title">
                      {" "}
                      Pre-IPO Companies: Limited Access to Exciting
                      Opportunities{" "}
                    </div>
                  </h3>
                </div>
                <div className="  px-3 ">
                  <div className="lower-text px-3">
                    <div>
                      Many of today's most exciting, transformative companies
                      are owned by the founders and small group of individuals,
                      making it challenging for you to get access.
                      <br />
                      <br />
                      Join iVest Club now to get Exclusive access to these
                      companies that are already shaping the future.
                    </div>
                  </div>
                  <div className=" mt-4">
                    <p className="text-basic text-dark">
                      iVest Club Platform addresses this by providing you with
                      an unique space to collectively research and share
                      insights about these innovative privately owned companies
                      with other members. Our interactive hub fosters a
                      community of learning and education, where active
                      participation in uncovering essential information is
                      rewarded.
                    </p>
                  </div>
                  <div className=" mt-3">
                    <p className="text-basic text-dark">
                      By joining the iVest Club community, you can collaborate
                      with like-minded dynamic individuals to expand your
                      knowledge of pre-IPO companies and explore the world of
                      privately owned companies, just like the ultra wealthy.
                      The platform empowers everyday people to share their
                      learnings, and engage with these companies driving
                      progress.
                    </p>
                  </div>
                  <div className=" mt-3">
                    <p className="text-basic text-dark">
                      Get rewarded with more membership tokens to celebrate the
                      company milestones!
                    </p>
                  </div>
                  <div className=" mt-3">
                    <p className="text-basic text-dark">
                      Longer-term, your membership club can assist you with
                      gaining access to the IPO of your chosen company!
                    </p>
                  </div>

                  
                </div>
              </div>
            </div>

            <div className="image-column col-lg-6 col-md-12 col-sm-12   ">
              <figure
                className="image wow  animated"
                // className="image wow slideInRight animated"
                data-wow-delay="0ms"
                style={{
                  visibility: "visible",
                  animationDelay: "0ms",
                  // animationName: "slideInRight",
                }}
              >
                <img src={home2} alt="" className="home2Img " />
              </figure>
            </div>
            <div className="mt-4 pt-2 d-flex row pb-5 ">
                    <div className="col-lg-7 col-sm-12  ">
                      <LargeButton text="Learn More about the membership clubs" onClick={() => {navigate(`/Membership`)}} />
                    </div>
                    <div className="col-lg-5 col-sm-12  ">
                    
                      
                      <CreateAccountModal Component={OutlinedButtonDark} text={"Join Here for Free!"} />
                    </div>
                  </div>
          </SactionContainer>

          <ImgBgSactionContainer bgImage={landingbg2} showPadding={false}>
            <div className="row  w-100 justify-content-center">
              <div className="col-lg-12 col-sm-12 text-center mb-4 pb-3 d-flex   justify-content-center">
                <h2 className="col-12 col-xl-6 bold-sec-title">
                  Exclusive Acce
                  <TextUnderWrap padding={10}>ss to Pre-</TextUnderWrap>IPO for
                  A Limited Number of Members
                </h2>
              </div>
              <div className="row w-100 justify-content-center mb-3">
                <ExclusiveAccess
                  heading="IVest Club Platform"
                  text1={
                    <span className="">
                      Our membership club ecosystem puts you in control, giving
                      a select few exclusive access to Pre-IPO companies and
                      rewarding your active involvement
                    </span>
                  }
                  text2={
                    <span className="">
                      Get involved now in Pre-IPO companies like SpaceX, and
                      OpenAI!
                    </span>
                  }
                />
                <ExclusiveAccess
                  heading="Peer-Powered Learning"
                  text1={
                    <span className="">
                      Take charge of Pre-IPO opportunities alongside engaging
                      discussions and knowledge sharing with informed members in
                      our dynamic forum.
                    </span>
                  }
                  text2={
                    <span className="">
                      Ready to share your insights and colloborate on companies?
                    </span>
                  }
                />
                <ExclusiveAccess
                  heading="Pre-IPo access "
                  text1={
                    <span className="">
                      Our dedicated space empowers you to get access to Pre-IPO
                      companies. Get insights, and prepare yourself to
                      participate in your chosen company.
                    </span>
                  }
                  text2={
                    <span className="">
                      Get rewarded for your choice of pre-IPO company.
                    </span>
                  }
                />
                <ExclusiveAccess
                  heading="Rewarding Your Curiosity"
                  text1={
                    <span className="">
                      We open doors for you to explore and engage with
                      innovative Pre-IPO companies during their critical growth
                      stages.
                    </span>
                  }
                  text2={
                    <span className="">
                      Rewards for your commitment to expanding your knowledge
                      and understanding of your chosen company.
                    </span>
                  }
                />
              </div>
            </div>
            <div
              className=" text-center  bgBlackContainer"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="pop-font py-4  exFoot">
                At iVestclub, we believe in empowering you by providing the
                access, tools, community, and incentives needed to navigate the
                world of Pre-IPO companies with confidence. Our platform is
                designed to put you at the center, giving you access, the power
                to learn, engage, and benefit from the most promising companies
                shaping our tomorrow.
              </div>
            </div>
          </ImgBgSactionContainer>

          <SactionContainer container={false}>
            <>
              <div className="col-12 mt-5 pt-4">
                <h3>
                  <div className="bold-sec-title">
                  IVest <TextUnderWrap padding={10}> Club AIR </TextUnderWrap>{" "}
                    Mission - our promise to you
                  </div>
                </h3>
              </div>

              {/* <div className="col-6"></div> */}
              <div className="image-column col-lg-6 col-md-12 col-sm-12 pb-4">
                <div className="col-lg-12 col-md-12 col-sm-12 d-flex mt-3 ">
                  <div className="col-4 mt-1 px-0">
                    <p className="text-black text-basic-h7">
                      <>Access</>
                    </p>
                    <p className="text-black mt-1 text-basic-sm">
                      To Pre-IPO companies
                    </p>
                  </div>
                  <div className="col-4 mt-1 px-0">
                    <p className="text-black text-basic-h7">
                      <>Inclusion</>
                    </p>
                    <p className="text-black mt-1 text-basic-sm">For All</p>
                  </div>
                  <div className="col-4 mt-1 px-0">
                    <p className="text-black text-basic-h7">
                      <>Reward</>
                    </p>
                    <p className="text-black mt-1 text-basic-sm">Engagement</p>
                  </div>
                </div>

                <div className="lower-text pr-0 mt-3 mb-5">
                  <div className="section3-text pl-2">
                    Empowering you with Exclusive access to Pre-IPO companies
                  </div>
                </div>
                <figure
                  // className="image wow slideInLeft animated"
                  className="image wow  animated"
                  data-wow-delay="0ms"
                  style={{
                    visibility: "visible",
                    animationDelay: "0ms",
                    // animationName: "slideInLeft",
                  }}
                >
                  <img src={landingimg3} alt="" className="" />
                </figure>
                <h6 className="mt-5 text-spacing text-black">
                  <div className="time-line-bottom-title">
                    AIR empowers you with unparalleled access to Pre-IPO
                    companies, fostering inclusion, engagement, and rewarding
                    your dedication in this exclusive space.
                  </div>
                </h6>
              </div>
              <div className="text-column col-lg-6 col-md-12 col-sm-12 mt-4 pt-2 pl-xl-4">
                <LandingTimeLine />
              </div>
            </>
          </SactionContainer>
          <ImgBgSactionContainer bgImage={landingbg3} showPadding={false}>
            <div className="row  pb-5 mt-3">
              <div className="text-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner">
                  <div className="sec-title mb-4  ">
                    <h3 className="bold-sec-title">
                      <div>
                        <TextUnderWrap>IVest Club</TextUnderWrap> Membership
                        clubs
                      </div>
                    </h3>
                  </div>

                  <div className=" ">
                    <p className="text-basic text-light-c mb-4 pb-2 Opacity">
                      Engaging with your fellow members within each club creates
                      an active and knowledgeable focus group. Key contributions
                      that could be rewarded with token airdrops include:
                    </p>
                  </div>
                </div>
                <div className="d-flex align-items-center membership-clubs-checks">
                  <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                  <div className="pop-font w-75 ml-3 mb-0   tickText">
                    Company events and milestones
                  </div>
                </div>
                <div className="d-flex align-items-center membership-clubs-checks">
                  <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                  <div className="w-100 ml-3 mb-0 pop-font tickText">
                    Sharing valuable insights and analysis
                  </div>
                </div>
                <div className="d-flex align-items-center membership-clubs-checks">
                  <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                  <div className="w-100 ml-3 mb-0  pop-font tickText">
                    Initiating thought-provoking discussions
                  </div>
                </div>
                <div className="d-flex align-items-center membership-clubs-checks">
                  <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                  <div className="w-100 ml-3 mb-0  pop-font tickText">
                    Providing answers to member questions
                  </div>
                </div>
                <div className="d-flex align-items-center membership-clubs-checks">
                  <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                  <div className="w-100 ml-3 mb-0  pop-font tickText">
                    Contributing well-researched content and <br /> resources
                  </div>
                </div>
                <div className="d-flex align-items-center membership-clubs-checks">
                  <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                  <div className="w-100 ml-3 mb-0  pop-font tickText">
                    Helping to maintain and moderate a positive club experience
                  </div>
                </div>
                <div className="d-flex align-items-center membership-clubs-checks">
                  <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                  <div className="w-100 ml-3 mb-0  pop-font tickText">
                    Referring other active and engaged members to the iVest Club
                  </div>
                </div>
              </div>

              <div className="image-column col-lg-6 col-md-12 col-sm-12 pl-3 pl-xl-5">
                <figure
                  className="image wow  animated"
                  // className="image wow slideInRight animated"
                  data-wow-delay="0ms"
                  style={{
                    visibility: "visible",
                    animationDelay: "0ms",
                    // animationName: "slideInRight",
                  }}
                >
                  <img src={landingimg4} alt="" className="landingimg4" />
                </figure>
              </div>
              <div className="col-12 mb-3">
                <div className="membership-clubs-footer mt-4 ">
                  By engaging in these types of meaningful contributions, will
                  be part of a vibrant informed community ahead of the IPO.{" "}
                  <br /> Get rewarded with more membership tokens to celebrate
                  milestones!
                </div>
              </div>
            </div>
          </ImgBgSactionContainer>
          <ImgBgSactionContainer bgImage={wave} showPadding={false}>
            <div className="row  w-100 justify-content-center text-dark mb-5 px-0">
              <div className="col-12 text-center mb-3">
                <div className="  section5-heading mont-font">
                  {" "}
                  <TextUnderWrap padding={10}>IVest Club</TextUnderWrap>
                </div>
              </div>
              <div className="col-12 text-center mb-3 d-flex justify-content-center ">
                <div className="w-80  text-center section5-head-text">
                  Aims To democratize access to emerging technologies and
                  companies more accessible and inclusive for everyone
                </div>
              </div>
              <div className="col-12 text-center mb-3 ">
                <div className="bold-6 section5-sub-head">
                  {" "}
                  Together we can overcome these barriers You are facing
                </div>
              </div>
              <div className="row ex-card w-100 justify-content-center">
                <ExclusiveAccess
                  icon={goldicon1}
                  text2={
                    <span className="section5-sub-text">
                      {" "}
                      Few avenues for You to obtain access and information
                    </span>
                  }
                  size={70}
                  mb={20}
                />
                <ExclusiveAccess
                  icon={goldicon2}
                  text2={
                    <span className="section5-sub-text">
                      Privately owned Companies are Not obligated to disclose
                      information to you
                    </span>
                  }
                  size={70}
                  mb={20}
                />
                <ExclusiveAccess
                  icon={goldicon3}
                  text2={
                    <span className="section5-sub-text">
                      Opportunities are Restricted to a select group of
                      individuals and not you
                    </span>
                  }
                  size={70}
                  mb={20}
                />
                <ExclusiveAccess
                  icon={goldicon4}
                  text2={
                    <span className="section5-sub-text">
                      IPO access is not available to You
                    </span>
                  }
                  size={70}
                  mb={20}
                />
              </div>
              <div className="col-12 d-flex justify-content-center mb-5">
                <div className="col-md-4 col-sm-12 mt-5">
                  {/* <LargeButton text="Join Here for Free!" /> */}
                  <CreateAccountModal Component={LargeButton} text={"Join Here for Free!"} />
                </div>
              </div>
            </div>
          </ImgBgSactionContainer>

          <ImgBgSactionContainer
            bgImage={landingbg5}
            sx={{ paddingTop: 0, paddingBottom: 0 }}
          >
            <div className=" d-flex justify-content-center">
              <div className="row pt-5 pb-3 w-85">
                <div className="col-12">
                  <h3 className=" bold-sec-title ml-3 mt-1 mb-5">
                    Offering You Access To The Pre-IPO{" "}
                    <TextUnderWrap>Private Market.</TextUnderWrap>
                  </h3>
                </div>
                <div className="image-column col-lg-6 col-md-12 col-sm-12 mt-3 mx-0">
                  <figure
                    className="image wow  animated pl-4"
                    // className="image wow slideInLeft animated pl-4"
                    data-wow-delay="0ms"
                    style={{
                      visibility: "visible",
                      animationDelay: "0ms",
                      // animationName: "slideInLeft",
                    }}
                  >
                    <img src={landingimg5} alt="" className="" />
                  </figure>
                </div>
                <div className="text-column col-lg-6 col-md-12 col-sm-12 pl-4">
                  <div className="inner mt-3 mb-3 pb-0">
                    <h6 className="section5-head ">
                      Where can you find verified information on emerging
                      Pre-IPO companies shaping the future?
                    </h6>
                  </div>
                  <div className="d-flex align-items-center ">
                    <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                    <div className="w-100 ml-3 mb-0 pop-font  sec-private-market-text">
                      Historically, Investor Relations of a company tend to be
                      the best source
                    </div>
                  </div>
                  <div className="d-flex align-items-center mt-2 pt-1">
                    <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                    <div className="w-90 ml-3 mb-0 pop-font ">
                      Press releases
                    </div>
                  </div>
                  <div className="d-flex align-items-center mt-2 pt-1">
                    <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                    <div className="w-90 ml-3 mb-0 pop-font sec-private-market-text">
                      Interviews and company visits
                    </div>
                  </div>
                  <div className="d-flex align-items-center mt-2 pt-1">
                    <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                    <div className="w-90 ml-3 mb-0 pop-font sec-private-market-text">
                      Institutional analysts reports
                    </div>
                  </div>
                  <div className="d-flex align-items-center mt-2 pt-1 sec-private-market-text">
                    <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                    <div className="w-90 ml-3 mb-0 pop-font ">
                      BUT THESE ARE NOT normally available to you
                    </div>
                  </div>
                </div>
                <div className="col-12 ml-4 mt-3">
                  <div className=" section5-contentText pop-font mt-4 text-spacing">
                    In light of the exciting information gap, iVest Club has
                    developed a platform to offer you the chance to explore and
                    access the growing Pre-IPO market opportunities in an
                    engaging and dynamic forum.
                  </div>
                  <div className=" section5-contentText pop-font  text-spacing">
                    Leveraging the power of your iVest Club community, we
                    facilitate direct interaction with companies.
                  </div>
                  <div className=" section5-contentText pop-font  text-spacing mb-5">
                    Get rewarded for your time and effort in being a member of
                    your exclusive chosen membership club!{" "}
                  </div>
                </div>
              </div>
            </div>
          </ImgBgSactionContainer>

          {/* <SactionContainer> */}
          <ImgBgSactionContainer bgImage={wave} showPadding={false}>
            <div className="row w-100 justify-content-center mb-5 px-0 mx-0 pt-0">
              <div className="col-12 text-center mb-1 px-0 mx-0 ">
                <h2>
                  <div className=" bold-sec-title text-black mb-2">
                    IVest Club Membe
                    <TextUnderWrap padding={10}>rship C</TextUnderWrap>lubs
                  </div>
                </h2>
              </div>

              <div className=" col-12  text-center mb-3 px-0 mx-0">
                <div className="  text-center section5-head-text  mb-0">
                  Gain Exclusive Access And Detailed Knowledge About
                </div>
                <div className="  text-center section5-head-text mont-font">
                  Specific Pre-IPO Companies, Accompanied By A Host Of Rewards.
                </div>
              </div>

              <div className="row w-100 text-dark exclusiveCardClass justify-content-sm-center justify-content-md-start mx-2 ">
                <ExclusiveAccessCard
                  image={ivctoken}
                  linkText={"View List of Membership Clubs"}
                  heading={"IVC Token"}
                  text={
                    "As a verified  member, you can utilize IVC tokens to join any Membership Club aligned with your interests."
                  }
                  to={`/Membership`}
                />

                <ExclusiveAccessCard
                  image={cardimg2}
                  linkText={"Learn more about rewards"}
                  heading={"Reward"}
                  text={
                    "Your membership offers the following benefits: engaging with peers and receiving airdrop rewards."
                  }
                  to={`/Membership`}
                />
                <ExclusiveAccessCard
                  image={cardimg3}
                  linkText={"Learn more about Membership Clubs"}
                  heading={"Membership"}
                  text={
                    "Membership clubs focus on providing you  access while keeping you informed about your choice of Pre-IPO company."
                  }
                  to={`/Membership`}
                />
              </div>

              <div className="col-12 d-flex justify-content-center">
                <div className=" mt-2 pt-1 mb-4 px-0">
                  {/* <LargeButton text="Join Here for Free!" /> */}
                  <CreateAccountModal Component={LargeButton} text={"Join Here for Free!"} />
                </div>
              </div>
            </div>
          </ImgBgSactionContainer>

          {/* </SactionContainer> */}

          <ImgBgSectionContainer bgImage={homeimg45} showPadding={false}>
            <div className="row  w-100 justify-content-center exclusiveAccessCardContainer">
              <div className="col-12 col-xl-7 text-center mb-3 d-flex justify-content-center ">
                <h3 className="w-100 bold-sec-title">
                  Use of Blockchain to Reg
                  <TextUnderWrap padding={7}>
                    ister Memb
                  </TextUnderWrap>ership <br /> And Receive Your Rewards
                </h3>
              </div>
              <div className="row w-100 justify-content-center pb-5">
                <ExclusiveAccess
                  size={75}
                  custom={true}
                  icon={goldicon5}
                  col={4}
                  heading="Membership in the iVest Club Ecosystem"
                  text1={
                    <span
                      className="pop-font"
                      style={{ fontSize: "11px", color: "#FFFF" }}
                    >
                      Each club has its own membership, reflecting your targeted
                      interest in the Pre-IPO company. Access is limited to
                      verified members.
                    </span>
                  }
                  text2={
                    <span
                      className="pop-font"
                      style={{ fontSize: "11px", color: "#FFFF" }}
                    >
                      Click here to become a member and start your Journey!
                    </span>
                  }
                />

                <ExclusiveAccess
                  custom={true}
                  size={75}
                  icon={goldicon6}
                  col={4}
                  heading="Member’s Education"
                  text1={
                    <span
                      className="pop-font"
                      style={{ fontSize: "11px", color: "#FFFF" }}
                    >
                      Engaging with fellow members within each club creates an
                      active and knowledgeable focus group. Active knowldege
                      contributions are ewarded wih airdrops of tokens.
                    </span>
                  }
                  text2={
                    <span
                      className="pop-font"
                      style={{ fontSize: "11px", color: "#FFFF" }}
                    >
                      Click here to learn about how you could be rewarded for
                      sharing your knowledge!
                    </span>
                  }
                />
                <ExclusiveAccess
                  size={75}
                  custom={true}
                  icon={goldicon7}
                  col={4}
                  heading="iVestClubToken (IVC)"
                  text1={
                    <span
                      className="pop-font"
                      style={{ fontSize: "11px", color: "#FFFF" }}
                    >
                      Token that allows you to gain access to the membership
                      clubs.
                    </span>
                  }
                  text2={
                    <span
                      className="pop-font"
                      style={{ fontSize: "11px", color: "#FFFF" }}
                    >
                      Click here for more information and to purchase your IVC
                    </span>
                  }
                />
                <ExclusiveAccess
                  size={75}
                  custom={true}
                  icon={goldicon6}
                  col={4}
                  heading="Membership Club Tokens"
                  text1={
                    <span
                      className="pop-font"
                      style={{ fontSize: "11px", color: "#FFFF" }}
                    >
                      Each club has its own token, which is exclusive to the
                      platform and can only be exchanged for IVC tokens. A
                      higher token count results in increased rewards.
                    </span>
                  }
                  text2={
                    <span
                      className="pop-font"
                      style={{ fontSize: "11px", color: "#FFFF" }}
                    >
                      Click here to see your list of available membership clubs
                    </span>
                  }
                />
                <ExclusiveAccess
                  size={75}
                  custom={true}
                  icon={goldicon8}
                  col={4}
                  heading="Powered by Blockchain Technology"
                  text1={
                    <span
                      className="pop-font"
                      style={{ fontSize: "11px", color: "#FFFF" }}
                    >
                      Blockchain technology ensures the highest level of
                      security and transparency for our membership club,
                      allowing members to verify transactions, access exclusive
                      benefits, and manage their memberships seamlessly and
                      securely
                    </span>
                  }
                />
              </div>
            </div>
          </ImgBgSectionContainer>

          <MemberShip />
          <MemberShipClubSaction />
        </>
      )}
    </>
  );
};

export default Home;
