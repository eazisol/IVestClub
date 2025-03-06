import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { appData } from "../components/Context/AppContext.jsx";
import ScrollToTop from "../components/Scroll/ScrollToTop.jsx";
import EventPopups from "../components/Common/EventPopups.jsx";
import MaterialModal from "../components/Common/MaterialModal.jsx";
import useInactivityDetector from "../components/Common/useInactivityDetector.jsx";
import { LargeButton } from "../components/Common/Buttons.jsx";

const Layout = () => {
  const {
    showLandingSaction,
    setShowLandingSaction,
    userData,
    setUserData,
    showHeader,
    handleLogout,
  } = appData();
  const location = useLocation();
  const inactive = useInactivityDetector();
  const [inactivityModal, setInactivityModal] = useState(false);
  const localuserdata = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : { access_token: "" };

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
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    if (inactive && userData.access_token) {
      setInactivityModal(true);
    }
  }, [inactive]);

  return (
    <>
      <EventPopups />
      {showHeader && (
        <Header
          showSearchInput={showSearchInput}
          setShowSearchInput={setShowSearchInput}
        />
      )}
      <div
        className="outlet-container"
        style={{
          marginTop:
            (location.pathname == "/" ||
              location.pathname === "/About" ||
              location.pathname === "/Membership") &&
            0,
        }}
        onClick={() => {
          setShowSearchInput(false);
        }}
      >
        <MaterialModal open={inactivityModal}>
          <>
            <div className="ModalContainer p-3 z-index-0">
              <div className="row">
                <div className="col-12">
                  <div className="text-dark modalHeading">
                    {" "}
                    Inactivity timeout
                  </div>
                </div>

                <div className="modalSection">
                  <div
                    className="col-12 modal-des"
                    style={{ marginTop: "10px" }}
                  >
                    <p className="text-basic">
                      You have inactive for more then one hour click cancel
                      button to continue session
                    </p>
                  </div>
                </div>
              </div>

              <div className="modalBtns row text-center mt-3 p-3 justify-content-center">
                <LargeButton
                  text={"Logout"}
                  onClick={() => {
                    handleLogout();

                    setInactivityModal(false);
                  }}
                />

                <p
                  className="text-basic text-dark w-auto mt-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setInactivityModal(false);
                  }}
                >
                  Cancel
                </p>
              </div>
            </div>
          </>
        </MaterialModal>
        <Outlet />
      </div>
      {showLandingSaction && (
        <div
          className="sectionbgimage"
          onClick={() => {
            setShowSearchInput(false);
          }}
        >
          <Footer />
        </div>
      )}
      <ScrollToTop />
    </>
  );
};

export default Layout;
