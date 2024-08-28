import React from "react";
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
  return (
    <section className="about-section-three">
      <div className="ml-5 pl-5 pt-3 pb-5 bg-white">
        <div className="row clearfix mt-5 ">
          <div className="col-md-4">
            <div className="sec-title">
              <h3>
                <div className="about-head-text">
                  IVC Platform Tokens & Membership Club <TextUnderWrap padding={10}>Tokens</TextUnderWrap> available
                </div>
              </h3>
              <div className="d-flex mt-5">
                <button className="btn btn-warning op-3">
                  <ArrowBackOutlinedIcon />
                </button>
                <button className="btn btn-warning ml-2">
                  <ArrowForwardOutlinedIcon />
                </button>
              </div>
            </div>
          </div>
          <div
            className="col-md-8 col-sm-12 d-flex"
            style={{
              overflowY: "scroll",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <MembershipTokenCards
              header={"OpenAI (OAIT) Membership Club"}
              text={
                "Educate yourself about the company that develops ChatGPT and AI developments. Get rewarded as AI revolutionizes industri"
              }
            />
            <MembershipTokenCards
              header={"Space X"}
              text={
                "aceX, founded by Elon Musk in 2002, designs, manufactures, and launches advanced rockets and spacecraft with t"
              }
            />
            <MembershipTokenCards
              header={"iVestClub (IVC) Token"}
              text={
                "IVC is the token that powers the platform that provides your membership club. Exchangeable for your chosen members"
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberShip;
