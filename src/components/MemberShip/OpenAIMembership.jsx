import React, { useEffect } from "react";
import { SactionContainer } from "../Common/Containers";
import SideBarMembership from "./SideBarMembership";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import avatar from "../../assets/image/avatar.png";
import openaiimg1 from "../../assets/image/openaiimg1.png";
import openaiimg2 from "../../assets/image/openaiimg2.png";
import openaiimg3 from "../../assets/image/openaiimg3.png";
import { Quotations, Ratings } from "../Common/Feedbacks";
import { NavLink } from "react-router-dom";

const OpenAIMembership = () => {
  return (
    <SactionContainer bgColor="#F5F8FF">
      <div className="col-md-8  col-sm-12 mt-4">
        <div className="card card-border-c p-3">
          <div className="p-3">
            <h2 className="mb-3">
              <strong>OpenAI Membership Club (OAI Token)</strong>
            </h2>
            <div className="d-flex align-items-center mb-3 ">
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
            <h4 className="mt-4 text-dark">
              <strong>Who are OpenAI?</strong>
            </h4>
            <p className="text-basic ">
              OpenAI is a research organization focused on advancing artificial
              intelligence (AI) in a manner that benefits humanity as a whole.
              Founded in 2015, OpenAI aims to conduct cutting-edge research in
              AI and develop technologies that are safe, ethical, and aligned
              with human values. The organization's work spans various domains
              of AI, including natural language processing, reinforcement
              learning, computer vision, and robotics. OpenAI's research outputs
              are often published in top-tier academic journals and conferences,
              contributing to the broader scientific community's understanding
              of AI capabilities and limitations. In addition to research,
              OpenAI also develops practical AI applications and tools, such as
              language models like GPT (Generative Pre-trained Transformer)
              series, which have garnered significant attention for their
              impressive ability to generate human-like text. These tools are
              made available to the public through APIs, enabling developers and
              businesses to leverage AI capabilities in their own applications
              and services.
            </p>
          </div>
          <hr />
          <div className="p-3">
            <h4 className=" mb-3 text-dark">
              <strong>What is AI? - Google’s AI Course for Beginners </strong>
            </h4>
            <img src={openaiimg2} alt="" className="img-fluid mt-2" />
            <div className="mt-2">
              <p className="text-basic text-dark mt-4">
                AI, or artificial intelligence, refers to the simulation of
                human intelligence processes by machines, typically through
                computer systems, to perform tasks that normally require human
                intelligence.
              </p>
            </div>
            <Quotations
              text={
                "AI is fundamental to the future of our civilization. - Elon Musk AI is just the most exciting area within computer science today. - Bill Gates It’s hard to overstate how big of an impact AI will have on society over the next 20 years."
              }
              by={"Jeff Bezos"}
            />
            <div className="mt-2">
              <p className="text-basic text-dark">
                AI is important to learn about because it has the potential to
                revolutionize industries, improve efficiency, and solve complex
                problems, shaping the future of technology and society.
              </p>
            </div>
            <NavLink
              to={"/"}
              style={{ textDecoration: "underline" }}
              className="pt-0  mb-2 mt-2"
            >
              Click here to learn about how to Use ChatGPT - OpenAI’s programme
            </NavLink>
          </div>
        </div>
        <div className="card card-border-c  mt-3">
          <div className="p-3">
            <h4>
              <strong>Open AI Discussion Channel</strong>
            </h4>
            <img src={openaiimg3} alt="" className="img-fluid mt-2" />
          </div>
        </div>
        <div className="card card-border-c mt-3">
          <div className="p-4">
            {" "}
            <h3 >
              <strong>Learn about different aspects of OpenAI</strong>
            </h3>
            <div className="mt-5">
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
            </NavLink></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-sm-12 mt-4">
        <SideBarMembership />
      </div>
    </SactionContainer>
  );
};

export default OpenAIMembership;
