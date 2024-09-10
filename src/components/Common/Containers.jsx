import React from "react";

export function ImgBgSactionContainer({
  bgImage,
  children,
  showPadding = true,
  sx = {},
  hero = false,
}) {
  return (
    <section
      className={
        showPadding
          ? "page-banner text-left"
          : `page-banner text-left pb-0 pt-0`
      }
      style={sx}
    >
      <div
        className="image-layer"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#fff",
        }}
      ></div>
      {hero ? (
        <div className={showPadding ? "container" : "responsiveHeroContainer"}>
          {children}
        </div>
      ) : (
        <div className={showPadding ? "container" : "SactionContainer-c"}>
          {children}
        </div>
      )}
    </section>
  );
}

export function ImgBgSectionContainer({
  bgImage,
  children,
  showPadding = true,
  sx = {},
}) {
  return (
    <section
      className={
        showPadding
          ? "page-banner text-left"
          : `page-banner text-left pb-0 pt-0`
      }
      style={sx}
    >
      <div
        className="image-layer"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#fff",
        }}
      ></div>
      <div className={showPadding ? "container" : "goldenCardContainer"}>
        {children}
      </div>
    </section>
  );
}

export function SactionContainer({
  children,
  bgColor = "#fff",
  BRadius = 0,
  container = true,
}) {
  return (
    <section
      className="about-section-three"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={
          container ? "container pt-3 pb-2" : "responsiveSectionContainer"
        }
        style={{ backgroundColor: bgColor, borderRadius: `${BRadius}px` }}
      >
        <div className="row clearfix  mt-4">{children}</div>
      </div>
    </section>
  );
}
