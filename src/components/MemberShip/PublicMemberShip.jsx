import React from "react";
import about from "../../assets/image/about.png";
import about1 from "../../assets/image/about1.png";
import about2 from "../../assets/image/about2.png";
import landingbg2 from "../../assets/image/landingbg2.png";
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

const PublicMemberShip = () => {
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

        <div className="">
          <h1 className="mb-0">iVest Membership Clubs</h1>
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
      <SactionContainer>
        <div className="card w-100 p-0 p-4">
          <h2 className="mx-4 mt-3">
            <strong>Membership clubs</strong>
          </h2>
          <div className="d-flex align-items-center mx-4 mt-3 mb-2">
            <img
              src={avatar}
              alt=""
              style={{ width: "35px", height: "35px", borderRadius: "35px" }}
            />{" "}
            <p className="text-basic mb-0 ml-1">
              {" "}
              By <strong className="text-dark">John Doe</strong>{" "}
              <span>&#8226;</span>
            </p>
            <CalendarTodayOutlinedIcon
              sx={{ color: "#888", ml: 1, fontSize: "15px" }}
            />
            <p className="text-basic mb-0 ml-1">
              {" "}
              24/7/2024 <span>&#8226;</span>{" "}
            </p>{" "}
            <GroupsOutlinedIcon
              sx={{ color: "#888", ml: 1, fontSize: "25px" }}
            />
            <p className="text-basic mb-0 ml-1"> 222 Members </p>{" "}
          </div>
          <div className="mt-2 mx-4">
            <img src={membershipimgpublic1} alt="" className="img-fluid" />
            <h3 className="mt-4 "><strong>How does the membership club operate?</strong></h3>
            <p className="text-basic text-dark">
              Each exclusive membership club is designed to empower you with
              access to your chosen Pre-IPO company in a fun and innovative way,
              while also rewarding your participation through:
            </p>
            <div className="d-flex">
              <h5 className="col-1 text-center">
                <strong className="text-warning text-bold">01</strong>
              </h5>{" "}
              <h5 className="text-grey col-11">
                Interactive discussions with the company's top management,
                giving you direct access to valuable insights and perspectives
              </h5>
            </div>
            <div className="d-flex">
              <h5 className="col-1 text-center">
                <strong className="text-warning text-bold">02</strong>
              </h5>{" "}
              <h5 className="text-grey col-11">
                Competitions that challenge you to apply your knowledge and
                offer the chance to win cool company-specific prizes, like NFTs
                and trips to visit the company headquarters
              </h5>
            </div>
            <div className="d-flex">
              <h5 className="col-1 text-center">
                <strong className="text-warning text-bold">03</strong>
              </h5>{" "}
              <h5 className="text-grey col-11">
                <>
                Airdrops of bonus membership tokens to recognize and celebrate
                achievements and milestones, reinforcing your progress and
                commitment to the membership club</ >
              </h5>
            </div>
            <p className="text-basic mt-4">
              These rewards not only encourage you to actively participate but
              also create a sense of personal growth and belonging within the
              club. By providing exclusive content, access, and tangible
              benefits, the iVestClub Platform ensures that your membership
              experience is both empowering and rewarding, ultimately equipping
              you with the knowledge and confidence to make informed decisions
              when the company goes public. With this platform, you have the
              power to take control of your financial future and unlock
              opportunities that were once out of reach.
            </p>
          </div>
          <hr />
          <div className="mt-2 mx-4">
            <h3 className="mt-2 mb-5"><strong>Why you should join a membership club?</strong></h3>
            <>
              <div className="row">
                <div className="image-column col-lg-7 col-md-7 col-sm-12 mb-2">
                  <figure
                    className="image wow slideInLeft animated"
                    data-wow-delay="0ms"
                    style={{
                      visibility: "visible",
                      animationDelay: "0ms",
                      animationName: "slideInLeft",
                    }}
                  >
                    <img src={membershipvideo1} alt="" className="" />
                  </figure>
                  <div
                    className="mt-5 "
                    
                  >
                    <Quotations by={"Toney Robbins"} text={" AIR empowers you with unparalleled access to Pre-IPO companies,fostering inclusion, engagement, and rewarding your dedication in this exclusive space."}/>
                  </div>
                </div>
                <div className="text-column col-lg-5 col-md-5 col-sm-12">
                  <h4>
                    {" "}
                    <strong>Goals of the membership club:</strong>
                  </h4>
                  <div className="d-flex  mt-4">
                    <h5 className="col-1 text-center">
                      <span className="text-warning">{">"}</span>
                    </h5>{" "}
                    <h5 className="text-dark h5-sm col-11">
                      Provide access to a specific Pre-IPO company
                    </h5>
                  </div>
                  <div className="d-flex  mt-4">
                    <h5 className="col-1 text-center">
                      <span className="text-warning">{">"}</span>
                    </h5>{" "}
                    <h5 className="text-dark h5-sm col-11">
                      Operate as a collaborative community
                    </h5>
                  </div>
                  <div className="d-flex  mt-4">
                    <h5 className="col-1 text-center">
                      <span className="text-warning">{">"}</span>
                    </h5>{" "}
                    <h5 className="text-dark h5-sm col-11">
                      Foster an environment to share knowledge, resources, and
                      opportunities
                    </h5>
                  </div>
                  <div className="d-flex  mt-4">
                    <h5 className="col-1 text-center">
                      <span className="text-warning">{">"}</span>
                    </h5>{" "}
                    <h5 className="text-dark h5-sm col-11">
                      Uphold values of inclusivity, integrity, and mutual
                      support
                    </h5>
                  </div>
                  <div className="d-flex  mt-4">
                    <h5 className="col-1 text-center">
                      <span className="text-warning">{">"}</span>
                    </h5>{" "}
                    <h5 className="text-dark h5-sm col-11">
                      Offer rewards for your membership
                    </h5>
                  </div>
                </div>
                <p className="text-basic text-dark mx-4 mb-5 mt-4">
                  Our exclusive membership clubs are supported by a limited
                  issuance of membership club tokens on the blockchain, serving
                  as the club's currency. These tokens, purchasable with the
                  iVestClub Token (IVC), represent your membership stake and can
                  be acquired through our platform. They play a crucial role in
                  club development, aligning with your collective objectives.
                  The quantity of tokens you possess correlates with the
                  potential rewards you stand to gain. Additionally, there's a
                  yearly membership fee, paid using the tokens you hold, charged
                  to maintain club membership. As existing members hold all
                  tokens, new membership acceptance relies on the sale of
                  existing stakes, preserving the club's exclusivity
                </p>
              </div>
            </>
          </div>
        </div>
      </SactionContainer>
      <SactionContainer>
        <div className="card w-100">
          <h3 className="mx-4 mt-4">
            <>Features</>
          </h3>
          <div className="row mx-2 mb-4">
            <div className="col-md-6 col-sm-12">
              <div className="d-flex  mt-4">
                <h5 className="col-1 text-center">
                  <span className="text-warning">{">"}</span>
                </h5>{" "}
                <h5 className="text-dark h5-sm col-11">Limited number of Members</h5>
              </div>
              <div className="d-flex  mt-4">
                <h5 className="col-1 text-center">
                  <span className="text-warning">{">"}</span>
                </h5>{" "}
                <h5 className="text-dark h5-sm col-11">
                  Access to Specific companies
                </h5>
              </div>
              <div className="d-flex  mt-4">
                <h5 className="col-1 text-center">
                  <span className="text-warning">{">"}</span>
                </h5>{" "}
                <h5 className="text-dark h5-sm col-11">Membership rewards</h5>
              </div>
              <div className="d-flex  mt-4">
                <h5 className="col-1 text-center">
                  <span className="text-warning">{">"}</span>
                </h5>{" "}
                <h5 className="text-dark h5-sm col-11">
                  Limited number of Tokens for each membership CLub
                </h5>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="d-flex  mt-4">
                <h5 className="col-1 text-center">
                  <span className="text-warning">{">"}</span>
                </h5>{" "}
                <h5 className="text-dark h5-sm col-11">
                  Unique Competitions and opportunities
                </h5>
              </div>
              <div className="d-flex  mt-4">
                <h5 className="col-1 text-center">
                  <span className="text-warning">{">"}</span>
                </h5>{" "}
                <h5 className="text-dark h5-sm col-11">
                  Educate yourself about the specific Company
                </h5>
              </div>
              <div className="d-flex  mt-4">
                <h5 className="col-1 text-center">
                  <span className="text-warning">{">"}</span>
                </h5>{" "}
                <h5 className="text-dark h5-sm col-11">
                  Collaborate with other like minded people
                </h5>
              </div>
              <div className="d-flex  mt-4">
                <h5 className="col-1 text-center">
                  <span className="text-warning">{">"}</span>
                </h5>{" "}
                <h5 className="text-dark h5-sm col-11">
                  Get informed about best way to participate in the IPO
                </h5>
              </div>
            </div>
          </div>
        </div>
      </SactionContainer>
      <SactionContainer>
        <div className="text-column col-lg-6 col-md-12 col-sm-12">
          <div className="inner">
            <div className="">
              <h3>
                {" "}
                <strong>Starting your <TextUnderWrap padding={7}>journey!</TextUnderWrap></strong>
              </h3>
            </div>

            <div className=" mt-2">
              <h6 className=" mb-0">
                <strong className="text-black text-bold">Register:</strong> Provide your
                details and get verified
              </h6>
            </div>
            <div className=" mt-2">
              <h6 className=" mb-0">
                <strong className="text-black text-bold">Explore:</strong> Decide which
                exclusive membership clubs you are interested in
              </h6>
            </div>
            <div className=" mt-2">
              <h6 className=" mb-0">
                <strong className="text-black text-bold">Connect:</strong> Ensure that you
                have IVC tokens to enter the club. Need to buy IVC tokens -
                click here!
              </h6>
            </div>
            <div className=" mt-2">
              <h6 className=" mb-0">
                <strong className="text-black text-bold">Allocate:</strong> Determine how
                many membership club tokens you wish to hold.
              </h6>
            </div>
            <div className=" mt-2">
              <h6 className=" mb-0">
                <strong className="text-black text-bold">Particapte:</strong> Start
                contributing and learning more about your chosen Pre-IPO company
                as a member.
              </h6>
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
              height : "18em",
            }}
          >
            <img src={about1} alt="" className="" />
          </figure>
        </div>
      </SactionContainer>
      <SactionContainer>
        <div className="image-column col-lg-6 col-md-12 col-sm-12 mb-5 mt-5">
          <figure
            className="image wow slideInLeft animated"
            data-wow-delay="0ms"
            style={{
              visibility: "visible",
              animationDelay: "0ms",
              animationName: "slideInLeft",
            }}
          >
            <img src={about2} alt="" className="" />
          </figure>
          <h3 className="mt-4"> <strong>Dont miss out on your tokens</strong></h3>
          <p className="text-basic">
            Tokens are limited, so secure your access to current and future
            membership clubs now.{" "}
          </p>
          <div className="mt-4 d-flex row ">
            <div className="col-lg-4 col-sm-12 mt-1 p-0">
              <LargeButton text="Buy your IVC tokens" />
            </div>
            <div className="col-lg-8 col-sm-12 mt-1">
              <OutlinedButtonDark text="Buy your selected memership club token" />
            </div>
          </div>
        </div>
        <div className="text-column col-lg-6 col-md-12 col-sm-12 mb-5 pl-5 mt-5">
          <div className="inner">
            <div className="">
              <h4 className="text-dark"> <strong>Utilise your tokens for the following:</strong></h4>
            </div>

            <div className="d-flex mt-3">
              <h5 className="col-1 text-center">
                <strong className="text-warning">01</strong>
              </h5>{" "}
              <h6 className="text-grey col-11">
                Payment of yearly membership fees automatically
              </h6>
            </div>
            <div className="d-flex mt-3">
              <h5 className="col-1 text-center">
                <strong className="text-warning">02</strong>
              </h5>{" "}
              <h6 className="text-grey col-11">
                Purchase of exclusive club related NFTs and merchandise
              </h6>
            </div>
            <div className="d-flex mt-3">
              <h5 className="col-1 text-center">
                <strong className="text-warning">03</strong>
              </h5>{" "}
              <h6 className="text-grey col-11">
                Entry into company specific competitions
              </h6>
            </div>
            <div className="d-flex mt-3">
              <h5 className="col-1 text-center">
                <strong className="text-warning">04</strong>
              </h5>{" "}
              <h6 className="text-grey col-11">
                Voting on membership events
              </h6>
            </div>
            <div className="d-flex mt-3">
              <h5 className="col-1 text-center">
                <strong className="text-warning">05</strong>
              </h5>{" "}
              <h6 className="text-grey col-11">
                Hold or purchase more to get more rewards in the future
              </h6>
            </div>
          </div>
          <div className="inner">
            <div className="">
              <h2> Getting rewarded as a member</h2>
              <p className="text-basic text-black">
                During the course of your membership, you may get rewarded with
                more tokens (or NFTs) via airdrops for the following events
              </p>
            </div>

            <div className="d-flex mt-3">
              <h5 className="col-1 text-center">
                <strong className="text-warning">01</strong>
              </h5>{" "}
              <h5 className="text-grey col-11">
                Celebrate a milestone / event from the company (i.e. a launch of
                a new product by your chosen company
              </h5>
            </div>
            <div className="d-flex mt-3">
              <h5 className="col-1 text-center">
                <strong className="text-warning">02</strong>
              </h5>{" "}
              <h5 className="text-grey col-11">
                Collaborating and sharing insights with your fellow members
              </h5>
            </div>
            <div className="d-flex mt-3">
              <h5 className="col-1 text-center">
                <strong className="text-warning">03</strong>
              </h5>{" "}
              <h5 className="text-grey col-11">
                Entering competitions and or quizzes related to the company
              </h5>
            </div>
            <p className="text-basic text-dark">
              Additionally, if the company does decide to go Public, the
              membership club is positioned to assist you in the IPO process and
              hopefully help you to get shares in your chosen company!
            </p>
            <h6 className="text-basic text-dark">
              Please note that you membership token does not constitute any
              shares or economic rights to SpaceX and iVest Club does not
              guarantee that you will be able to get any shares at an IPO should
              it happen. iVest Club provides a service where you can benefit
              from your membership to your chosen company and position yourself
              in the best possible way to participate and obtain shares in the
              IPO.
            </h6>
          </div>
        </div>
      </SactionContainer>

      <ImgBgSactionContainer bgImage={landingbg2} showPadding={false}>
        <div className="row  w-100 justify-content-center pt-5">
          <div className="col-12 text-center mb-3 d-flex justify-content-center">
            <h2 className="w-50">Example of you as a <TextUnderWrap padding={7}>SpaceX</TextUnderWrap> member</h2>
          </div>
          <div className="col-12 d-flex justify-content-center text-center">
            <p className="text-basic text-light w-30">
              You decide to exchange USD 100 for 100 IVC tokens You decides to
              get exclusive access to SpaceX You exchange yur IVC tokens for 100
              SpaceX tokens
            </p>
          </div>
          <div className="row  w-100 justify-content-center pl-5 pr-5 mb-4">
            <ExclusiveAccess
            icon={goldicon9}
              col={4}
              heading="Example Events during yor membership"
              text1="SpaceX launches a new rocket - you get an airdrop of 10 tokens You get rewarded for collaborating - reward of 2 tokens You enter SpaceX competition - you pay 10 tokens You win SpaceX competition - you visit the company  You participate in a SpaceX call - you get 2 token SpaceX IPOs - you get 40 tokens Total number of SpaceX tokens you now hold is 144 tokens"
            />
            <ExclusiveAccess
            icon={goldicon9}
              col={4}
              heading="Other uses of your membership tokens"
              text1="Exchange your SpaceX membership token for another membership token Exchange your membership token for IVC tokens"
            />
            <ExclusiveAccess
            icon={goldicon9}
              col={4}
              heading="How can being a member help in IPO"
              text1="Receive details on the upcoming IPO Get introduced to iVest Club partners that will allow you to participate in the IPO. Sell you SPaceX tokens and use the proceeds to subscribe to the IPO"
            />
          </div>
        </div>
      </ImgBgSactionContainer>

      <MemberShipClubSaction />
    </>
  );
};

export default PublicMemberShip;
