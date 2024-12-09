import React, { useEffect, useState } from "react";
import landingimg from "../../assets/image/landingimg.png";
import HeroGraph1 from "../../assets/image/HeroGraph1.png";
import HeroGraph3 from "../../assets/image/HeroGraph3.png";
import HeroGraph2 from "../../assets/image/HeroGraph2.png";
import { FilledButtonLight, OutlinedButtonLight } from "../Common/Buttons";
import { ImgBgSactionContainer } from "../Common/Containers";
import { TextUnderWrap } from "../Common/MiniComponents";
import { appData } from "../Context/AppContext";
import CreateAccountModal from "../Common/CreateAccountModal";
import { useNavigate } from "react-router-dom";
const HeroSaction = () => {
 const navigate =  useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const { setShowLandingSaction, showLandingSaction } = appData();
  const handlePresentationClick = (index) => {
    setActiveIndex(index);
    const carousel = document.querySelector("#carouselIvest");
    if (carousel) {
      $(carousel).carousel(index);
    }
  };

  useEffect(() => {
    
      if (showLandingSaction) {
        
        handlePresentationClick(0)
      }
        
        
  }, [showLandingSaction])
  

  return (
    <ImgBgSactionContainer bgImage={landingimg} showPadding={false} hero >
      <div
        id="carouselIvest"
        className="carousel slide carousel-fade"
        data-ride="carousel"
        data-interval="false"
      >
        {/* This is the Element of Carousel on the First Index  */}
        <div className="carousel-inner " >
          <div className={`carousel-item ${activeIndex === 0 ? "active" : ""}`}>
            <div className="row mt-5">
              <div className="col-xl-11 mt-2 pl-xl-3">
                <h1 className="mb-4 mt-5">
                  <TextUnderWrap>IVest C</TextUnderWrap>lub.
                </h1>
                <div className="mt-4 heroHead pt-1">
                  Your Gateway to Pre-IPO Companies
                </div>
                <p
                  className="hero-text text-light-c w-60 mb-0 mt-3 pl-1"
                  style={{ lineHeight: "1.7em" }}
                >
                  At iVest Club, we believe you should have equal access to
                  opportunities about late-stage companies that are currently
                  privately owned and not listed on an exchange. Our Gateway
                  empowers you to gain access to these Pre-IPO companies, share
                  information with peers in a fun and rewarding environment.
                  iVest Club aims to level the playing field for you and
                  democratize the landscape ahead of an IPO, making it inclusive
                  for all.
                </p>
                <p className="hero-text text-light-c w-60">
                  Get ready for the exciting journey ahead as these companies
                  transition to the public market!
                </p>
                <div className="heroSub ">
                  Are you ready to join SpaceX on its IPO journey?
                </div>
                <div className="heroSub mt-3">
                  By becoming an exclusive member you will get the benefits just
                  like the ultra-rich. Join Now For Free!
                </div>

                <div className=" mt-1 row">
                  <div className="col-lg-2 col-sm-6 pt-2 mt-4 ">
                    <CreateAccountModal text={<span className="fillBtn ">Join For Free Now</span>} />
                  </div>
                  <div className="col-lg-3 col-sm-6 pt-2 mt-4 ">
                    <OutlinedButtonLight
                      onClick={() => {
                        handlePresentationClick(1);
                        setShowLandingSaction(false);
                      }}
                      text={
                        <>
                          <span className="fa fa-solid fa-play small-icon mr-2"></span>{" "}
                        <span className="outBtn"> Presentation </span>
                        </>
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-1 d-none  d-xl-flex flex-column justify-content-center main-footer">
                <ul className="social-links  iconContainer clearfix mb-0 text-right">
                  <li className="mb-3 w-100 d-flex justify-content-end">
                    <a href="https://www.facebook.com">
                      <span className="fab fa-xs fa-facebook-f"></span>
                    </a>
                  </li>
                  <li className="mb-3 w-100 d-flex justify-content-end">
                    <a href="https://www.instagram.com">
                      <span className="fab fa-xs fa-instagram"></span>
                    </a>
                  </li>
                  <li className="mb-3 w-100 d-flex justify-content-end">
                    <a href="https://www.twitter.com">
                      <span className="fab fa-xs fa-twitter"></span>
                    </a>
                  </li>
                  <li className="mb-3 w-100 d-flex justify-content-end">
                    <a href="https://www.snapchat.com">
                      <span className="fab fa-xs fa-solid fa-snapchat"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* This is the second element on the Carousel index  */}
          <div className={`carousel-item ${activeIndex === 1 ? "active header-height" : " header-height"}`}>
            <div className="row mt-5 pt-5 pt-xl-0">
              <div className="col-12 col-xl-7">
                <h1 className="mb-4">
                  <TextUnderWrap>IVest C</TextUnderWrap>lub.
                </h1>
                <h4 className="mt-4 pt-3">
                  Your Exclusive Gateway to Pre-IPO Companies
                </h4>
                <p
                  className="text-basic text-light-c w-70 mb-0"
                  style={{ lineHeight: "1.7em" }}
                >
                  Are you interested in the leading companies that are shaping
                  our future?
                </p>
                <p className="text-basic text-light-c w-65">
                  Would You like to learn more about these companies? <br />
                  Do you want to get rewarded for your interest in these Pre-IPo
                  companies?
                </p>

                <p
                  className="text-basic text-light-c w-65 mb-0"
                  style={{ lineHeight: "1.7em" }}
                >
                  IVest Club is open to everyone worldwide apart from US
                  residents and Nationals
                </p>

                <div className="w-100 d-flex  flex-column mt-5 ">
                  <div className="col-lg-11 col-sm-6 mb-4 p-0">
                    <CreateAccountModal
                      text={
                        "Yes, I'm ready to start my Pre-IPo journey by joining IVest Club for Free!"
                      }
                    />
                  </div>
                  <div className="col-lg-8 col-sm-6 p-0">
                    <FilledButtonLight
                      onClick={() => handlePresentationClick(2)}
                      text={
                        "Not Yet I want to learn more about IVest Club first!"
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-4 mt-3 mt-xl-0 align-content-center">
                <img
                  src={HeroGraph1}
                  className=""
                  style={{
                    width: "400px",
                    height: "250px",
                  }}
                />
              </div>

              <div className="col-xl-1 d-none  d-xl-flex flex-column justify-content-center main-footer">
                <ul className="social-links clearfix">
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-facebook-f"></span>
                    </a>
                  </li>
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-twitter"></span>
                    </a>
                  </li>
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-vimeo-v"></span>
                    </a>
                  </li>
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-instagram"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`carousel-item ${activeIndex === 2 ? "active header-height" : "header-height"}`}>
            <div className="row mt-5 pt-5 pt-xl-0">
              <div className="col-12 col-xl-7">
                <h1 className="mb-4">
                  <TextUnderWrap>IVest C</TextUnderWrap>lub.
                </h1>
                <h4 className="mt-4 pt-3">
                  Your Exclusive Gateway to Pre-IPO Companies
                </h4>
                <p
                  className="text-basic text-light-c w-60 mb-0"
                  style={{ lineHeight: "1.7em" }}
                >
                  Are you aware that there are a growing number of companies
                  that are privately owned and that knowledgeable wealthy people
                  have access to them and are a step ahead of you?
                </p>

                <p
                  className="text-basic text-light-c w-61"
                  style={{ marginTop: "20px" }}
                >
                  Would you like to get exclusive access to these companies just
                  like them?
                </p>

                <div className="row mt-0 mt-xl-5">
                  <div className="col-lg-4 col-sm-6  ">
                    <FilledButtonLight
                      onClick={() => handlePresentationClick(3)}
                      text={"Tell me more!"}
                    />
                  </div>
                  <div className="col-lg-8 col-sm-6 mt-2 mt-xl-0">
                    <CreateAccountModal
                      text={" Great I'm ready to create my free account!"}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-4 mt-3 mt-xl-0  align-content-center">
                <img
                  src={HeroGraph1}
                  className=""
                  style={{
                    width: "400px",
                    height: "250px",
                  }}
                />
              </div>
              <div className="col-xl-1 d-none  d-xl-flex flex-column justify-content-center main-footer">
                <ul className="social-links clearfix">
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-facebook-f"></span>
                    </a>
                  </li>
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-twitter"></span>
                    </a>
                  </li>
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-vimeo-v"></span>
                    </a>
                  </li>
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-instagram"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`carousel-item ${activeIndex === 3 ? "active header-height" : "header-height"}`}>
            <div className="row mt-5 pt-5 pt-xl-0">
              <div className="col-12 col-xl-7">
                <h1 className="mb-4">
                  <TextUnderWrap>IVest C</TextUnderWrap>lub.
                </h1>
                <h4 className="mt-4 pt-3">
                  Your Exclusive Gateway to Pre-IPO Companies
                </h4>
                <p
                  className="text-basic text-light-c w-61 mb-0"
                  style={{ lineHeight: "1.7em" }}
                >
                  Did you know some of the best returns are from knowing
                  comanies before they IPO?
                </p>

                <p
                  style={{ marginTop: "20px" }}
                  className="text-basic text-light-c w-60"
                >
                  Do you own these stocks and wish you had known about them
                  before they did their IPO - Join us at iVest Club to lget
                  access to these companies?
                </p>

                <div className="row mt-0 mt-xl-5">
                  <div className="col-lg-4 col-sm-6 mt-5 mt-xl-0">
                    <FilledButtonLight
                      onClick={() => handlePresentationClick(4)}
                      text={"Tell me more!"}
                    />
                  </div>
                  <div className="col-lg-7 col-sm-6 mt-2 mt-xl-0">
                    <CreateAccountModal
                      text={"  Ok, I'm ready to create my free account!"}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-4 mt-3 mt-xl-0  align-content-center">
                <img
                  src={HeroGraph2}
                  className=""
                  style={{
                    width: "370px",
                    height: "370px",
                    // position: "absolute",
                    // top: "25%",

                    // right:"1%",
                  }}
                />
              </div>

              <div className="col-xl-1 d-none  d-xl-flex flex-column justify-content-center main-footer">
                <ul className="social-links clearfix">
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-facebook-f"></span>
                    </a>
                  </li>
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-twitter"></span>
                    </a>
                  </li>
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-vimeo-v"></span>
                    </a>
                  </li>
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-instagram"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className={`carousel-item ${activeIndex === 4 ? "active header-height" : "header-height"}`}>
            <div className="row mt-5 pt-5 pt-xl-0">
              <div className="col-12 col-xl-7">
                <h1 className="mb-4">
                  <TextUnderWrap>IVest C</TextUnderWrap>lub.
                </h1>
                <h4 className="mt-4 pt-3">
                  Your Exclusive Gateway to Pre-IPO Companies
                </h4>
                <p
                  className="text-basic text-light-c  mb-0"
                  style={{ lineHeight: "1.7em" }}
                >
                  Ae you ready to get access to Pre-IPO companies like SpaceX,
                  OpenAI and many more?
                </p>
                <p className="text-basic text-light-c ">
                  Join other like-minded peers to get your exclusive access to
                  companies just like high net worth individuals and start
                  earning rewards!
                </p>

               
                  <div className="col-lg-9 col-sm-6 mt-5 ">
                    <CreateAccountModal
                      text={
                        " I’m in, this is my email - start my free registration!"
                      }
                    />
                  </div>
               
                <div className="row">
                  <div className="col-lg-5 col-sm-6 mt-xl-5 mt-2">
                    <FilledButtonLight
                      onClick={() => navigate("/Login")}
                      text={"I already have an account"}
                    />
                  </div>
                  <div className="col-lg-4 col-sm-6 mt-xl-5 mt-2 ">
                    <FilledButtonLight text={<>Tell me more!</>}  onClick={() => handlePresentationClick(0)}/>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-4 mt-3 mt-xl-0  align-content-center">
                <img
                  src={HeroGraph3}
                  className=""
                  style={{
                    width: "380px",
                    height: "230px",
                    // position: "absolute",
                    // top: "25%",

                    // right:"1%",
                  }}
                />
              </div>
              <div className="col-xl-1 d-none  d-xl-flex flex-column justify-content-center main-footer">
                <ul className="social-links clearfix">
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-facebook-f"></span>
                    </a>
                  </li>
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-twitter"></span>
                    </a>
                  </li>
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-vimeo-v"></span>
                    </a>
                  </li>
                  <li className="mb-2 w-100">
                    <a href="#">
                      <span className="fab fa-instagram"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ImgBgSactionContainer>
  );
};

export default HeroSaction;
