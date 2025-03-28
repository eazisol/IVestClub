import React from "react";
import { useNavigate } from "react-router-dom";
import about from "../../assets/image/about.png";
import about1 from "../../assets/image/about1.png";
import about2 from "../../assets/image/about2.png";
import about3 from "../../assets/image/about3.png";
import about4 from "../../assets/image/about4.png";
// import MemberShip from "./MemberShip";
import { TextUnderWrap } from "../Common/MiniComponents";
import { LargeButton } from "../Common/Buttons";
import CreateAccountModal from "../Common/CreateAccountModal";

const Tokens = () => {
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
          <h2 className="bannerHead mt-4 pt-1">IvestClub Tokenomics</h2>
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
              <li className="active">Tokens</li>
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
                      <TextUnderWrap padding={7}>the Tokens</TextUnderWrap> on
                      the platform?
                    </strong>
                  </h3>
                </div>
                <div className="mt-4">
                  <p className="textCompact DarkText">
                    {" "}
                    <strong style={{ fontSize: "24px" }}>
                      Two types of tokens:{" "}
                    </strong>{" "}
                    iVestClub Platform token (IVT) and Membership Tokens
                  </p>
                </div>
                <div>
                  <p className="textCompact DarkText">
                    {" "}
                    <strong style={{ fontSize: "24px" }}> IVT Token: </strong>
                    Your token that provides the gateway to the membership clubs
                  </p>
                </div>
                <div>
                  <p className="textCompact DarkText">
                    {" "}
                    <strong style={{ fontSize: "24px" }}>
                      Membership Token:{" "}
                    </strong>{" "}
                    Represents your ownership of the membership club abd used to
                    access services of the club.
                  </p>
                </div>
                <div className=" mt-1">
                  <p className="compact-sub-text LightText">
                    The mission of iVestClub is to provide you access to
                    membership clubs linked to a specific Pre-IPO company. To
                    achieve this, each membership club has its own unique token
                    (with a unique identifier) which not only is used to verify
                    your membership but forms the basis of both access to the
                    club services but also as a way to provide you with rewards
                    for your engagement. Memebership Club tokens can ony be
                    exchanged for iVestClub tokens.
                  </p>
                </div>
                <div className=" mt-3">
                  <p className="compact-sub-text">
                    The membership club tokens are unified by the iVestClub
                    platform token called IVT. IVT can be purchased using Crypto
                    like USDT, and in future using cash. Both tokens do not
                    represent a direct investment in any Pre-IPO company in any
                    way and soley for the use on this plaform.
                  </p>
                </div>
              </div>
            </div>

            <div className="image-column  col-lg-6 col-md-12 col-sm-12 mt-3 mt-xl-0 pl-3 pl-xl-5">
              <figure
                className="image wow d-flex justify-content-center slideInRight animated"
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
        </div>
      </section>
      <section className="about-section-three mt-5">
        <div className="responsiveSectionContainer pb-5 ">
          <div className="row clearfix mt-3">
            <div className="image-column col-lg-6 col-md-12 col-sm-12 ">
              <figure
                className="image wow d-flex justify-content-center slideInLeft animated"
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
              <div className="inner pl-3 pl-xl-0">
                <div className="sec-title">
                  <h4
                    style={{
                      fontSize: "30px",
                      fontWeight: "bold",
                      fontStyle: "italic",
                      color: "#333333",
                    }}
                  >
                    iVestClub (IVT) Tokenomics
                  </h4>
                </div>
                <div className="sec-content">
                  <div className=" mt-3 pt-1">
                    <p
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "15px",
                        fontWeight: "400",
                        color: "#333333",
                      }}
                    >
                      IVT is the native coin of the iVestClub platform developed
                      on the ERC-20 network and designed to provide you with.
                    </p>

                    <p className="exclusiveContentText d-flex  align-items-center">
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "#F7B138",
                        }}
                      >
                        01
                      </span>
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "18px",
                          fontWeight: "400",
                          color: "#555555",
                          marginLeft: "36px",
                        }}
                      >
                        Development of your iVestClub Platform
                      </span>
                    </p>
                    <p className="exclusiveContentText d-flex  align-items-center mt-3">
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "#F7B138",
                        }}
                      >
                        02
                      </span>
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "18px",
                          fontWeight: "400",
                          color: "#555555",
                          marginLeft: "36px",
                        }}
                      >
                        Create, Provide and Manage access to your choice of
                        Membership Club
                      </span>
                    </p>

                    <p className="whitepaper-text mt-3">
                      There are a maximum of 4,565,000,000, which will allow us
                      to create a limited number of membership clubs. There are
                      81,000,000 IVT tokens created at the start of the platform
                      and when a new membership club is formed, another
                      37,500,000 tokens are minted.
                    </p>

                    <p className="whitepaper-text ">
                      Please click here for our whitepaper, where you can find
                      out more about the token
                    </p>
                    <h4
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        fontStyle: "italic",
                        color: "#333333",
                      }}
                    >
                      Membership Club Tokenomics
                    </h4>

                    <p className="whitepaper-text ">
                      Membership club tokens, developed on Ethereum, are unique
                      to each membership club.
                    </p>
                    <p className="whitepaper-text ">
                      Each Membership club will have a total of 25,000,000
                      tokens available . Once a membership club has sold all
                      these tokens, you can only gain access by offering to
                      purchase it from an existing member.
                    </p>
                    <p className="whitepaper-text ">
                      Please click here for our white paper, where you can find
                      out the token
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
              Don't miss out on this chance to explore Pre-IPO companies in a
              new way. Join IVestClub today and start a journey that will expand
              your investment knowledge and open up new possibilities. Discover
              innovative companies, connect with a supportive community, and
              learn how to engage with the Pre-IPO sector on your own terms.
              Your exclusive journey begins here.
            </p>
          </div>
          <div className="mt-4 pt-3 ml-3  mb-3 pb-2 pr-5 col-12 col-xl-3">
            {/* <LargeButton text={"Start Your Free journey"} /> */}
            <CreateAccountModal
              Component={LargeButton}
              text={"Start Your Free journey!"}
            />
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
        <div className="row  justify-content-center px-5 mx-3 my-4 pt-3">
          <div className="col-12 text-center mb-3">
            <h2 className="bold-sec-title">
              IVestClub Members
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
      {/* <MemberShip /> */}
    </>
  );
};

export default Tokens;
