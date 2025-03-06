import React, { useState } from "react";
import headingUnder from "../../assets/image/others/headingUnder.png";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { CircularProgress } from "@mui/material";

export const HeaderLink = ({ text, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a
      style={{ color: isHovered ? "#f7b616" : "inherit" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {text}
    </a>
  );
};

export const TextUnderWrap = ({ children, padding = 20 }) => {
  return (
    <span
      style={{
        backgroundImage: `url(${headingUnder})`,
        backgroundSize: "100% 20%", // Adjust size
        backgroundPosition: "bottom", // Adjust position
        backgroundRepeat: "no-repeat", // Prevent image from repeating
        paddingBottom: `${padding}px`,
      }}
    >
      {children}
    </span>
  );
};

export function CustomizedTooltips({ children, title, placement = "top" }) {
  return <Tooltip title={title}>{children}</Tooltip>;
}
export function CustomizedLoader() {
  return (
    <div
      style={{ padding: "10rem",transform: "rotate(60deg)",}}
      className="w-100 d-flex justify-content-center"
    >
      {/* <CircularProgress /> */}
      <div className="ivest-loader"></div>
    </div>
  );
}
