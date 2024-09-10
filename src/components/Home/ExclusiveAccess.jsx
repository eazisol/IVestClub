import React from "react";
import goldentick from "../../assets/image/icons/goldenTick.png";

const ExclusiveAccess = ({
  icon = goldentick,
  heading,
  text1,
  text2,
  col = 3,
  custom = false,
  size = 90,
  mb = 0
}) => {
  return (
    <div
      className={
        custom
          ? `col-md-${col} col-lg-${col} text-center col-sm-12    `
          : `col-md-${col} col-lg-${col} text-center col-sm-12 `
      }
    ><div className="icon-outline">
      <img src={icon} alt="" style={{ height: size+"px", width: size+"px", marginBottom : mb }} /></div>
      <p className="text-basic text-light mt-4">
        <span className="ex-head-text"> {heading}</span>
      </p>
      <div style={{ width: "100%", margin: "0 auto" }} className={custom ? "px-5" : ""}>
        <p className="exText WhiteText mt-1 Opacity">{text1}</p>
        <p className="exText WhiteText mt-1 Opacity">{text2}</p>
      </div>
    </div>
  );
};

export default ExclusiveAccess;
