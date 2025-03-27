import React, { useEffect } from "react";
import { SactionContainer } from "../Common/Containers";
import { DislikeIcon, LikeIcon } from "../Common/Icons";
import futureclubimg from "../../assets/image/futureclubimage.png";
import { TextUnderWrap } from "../Common/MiniComponents";

const FutureClubs = () => {
  return (
    <>
      <SactionContainer container={false}>
        <div className="col-12 p-3 mt-5 pt-5  pb-5">
          <h3>
            <strong>Suggested Membership <TextUnderWrap padding={10} >Clubs</TextUnderWrap></strong>
          </h3>
          <p className="mt-3 mb-5 bold-4" style={{fontSize:"14px" , opacity:"0.9"}}>
            IVestClub is your membership club platform. As such, we are happy to
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
            <div className="card  card-border-c  mt-3" key={index}>
              <div className="d-flex like-dislike-card">
                <div className="col-1 ">
                  <h3 style={{fontSize:"22px" , fontWeight:"600"}}>0{index + 1}</h3>
                </div>
                <div className="col-xl-10 col-8 px-4 py-4">
                  <p className=" mb-0 mont-font  bold-5" style={{fontSize:"16px"}} >{item.text}</p>
                </div>
                <div className="col-3 col-xl-1 d-flex pt-3">
                  <div className="w-50">
                    <LikeIcon />
                    <p className="m-0">
                      <span className="likeText">342</span> 
                    </p>
                  </div>
                  <div className="w-50">
                    <DislikeIcon />
                    <p className="m-0">
                      <span className="likeText">342</span> 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SactionContainer>
      {/* <SactionContainer bgColor="#F5F8FF" container={false}>
        <div className="col-12 mt-5 pt-3">
          <h3 className="mb-5">
            <strong>Ask AI questions about potential companies</strong>
          </h3>
          <img src={futureclubimg} alt="" className="img-fluid mt-2 mb-5 pb-5" />
        </div>
      </SactionContainer> */}
    </>
  );
};

export default FutureClubs;
