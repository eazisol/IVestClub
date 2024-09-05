import React from "react";
import { SactionContainer } from "../Common/Containers";
import ProfileCard from "../Dashboard/ProfileCard";
import MemberShipClubCards from "../Home/MemberShipClubCards";
import membershipimg1 from "../../assets/image/membershipimg1.png";
import membershipimg2 from "../../assets/image/membershipimg2.png";
import membershipimg3 from "../../assets/image/membershipimg3.png";
import membershipimg4 from "../../assets/image/membershipimg4.png";
const MyMemberShipClubs = () => {
  return (
    <SactionContainer>
     <div className="w-100 mt-5  mb-3 pt-2 pl-3">
        <h3 className="dashHead">
          Dashboard
        </h3>
      </div>
      <div className="row mb-5">
        <div className="col-lg-3 col-md-12  col-sm-12 mb-4">
          <ProfileCard />
        </div>
        <div className="col-lg-9 col-md-12  col-sm-12">
        <div className="card card-border-c col-md-12 col-sm-12 mb-4">
          <div className="bold-5 ml-3 mb-3 mt-4 mont-font membershipHeading">My Membership Clubs</div>
        <div className="row pb-3">
          <MemberShipClubCards
            col={6}
            image={membershipimg1}
            heading={"iVestClub Technologies Platform"}
            text={
              "Discover the iVestClub Technologies Platform, an all-in-one ecosystem powered by blockchain technology, specializing in exclusive membership clubs."
            }
            to={`/Membership/IvestMembership`}
          />
          <MemberShipClubCards
            col={6}
            image={membershipimg2}
            heading={"OpenAI"}
            text={
              "Join the OpenAI Membership Club to access cutting-edge insights, collaborate with industry experts, and stay ahead in the rapidly evolving world of artificial intelligence."
            }
            to={`/Membership/OpenAIMembership`}
          />
          <MemberShipClubCards
            col={6}
            image={membershipimg3}
            heading={"SpaceX"}
            text={
              "SpaceX, founded by Elon Musk in 2002, designs, manufactures, and launches advanced rockets and spacecraft with the aim of revolutionizing space technology.."
            }
            to={`/Membership/SpaceXMembership`}
          />
          <MemberShipClubCards
            col={6}
            image={membershipimg4}
            heading={"Suggest a membership club!"}
            text={
              "Have a membership club idea? Share your proposal with others for consideration and collaboration."
            }
            to={`/Membership/PublicMemberShip`}
          />
         
        </div>
        </div>

        <div className="card card-border-c col-md-12 col-sm-12">
          <div className="bold-5 ml-3 mb-3 mt-4 mont-font membershipHeading">Suggested Membership Clubs</div>
        <div className="row pb-3">
          <MemberShipClubCards
            col={6}
            image={membershipimg1}
            heading={"iVestClub Technologies Platform"}
            text={
              "Discover the iVestClub Technologies Platform, an all-in-one ecosystem powered by blockchain technology, specializing in exclusive membership clubs."
            }
            to={`/Membership/IvestMembership`}
          />
          <MemberShipClubCards
            col={6}
            image={membershipimg2}
            heading={"OpenAI"}
            text={
              "Join the OpenAI Membership Club to access cutting-edge insights, collaborate with industry experts, and stay ahead in the rapidly evolving world of artificial intelligence."
            }
            to={`/Membership/OpenAIMembership`}
          />
          <MemberShipClubCards
            col={6}
            image={membershipimg3}
            heading={"SpaceX"}
            text={
              "SpaceX, founded by Elon Musk in 2002, designs, manufactures, and launches advanced rockets and spacecraft with the aim of revolutionizing space technology.."
            }
            to={`/Membership/SpaceXMembership`}
          />
          <MemberShipClubCards
            col={6}
            image={membershipimg4}
            heading={"Suggest a membership club!"}
            text={
              "Have a membership club idea? Share your proposal with others for consideration and collaboration."
            }
            to={`/Membership/PublicMemberShip`}
          />
         
        </div>
        </div>
        </div>
      </div>
    </SactionContainer>
  );
};

export default MyMemberShipClubs;
