import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import about from "../../assets/image/about.png";
import about1 from "../../assets/image/about1.png";
import about2 from "../../assets/image/about2.png";
import about3 from "../../assets/image/about3.png";
import about4 from "../../assets/image/about4.png";
import wave from "../../assets/image/wave.png";
import goldicon1 from "../../assets/image/icons/goldicon1.png";
import goldicon2 from "../../assets/image/icons/goldicon2.png";
import goldicon3 from "../../assets/image/icons/goldicon3.png";
import goldicon4 from "../../assets/image/icons/goldicon4.png";
// import MemberShip from "./MemberShip";
import { TextUnderWrap } from "../Common/MiniComponents";
import { LargeButton, OutlinedButtonDark } from "../Common/Buttons";
import CreateAccountModal from "../Common/CreateAccountModal";
import { ImgBgSactionContainer } from "../Common/Containers";
import ExclusiveAccess from "../Home/ExclusiveAccess";
import axios from "axios";
import { baseUrl } from "../../../apiConfig";
import JoinMembership from "../Common/JoinMembership";

const Tokens = () => {
  const navigate = useNavigate();
  const [tokenDataList, setTokenDataList] = useState([]);
const [totalMemberShipClub,setTotalMemberShipClub]=useState('')
  const handleTokenApi = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}token/getAllTokenData`);
      setTotalMemberShipClub(data?.total_membershipclubs)
      // Filter data for tokenId 6
      const filteredData = data?.data.filter((token) => token.tokenId === 6);

      setTokenDataList(filteredData[0]); // Set the filtered data to the state
    } catch (error) {
      console.error("Error fetching token data:", error);
    }
  };

  useEffect(() => {
    handleTokenApi();
  }, []);

  return (
    <>
      <section className="page-banner">
        <div
          className="image-layer"
          style={{
            backgroundImage: `url(${about})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div>
          <h2 className="bannerHead mt-4 pt-1">IvestClub Tokenomics</h2>
        </div>

        <div className="">
          <div className="">
            <ul className="bread-crumb clearfix">
              <li>
                <a
                  onClick={() => {
                    navigate("/");
                  }}
                  style={{ textDecoration: "none", opacity: "0.8" }}
                >
                  Home
                </a>
              </li>
              <li className="active">Tokens</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="about-section-three mt-5 pt-2">
        <div className="responsive-container token-screen  pt-4 bg-white">
          <div className="row  clearfix">
            <div className="text-column col-lg-6 col-md-12 col-sm-12 pl-3">
              <div className="inner mb-sm-3 pt-0">
                <div className="sec-title">
                  <h3 className="text-[40px] font-bold font-montserrat leading-[108.8%] tracking-[4%] text-[#100f1f]">
                    <strong className="bold-sec-title-l bold8">
                      We Are{" "}
                      <TextUnderWrap padding={7}>the Tokens</TextUnderWrap> on
                      the platform?
                    </strong>
                  </h3>
                </div>

                <div className="mt-4">
                  <p className="textCompact DarkText">
                    <strong className="text-[24px] font-bold font-montserrat leading-auto tracking-[0%] text-[#000000]">
                      Two types of tokens:
                    </strong>{" "}
                    <span className="text-[24px] font-normal font-montserrat leading-auto tracking-[0%] text-[#000000]">
                      iVestClub Platform token (IVT) and Membership Tokens
                    </span>
                  </p>
                </div>

                <div className="mt-4">
                  <p className="textCompact DarkText">
                    <strong className="text-[24px] font-bold font-montserrat leading-auto tracking-[0%] text-[#000000]">
                      IVT Token:
                    </strong>{" "}
                    <span className="text-[24px] font-normal font-montserrat leading-auto tracking-[0%] text-[#000000]">
                      Your token that provides the gateway to the membership
                      clubs
                    </span>
                  </p>
                </div>
                <div className="mt-4">
                  <p className="textCompact DarkText">
                    <strong className="text-[24px] font-bold font-montserrat leading-auto tracking-[0%] text-[#000000]">
                      Membership Token:
                    </strong>{" "}
                    <span className="text-[24px] font-normal font-montserrat leading-auto tracking-[0%] text-[#000000]">
                      Represents your ownership of the membership club abd used
                      to access services of the club.
                    </span>
                  </p>
                </div>

                <div className="mt-1">
                  <p className="compact-sub-text LightText text-[16px] font-normal font-poppins leading-[30px] tracking-[0%] text-[#333333]">
                    The mission of iVestClub is to provide you access to
                    membership clubs linked to a specific Pre-IPO company. To
                    achieve this, each membership club has its own unique token
                    (with a unique identifier) which not only is used to verify
                    your membership but forms the basis of both access to the
                    club services but also as a way to provide you with rewards
                    for your engagement. Memebership Club tokens can ony be
                    exchanged for iVestClub tokens.
                  </p>
                </div>

                <div className=" mt-3">
                  <p className="compact-sub-text LightText text-[16px] font-normal font-poppins leading-[30px] tracking-[0%] text-[#333333]">
                    The membership club tokens are unified by the iVestClub
                    platform token called IVT. IVT can be purchased using Crypto
                    like USDT, and in future using cash. Both tokens do not
                    represent a direct investment in any Pre-IPO company in any
                    way and soley for the use on this plaform.
                  </p>
                </div>
              </div>
            </div>

            <div className="image-column col-lg-6 col-md-12 col-sm-12 mt-3 mt-xl-0 pl-3 pl-xl-5">
              <figure
                className="image wow d-flex justify-content-center slideInRight animated"
                data-wow-delay="0ms"
                style={{
                  visibility: "visible",
                  animationDelay: "0ms",
                  animationName: "slideInRight",
                }}
              >
                <img
                  src={about1}
                  alt=""
                  className="w-[723px] h-[625px] opacity-100 rounded-[10px] absolute left-[1037px] top-[636px]"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section className="about-section-three mt-5">
        <div className="responsive-container token-screen pb-5 ">
          <div className="row clearfix mt-3">
            <div className="image-column col-lg-6 col-md-12 col-sm-12 ">
              <figure
                className="image wow d-flex justify-content-center slideInLeft animated"
                data-wow-delay="0ms"
                style={{
                  visibility: "visible",
                  animationDelay: "0ms",
                  animationName: "slideInLeft",
                }}
              >
                <img src={about2} alt="" className="sec-image" />
              </figure>
              <div className="ml-3 mt-1">
                <div className="sec-title mb-3 mt-5">
                  <h4>
                    {" "}
                    <div className="sec-offer bold-6">
                      Dont miss out on your tokens
                    </div>
                  </h4>
                </div>
              </div>
              <div className="ml-3">
                <p className="sec-offer-des">
                  Tokens are limited, so secure your access to current and
                  future membership clubs now.
                </p>
              </div>
              <div className="mt-4 pt-2 mb-4 pb-2 d-flex row ">
                <div className="col-lg-4 col-sm-12 mt-1 ">
                  <LargeButton text="Buy your IVT tokens"    onClick={() => {
                  const userData = localStorage.getItem("userData");

                  if (!userData) {
                    navigate("/shop"); // Navigate to Dashboard if userData exists
                  } else {
                    navigate("/Dashboard"); // Navigate to Shop if userData does not exist
                  }
                }} />
                </div>
                <div className="col-lg-8 col-sm-12 mt-1">
                  {/* <OutlinedButtonDark
                    text={
                      <span className=" bold-5">
                        {" "}
                        Buy your selected memership club token
                      </span>
                    }
                  /> */}
                     <JoinMembership isSuggestCard />
                </div>
              </div>
            </div>
            <div className="text-column col-lg-6 col-md-12 col-sm-12 px-0 pl-5 pr-3">
              <div className="inner pl-3 pl-xl-0">
                <div className="sec-title mt-0">
                  <h4
                    style={{
                      fontSize: "30px",
                      fontWeight: "bold",
                      fontStyle: "italic",
                      color: "#333333",
                      marginTop:"-14px"
                    }}
                  >
                    iVestClub (IVT) Tokenomics
                  </h4>
                </div>
                <div className="sec-content">
                  <div className=" mt-2 pt-1">
                    <p
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "15px",
                        fontWeight: "400",
                        color: "#333333",
                      }}
                    >
                      IVT is the native coin of the iVestClub platform developed
                      on the ERC-20 network and designed to provide you with.
                    </p>

                    <p className="exclusiveContentText d-flex  align-items-center">
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "#F7B138",
                        }}
                      >
                        01
                      </span>
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "18px",
                          fontWeight: "400",
                          color: "#555555",
                          marginLeft: "36px",
                        }}
                      >
                        Development of your iVestClub Platform
                      </span>
                    </p>
                    <p className="exclusiveContentText d-flex  align-items-center mt-3">
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: "#F7B138",
                        }}
                      >
                        02
                      </span>
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "18px",
                          fontWeight: "400",
                          color: "#555555",
                          marginLeft: "36px",
                        }}
                      >
                        Create, Provide and Manage access to your choice of
                        Membership Club
                      </span>
                    </p>

                    <p className="compact-sub-text LightText mt-2">
                      There are a maximum of 4,565,000,000, which will allow us
                      to create a limited number of membership clubs. There are
                      81,000,000 IVT tokens created at the start of the platform
                      and when a new membership club is formed, another
                      37,500,000 tokens are minted.
                    </p>

                    <p className="compact-sub-text LightText">
                      Please click here for our whitepaper, where you can find
                      out more about the token
                    </p>
                    <h4
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        fontStyle: "italic",
                        color: "#333333",
                        marginTop:"-5px"
                      }}
                    >
                      Membership Club Tokenomics
                    </h4>

                    <p className="compact-sub-text LightText ">
                      Membership club tokens, developed on Ethereum, are unique
                      to each membership club.
                    </p>
                    <p className="compact-sub-text LightText mt-1">
                      Each Membership club will have a total of 25,000,000
                      tokens available . Once a membership club has sold all
                      these tokens, you can only gain access by offering to
                      purchase it from an existing member.
                    </p>
                    <p className="compact-sub-text LightText ">
                      Please click here for our white paper, where you can find
                      out the token
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="page-banner bottom-banner ">
        <div
          className="image-layer "
          style={{
            backgroundImage: `url(${about3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="row  justify-content-center px-5 mx-3 my-4 pt-3">
          <div className="col-12 text-center mb-3">
            <h2 className="bold-sec-title">
              IVestClub Members
              <TextUnderWrap padding={7}>hip Sta</TextUnderWrap>ts
            </h2>
            <p className="statsSubHead Opacity  mt-4 mb-5">
              Leading cryptocurrency exchange since day one of crypto
              distribution
            </p>
          </div>

          <div className="row mt-3 w-90 justify-content-center">
            <div className="col-md-3 col-sm-6 text-center  border-right-banner">
              <h2 className="stats-dig">
                {totalMemberShipClub||0}
              </h2>
              <p className="stats-des text-basic text-light-c mt-2">
                Number of Membership Clubs
              </p>
            </div>
            <div className="col-md-3 col-sm-6 text-center border-right-banner">
              <h2 className="stats-dig">{tokenDataList?.circulation||0}</h2>
              <p className="stats-des text-basic text-light-c mt-2">
                IVT tokens in existence
              </p>
            </div>
            <div className="col-md-3 col-sm-6 text-center border-right-banner">
              <h2 className="stats-dig">{tokenDataList?.hold_by_members||0}</h2>
              <p className="stats-des text-basic text-light-c mt-2">
                IVT tokens held by members
              </p>
            </div>
            <div className="col-md-3 col-sm-6 text-center ">
              <h2 className="stats-dig">{tokenDataList?.available_token||0}</h2>
              <p className="stats-des text-basic text-light-c mt-2">
                IVT Tokens available
              </p>
            </div>
          </div>
        </div>
      </section>
      <saction>
        <ImgBgSactionContainer bgImage={wave} showPadding={false}>
          <div className="row  w-100 justify-content-center text-dark mb-5 px-0">
            <div className="col-12 text-center mb-3">
              <div className="  section5-heading mont-font">
                iVestClub <TextUnderWrap padding={10}>Platforms</TextUnderWrap>
              </div>
            </div>
            <div className="col-12 text-center mb-3 d-flex justify-content-center ">
              <div className="w-80  text-center section5-head-text-token">
                Wants Wo Make Information About Emerging Technologies And
                Companies More Accessible
              </div>
            </div>

            <div className="row ex-card w-100 justify-content-center">
              <ExclusiveAccess
                icon={goldicon1}
                text2={
                  <span className="section5-sub-text">
                    {" "}
                    Fewer Avenues For Obtaining Data
                  </span>
                }
                size={70}
                mb={20}
              />
              <ExclusiveAccess
                icon={goldicon2}
                text2={
                  <span className="section5-sub-text">
                    Not Obligated To Disclose Information
                  </span>
                }
                size={70}
                mb={20}
              />
              <ExclusiveAccess
                icon={goldicon3}
                text2={
                  <span className="section5-sub-text">
                    Restricted To A Select Group Of Individuals Or Networks
                  </span>
                }
                size={70}
                mb={20}
              />
              <ExclusiveAccess
                icon={goldicon4}
                text2={
                  <span className="section5-sub-text">
                    Often Operate With Greater Confidentiality
                  </span>
                }
                size={70}
                mb={20}
              />
            </div>
          </div>
        </ImgBgSactionContainer>
      </saction>
      {/* <MemberShip /> */}
    </>
  );
};

export default Tokens;
