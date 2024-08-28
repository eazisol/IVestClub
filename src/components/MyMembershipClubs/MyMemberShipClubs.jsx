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
      <h3>
        <strong>Dashboard</strong>
      </h3>
      <div className="row">
        <div className="col-md-3 col-sm-12">
          <ProfileCard />
        </div>
        <div className="col-md-9 col-sm-12 row">
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
    </SactionContainer>
  );
};

export default MyMemberShipClubs;
