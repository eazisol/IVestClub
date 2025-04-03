import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import about from "../../assets/image/about.png";
import about1 from "../../assets/image/about1.png";
import about2 from "../../assets/image/about2.png";
import about3 from "../../assets/image/about3.png";
import about4 from "../../assets/image/about4.png";
import MembershipTokenCards from "./MembershipTokenCards";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { TextUnderWrap } from "../Common/MiniComponents";

const MemberShip = () => {
  const scrollContainerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Function to handle scrolling to the left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: -300, // Scroll 300px to the left
        behavior: "smooth",
      });
    }
  };

  // Function to handle scrolling to the right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: 300, // Scroll 300px to the right
        behavior: "smooth",
      });
    }
  };

  // Function to check if the div is at the start or end of the scroll
  const checkScrollPosition = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setIsAtStart(scrollLeft === 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 20);
  };

  // Use effect to check scroll position on mount and whenever the div is scrolled
  useEffect(() => {
    const scrollableDiv = scrollContainerRef.current;
    scrollableDiv.addEventListener("scroll", checkScrollPosition);

    // Initial check on component mount
    checkScrollPosition();

    return () => {
      scrollableDiv.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);
  return (
    <section className="about-section-three responsiveSectionContainer">
      <div className=" pt-3 pb-5 bg-white">
        <div className="row clearfix mt-5 ">
          <div className="col-md-4 col-lg-4">
            <div className="sec-title">
              <h3>
                <div className="about-head-text">
                  IVT Platform Tokens & Membership Club <TextUnderWrap padding={10}>Tokens</TextUnderWrap> Available
                </div>
              </h3>
              <div className="d-flex mt-5">
                <button className={isAtStart? "card-token-btn op-3" : "card-token-btn"}
                 onClick={scrollLeft}
                 disabled={isAtStart} // Disable button when at the start
                >
                  <ArrowBackOutlinedIcon />
                </button>
                <button className={isAtEnd? "card-token-btn op-3 ml-4" : "card-token-btn ml-4"}
                onClick={scrollRight}
                disabled={isAtEnd} // Disable button when at the end
                >
                  <ArrowForwardOutlinedIcon />
                </button>
              </div>
            </div>
          </div>
          <div
            className="col-md-8 col-lg-8 col-sm-12 d-flex  px-0" 
            ref={scrollContainerRef} 
            style={{
              overflowY: "scroll",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <MembershipTokenCards
              header={"OpenAI (OAIT) Membership Club"}
              text={
                "Educate yourself about the company that develops ChatGPT and AI developments. Get rewarded as AI revolutionizes industries."
              }
            />
            <MembershipTokenCards
              header={"Space X"}
              text={
                "SpaceX, founded by Elon Musk in 2002, designs, manufactures, and launches advanced rockets and spacecraft."
              }
            />
            <MembershipTokenCards
              header={"IVestClub (IVT) Token"}
              text={
                "IVT is the token that powers the platform that provides your membership club. Exchangeable for your chosen members."
              }
            />
            <MembershipTokenCards
              header={"IVestClub (IVT) Token"}
              text={
                "IVT is the token that powers the platform that provides your membership club. Exchangeable for your chosen members."
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberShip;
