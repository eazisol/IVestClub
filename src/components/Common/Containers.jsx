import React from "react";

export function ImgBgSactionContainer({ bgImage, children,showPadding=true, sx={} }) {
  return (
    <section className={showPadding?"page-banner text-left":`page-banner text-left pb-0 pt-0`}
    style={sx}
    >
      <div
        className="image-layer"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor : "#fff"
        }}
      ></div>
      <div  className={showPadding?"container ":""}>{children}</div>
    </section>
  );
}

export function SactionContainer({ children, bgColor = "#fff", BRadius=0 }) {
  return (
    <section className="about-section-three" style={{backgroundColor : bgColor}} >
      <div className="container pt-3 pb-2" style={{backgroundColor : bgColor, borderRadius: `${BRadius}px`}} >
        <div className="row clearfix  mt-4">{children}</div>
      </div>
    </section>
  );
}
