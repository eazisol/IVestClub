import React, { useEffect,useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { appData } from "../components/Context/AppContext.jsx";
import ScrollToTop from "../components/Scroll/ScrollToTop.jsx";
import EventPopups from "../components/Common/EventPopups.jsx";
import MaterialModal from "../components/Common/MaterialModal.jsx";


const Layout = () => {
  const { showLandingSaction, setShowLandingSaction, userData, setUserData } =
    appData();
  const location = useLocation();
  const localuserdata = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {access_token : ""};

  useEffect(() => {
    setShowLandingSaction(true);
    setUserData(localuserdata);
    console.log("localuserdatalocaluserdata", localuserdata);
  }, [location.pathname]);

  useEffect(() => {
    // Scroll down by a set amount (e.g., 100px)
    window.scrollTo({ top: 10 });

    // Scroll back to the top after 2 seconds (2000ms)
    const scrollBackTimeout = setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 50);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(scrollBackTimeout);
  }, []);
const [showSearchInput, setShowSearchInput] = useState(false)
  return (
    <>
      <EventPopups />

      <Header showSearchInput={showSearchInput} setShowSearchInput={setShowSearchInput}/>
      <div
        className="outlet-container"
        style={{
          marginTop:
            (location.pathname == "/" ||
            location.pathname === "/About" ||
            location.pathname === "/Membership") && 0,
        }}
        onClick={() => {setShowSearchInput(false)}}
      >
        <MaterialModal />
        <Outlet />
      </div>
      {showLandingSaction && (
        <div className="sectionbgimage"  onClick={() => {setShowSearchInput(false)}}>
          <Footer />
        </div>
      )}
      <ScrollToTop />
    </>
  );
};

export default Layout;
