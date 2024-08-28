import React, { useState } from "react";
import headingUnder from "../../assets/image/others/headingUnder.png";
export const HeaderLink = ({ text, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a
      style={{ color: isHovered ? "#f7b616" : "inherit"}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {text}
    </a>
  );
};

export const TextUnderWrap = ({ children, padding=20 }) => {
  return (
    <span
      style={{
        backgroundImage: `url(${headingUnder})`,
        backgroundSize: "100% 20%", // Adjust size
        backgroundPosition: "bottom", // Adjust position
        backgroundRepeat: "no-repeat", // Prevent image from repeating
        paddingBottom : `${padding}px`
      }}
    >
      {children}
    </span>
  );
};
