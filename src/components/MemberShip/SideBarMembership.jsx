import React, { useEffect, useState, useRef } from "react";
import { SactionContainer } from "../Common/Containers";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import { OutlinedButtonDark, OutlinedButtonWarning } from "../Common/Buttons";
import { Ethereum, Bitcoin, Usdt } from "../Common/CurrencyIcons";
import { Avatar, PdfIcon, DocIcon, SidebarImg } from "../Common/Icons";
import { NavLink } from "react-bootstrap";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { baseUrl, imgUrl } from "../../../apiConfig";
import {
  decryptNumber,
  formatBytes,
  formatdateHeading,
} from "../Common/Utills";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useNavigate } from "react-router-dom";
import { appData } from "../Context/AppContext";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import axios from "axios";
import useApi from "../Hooks/useApi";

const SideBarMembership = ({ memberorlist, files, bloglist, newslist }) => {
  const { newsData, setNewsData, articalData, setArticalData, userHoldings } =
    appData();
  const [memberLimit, setMemberLimit] = useState(3);
  const [newsLimit, setNewsLimit] = useState(3);
  const [filesLimit, setFilesLimit] = useState(3);
  const [articalsLimit, setArticalsLimit] = useState(1);
  const [tokens, setTokens] = useState([]);
  const [tokomics, setTokomics] = useState([]);
  const [membershipData, setMembershipData] = useState();
  const queryParams = new URLSearchParams(window.location.search);
  const idParam = queryParams.get("id");
  console.log("tokens: ", tokens);
  const shareUrl = `${imgUrl}/Membership/Public?id=${idParam}`;
  const encodedShareUrl = encodeURIComponent(shareUrl);
  const ivtToken = userHoldings?.find((token) => token.symbol === "IVT");
  const [tokenHoldings, setTokenHoldings] = useState({});
  const navigate = useNavigate();
  // Keep track of the previous holdings to avoid unnecessary updates
  const prevHoldingsRef = useRef(null);
  const [tokenDataList, setTokenDataList] = useState([]);
  const [totalMemberShipClub, setTotalMemberShipClub] = useState("");
  const handleTokenApi = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}token/getAllTokenData`);
      setTotalMemberShipClub(data?.total_membershipclubs);
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

  const { mutate: getData, isPending: isMembershipLoading, error } = useApi();
  const getMembershipData = () => {
    getData(
      {
        url: `membershipclub/details/${decryptNumber(idParam)}`,
        method: "GET",
        sendHeaders: true,
      },
      {
        onSuccess: (data) => {
          console.log("get data 1234", data);

          setMembershipData(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  // useEffect(() => {
  //   getMembershipData();
  //   console.log("import.meta.env.VITE_APP_API_IMG_URL",import.meta.env.VITE_APP_DISCORD_SERVER_ID)
  //   // Fetch holdings from localStorage
  //   const storedHoldings = JSON.parse(localStorage.getItem("tokenHoldings")) || [];
  //   setTokenHoldings(storedHoldings); // Save holdings in state
  //   console.log("tokenHoldings-useefecct",tokenHoldings)
  // }, []);

  // Function to get holdings from localStorage with deep comparison
  const getTokenHoldingsFromStorage = () => {
    const storedHoldings =
      JSON.parse(localStorage.getItem("tokenHoldings")) || [];

    // Only update if the holdings have actually changed
    if (
      JSON.stringify(storedHoldings) !== JSON.stringify(prevHoldingsRef.current)
    ) {
      setTokenHoldings(storedHoldings);
      prevHoldingsRef.current = storedHoldings;
      console.log("tokenHoldings updated from storage:", storedHoldings);
    }
  };

  // Effect for initial setup and event listeners
  useEffect(() => {
    getMembershipData();

    // Initial fetch of holdings
    getTokenHoldingsFromStorage();

    // Set up event listener for storage changes from other tabs
    const handleStorageChange = (event) => {
      if (event.key === "tokenHoldings") {
        getTokenHoldingsFromStorage();
      }
    };

    // Set up event listener for wallet connection
    const handleWalletConnection = () => {
      getTokenHoldingsFromStorage();
    };

    // Add event listeners
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("walletConnected", handleWalletConnection);

    // Use a MutationObserver to watch for changes to localStorage within this tab
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      // Call the original function
      originalSetItem.apply(this, arguments);

      // If the tokenHoldings key was modified, update our component
      if (key === "tokenHoldings") {
        getTokenHoldingsFromStorage();
      }
    };

    // Clean up
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("walletConnected", handleWalletConnection);

      // Restore original localStorage.setItem
      localStorage.setItem = originalSetItem;
    };
  }, []);

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();

    switch (extension) {
      case "pdf":
        return <PdfIcon size={40} />; // Return a PDF icon
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <ImageOutlinedIcon sx={{ fontSize: 40, color: "#ccc" }} />; // Return an image icon
      case "doc":
      case "docx":
        return <DocIcon size={40} />; // Return a Word document icon
      case "xls":
      case "xlsx":
        return <DocIcon size={40} />; // Return an Excel icon
      // case 'ppt':
      // case 'pptx':
      //   return '📈'; // Return a PowerPoint icon
      // case 'txt':
      //   return '📝'; // Return a text file icon
      // case 'zip':
      // case 'rar':
      //   return '📦'; // Return a compressed file icon
      // case 'mp4':
      // case 'mkv':
      // case 'avi':
      //   return '🎥'; // Return a video file icon
      // case 'mp3':
      // case 'wav':
      //   return '🎵'; // Return an audio file icon
      default:
        return <ImageOutlinedIcon sx={{ fontSize: 40, color: "#ccc" }} />; // Default icon for unknown file types
    }
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}token/getAllTokenData`)
      .then((response) => {
        if (response.data.success) {
          const filteredTokens = response.data.data.filter((i) => {
            return i.membershipclub_id == decryptNumber(idParam) / 1;
          });

          setTokomics(filteredTokens); // Update state with filtered data
          setTokens(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching token data:", error));
  }, []);

  return (
    <>
      <div className="card card-border-c p-0 overflow-hidden">
        <div className=" bg-basic px-4 py-3">
          <div className="w-100 d-flex justify-content-between align-items-center mt-2 pt-2">
            <div className="d-flex">
              <div
                className="d-flex justify-content-between align-items-center mr-2"
                // style={{
                //   padding: 5,
                //   backgroundColor: "#F5A93F",
                //   borderRadius: "30px",
                //   height: "30px",
                //   width: "30px",
                // }}
              >
                {/* {tokens.find(token => token.name === "IVT")?.logo ? (
                <img
                  src={`${imgUrl}${tokens.find(token => token.name === "IVT")?.logo}`}
                  alt="IVT Logo"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              ) : (
                <span style={{ color: "#fff", fontSize: 12 }}>IVT</span> // Fallback text
              )} */}
                {ivtToken?.logo ? (
                  <img
                    src={`${imgUrl}/${ivtToken?.logo}`}
                    alt="Logo"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50px",
                    }}
                  />
                ) : (
                  <VectorIcon size={40} rounded={true} />
                )}
              </div>

              <h4 className="mb-0 pop-font bold-4 mt-1">
                ${ivtToken?.balance ?? 0}
              </h4>
            </div>
            <div className="">
              <p className="mb-0 text-basic" style={{ fontSize: "11px" }}>
                Joined
              </p>
              {/* <p
                style={{ fontSize: "11px", textAlign: "center" }}
                className="text-light bold-2"
              >
                {membershipData?.memberorlist[0]?.created_at}
              </p> */}
            </div>
          </div>
          <div className="w-100 mb-2 pb-1 mt-3">
            <OutlinedButtonWarning
              text={"Buy More OpenAI Membership Tokens"}
              onClick={() => {
                navigate(`/Dashboard`);
              }}
            />
          </div>
        </div>
        <div className=" p-4">
          {/* userHoldings */}
          <h6 className="text-dark mb-3 sideHeadText ">
            Your Current Holdings
          </h6>
          {userHoldings.length > 0 ? (
            userHoldings.map((token, index) => {
              return (
                <div className="d-flex align-items-center mt-2" key={index}>
                  <div className="col-1 p-0">
                    <p className="text-secondary text-xs mb-0">{index + 1}</p>
                  </div>
                  <div className="col-7 pl-0 d-flex pr-0 align-items-center">
                    <img
                      src={`${imgUrl}${token.logo}`}
                      alt={token.symbol}
                      width={20}
                      height={20}
                      style={{ borderRadius: 50, marginTop: "2px" }}
                    />
                    <p className="text-dark mb-0  pl-2">
                      <strong className="text-sm bold-6">{token.symbol}</strong>
                      <small className="text-xs text-grey ">
                        {" "}
                        {token.name}
                      </small>
                    </p>
                  </div>
                  <div className="col-4 px-0 pr-1 text-right">
                    <p className="text-dark mb-0 mt-1">
                      <span className="text-sm bold6">{`$${token.balance}`}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-secondary">No tokens available.</p>
          )}
          {/* {tokens.length > 0 ? (
                tokens.map((token, index) => {
                    const holding = tokenHoldings.find(h =>  h.name.toUpperCase() === token.symbol);
                    const balance = holding ? holding.balance : "0.0000"; 
                    return (
                     
                        <div className="d-flex align-items-center mt-2"  key={token.name}>
                        <div className="col-1 p-0">
                          <p className="text-secondary text-xs mb-0">{index + 1}</p>
                        </div>
                        <div className="col-7 pl-0 d-flex pr-0 align-items-center">
                        <img src={`${imgUrl}${token.logo}`} alt={token.symbol} width={20} height={20} style={{borderRadius:50,marginTop:"2px"}}/>
                          <p className="text-dark mb-0  pl-2">
                            <strong className="text-sm bold-6">{token.symbol}</strong>
                            <small className="text-xs text-grey "> {token.name}</small>
                          </p>
                        </div>
                        <div className="col-4 px-0 pr-1 text-right">
                          <p className="text-dark mb-0 mt-1">
                            <span className="text-sm bold6">{`$${balance}`}</span>
                          </p>
                        </div>
                      </div>
                    );
                })
            ) : (
                <p className="text-secondary">No tokens available.</p>
            )} */}
        </div>
      </div>

      <div className="card card-border-c mt-3">
        <div className="p-3">
          <h6 className="text-dark mb-0 sideHeadText">
            <>Your Fellow Members</>
          </h6>
        </div>
        {memberorlist?.slice(0, memberLimit)?.map((data, index) => (
          <React.Fragment key={index}>
            <div className="d-flex align-items-center pb-3 ">
              <div className="col-1 p-0 text-right pl-3">
                {data.user.profileimg ? (
                  <img
                    src={imgUrl + data.user.profileimg}
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50px",
                    }}
                  />
                ) : (
                  <AccountCircleOutlinedIcon
                    sx={{ color: "#ccc", fontSize: 50 }}
                  />
                )}
              </div>
              <div className="col-10  ml-4">
                <div>
                  <h6 className="mb-0 text-dark text-basic-h7">
                    <strong className="bold-5">
                      {data.user.FirstName} {data.user.LastName}
                    </strong>
                  </h6>
                  <p className="text-secondary text-xs mb-0">
                    Member Since {data.created_at.slice(0, 4)}
                  </p>
                </div>
              </div>
            </div>
            {index !== memberorlist?.slice(0, memberLimit).length - 1 && <hr />}
          </React.Fragment>
        ))}

        {memberLimit < memberorlist?.length ? (
          <>
            <hr />
            <NavLink
              to={"/"}
              style={{ textDecoration: "underline" }}
              className="pt-0 text-center mb-2"
              onClick={(e) => {
                e.preventDefault();
                setMemberLimit(memberorlist?.length);
              }}
            >
              View All
            </NavLink>
          </>
        ) : null}
      </div>
      <div className="card card-border-c mt-3 p-2">
        <div className="p-3">
          <h6 className="text-dark mb-3 sideHeadText">
            <>Library - Include List Of Videos</>
          </h6>
        </div>

        {files?.slice(0, filesLimit)?.map((data, index) => (
          <React.Fragment key={index}>
            <div className="d-flex align-items-center mt-2">
              <div className="col-2 p-0 text-right pl-2">
                {getFileIcon(data.file)}
              </div>
              <div className="col-8">
                <div>
                  <p className="mb-0 text-basic text-dark bold-5">
                    {data.name}
                  </p>
                  <p className="text-secondary text-xs mb-0">
                    {formatBytes(data.size)} &#8226; Updated{" "}
                    {formatdateHeading(data.updated_at)}
                  </p>
                </div>
              </div>
              <div className="col-2 p-0 pr-1">
                <a href={imgUrl + data.file} download>
                  <FileDownloadOutlinedIcon
                    sx={{ color: "#ccc", cursor: "pointer" }}
                  />
                </a>
              </div>
            </div>
            {index !== files?.slice(0, filesLimit).length - 1 && <hr />}
          </React.Fragment>
        ))}

        {filesLimit < files?.files ? (
          <>
            <hr />
            <NavLink
              to={"/"}
              style={{ textDecoration: "underline" }}
              className="pt-0 text-center mb-2"
              onClick={(e) => {
                e.preventDefault();
                setFilesLimit(files?.length);
              }}
            >
              View All
            </NavLink>
          </>
        ) : null}
      </div>
      <div className="card card-border-c mt-3 p-4">
        <div className="">
          <h6 className="text-dark mb-3 sideHeadText">
            <>Latest Articles</>
          </h6>
        </div>
        {bloglist?.slice(0, articalsLimit)?.map((data, index) => {
          return (
            <React.Fragment key={index}>
              <div className="d-flex align-items-center mt-2">
                <div className="w-auto p-0 text-right ">
                  {data.thumnnail ? (
                    <img
                      src={imgUrl + data.thumnnail}
                      style={{ height: "50px", width: "50px" }}
                    />
                  ) : (
                    <SpaceDashboardOutlinedIcon
                      sx={{ color: "#ccc", fontSize: 40 }}
                    />
                  )}
                </div>
                <div className="col-9  ">
                  <div>
                    <p className="mb-0 text-basic text-dark bold-5">
                      {data.title}
                    </p>
                    <NavLink
                      to="#"
                      style={{
                        textDecoration: "underline",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                      className="p-0  mb-2"
                      onClick={() => {
                        setArticalData({
                          ...data,
                          ...membershipData,
                          articalTitle: data.title,
                        });
                        if (data.type == "url") {
                          window.open(data.content, "_blank");
                        } else {
                          navigate("/Articals");
                        }
                      }}
                    >
                      Read More
                    </NavLink>
                  </div>
                </div>
              </div>
              {index !== bloglist?.slice(0, articalsLimit).length - 1 && <hr />}
            </React.Fragment>
          );
        })}

        {articalsLimit < bloglist?.length ? (
          <>
            <hr />
            <NavLink
              to={"/"}
              style={{ textDecoration: "underline" }}
              className="pt-0 text-center mb-2"
              onClick={(e) => {
                e.preventDefault();
                setArticalsLimit(bloglist?.length);
              }}
            >
              View All
            </NavLink>
          </>
        ) : null}
      </div>
      <div className="card card-border-c mt-3 p-4">
        <div className="">
          <h6 className="text-dark mb-3 sideHeadText">
            <>Latest News</>
          </h6>
        </div>

        {newslist?.slice(0, newsLimit)?.map((data, index) => (
          <React.Fragment key={index}>
            <div className="d-flex align-items-center mt-2">
              <div className="w-auto p-0 text-right ">
                {data.thumbnail ? (
                  <img
                    src={imgUrl + data.thumbnail}
                    style={{ height: "50px", width: "50px" }}
                  />
                ) : (
                  <ArticleOutlinedIcon sx={{ color: "#ccc", fontSize: 40 }} />
                )}
              </div>
              <div className="col-9  ">
                <div>
                  <p className="mb-0 text-basic text-dark bold-5">
                    {data.title}
                  </p>
                  <NavLink
                    to="#"
                    style={{
                      textDecoration: "underline",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                    className="p-0  mb-2"
                    onClick={() => {
                      setNewsData({
                        ...data,
                        ...membershipData,
                        articalTitle: data.title,
                      });

                      if (data.type == "url") {
                        window.open(data.content, "_blank");
                      } else {
                        navigate("/News");
                      }
                    }}
                  >
                    Read More
                  </NavLink>
                </div>
              </div>
            </div>
            {index !== newslist?.slice(0, newsLimit).length - 1 && <hr />}
          </React.Fragment>
        ))}
        {newsLimit < newslist?.length ? (
          <>
            <hr />
            <NavLink
              to={"/"}
              style={{ textDecoration: "underline" }}
              className="pt-0 text-center mb-2"
              onClick={(e) => {
                e.preventDefault();
                setNewsLimit(newslist?.length);
              }}
            >
              View All
            </NavLink>
          </>
        ) : null}
      </div>

      <div className="card card-border-c mt-3 p-4">
        <div className="">
          <h6 className="text-dark mb-3 sideHeadText">
            <>{`${
              membershipData?.title == "SpaceX"
                ? membershipData?.title
                : "OpenAI"
            } Tokenomics`}</>
          </h6>
          <div
            style={{ fontSize: "13px" }}
            className="text-black  mb-0 mt-4 mont-font"
          >
            <strong>Number of Tokens</strong>
          </div>
        </div>
        <div className="d-flex align-items-center font-italic mt-2 justify-content-between sideBarTokenomics">
          <div className=" openAiText DarkText p-0">
            Maximum no. of Tokens Available:
          </div>

          <div className=" text-right">
            <p className="mb-0 openAiText text-warning ">
              <div>
                {tokomics[0]?.totalsupply !== undefined
                  ? new Intl.NumberFormat().format(tokomics[0].totalsupply)
                  : "N/A"}
              </div>
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center font-italic justify-content-between sideBarTokenomics2">
          <div className=" openAiText DarkText  p-0">
            Tokens in Circulation:
          </div>

          <div className=" text-right">
            <p className="mb-0 openAiText text-warning">
              {tokomics[0]?.circulation !== undefined
                ? new Intl.NumberFormat().format(tokomics[0].circulation)
                : "N/A"}
            </p>
          </div>
        </div>
        <div className="d-flex align-items-centerfont-italic justify-content-between sideBarTokenomics">
          <div className=" openAiText DarkText  p-0">
            Subscription Price of a token:
          </div>

          <div className=" text-right ">
            <p className="mb-0 openAiText text-warning">
              {membershipData?.price} IVT
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center font-italic justify-content-between ">
          <div className=" openAiText DarkText  p-0">
            Price of IVT currently:
          </div>

          <div className=" text-right">
            <p className="mb-0 openAiText text-warning">
              {tokomics[0]?.token_conversion_rate || "N/A"} USD
            </p>
          </div>
        </div>
        <hr />
        <div className="text-dark faqLines  mb-0 mt-3 px-1 ">
          Learn More about membership and platform tokens
        </div>
        <div className="text-dark faqLines mb-0 mt-3 px-1">
          FAQs on Memebership Tokens
        </div>
        <div className="text-dark faqLines mb-0 mt-3 px-1 mb-3">
          What are membership tokens?
        </div>
        <hr />
        <h6 className="text-black text-basic mb-0 mt-3 px-1 mont-font">
          <strong className="bold-8 text-dark">
            Ask a question about Membership Token
          </strong>
        </h6>
        <p className="text-basic-lable mb-0 pop-font LoginSubHead mt-3 px-1">
          <>Write Your Question</>
        </p>
        <div className="px-1">
          <textarea
            className="form-control"
            style={{ height: "150px" }}
          ></textarea>
          <div className="my-5">
            <OutlinedButtonDark text={"Submit"} />
          </div>
        </div>
      </div>
      <div className="container mt-4 mb-5">
        <div className="share mont-font bold-7 text-dark">Share</div>
        <div className="iconContainer d-flex  mt-3">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="sideBaricon fab fa-facebook-f mr-3"
          ></a>

          <a
            href={`https://twitter.com/intent/tweet?url=${encodedShareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="sideBaricon fab fa-twitter  mr-3"
          ></a>

          <a
            href={`https://api.whatsapp.com/send?text=${encodedShareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="sideBaricon fab fa-whatsapp  mr-3"
          ></a>

          <a
            href={`https://www.instagram.com/?url=${encodedShareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="sideBaricon fab fa-instagram  mr-3"
          ></a>

          <a
            href={`https://www.youtube.com/share?url=${encodedShareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="sideBaricon fab fa-youtube"
          ></a>
        </div>
      </div>
    </>
  );
};

export default SideBarMembership;
