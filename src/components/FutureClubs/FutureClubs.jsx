import React, { useEffect } from "react";
import { SactionContainer } from "../Common/Containers";
import { DislikeIcon, LikeIcon } from "../Common/Icons";
import futureclubimg from "../../assets/image/futureclubimage.png";

const FutureClubs = () => {
  return (
    <>
      <SactionContainer>
        <div className="col-12 p-5">
          <h3>
            <strong>Suggested Membership Clubs</strong>
          </h3>
          <p className="text-basic">
            iVestClub is your membership club platform. As such, we are happy to
            hear suggestions from you about which company you want access to. If
            there is enough interest, we will look to launch that club for you!
          </p>

          {[
            {
              text: "I Want Access To XAI: Elon musk’s artificial intelligence company, working on building artificial intelligence to accelerate human scientific discovery",
            },
            {
              text: "I want access to robinhood: A commision-free trading app that has gained popularity among retail ivestors.",
            },
            {
              text: "I want access to stripe: A fintech company that provide online payment processing for businesses, Valued as one of the most valuable startups globally.",
            },
            {
              text: "I want access to rivian: An electric vehicle manufacturer focusing on adventure-oriented vehicles like trucks and SUVs.",
            },
            {
              text: "I want access to impossible foods: A food tehnology company known for its plant-based meat substitutes.",
            },
            {
              text: "I want to propose a new company.",
            },
            {
              text: "The exclusivity of private companies limits access.",
            },
          ].map((item, index) => (
            <div className="card  mt-3" key={index}>
              <div className="d-flex like-dislike-card">
                <div className="col-1 p-0">
                  <h3>0{index + 1}</h3>
                </div>
                <div className="col-10 pl-3">
                  <p className="text-basic text-dark mb-0">{item.text}</p>
                </div>
                <div className="col-1 d-flex pt-3">
                  <div className="w-50">
                    <LikeIcon />
                    <p className="text-bacis m-0">
                      <small>342</small>
                    </p>
                  </div>
                  <div className="w-50">
                    <DislikeIcon />
                    <p className="text-bacis m-0">
                      <small>342</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SactionContainer>
      <SactionContainer bgColor="#F5F8FF">
        <div className="col-12">
          <h3>
            <strong>Ask AI questions about potential companies</strong>
          </h3>
          <img src={futureclubimg} alt="" className="img-fluid mt-2" />
        </div>
      </SactionContainer>
    </>
  );
};

export default FutureClubs;
