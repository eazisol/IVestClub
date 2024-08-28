import React from "react";
import { useNavigate } from "react-router-dom";
import landingimg from "../../assets/image/landingimg.png";
import landingbg2 from "../../assets/image/landingbg2.png";
import landingbg3 from "../../assets/image/landingbg3.png";
import landingbg5 from "../../assets/image/landingbg5.png";
import landingimg3 from "../../assets/image/landingimg3.png";
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
import { ImgBgSactionContainer, SactionContainer } from "../Common/Containers";
import ExclusiveAccessCard from "./ExclusiveAccessCard";
import ivctoken from "../../assets/image/ivctoken.png";
import cardimg2 from "../../assets/image/cardimg2.png";
import cardimg3 from "../../assets/image/cardimg3.png";
import MemberShip from "../About/MemberShip";
import MemberShipClubSaction from "./MemberShipClubSaction";
import { TextUnderWrap } from "../Common/MiniComponents";
import HeroSaction from "./HeroSaction";
import { Opacity } from "@mui/icons-material";
import { colors } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
     <HeroSaction />
      <SactionContainer>
        <div className="text-column col-lg-6 col-md-12 col-sm-12 mt-5 mb-3">
          <div className="inner pb-5">
            <div className="sec-title">
              <h3>
                {" "}
                
                 <div className="bold-sec-title"> Pre-IPO Companies: Limited Access to Exciting Opportunities </div>
                
              </h3>
            </div>
            <div className="lower-text">
              <div>
                Many of today's most exciting, transformative companies are
                owned by the founders and small group of individuals, making it
                challenging for you to get access.
                <br />
                <br />
                Join iVest Club now to get Exclusive access to these companies
                that are already shaping the future.
              </div>
            </div>
            <div className=" mt-4">
              <p className="text-basic text-dark">
                iVest Club Platform addresses this by providing you with an
                unique space to collectively research and share insights about
                these innovative privately owned companies with other members.
                Our interactive hub fosters a community of learning and
                education, where active participation in uncovering essential
                information is rewarded.
              </p>
            </div>
            <div className=" mt-3">
              <p className="text-basic text-dark">
                By joining the iVest Club community, you can collaborate with
                like-minded dynamic individuals to expand your knowledge of
                pre-IPO companies and explore the world of privately owned
                companies, just like the ultra wealthy. The platform empowers
                everyday people to share their learnings, and engage with these
                companies driving progress.
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
                Longer-term, your membership club can assist you with gaining
                access to the IPO of your chosen company!
              </p>
            </div>

            <div className="mt-5 d-flex row ">
              <div className="col-lg-8 col-sm-12 mt-1">
                <LargeButton text="Learn More about the membership clubs" />
              </div>
              <div className="col-lg-4 col-sm-12 mt-1">
                <OutlinedButtonDark text="Join Here for Free!" />
              </div>
            </div>
          </div>
        </div>

        <div className="image-column col-lg-6 col-md-12 col-sm-12">
          <figure
            className="image wow slideInRight animated"
            data-wow-delay="0ms"
            style={{
              visibility: "visible",
              animationDelay: "0ms",
              animationName: "slideInRight",
            }}
          >
            <img src={home2} alt="" className="" />
          </figure>
        </div>
      </SactionContainer>

      <ImgBgSactionContainer bgImage={landingbg2} showPadding={false}>
        <div className="row  w-100 justify-content-center pt-5">
          <div className="col-lg-12 col-sm-12 text-center mb-3 d-flex justify-content-center">
            <h2 className="w-50">
              Exclusive Acce
              <TextUnderWrap padding={10}>ss to Pre-</TextUnderWrap>IPO for a
              Limited Number of Members
            </h2>
          </div>
          <div className="row w-90 justify-content-center ">
            <ExclusiveAccess
              heading="iVest Club Platform"
             
             
              text1= {<span className="Opacity">Our membership club ecosystem puts you in control, giving a select few exclusive access to Pre-IPO companies and rewarding your active involvement</span>}
              text2={<span className="Opacity">Get involved now in Pre-IPO companies like SpaceX, and OpenAI!</span>}
              
            />
            <ExclusiveAccess
              heading="Peer-Powered Learning"
              text1= {<span className="Opacity">Take charge of  Pre-IPO opportunities alongside engaging discussions and knowledge sharing with informed members in our dynamic forum.</span>}
              text2={<span className="Opacity">Ready to share your insights and colloborate on companies?</span>}
            />
            <ExclusiveAccess
              heading="Pre-IPo access "
              text1= {<span className="Opacity">Our dedicated space empowers you to get access to Pre-IPO companies. Get insights, and prepare yourself to participate in your chosen company!</span>}
              text2={<span className="Opacity">Get rewarded for your choice of pre-IPO company!</span>}
            />
            <ExclusiveAccess
              heading="Rewarding Your Curiosity"
              text1= {<span className="Opacity">We open doors for you to explore and engage with innovative Pre-IPO companies during their critical growth stages,</span>}
              text2={<span className="Opacity">Rewards for your commitment to expanding your knowledge and understanding of your chosen company!</span>}
            />
          </div>
          <div
            className="col-12 d-flex justify-content-center text-center"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="pop-font my-4 w-90 exFoot">
              At iVestclub, we believe in empowering you by providing the
              access, tools, community, and incentives needed to navigate the
              world of Pre-IPO companies with confidence. Our platform is
              designed to put you at the center, giving you access, the power to
              learn, engage, and benefit from the most promising companies
              shaping our tomorrow.
            </div>
          </div>
        </div>
      </ImgBgSactionContainer>

      <SactionContainer>
        <>
          <div className="col-12 mt-3">
            <h3>
              <div className="bold-sec-title">iVest Club AIR Mission - our promise to you</div>
            </h3>
          </div>

          <div className="col-6 col-md-6 col-sm-12 d-flex">
            <div className="col-4 mt-3">
              <p className="text-black text-basic-h7">
                <strong>Access</strong>
              </p>
              <p className="text-black text-basic">To Pre-IPO companies</p>
            </div>
            <div className="col-4 mt-3">
              <p className="text-black text-basic-h7">
                <strong>Inclusion</strong>
              </p>
              <p className="text-black text-basic">For All</p>
            </div>
            <div className="col-4 mt-3">
              <p className="text-black text-basic-h7">
                <strong>Reward</strong>
              </p>
              <p className="text-black text-basic">Engagement</p>
            </div>
          </div>
          <div className="col-6"></div>
          <div className="image-column col-lg-6 col-md-12 col-sm-12 ">
            <div className="lower-text  mt-4 mb-5" >
              <div className="section3-text">Empowering you with Exclusive access to Pre-IPO companies</div>
            </div>
            <figure
              className="image wow slideInLeft animated"
              data-wow-delay="0ms"
              style={{
                visibility: "visible",
                animationDelay: "0ms",
                animationName: "slideInLeft",
              }}
            >
              <img src={landingimg3} alt="" className="" />
            </figure>
            <h6 className="mt-5 text-spacing text-black">
              <div className="bold-sec-title">
                AIR empowers you with unparalleled access to Pre-IPO companies,
                fostering inclusion, engagement, and rewarding your dedication
                in this exclusive space.
              </div>
            </h6>
          </div>
          <div className="text-column col-lg-6 col-md-12 col-sm-12">
            <LandingTimeLine />
          </div>
        </>
      </SactionContainer>
      <ImgBgSactionContainer
        bgImage={landingbg3}
        sx={{ paddingTop: 0, paddingBottom: 0 }}
      >
        <div className="row pt-5 pb-5">
          <div className="text-column col-lg-6 col-md-12 col-sm-12">
            <div className="inner">
              <div className="sec-title mb-5  ">
                <h3>
                  <div>
                    <TextUnderWrap>iVest Club</TextUnderWrap> Membership clubs
                  </div>
                </h3>
              </div>

              <div className=" ">
                <p className="text-basic text-light-c">
                  Engaging with your fellow members within each club creates an
                  active and knowledgeable focus group. Key contributions that
                  could be rewarded with token airdrops include:
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mt-4">
              <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
              <div className="pop-font w-75 ml-3 mb-0  ">
                Company events and milestones
              </div>
            </div>
            <div className="d-flex align-items-center mt-4">
              <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
              <div className="w-75 ml-3 mb-0 pop-font">
                Sharing valuable insights and analysis
              </div>
            </div>
            <div className="d-flex align-items-center mt-4">
              <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
              <div className="w-75 ml-3 mb-0  pop-font">
                Initiating thought-provoking discussions
              </div>
            </div>
            <div className="d-flex align-items-center mt-4">
              <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
              <div className="w-75 ml-3 mb-0  pop-font">
                Providing answers to member questions
              </div>
            </div>
            <div className="d-flex align-items-center mt-4">
              <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
              <div className="w-75 ml-3 mb-0  pop-font">
                Contributing well-researched content and resources
              </div>
            </div>
            <div className="d-flex align-items-center mt-4">
              <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
              <div className="w-75 ml-3 mb-0  pop-font">
                Helping to maintain and moderate a positive club experience
              </div>
            </div>
            <div className="d-flex align-items-center mt-4">
              <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
              <div className="w-75 ml-3 mb-0  pop-font">
                Referring other active and engaged members to the iVest Club
              </div>
            </div>
          </div>

          <div className="image-column col-lg-6 col-md-12 col-sm-12">
            <figure
              className="image wow slideInRight animated"
              data-wow-delay="0ms"
              style={{
                visibility: "visible",
                animationDelay: "0ms",
                animationName: "slideInRight",
              }}
            >
              <img src={landingimg4} alt="" className="" />
            </figure>
          </div>
          <div className="col-12">
            <div className="pop-font ml-3 mt-4 ">
              By engaging in these types of meaningful contributions, will be
              part of a vibrant informed community ahead of the IPO. <br /> Get
              rewarded with more membership tokens to celebrate milestones!
            </div>
          </div>
        </div>
      </ImgBgSactionContainer>
      <ImgBgSactionContainer bgImage={wave}>
        <div className="row  w-100 justify-content-center pt-5 text-dark">
          <div className="col-12 text-center mb-3 ">
            <div className="  section5-heading mont-font">iVest Club</div>
            
          </div>
          <div className="col-12 text-center mb-3 d-flex justify-content-center ">
            <div className="w-80  text-center section5-head-text">
              Aims To democratize access to emerging technologies and companies
              more accessible and inclusive for everyone
            </div>
          </div>
          <div className="col-12 text-center mb-3 ">
            <div className="bold-6 section5-sub-head"> Together we can overcome these barriers You are facing</div>
            
          </div>
          <div className="row ex-card w-90 justify-content-center">
            <ExclusiveAccess
              icon={goldicon1}
              text2= { <span className="section5-sub-text"> Few avenues for You to  obtain access and information</span> }
            />
            <ExclusiveAccess
              icon={goldicon2}
              text2={ <span className="section5-sub-text">Privately owned Companies are Not obligated to disclose information to you</span> }
            />
            <ExclusiveAccess
              icon={goldicon3}
              text2=
              { <span className="section5-sub-text">Opportunities are Restricted to a select group of individuals and not you</span> }
            />
            <ExclusiveAccess
              icon={goldicon4}
              text2=
              { <span className="section5-sub-text">IPO access is not available to You</span> }
            />
          </div>
          <div className="col-12 d-flex justify-content-center">
            <div className="col-md-4 col-sm-12 mt-5">
              <LargeButton text="Join Here for Free!" />
            </div>
          </div>
        </div>
      </ImgBgSactionContainer>

      <ImgBgSactionContainer
        bgImage={landingbg5}
        sx={{ paddingTop: 0, paddingBottom: 0 }}
      >
        <div className=" d-flex justify-content-center">
          <div className="row pt-5 pb-5 w-80">
            <div className="col-12">
              <h3 className=" bold-6 ml-3 mt-4 mb-5">
                Offering you access to the Pre-IPO{" "}
                <TextUnderWrap>private market.</TextUnderWrap>
              </h3>
            </div>
            <div className="image-column col-lg-6 col-md-12 col-sm-12 mt-3">
              <figure
                className="image wow slideInLeft animated"
                data-wow-delay="0ms"
                style={{
                  visibility: "visible",
                  animationDelay: "0ms",
                  animationName: "slideInLeft",
                }}
              >
                <img src={landingimg5} alt="" className="" />
              </figure>
            </div>
            <div className="text-column col-lg-6 col-md-12 col-sm-12 pl-5">
              <div className="inner">
                <div className="sec-title mb-5">
                  <h6 className="section5-head">
                    Where can you find verified information on emerging Pre-IPO
                    companies shaping the future?
                  </h6>
                </div>
              </div>
              <div className="d-flex align-items-center mt-2">
                <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                <div className="w-100  ml-3 mb-0">
                  Historically, Investor Relations of a company tend to be the
                  best source
                </div>
              </div>
              <div className="d-flex align-items-center mt-4">
                <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                <div className="w-75 ml-3 mb-0">Press releases</div>
              </div>
              <div className="d-flex align-items-center mt-4">
                <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                <div className="w-75 ml-3 mb-0">
                  Interviews and company visits
                </div>
              </div>
              <div className="d-flex align-items-center mt-4">
                <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                <div className="w-75 ml-3 mb-0">
                  Institutional analysts reports
                </div>
              </div>
              <div className="d-flex align-items-center mt-4">
                <TaskAltOutlinedIcon sx={{ color: "#F7B138" }} />
                <div className="w-100  ml-3 mb-0">
                  BUT THESE ARE NOT normally available to you
                </div>
              </div>
            </div>
            <div className="col-12 ">
              <div className="WhiteText section5-contentText  pop-font mt-4 text-spacing">
                In light of the exciting information gap, iVest Club has
                developed a platform to offer you the chance to explore and
                access the growing Pre-IPO market opportunities in an engaging
                and dynamic forum.
              </div>
              <div className="WhiteText section5-contentText pop-font  text-spacing">
                Leveraging the power of your iVest Club community, we facilitate
                direct interaction with companies.
              </div>
              <div className="WhiteText section5-contentText pop-font  text-spacing mb-5">
                Get rewarded for your time and effort in being a member of your
                exclusive chosen membership club!{" "}
              </div>
            </div>
          </div>
        </div>
      </ImgBgSactionContainer>
      
      {/* <SactionContainer> */}
      <ImgBgSactionContainer bgImage={wave}>
        <div className="row  w-100 justify-content-center ">
          <div className="col-12 text-center mb-1 ">
            <h2 className="">
              <div className=" section6-head">IVest Club Membership Clubs</div>
            </h2>
          </div>
          
          <div className=" col-12  text-center mb-3">
            <div className="section6-sub-head mont-font  mb-0">
              Gain exclusive access and detailed Knowledge about
            </div>
            <div className="section6-sub-head mont-font">
              specific pre-IPO companies, accompanied by a host of rewards.
            </div>
          </div>
          
          <div className="row   text-dark justify-content-sm-center justify-content-md-start">
            <ExclusiveAccessCard
              image={ivctoken}
              linkText={"View List of Membership Clubs"}
              to={`/`}
              heading={"IVC Token"}
              text={
                "As a verified  member, you can utilize IVC tokens to join any Membership Club aligned with your interests."
              }
            />
            <ExclusiveAccessCard
              image={cardimg2}
              linkText={"Learn more about rewards"}
              heading={"Reward"}
              text={
                "Your membership offers the following benefits: engaging with peers, learning about dynamic sectors, and receiving airdrop rewards."
              }
            />
            <ExclusiveAccessCard
              image={cardimg3}
              linkText={"Learn more about Membership Clubs"}
              heading={"Membership"}
              text={
                "Membership clubs focus on providing you with access while keeping you informed about your choice of Pre-IPO company."
              }
            />
          </div>
          
          <div className="col-12 d-flex justify-content-center">
            <div className="w-25 mt-5">
              <LargeButton text="Join Here for Free!" />
            </div>
          </div>
        </div>
        </ImgBgSactionContainer>
        
      {/* </SactionContainer> */}
      <ImgBgSactionContainer bgImage={landingbg2} showPadding={false}>
        <div className="row  w-100 justify-content-center pt-5">
          <div className="col-12 text-center mb-3 d-flex justify-content-center">
            <h3 className="w-50">
            Use of Blockchain to Reg<TextUnderWrap padding={7}>ister Memb</TextUnderWrap>ership and Receive your Rewards
            </h3>
          </div>
          <div className="row   w-100 justify-content-center pl-5 pr-5 pb-5">
            <ExclusiveAccess
            icon={goldicon5}
              col={4}
              heading="iVest Club Platform"
             
              text1= {<span className="pop-font" style={{ fontSize: "11px" , color:"#FFFF"}}>Each membership club ecosystem puts you in control, giving a select few exclusive access to Pre-IPO companies and rewarding your active involvement.</span>}
             
              text2= {<span className="pop-font" style={{ fontSize: "11px",color:"#FFFF"}}>Get involved now in Pre-IPO companies like SpaceX, and OpenAI!</span>}
            />
            <ExclusiveAccess
             icon={goldicon6}
              col={4}
              heading="Peer-Powered Learning"
              
              text1= {<span className="pop-font"  style={{ fontSize: "11px" , color:"#FFFF"}}>Take charge of  Pre-IPO opportunities alongside engaging discussions and knowledge sharing with informed members in our dynamic forum.</span>}
             
              text2= {<span className="pop-font"  style={{ fontSize: "11px" , color:"#FFFF"}}>Ready to share your insights and colloborate on companies?</span>}
            />
            <ExclusiveAccess
             icon={goldicon7}
              col={4}
              heading="Pre-IPo access "
               
              text1= {<span className="pop-font"  style={{ fontSize: "11px" , color:"#FFFF"}}>Our dedicated space empowers you to get access to Pre-IPO companies. Get insights, and prepare yourself to participate in your chosen company!</span>}
             
              text2= {<span className="pop-font"  style={{ fontSize: "11px" , color:"#FFFF"}}>Get rewarded for your choice of pre-IPO company!</span>}
            />
            <ExclusiveAccess
             icon={goldicon8}
              col={4}
              heading="Rewarding Your Curiosity"
              text1= {<span className="pop-font"  style={{ fontSize: "11px" , color:"#FFFF"}}>We open doors for you to explore and engage with innovative Pre-IPO companies during their critical growth stages,</span>}
             text2= {<span className="pop-font"  style={{ fontSize: "11px" , color:"#FFFF"}}>Rewards for your commitment to expanding your knowledge and understanding of your chosen company!</span>}


            />
            <ExclusiveAccess
             icon={goldicon6}
              col={4}
              heading="Rewarding Your Curiosity"
              
              text1= {<span className="pop-font"  style={{ fontSize: "11px" , color:"#FFFF"}}>We open doors for you to explore and engage with innovative Pre-IPO companies during their critical growth stages,</span>}
              text2= {<span className="pop-font"  style={{ fontSize: "11px" , color:"#FFFF"}}>Rewards for your commitment to expanding your knowledge and understanding of your chosen company!</span>}
           />
          </div>
        </div>
      </ImgBgSactionContainer>
      <MemberShip />
      <MemberShipClubSaction/>
    </>
  );
};

export default Home;
