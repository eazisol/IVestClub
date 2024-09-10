import React from "react";
import { useNavigate } from "react-router-dom";
import about from "../../assets/image/about.png";
import about1 from "../../assets/image/about1.png";
import about2 from "../../assets/image/about2.png";
import about3 from "../../assets/image/about3.png";
import about4 from "../../assets/image/about4.png";
import MemberShip from "./MemberShip";
import { TextUnderWrap } from "../Common/MiniComponents";
import { LargeButton } from "../Common/Buttons";

const About = () => {
  const navigate = useNavigate();
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

        <div>
          <h2 className="bannerHead mt-4 pt-1">About Us</h2>
        </div>

        <div className="">
          <div className="">
            <ul className="bread-crumb clearfix">
              <li>
                <a
                  onClick={() => {
                    navigate("/");
                  }}
                  style={{ textDecoration: "none", opacity: "0.8" }}
                >
                  Home
                </a>
              </li>
              <li className="active">About Us</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="about-section-three mt-5 pt-2">
        <div className="responsiveSectionContainer about-section-one  pt-4 bg-white">
          <div className="row  clearfix">
            <div className="text-column col-lg-6 col-md-12 col-sm-12 pl-3">
              <div className="inner mb-sm-3 pt-0">
                <div className="sec-title">
                  <h3>
                    {" "}
                    <strong className="bold-sec-title-l bold8">
                      We Are{" "}
                      <TextUnderWrap padding={7}>iVestClub</TextUnderWrap>
                    </strong>
                  </h3>
                </div>
                <div className="lower-text mt-4">
                  <p className="textCompact DarkText">
                    Connecting Members Worldwide And Empowering You <br /> With
                    Access to Pre-IPO Companies.
                    <br />
                    Revolutionize Your Pre-IPO Journey with iVestClub
                  </p>
                </div>
                <div className=" mt-1">
                  <p className="compact-sub-text LightText">
                    At iVestClub, we are on a mission to transform the way you
                    access and engage with the world of Pre-IPO companies. Our
                    platform is designed to provide you with valuable insights
                    into these innovative firms, offering you a gateway to
                    explore their potential and opportunities.
                  </p>
                </div>
                <div className=" mt-3">
                  <p className="compact-sub-text">
                    Through the iVestClub Platform, you gain access to the
                    Pre-IPO company and a wealth of exclusive information and
                    resources, empowering you to make informed decisions and
                    stay ahead in the ever-evolving landscape of Pre-IPOs.{" "}
                  </p>
                </div>
                <div className=" mt-3">
                  <p className="compact-sub-text">
                    Our dynamic gateway grants you exclusive access to the most
                    promising late-stage Pre-IPO companies, providing you with
                    the insights, resources, and a community to help you
                    navigate this exciting industry.{" "}
                  </p>
                </div>
                <div className=" mt-4">
                  <p
                    style={{ fontSize: "12px" }}
                    className="LightText text-bold"
                  >
                    Get rewarded for your access to yoour chosen Pre-IPO
                    company.
                  </p>
                </div>
                <div className="col-lg-7 col-sm-12 mt-5 px-0 ">
                  <LargeButton text="Learn More about the membership clubs" />
                </div>
              </div>
            </div>

            <div className="image-column  col-lg-6 col-md-12 col-sm-12 pl-5">
              <figure
                className="image wow slideInRight animated"
                data-wow-delay="0ms"
                style={{
                  visibility: "visible",
                  animationDelay: "0ms",
                  animationName: "slideInRight",
                }}
              >
                <img src={about1} alt="" className="" />
              </figure>
            </div>
          </div>

          {/* <div className="row clearfix">
                    <div className="text-column col-lg-12 col-md-12 col-sm-12">
                        <div className="inner">
                            <div className="sec-title">
                                <h3>The following Countries/Organization
                                have agreed
                                to this manifesto:</h3>
                            </div>
                            <div className="lower-text">
                                <ul>
                                    <li className="lower-text"> Country 1 </li>
                                    <li className="lower-text"> Country 2 </li>
                                    <li className="lower-text"> ..... </li>
                                </ul>
                           
                            
                    
                            </div>
                        </div>
                    </div>
                </div> */}

          {/* <KilledChildren /> */}
        </div>
      </section>
      <section className="about-section-three mt-5">
        <div className="responsiveSectionContainer pb-5 ">
          <div className="row clearfix mt-3">
            <div className="image-column col-lg-6 col-md-12 col-sm-12 ">
              <figure
                className="image wow slideInLeft animated"
                data-wow-delay="0ms"
                style={{
                  visibility: "visible",
                  animationDelay: "0ms",
                  animationName: "slideInLeft",
                }}
              >
                <img src={about2} alt="" className="sec-image" />
              </figure>
            </div>
            <div className="text-column col-lg-6 col-md-12 col-sm-12 px-0">
              <div className="inner pl-5">
                <div className="sec-title">
                  <h4 className="sec-text">
                    Exclusive Benefits for iVestClub Members
                  </h4>
                </div>
                <div className="sec-content">
                  <div className=" mt-3 pt-1">
                    <p className="exclusiveContentText  mb-0">
                      <span className="boldContent">Access:</span> Get involved
                      in your targeted company and get rewarded for yor
                      participation.
                    </p>
                    <p className="exclusiveContentText  mb-0">
                      <span className="boldContent">
                        In-Depth Company Profiles:
                      </span>
                      Explore comprehensive profiles of the most exciting
                      Pre-IPO companies, featuring expert analysis that are
                      typically not available to the general public.
                    </p>
                    <p className="exclusiveContentText  mb-0">
                      <span className="boldContent">
                        Collaborative Learning Community:
                      </span>
                      Connect with a vibrant network of your peers, industry
                      professionals, and thought leaders. Engage in
                      thought-provoking discussions, collaborate with peers, and
                      share valuable insights, all while expanding your
                      knowledge of the Pre-IPO market.
                    </p>
                  </div>

                  <div className="">
                    <p className="exclusiveContentText mb-0">
                      <span className="boldContent">
                        Personalized Educational Resources:
                      </span>
                      Whether you're new to the Pre-IPO market or an experienced
                      investor, iVestClub is your go-to educational hub. Access
                      content tailored to your needs, learn from industry
                      leaders, and stay updated on the latest trends and
                      strategies.
                    </p>
                    <p className="exclusiveContentText  mb-3">
                      <span className="boldContent">
                        Rewarding Participation:
                      </span>
                      At iVestClub, every interaction is an opportunity for
                      growth and recognition. Actively participate in community
                      discussions, share your knowledge, and be rewarded for
                      your contributions with exclusive perks and opportunities.
                      Empower Your Investment Journey.
                    </p>
                    <p className="exclusiveContentText ">
                      With iVestClub, you're not just joining a platform; you're
                      becoming part of a community that's exploring the future
                      of industries and economies worldwide. Our mission is to
                      provide you with the tools, knowledge, and network to
                      navigate the complexities of Pre-IPO companies with
                      confidence, enabling you to make informed decisions at
                      your own pace, without the pressure of immediate
                      investment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-3 mt-1">
            <div className="sec-title mb-3">
              <h4>
                {" "}
                <div className="sec-offer bold-6">Join the Movement Today</div>
              </h4>
            </div>
          </div>
          <div className="ml-3">
            <p className="sec-offer-des">
              Don't miss out on this chance to explore Pre-IPo companies in a
              new way. Join iVestClub today and start a journey that will expand
              your investment knowledge and open up new possibilities. Discover
              innovative companies, connect with a supportive community, and
              learn how to engage with the Pre-IPO sector on your own terms.
              Your exclusive journey begins here.
            </p>
          </div>
          <div className="mt-4 pt-3 w-20 ml-3  mb-3 pb-2 pr-5">
            <LargeButton text={"Start Your Free journey"} />
          </div>
        </div>
      </section>
      <section className="page-banner bottom-banner ">
        <div
          className="image-layer "
          style={{
            backgroundImage: `url(${about3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="row  w-100 justify-content-center px-5 mx-3 my-4 pt-3">
          <div className="col-12 text-center mb-3">
            <h2 className="bold-sec-title">
              iVestClub Members
              <TextUnderWrap padding={7}>hip Sta</TextUnderWrap>ts
            </h2>
            <p className="statsSubHead Opacity  mt-4 mb-5">
              Leading cryptocurrency exchange since day one of crypto
              distribution
            </p>
          </div>
          <div className="row mt-3 w-90 justify-content-center">
            <div className="col-md-3 col-sm-6 text-center  border-right-banner">
              <h2 className="stats-dig">2</h2>
              <p className="stats-des text-basic text-light-c mt-2">
                Number of Membership Clubs
              </p>
            </div>
            <div className="col-md-3 col-sm-6 text-center border-right-banner">
              <h2 className="stats-dig">XXX</h2>
              <p className="stats-des text-basic text-light-c mt-2">
                Number of Members
              </p>
            </div>
            <div className="col-md-3 col-sm-6 text-center border-right-banner">
              <h2 className="stats-dig">20,000+</h2>
              <p className="stats-des text-basic text-light-c mt-2">
                ACTIVE ACCOUNTS
              </p>
            </div>
            <div className="col-md-3 col-sm-6 text-center ">
              <h2 className="stats-dig">10+</h2>
              <p className="stats-des text-basic text-light-c mt-2">
                YEARS ON THE MARKET
              </p>
            </div>
          </div>
        </div>
      </section>
      <MemberShip />
    </>
  );
};

export default About;
