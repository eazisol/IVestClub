import React, { useEffect } from "react";
import { SactionContainer } from "../Common/Containers";
import SideBarMembership from "./SideBarMembership";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import avatar from "../../assets/image/avatar.png";
import openaiimg1 from "../../assets/image/openaiimg1.png";
import openaiimg2 from "../../assets/image/openaiimg2.png";
import openaiimg3 from "../../assets/image/openaiimg3.png";
import { Quotations, Ratings, RatingsTotal } from "../Common/Feedbacks";
import { NavLink } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import { OutlinedButtonDark } from "../Common/Buttons";

const IvestMembership = () => {
  return (
    <SactionContainer bgColor="#F5F8FF">
      <div className="col-md-8  col-sm-12 mt-3">
        <div className="card card-border-c">
          <div className="p-5">
            <h2 className="text-dark">
              <strong>iVestClub Technologies (IVT Token)</strong>
            </h2>
            <div className="d-flex align-items-center ">
              <p className="text-basic mb-0 ml-1">
                {" "}
                Admin: <strong className="text-dark">John Doe</strong>{" "}
                <span>&#8226;</span>
              </p>
              <CalendarTodayOutlinedIcon
                sx={{ color: "#888", ml: 1, fontSize: "15px" }}
              />
              <p className="text-basic mb-0 ml-1">
                {" "}
                24/7/2024 <span>&#8226;</span>{" "}
              </p>{" "}
              <GroupsOutlinedIcon
                sx={{ color: "#888", ml: 1, fontSize: "25px" }}
              />
              <p className="text-basic mb-0 ml-1"> 222 Members </p>{" "}
            </div>
            <img src={openaiimg1} alt="" className="img-fluid mt-2" />
            <h3 className="mt-4">
              <strong>What is iVestClub Technologies?</strong>
            </h3>
            <p className="text-basic text-dark">
              IvestClub technologies aims to be the premier membership club
              service. By utilising the latest blockchain technology, the
              platform seeks to revolutionize membership clubs by enhancing
              security, transparency, and efficiency. IvestClub Technlogies
              seeks to put the members in control of their club whilst reducing
              the administrative burden required to run any club.
            </p>
            <p className="text-basic text-dark mt-3">
              The platform promotes the following for each club:
            </p>
            {[
              "Immutable Records: Blockchain's immutable ledger ensures that membership records cannot be altered or tampered with, providing a high level of security.",
              "Smart Contracts: Membership agreements and renewals are automated through smart contracts ensures that terms are enforced transparently and without bias.",
              "Automated Processes: Membership renewals, event registrations, and reward distributions are automated, reducing administrative burdens and operational costs.",
              "Tokenization: Members use tokens to access services of the clubs and pay their fees as well as representing voting rights on club matters.",
              "Loyalty Programs: Blockchain supports robust loyalty programs where you can earn tokens for participation.",
              "Equal Access: The decentralized nature of blockchain ensures that all members have equal access to information and decision-making processes, fostering a more inclusive environment.",
            ].map((text, index) => (
              <div className="d-flex mt-3" key={index}>
                <div className="col-1">
                  <h4 className="warning-bullet text-warning">{">"}</h4>
                </div>
                <div className="col-11 pl-0">
                  <h6>{text}</h6>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div className="p-3">
            <h3 className="mt-4">
              <strong>What is iVestClub Technologies?</strong>
            </h3>
            <img src={openaiimg1} alt="" className="img-fluid mt-2" />
            <p className="text-basic mt-3">
              The transformative potential of blockchain technology in creating
              more efficient and innovative systems, which could greatly benefit
              membership clubs by enhancing transparency, security, and overall
              member engagement..
            </p>
            <div className="">
              <Quotations
                text={
                  "You could imagine something like a completely automated system for renting bikes that’s just done completely over blockchain crypto-payments. And theoretically just sort of start it up, and it works completely autonomously "
                }
                by={"Vitalik Buterin, co-founder of Ethereum"}
              />
            </div>
            <p className="mt-3 text-basic">
              Blockchain is a decentralized, digital ledger technology that
              records transactions across multiple computers in a way that
              ensures the data's security, transparency, and immutability. Each
              transaction is grouped into a "block" and linked to the previous
              one, forming a "chain" of blocks. This structure prevents
              alterations once a transaction is recorded, as changing any block
              would require altering all subsequent blocks on all networked
              computers simultaneously. Blockchain's decentralized nature
              eliminates the need for intermediaries, enhances trust through
              transparent verification processes, and has applications ranging
              from financial services and supply chain management to voting
              systems and membership organizations.
            </p>
          </div>
        </div>
        <div className="card card-border-c">
          <div className="p-3">
            <h3 className="mt-4">
              <strong>ChatGPT Box Here</strong>
            </h3>
            {[
              "Ask ChatGPT a question abut the company?",
              "Suggested questions list here.",
              "Nam libero justo laoreet sit amet.",
              "Tempus imperdiet nulla malesuada",
              "eque sodales ut etiam sit amet nisl",
              "Tristique nulla aliquet enim tortor at auctor",
              "Nam libero justo laoreet sit amet.",
              "Tempus imperdiet nulla malesuada",
            ].map((text, index) => (
              <div className="d-flex mt-3 align-align-items-center" key={index}>
                <div className="col-1">
                  <h4 className="text-warning warning-bullet mb-0">{">"}</h4>
                </div>
                <div className="col-11 pl-0">
                  <h6 className="mb-0">{text}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-border-c mt-3">
          <div className="p-3">
            <h4>
              <strong>Open AI Discussion Channel</strong>
            </h4>
            <img src={openaiimg3} alt="" className="img-fluid mt-2" />
          </div>
        </div>
        <div className="card card-border-c mt-3">
          <div className="p-3">
            <h3>
              <strong>
                Learn About Different Aspects Of iVestClub Technologies
              </strong>
            </h3>
            <div className="">
              <RatingsTotal />
              <div className="mt-2">
                <Ratings
                  heading={"Founders and Board of Directors of OpenAI"}
                  text={[
                    "Durk Kingma, Co-Founder",
                    "Greg Brockman, Co-Founder,",
                    "Ilya Sutskever, Co-Founder",
                    "See More",
                    ".",
                    "Number of employees (December 2022): 660",
                  ]}
                />
                <hr />
                <Ratings
                  heading={"Shareholders / Investors"}
                  text={[
                    "OpenAI has total 34 investors",
                    "9 are institutional investors including Microsoft and 28 others (nb click to expand list etc)",
                    "5 are Angel investors including Peter Thiel and 4 others.",
                  ]}
                />
                <hr />
                <Ratings
                  heading={"Valuations and  Funding rounds"}
                  text={[
                    "OpenAI has total 7 funding rounds",
                    "OpenAI's largest funding round was a Series E round held on Jan 23, 2023 for $10B.",
                    "OpenAI' valuation is $80B as on Feb 20, 2024.",

                    ".",
                    "Create another section here for Competitors",
                  ]}
                />
                <div className="text-center">
                  <NavLink
                    to={"/"}
                    style={{ textDecoration: "underline" }}
                    className="pt-0  mb-3 mt-3"
                  >
                    Load More
                  </NavLink>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <div className="card card-border-c mt-3">
          <div className="p-3">
            <h4 className="">
              <strong>Ask For Information About iVestClub Technologies</strong>
            </h4>
            <p className="text-basic mb-0 mt-3">Rate This Club</p>
            <Rating
              name="text-feedback"
              value={0}
              precision={0.5}
              icon={<StarIcon sx={{ fontSize: 20, color: "gold" }} />}
              emptyIcon={<StarBorder sx={{ fontSize: 20, color: "gold" }} />}
            />
            <p className="mb-0 text-basic  mt-3 ">Your Feed Back</p>
            <textarea
              className="form-control"
              style={{ height: "150px" }}
            ></textarea>
            <div className="my-5">
              <OutlinedButtonDark text={"Submit"} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-sm-12 mt-3">
        <SideBarMembership />
      </div>
    </SactionContainer>
  );
};

export default IvestMembership;
