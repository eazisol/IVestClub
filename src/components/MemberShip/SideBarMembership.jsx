import React, { useEffect, useState } from "react";
import { SactionContainer } from "../Common/Containers";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import { OutlinedButtonDark, OutlinedButtonWarning } from "../Common/Buttons";
import { Ethereum, Bitcoin, Usdt } from "../Common/CurrencyIcons";
import { Avatar, PdfIcon, DocIcon, SidebarImg } from "../Common/Icons";
import { NavLink } from "react-bootstrap";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { baseUrl, imgUrl } from "../../../apiConfig";
import { formatBytes, formatdateHeading } from "../Common/Utills";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useNavigate } from "react-router-dom";
import { appData } from "../Context/AppContext";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import axios from "axios";

const SideBarMembership = ({
  memberorlist,
  files,
  bloglist,
  newslist,
  membershipData,
}) => {
  const { newsData, setNewsData, articalData, setArticalData } = appData();
  const [memberLimit, setMemberLimit] = useState(3);
  const [newsLimit, setNewsLimit] = useState(3);
  const [filesLimit, setFilesLimit] = useState(3);
  const [articalsLimit, setArticalsLimit] = useState(1);
  const [tokens, setTokens] = useState([]);
  console.log("token: ", tokens);
 

  const [membershipDetails, setMembershipDetails] = useState(() => {
    const savedData = localStorage.getItem("membershipData");
    return JSON.parse(savedData);
    // return savedData ? JSON.parse(savedData) : null;
  });


  const navigate = useNavigate();
  
  
  
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
    axios.get(`${baseUrl}token/getAllTokenData`)
      .then(response => {
        if (response.data.success) {
          setTokens(response.data.data);
        }
      })
      .catch(error => console.error("Error fetching token data:", error));
  }, []);

  return (
    <>
      <div className="card card-border-c p-0 overflow-hidden">
        <div className=" bg-basic px-4 py-3">
          <div className="w-100 d-flex justify-content-between align-items-center mt-2 pt-2">
            <div className="d-flex">
            <div
              className="d-flex justify-content-between align-items-center mr-2"
              style={{
                padding: 5,
                backgroundColor: "#F5A93F",
                borderRadius: "30px",
                height: "30px",
                width: "30px",
              }}
            >
              {tokens.find(token => token.name === "IVT")?.logo ? (
                <img
                  src={`${imgUrl}${tokens.find(token => token.name === "IVT")?.logo}`}
                  alt="IVT Logo"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              ) : (
                <span style={{ color: "#fff", fontSize: 12 }}>IVT</span> // Fallback text
              )}
            </div>

              <h4 className="mb-0 pop-font bold-4">${tokens.find(token => token.name === "IVT")?.token_conversion_rate || "N/A"}</h4>
            </div>
            <div className="">
              <p className="mb-0 text-basic" style={{ fontSize: "11px" }}>
                Joined on
              </p>
              <p
                style={{ fontSize: "11px", textAlign: "center" }}
                className="text-light bold-2"
              >
                {membershipDetails.memberorlist[0].created_at}
              </p>
            </div>
          </div>
          <div className="w-100 mb-2 pb-1 mt-3">
            <OutlinedButtonWarning text={"Buy More OpenAI Membership Tokens"} onClick={() => {navigate(`/Dashboard`)}}/>
          </div>
        </div>
        <div className="p-4">
      <h6 className="text-dark mb-3 sideHeadText">Your Current Holdings</h6>
      {tokens.map((token, index) => (
        <div className="d-flex align-items-center mt-2" key={token.tokenId}>
          <div className="col-1 p-0">
            <p className="text-secondary text-xs mb-0">{index + 1}</p>
          </div>
          <div className="col-7 pl-0 d-flex pr-0 align-items-center">
            <img src={`${imgUrl}${token.logo}`} alt={token.symbol} width={20} height={20} />
            <p className="text-dark mb-0 mt-1 pl-1">
              <strong className="text-sm bold-6">{token.symbol}</strong>
              <small className="text-xs text-grey"> {token.name}</small>
            </p>
          </div>
          <div className="col-4 px-0 pr-1 text-right">
            <p className="text-dark mb-0 mt-1">
              <span className="text-sm bold-6">${parseFloat(token.token_conversion_rate).toFixed(2)}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
      </div>
      <div className="card card-border-c mt-3">
        <div className="p-4">
          <h6 className="text-dark mb-0 sideHeadText">
            <>Your Fellow Members</>
          </h6>
        </div>
        {memberorlist?.slice(0, memberLimit)?.map((data, index) => (
          <React.Fragment key={index}>
            <div className="d-flex align-items-center mt-2">
              <div className="col-3 p-0 text-right">
                {data.user.profileimg? 
                
                <img
                src={imgUrl + data.user.profileimg}
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50px",
                }}
                />
              : 
                <AccountCircleOutlinedIcon
                sx={{ color: "#ccc", fontSize: 50 }}
                />
              }
              </div>
              <div className="col-8  ">
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
        {bloglist?.slice(0, articalsLimit)?.map((data, index) => (
          <React.Fragment key={index}>
            <div className="d-flex align-items-center mt-2">
              <div className="w-auto p-0 text-right ">
                {data.thumnnail? 
                <img
                src={imgUrl + data.thumnnail}
                style={{ height: "50px", width: "50px" }}
                />
              : 
              <SpaceDashboardOutlinedIcon  sx={{ color: "#ccc", fontSize: 40 }}/>}
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
        ))}

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
              {data.thumbnail? 
                <img
                src={imgUrl + data.thumbnail}
                style={{ height: "50px", width: "50px" }}
                />
              : 
              <ArticleOutlinedIcon  sx={{ color: "#ccc", fontSize: 40 }}/>}
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
            <>OpenAI Tokenomics</>
          </h6>
          <div
            style={{ fontSize: "13px" }}
            className="text-black  mb-0 mt-4 mont-font"
          >
            <strong>Number of Tokens</strong>
          </div>
        </div>
        <div className="d-flex align-items-center mt-1 font-italic">
          <div className="col-9 p-0">
            <div className=" openAiText DarkText">
              Maximum Number of Tokens Available
            </div>
          </div>
          <div className="col-3 text-right">
            <p className="mb-0 openAiText text-warning ">99999</p>
          </div>
        </div>
        <div className="d-flex align-items-center mt-2 font-italic">
          <div className="col-9 p-0">
            <div className=" openAiText DarkText">Tokens in Circulation:</div>
          </div>
          <div className="col-3 text-right">
            <p className="mb-0 openAiText text-warning">99999</p>
          </div>
        </div>
        <div className="d-flex align-items-center mt-2 font-italic">
          <div className="col-9 p-0">
            <div className=" openAiText DarkText">
              Subscription Price of a token:
            </div>
          </div>
          <div className="col-3 text-right">
            <p className="mb-0 openAiText text-warning">1 ICT</p>
          </div>
        </div>
        <div className="d-flex align-items-center mt-2 font-italic">
          <div className="col-9 p-0">
            <div className=" openAiText DarkText">Price of ICT currently:</div>
          </div>
          <div className="col-3 text-right">
            <p className="mb-0 openAiText text-warning">1 USD</p>
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
        <div className="share mont-font bold-7  text-dark">Share</div>
        <div className="iconContainer d-flex justify-content-between mt-3">
          <div className="sideBaricon fab  fa-facebook-f"> </div>
          <div className="sideBaricon fab fa-twitter"></div>
          <div className="sideBaricon fab fa-whatsapp "></div>
          <div className="sideBaricon fab fa-instagram"> </div>
          <div className="sideBaricon fab fa-youtube"></div>
        </div>
      </div>
    </>
  );
};

export default SideBarMembership;
