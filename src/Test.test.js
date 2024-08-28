import React, { useState } from "react";
import landingimg from "../../assets/image/landingimg.png";
import { FilledButtonLight, OutlinedButtonLight } from "../Common/Buttons";
import { ImgBgSactionContainer } from "../Common/Containers";
import { TextUnderWrap } from "../Common/MiniComponents";

const HeroSaction = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePresentationClick = (index) => {
    const carousel = document.querySelector("#carouselExampleControls");
    if (carousel) {
      $(carousel).carousel(index); // Move to the selected slide
    }
    setActiveIndex(index); // Update the activeIndex state after moving the slide
  };

  return (
    <ImgBgSactionContainer bgImage={landingimg} padding={5}>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
        data-interval="false"
      >
        <div className="carousel-inner">
          <div className={`carousel-item ${activeIndex === 0 ? "active" : ""}`}>
            <div className="row mt-5">
              <div className="col-11">
                <h1 className="mb-4">
                  <TextUnderWrap>iVest C</TextUnderWrap>lub.
                </h1>
                <h4 className="mt-4 pt-3">
                  Your Gateway to Pre-IPO Companies
                </h4>
                <p
                  className="text-basic text-light-c w-60 mb-0"
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
                <p className="text-basic text-light-c w-50">
                  Get ready for the exciting journey ahead as these companies
                  transition to the public market!
                </p>
                <h6>
                  Are you ready to join SpaceX on its IPO journey?
                </h6>
                <h6 className="mt-3">
                  By becoming an exclusive member you will get the benefits just
                  like the ultra-rich. Join Now For Free!
                </h6>
              </div>
              <div className="col-1 d-flex flex-column-reverse main-footer">
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
              <div className="w-80 d-flex">
                <div className="col-lg-3 col-sm-6 mt-5">
                  <FilledButtonLight text={"Join for free now"} />
                </div>
                <div className="col-lg-3 col-sm-6 mt-5">
                  <OutlinedButtonLight
                    onClick={() => handlePresentationClick(1)}
                    text={
                      <>
                        <span className="fa fa-solid fa-play small-icon mr-2"></span>{" "}
                        Presentation
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`carousel-item ${activeIndex === 1 ? "active" : ""}`}>
            <div className="row mt-5">
              <div className="col-11">
                <h1 className="mb-4">
                  <TextUnderWrap>iVest C</TextUnderWrap>lub.
                </h1>
                <h4 className="mt-4 pt-3">
                  Your Gateway to Pre-IPO Companies
                </h4>
                <p
                  className="text-basic text-light-c w-60 mb-0"
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
                <p className="text-basic text-light-c w-50">
                  Get ready for the exciting journey ahead as these companies
                  transition to the public market!
                </p>
                <h6>
                  Are you ready to join SpaceX on its IPO journey?
                </h6>
                <h6 className="mt-3">
                  By becoming an exclusive member you will get the benefits just
                  like the ultra-rich. Join Now For Free!
                </h6>
              </div>
              <div className="col-1 d-flex flex-column-reverse main-footer">
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
              <div className="w-80 d-flex">
                <div className="col-lg-3 col-sm-6 mt-5">
                  <FilledButtonLight text={"Join for free now"} />
                </div>
                <div className="col-lg-3 col-sm-6 mt-5">
                  <OutlinedButtonLight
                    onClick={() => handlePresentationClick(2)}
                    text={
                      <>
                        <span className="fa fa-solid fa-play small-icon mr-2"></span>{" "}
                        Presentation2
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
         