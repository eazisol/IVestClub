import React from "react";
import logo from "../../src/assets/images/FooterLogo.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <footer className="main-footer">
        {/* <div className="image-layer" style={style}></div> */}

        <div className="auto-container">
          <div className="widgets-section ">
            <div className="row clearfix ">
              <div className="column big-column col-lg-3 col-md-3 col-sm-6">
                <div className="footer-widget logo-widget">
                  <div className="widget-content">
                    <div className="footer-logo pl-5">
                      <a
                        className=" text-light-c "
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        <img
                          src={logo}
                          height={100}
                          width={100}
                          alt=""
                          style={{ borderRadius: "50px" }}
                        />
                      </a>
                    </div>

                    <ul className="social-links clearfix  pl-5">
                      <li>
                        <a href="#" className="mr-2">
                          <span className="fab  fa-facebook-f"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="mr-2">
                          <span className="fab fa-instagram"></span>
                          
                        </a>
                      </li>
                      <li>
                        <a href="#" className="mr-2">
                          <span className="fab fa-twitter"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="mr-2">
                          <span className="fab fa-snapchat-ghost"></span>
                        </a>
                      </li>
                      {/* <li>
                        <a href="#">
                          <span className="fab fa-youtube"></span>
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="column big-column col-lg-2 col-md-2 col-sm-6">
                <div className="footer-widget links-widget">
                  <div className="widget-content">
                    <h6>Navigation</h6>
                    <ul style={{ paddingLeft: 0 }}>
                      <li>
                        <a
                          className="text-light-c linkList"
                          onClick={() => {
                            navigate("/");
                            window.location.reload();
                          }}
                        >
                          How to buy
                        </a>
                      </li>
                      <li>
                        <a
                          className=" text-light-c linkList"
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          Overview
                        </a>
                      </li>
                      {/* <li><a className=" text-light-c "onClick={()=>{navigate("/peopleaffilation")}}>People & Affilations</a></li> */}
                      <li>
                        <a
                          className=" text-light-c linkList"
                          onClick={() => {
                            navigate("/");
                            if (location.pathname == "/WarsAndConflict") {
                              window.location.reload();
                            }
                          }}
                        >
                          Blog news
                        </a>
                      </li>
                      {/* <li><a className=" text-light-c "onClick={()=>{navigate("/manifesto")}}>Manifesto</a></li> */}
                      {/* <li><a className=" text-light-c "onClick={()=>{navigate("/pedocidewatch")}}>Pedocide Watch</a></li> */}
                      <li>
                        <a
                          className=" text-light-c linkList"
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          How to sell
                        </a>
                      </li>

                      {/* <li><a className=" text-light-c "onClick={()=>{navigate("/blog")}}>Blog</a></li> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="column big-column col-lg-2 col-md-2 col-sm-4">
                <div className="footer-widget links-widget">
                  <div className="widget-content">
                    <h6>Network</h6>
                    <ul style={{ paddingLeft: 0 }}>
                      {/* <li><a className=" text-light-c "onClick={()=>{navigate("/")}}>Home</a></li> */}
                      {/* <li><a className=" text-light-c "onClick={()=>{navigate("/goal")}}>Goals</a></li> */}
                      <li>
                        <a
                          className=" text-light-c linkList"
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          Network Stats
                        </a>
                      </li>
                      {/* <li><a className=" text-light-c "onClick={()=>{navigate("/WarsAndConflict")}}>Current Wars & Conflicts</a></li> */}
                      <li>
                        <a
                          className=" text-light-c linkList"
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          Block Explorers
                        </a>
                      </li>
                      <li>
                        <a
                          className=" text-light-c linkList"
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          Governance
                        </a>
                      </li>
                      <li>
                        <a
                          className=" text-light-c linkList"
                          onClick={() => {
                            navigate("/");
                          }}
                        >
                          Exchanging Markets
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="column big-column col-lg-2 col-md-2 col-sm-4">
                <div className="footer-widget links-widget">
                  <div className="widget-content">
                    <h6>Support</h6>
                    <ul className="contact-info" style={{ paddingLeft: 0 }}>
                      <li>
                        <a className=" text-light-c linkList" target="_blank" style={{ textDecoration: "none" }}>
                          Contact Us
                        </a>
                      </li>
                      <li>
                        <a className=" text-light-c linkList" target="_blank" style={{ textDecoration: "none" }}>
                          Developer Center
                        </a>
                      </li>
                      <li>
                        <a className=" text-light-c linkList" target="_blank" style={{ textDecoration: "none" }}>
                          Helps
                        </a>
                      </li>
                      <li>
                        <a className=" text-light-c linkList" target="_blank" style={{ textDecoration: "none" }}>
                          Terms & Conditions
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="column big-column col-lg-2 col-md-2 col-sm-4">
                <div className="footer-widget links-widget">
                  <div className="widget-content">
                    <h6>About Us</h6>
                    <ul className="contact-info" style={{ paddingLeft: 0 }}>
                      <li>
                        <a className=" text-light-c linkList" target="_blank" style={{ textDecoration: "none" }}>
                          Our coin
                        </a>
                      </li>
                      <li>
                        <a className=" text-light-c linkList" target="_blank" style={{ textDecoration: "none" }}>
                          Carrers
                        </a>
                      </li>
                      <li>
                        <a className=" text-light-c linkList" target="_blank" style={{ textDecoration: "none" }}>
                          Our Team
                        </a>
                      </li>
                      <li>
                        <NavLink
                          to={"/Membership/FutureClubs"}
                          style={{ textDecoration: "none" }}
                          className=" text-light-c linkList"
                        >
                          Our Project
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="auto-container">
            <div className="inner">
              <div className="copyright  text-light-c">
              <span>  © 2024 iVest Club All rights reserved. Design by{" "}</span>
                <a
                  href="https://eazisols.com/"
                  style={{ textDecoration: "underline" }}
                  target="_blank"
                  className=" text-light-c"
                >
                  eazisols.
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
