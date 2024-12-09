import React, { useEffect, useState } from "react";
import { SactionContainer } from "../Common/Containers";
import MemberShipClubCards from "./MemberShipClubCards";
import membershipimg1 from "../../assets/image/membershipimg1.png";
import membershipimg2 from "../../assets/image/membershipimg2.png";
import membershipimg3 from "../../assets/image/membershipimg3.png";
import membershipimg4 from "../../assets/image/membershipimg4.png";
import { CustomizedLoader, TextUnderWrap } from "../Common/MiniComponents";
import { useNavigate, useLocation } from "react-router-dom";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import useApi from "../Hooks/useApi";
import { imgUrl } from "../../../apiConfig";
import { LargeButton } from "../Common/Buttons";
import { appData } from "../Context/AppContext";

const MemberShipClubSaction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: getData, isPending: isMembershipLoading, error } = useApi();
  const [sortFilter, setSortFilter] = useState("desc");
  const [limit, setLimit] = useState(6);
  const { userData } = appData();

  const [membershipList, setMembershipList] = useState([]);

  useEffect(() => {
    if (location.pathname === "/") {
      setLimit(6);
    } else {
      setLimit(9);
    }
  }, []);

  useEffect(() => {
    getData(
      {
        url: userData.access_token
          ? `membershipclub/list?filter=${sortFilter}&limit${limit}`
          : `membershipclub/guest/listing`,
        method: "GET",
        sendHeaders: userData.access_token ? true : false,
      },
      {
        onSuccess: (data) => {
          console.log("get data", data);
          setMembershipList(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }, [sortFilter, limit]);

  return (
    <SactionContainer
      bgColor={location.pathname === "/" ? "#f4f5f9" : "#fff"}
      container={false}
    >
      <div className="row   pt-5 ">
        {location.pathname === "/" ? (
          <div className="col-12 text-center mb-4 ">
            <h2
              className="bold-sec-title"
              style={{ color: "#202327", fontSize: "36px" }}
            >
              <div>
                Current Member
                <TextUnderWrap padding={7}>ship C</TextUnderWrap>
                lubs
              </div>
            </h2>
          </div>
        ) : (
          <>
            <h3 className="col-md-6 mb-3">
              <div className="bold-6">
                Membership <TextUnderWrap padding={7}>Club</TextUnderWrap>
              </div>
            </h3>
            <div className="col-md-6 mb-3 d-flex justify-content-end align-items-center">
              <p className="text-basic mb-0">Sort By: &nbsp;</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="mr-2"
                value={sortFilter}
                size="small"
                sx={{ height: 30, fontSize: 12 }}
                onChange={(e) => {
                  setSortFilter(e.target.value);
                }}
              >
                <MenuItem value={"desc"}>Descending</MenuItem>
                <MenuItem value={"asc"}>Ascending</MenuItem>
                <MenuItem value={"hightolow"}>Price: high to low</MenuItem>
                <MenuItem value={"lowtohigh"}>Price: low to high</MenuItem>
              </Select>
              <div className="change-view-icon change-view-icon-active">
                <GridViewOutlinedIcon />
              </div>
              <div className="change-view-icon ">
                <FormatListBulletedOutlinedIcon />
              </div>
            </div>
          </>
        )}
        {isMembershipLoading ? (
          <CustomizedLoader />
        ) : (
          <div className="row  justify-content-sm-center justify-content-md-start">
            {/* <MemberShipClubCards
              image={membershipimg1}
              heading={"iVestClub Technologies Platform"}
              text={
                "Discover the iVestClub Technologies Platform, an all-in-one ecosystem powered by blockchain technology, specializing in exclusive membership clubs."
              }
              to={`/Membership/PublicMemberShip`}
            /> */}
            {membershipList?.map((data, index) => (
              <React.Fragment key={data.id}>
                <MemberShipClubCards
                  image={imgUrl + data.img}
                  heading={data.title}
                  text={data.overview}
                  price={data.price}
                  to={
                    data.joined
                      ? `/Membership/Private?id=${data.id}`
                      : `/Membership/Public?id=${data.id}`
                  }
                  joined={data.joined}
                  members={data.members}
                  // to={`/Membership/Private?id=${data.id}`}
                />
              </React.Fragment>
            ))}

            {/* <MemberShipClubCards
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
          /> */}
            <MemberShipClubCards
              image={membershipimg4}
              heading={"Suggest a membership club!"}
              text={
                "Have a membership club idea? Share your proposal with others for consideration and collaboration."
              }
              to={`/Membership/FutureClubs`}
            />
          </div>
        )}
      </div>
      <div className="row mb-5 w-100 justify-content-center">
        <div className="">
          <LargeButton
            text={"View More"}
            mode="secondary"
            onClick={() => {
              if (location.pathname === "/") {
                navigate("/Membership");
              } else {
                setLimit(limit + 3);
              }
            }}
          />
        </div>
      </div>
    </SactionContainer>
  );
};

export default MemberShipClubSaction;
