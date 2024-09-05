import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { appData } from "../components/Context/AppContext.jsx";
import ScrollToTop from "../components/Scroll/ScrollToTop.jsx";
import EventPopups from "../components/Common/EventPopups.jsx";
import MaterialModal from "../components/Common/MaterialModal.jsx";


const Layout = () => {
  const {showLandingSaction, setShowLandingSaction} =  appData()
  const location = useLocation();
  
  useEffect(() => {
    setShowLandingSaction(true)
  }, [location.pathname])
  
  return (
    <>
      <EventPopups />

      <Header />
        <div className="outlet-container" style={{marginTop : location.pathname == "/"&& 0}}>
        <MaterialModal />
          <Outlet />
        </div>
        {showLandingSaction && 
      <div className="sectionbgimage">
        <Footer />
      </div>}
      <ScrollToTop />
    </>
  );
};

export default Layout;
