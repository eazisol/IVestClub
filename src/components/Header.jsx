import React, { useState, useEffect } from "react";
import logo from "../../src/assets/images/HeaderLogo.png";
import { useNavigate, useLocation } from "react-router-dom";
import MobileDrawer from "./MobileDrawer";
import { appData } from "./Context/AppContext";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { HeaderLink } from "./Common/MiniComponents";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { warId, setWarId, setShowSingleWarData } = appData();
  const { isAuthenticated,
    setIsAuthenticated } = appData();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getBackgroundColor = () => {
    if (location.pathname === "/" && !isScrolled) {
      return "transparent";
    }
    return "";
  };


  return (
    <>
      <header className="main-header header-style-one">
        <div
          className="header-upper"
          style={{ backgroundColor: getBackgroundColor() }}
        >
          <div className="auto-container header-container">
            <div className="inner-container clearfix">
              <div className="logo-box">
                <div className="logo">
                  <a
                    onClick={() => {
                      navigate("/");
                    }}
                    title="iVest Club"
                  >
                    <img
                      src={logo}
                      alt="iVest Club"
                      title=""
                      className="header-logo-img"
                    />
                  </a>
                </div>
              </div>

              <div className="nav-outer clearfix d-flex justify-content-center align-items-center">
                {/* <div className="mobile-nav-toggler">
                                    <span className="icon flaticon-menu-1"></span>
                                </div> */}

                <nav className="main-menu navbar-expand-md navbar-light mr-3">
                  <div
                    className="collapse navbar-collapse show clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation clearfix">
                      <li
                        className={
                          location.pathname == "/"
                            ? "current dropdown "
                            : "dropdown "
                        }
                      >
                        <HeaderLink
                          text="Home"
                          onClick={() => {
                            navigate("/");
                          }}
                        />
                      </li>
                      <li
                        className={
                          location.pathname == "/About"
                            ? "current dropdown "
                            : "dropdown "
                        }
                      >
                        <HeaderLink
                          text="About Us"
                          onClick={() => {
                            navigate("/About");
                          }}
                        />
                      </li>
                      <li
                        className={
                          location.pathname == "/Membership"
                            ? "current dropdown "
                            : "dropdown "
                        }
                      >
                        <HeaderLink
                          text="MemberShip Club"
                          onClick={() => {
                            navigate("/Membership");
                          }}
                        />
                      </li>
                      {/* <li
                        className={
                          location.pathname == "/warsandconflict"
                            ? "current dropdown "
                            : "dropdown "
                        }
                      >
                        <a>Past Wars</a>
                        <ul>
                          <li>
                            <a
                              onClick={() => {
                                console.log("location.pathname",location.pathname);
                                // setmainLoader(true)
                                // getData(`/get-war-data/${0}`);
                                navigate("/");
                                
                              }}
                            >
                              Past Wars
                            </a>
                          </li>

                          <li>
                            <a
                              onClick={() => {
                                navigate("/");
                               
                              }}
                            >
                              Current Wars
                            </a>
                          </li>
                        </ul>
                      </li> */}

                      <li
                        className={
                          location.pathname == "/manifesto"
                            ? "current dropdown "
                            : "dropdown "
                        }
                      >
                        <HeaderLink
                          text="Blogs"
                          onClick={() => {
                            navigate("/");
                          }}
                        />
                      </li>
                      <li
                        className={
                          location.pathname == "/manifesto"
                            ? "current dropdown "
                            : "dropdown "
                        }
                      >
                        <HeaderLink
                          text="Contact Us"
                          onClick={() => {
                            navigate("/");
                          }}
                        />
                      </li>

                                 
                    </ul>
                  </div>
                </nav>
                <SearchIcon sx={{ color: "#fff" }} />




  

 {/*This is Conditional rendering based on authentication */}
 

{isAuthenticated ? (
                  <>
                    <div className="donate-link">
                      <a onClick={() => navigate("/SignUp")} className="theme-btn btn-style-one" style={{ textDecoration: "none",fontSize:"12px" , fontWeight:"500" , fontFamily:"'Poppins',san-serif" }}>
                        <span className="btn-title">Connect Wallet</span>
                      </a>
                    </div>
                  
                    <NotificationsOutlinedIcon sx={{ color: "#fff" }} />
                    <div
                      className="mx-2"
                      style={{ padding: "3px", backgroundColor: "#282A35", borderRadius: "200px", cursor: "pointer" }}
                      onClick={() => navigate("/Dashboard")}
                    >
                      <AccountCircleOutlinedIcon sx={{ color: "#fff" }} />
                    </div>
                    <MobileDrawer />
                                     
                  </>
                ) : (
                  <>
                  <nav className="main-menu navbar-expand-md navbar-light mr-3">
                    <div  className="collapse navbar-collapse show clearfix"
                    id="navbarSupportedContent">
                      <ul className="navigation clearfix">
                    <li  
                        className={
                          location.pathname == "/Login"
                            ? "current dropdown "
                            : "dropdown "
                        }
                      >
                        <HeaderLink
                        
                          text="Login"
                          onClick={() => {
                            navigate("/Login");
                          }}
                        />
                      </li>
                      </ul>
                      </div>
                      </nav>

                      <div className="donate-link">
                      <a onClick={() => navigate("/SignUp")} className="theme-btn btn-style-one" style={{ textDecoration: "none",fontSize:"12px" , fontWeight:"500" , fontFamily:"'Poppins',san-serif" }}>
                        <span className="btn-title">Register</span>
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-menu">
          <div className="menu-backdrop"></div>
          <div className="close-btn">
            <span className="icon flaticon-cancel"></span>
          </div>
          <nav className="menu-box">
            <div className="nav-logo">
              <a href="index-2.html">
                <img src={logo} alt="" title="" />
              </a>
            </div>
            <div className="menu-outer"></div>
            <div className="social-links">
              <ul className="clearfix">
                <li>
                  <a href="#">
                    <span className="fab fa-twitter"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="fab fa-facebook-square"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="fab fa-pinterest-p"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="fab fa-instagram"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="fab fa-youtube"></span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <section></section>
    </>
  );
};

export default Header;
