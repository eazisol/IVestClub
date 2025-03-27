import React, { useEffect, useState } from "react";
import { SactionContainer } from "../Common/Containers";
import ProfileCard from "../Dashboard/ProfileCard";
import MemberShipClubCards from "../Home/MemberShipClubCards";
import membershipimg1 from "../../assets/image/membershipimg1.png";
import membershipimg2 from "../../assets/image/membershipimg2.png";
import membershipimg3 from "../../assets/image/membershipimg3.png";
import membershipimg4 from "../../assets/image/membershipimg4.png";
import useApi from "../Hooks/useApi";
import { useLocation, useNavigate } from "react-router-dom";
import { appData } from "../Context/AppContext";
import { imgUrl } from "../../../apiConfig";
import { encryptNumber } from "../Common/Utills";
import { Box, CircularProgress } from "@mui/material";

const MyMemberShipClubs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate: getData, isPending: isMembershipLoading, error } = useApi();
  const [sortFilter, setSortFilter] = useState("desc");
  const [limit, setLimit] = useState(6);
  const { userData } = appData();

  const [membershipList, setMembershipList] = useState([]);
  //1q
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
        url: `membershipclub/list?filter=${sortFilter}&limit${limit}`,

        method: "GET",
        sendHeaders: true,
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
    <SactionContainer container={false}>
      <div className="w-100">
        <div className="row justify-content-between mt-5 mb-3">
          <div className="col-6 mt-5  mb-3 pt-2 pl-3">
            <h3 className="dashHead">Dashboard</h3>
          </div>
          <div className="col-2 justify-content-end mr-4 mt-5"></div>
        </div>
      </div>
      <div className="w-100  mb-5 pb-5">
        <div className="row mb-5">
          <div className="col-lg-3 col-md-12 p-0 col-sm-12 mb-4">
            <ProfileCard  />
          </div>
          <div className="col-lg-9 col-md-12  col-sm-12">
            <div className="card card-border-c col-md-12 col-sm-12 mb-4">
              <div className="bold-5 ml-3 mb-3 mt-4 mont-font membershipHeading">
                My Membership Clubs
              </div>
              <div className="row pb-3">
                {/* <MemberShipClubCards
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
              /> */}
                {membershipList
                  ?.filter((data) => data.joined)
                  ?.map((data, index) => (
                    <React.Fragment key={data.id}>
                      <MemberShipClubCards
                        image={data.img}
                        col={6}
                        heading={data.title}
                        text={data.overview}
                        price={data.price}
                        symbol={data?.token_symbol}
                        to={
                          data.joined
                            ? `/Membership/Private?id=${encryptNumber(data.id)}`
                            : `/Membership/Public?id=${encryptNumber(data.id)}`
                        }
                        joined={data.joined}
                        members={data.members}
                        rating={data.totalrating}
                      />
                    </React.Fragment>
                  ))}
                <MemberShipClubCards
                col={6}
                image={membershipimg4}
                heading={"Suggest a membership club!"}
                text={
                  "Have a membership club idea? Share your proposal with others for consideration and collaboration."
                }
                to={`/Membership/PublicMemberShip`}
                staticImg
              />
              </div>
            </div>

            <div className="card card-border-c col-md-12 col-sm-12">
              <div className="bold-5 ml-3 mb-3 mt-4 mont-font membershipHeading">
                Suggested Membership Clubs
              </div>
              <div className="row pb-3">
                {/* <MemberShipClubCards
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
              /> */}
                {isMembershipLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "300px",
                      width:"100%"
                    }}
                  >
                    {" "}
                    <CircularProgress />
                  </Box>
                ) : (
                  membershipList
                    ?.filter((data) => !data.joined)
                    ?.map((data, index) => (
                      <React.Fragment key={data.id}>
                        <MemberShipClubCards
                          image={data.img}
                          col={6}
                          heading={data.title}
                          text={data.overview}
                          price={data.price}
                          symbol={data?.token_symbol}
                          to={
                            data.joined
                              ? `/Membership/Private?id=${encryptNumber(
                                  data.id
                                )}`
                              : `/Membership/Public?id=${encryptNumber(
                                  data.id
                                )}`
                          }
                          joined={data.joined}
                          members={data.members}
                          rating={data.totalrating}
                        />
                      </React.Fragment>
                    ))
                )}
                {/* <MemberShipClubCards
                col={6}
                image={membershipimg4}
                heading={"Suggest a membership club!"}
                text={
                  "Have a membership club idea? Share your proposal with others for consideration and collaboration."
                }
                // to={`/Membership/FutureClubs`}
                staticImg
              /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SactionContainer>
  );
};

export default MyMemberShipClubs;
