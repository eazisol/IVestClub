import React from "react";
import goldentick from "../../assets/image/icons/goldenTick.png";

const ExclusiveAccess = ({ icon=goldentick, heading, text1, text2 , col=3 , custom = false }) => {
  return (
    <div className={custom ? `col-md-${col} col-lg-${col} text-center col-sm-12  customExclusive  ` : `col-md-${col} col-lg-${col} text-center col-sm-12 ` }  >
      <img src={icon} alt="" style={{ height: "80px", width: "80px" }} />
      <p className="text-basic text-light mt-1">
        <span className="ex-head-text"> {heading}</span>
      </p>
      <div style={{width : "100%", margin: "0 auto"}}>
      <p className="exText WhiteText mt-2 ">{text1}</p>
      <p className="exText WhiteText mt-2 ">{text2}</p></div>
    </div>
  );
};

export default ExclusiveAccess;








