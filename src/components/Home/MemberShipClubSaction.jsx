import React from "react";
import { SactionContainer } from "../Common/Containers";
import MemberShipClubCards from "./MemberShipClubCards";
import membershipimg1 from "../../assets/image/membershipimg1.png";
import membershipimg2 from "../../assets/image/membershipimg2.png";
import membershipimg3 from "../../assets/image/membershipimg3.png";
import membershipimg4 from "../../assets/image/membershipimg4.png";
import { TextUnderWrap } from "../Common/MiniComponents";
import { useNavigate, useLocation } from "react-router-dom";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const MemberShipClubSaction = () => {
  const location = useLocation();

  return (
    <SactionContainer bgColor= {location.pathname === "/" ?"#f4f5f9": "#fff"} container={false}>
      <div className="row  w-100 justify-content-center pt-5 mb-5">
        {location.pathname === "/" ? (
          <div className="col-12 text-center mb-5 ">
            <h2 className="bold-sec-title" style={{color:"#202327" , fontSize:"36px"}}>
              <div>
                Current Member<TextUnderWrap padding={7}>ship C</TextUnderWrap>
                lubs
              </div>
            </h2>
          </div>
        ) : (
          <div className="col-12  mb-4  d-flex ">
            <h3 className="w-50">
              <div className="bold-6">
                Membership <TextUnderWrap padding={7}>Club</TextUnderWrap>
              </div>
            </h3>
            <div className="w-50 d-flex justify-content-end align-items-center">
              <p className="text-basic mb-0">Sort By: &nbsp;</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="mr-2"
                value={10}
                 size="small"
                 sx={{height : 30, fontSize : 12}}
               
                onChange={() => {}}
              >
                <MenuItem value={10}>Most Popular</MenuItem>
                <MenuItem value={20}>Most Viewed</MenuItem>
                <MenuItem value={30}>All</MenuItem>
              </Select>
              <div className="change-view-icon change-view-icon-active">
                <GridViewOutlinedIcon />
              </div>
              <div className="change-view-icon ">
                <FormatListBulletedOutlinedIcon />
              </div>
            </div>
          </div>
        )}

        <div className="row  w-100 justify-content-sm-center justify-content-md-start mx-2">
          <MemberShipClubCards
            image={membershipimg1}
            heading={"iVestClub Technologies Platform"}
            text={
              "Discover the iVestClub Technologies Platform, an all-in-one ecosystem powered by blockchain technology, specializing in exclusive membership clubs."
            }
            to={`/Membership/PublicMemberShip`}
          />
          <MemberShipClubCards
            image={membershipimg2}
            heading={"OpenAI"}
            text={
              "Join the OpenAI Membership Club to access cutting-edge insights, collaborate with industry experts, and stay ahead in the rapidly evolving world of artificial intelligence."
            }
            to={`/Membership/OpenAIMembership`}
          />
          <MemberShipClubCards
            image={membershipimg3}
            heading={"SpaceX"}
            text={
              "SpaceX, founded by Elon Musk in 2002, designs, manufactures, and launches advanced rockets and spacecraft with the aim of revolutionizing space technology.."
            }
            to={`/Membership/SpaceXMembership`}
          />
          <MemberShipClubCards
            image={membershipimg4}
            heading={"Suggest a membership club!"}
            text={
              "Have a membership club idea? Share your proposal with others for consideration and collaboration."
            }
            to={`/Membership/FutureClubs`}
          />
        </div>
      </div>
    </SactionContainer>
  );
};

export default MemberShipClubSaction;
