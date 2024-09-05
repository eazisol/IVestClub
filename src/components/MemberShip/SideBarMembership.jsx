import React, { useEffect } from "react";
import { SactionContainer } from "../Common/Containers";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import { OutlinedButtonDark, OutlinedButtonWarning } from "../Common/Buttons";
import { Ethereum, Bitcoin, Usdt } from "../Common/CurrencyIcons";
import { Avatar, PdfIcon, DocIcon, SidebarImg } from "../Common/Icons";
import { NavLink } from "react-bootstrap";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const SideBarMembership = () => {

  return (
    <>
        <div className="card card-border-c p-0 overflow-hidden">
          <div className=" bg-basic px-4 py-3">
            <div className="w-100 d-flex justify-content-between align-items-center mt-2 pt-2">
              <div className="d-flex">
                <div
                  className=" d-flex justify-content-between align-items-center mr-2"
                  style={{
                    padding: 5,
                    backgroundColor: "#F5A93F",
                    borderRadius: "30px",
                    height: "30px",
                    width: "30px",
                  }}
                >
                  <CurrencyBitcoinOutlinedIcon
                    sx={{ color: "#fff", fontSize: 19 }}
                  />
                </div>
                <h4 className="mb-0 pop-font bold-4">2.06268</h4>
              </div>
              <div className="">
                <p className="mb-0 text-basic" style={{fontSize:"11px"}}>Joined on</p>
                <p style={{fontSize:"11px" , textAlign:"center"}}  className="text-light bold-2">4/22/2024</p>
              </div>
            </div>
            <div className="w-100 mb-4 mt-2">
              <OutlinedButtonWarning
                text={"Buy More OpenAI Membership Tokens"}
              />
            </div>
          </div>
          <div className="px-3 mt-3 ">
            <h6 className="text-dark mb-3 sideHeadText">
              <strong>Your Current Holdings</strong>
            </h6>
            <div className="d-flex align-items-center mt-2">
              <div className="col-1 text-center">
                <p className="text-secondary text-xs mb-0">1</p>
              </div>
              <div className="col-7 d-flex pr-0 align-items-center">
                <Bitcoin size={20} />
                <p className="text-dark mb-0 mt-1 pl-1">
                  <strong className="text-sm bold-6">BTC</strong>
                  <small className="text-xs text-grey "> Bitcoin</small>
                </p>
              </div>
              <div className="col-4 px-0 pr-1 text-right">
                <p className="text-dark mb-0 mt-1">
                  <strong className="text-sm">$9999.787</strong>
                </p>
              </div>
            </div>
            <div className="d-flex  align-items-center mt-2">
              <div className="col-1 text-center">
                <p className="text-secondary text-xs mb-0">2</p>
              </div>
              <div className="col-7 pr-0 d-flex align-items-center">
                <Ethereum size={20} />
                <p className="text-dark  mb-0 mt-1 pl-1">
                  <strong className="text-sm bold-6">ETH</strong>
                  <small className="text-xs text-grey"> Ethereum</small>
                </p>
              </div>
              <div className="col-4 px-0 pr-1 text-right ">
                <p className="text-dark mb-0 mt-1">
                  <strong className="text-sm">$9999.787</strong>
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mt-2 mb-3">
              <div className="col-1 text-center">
                <p className="text-secondary text-xs mb-0">3</p>
              </div>
              <div className="col-7 d-flex pr-0 align-items-center">
                <Usdt size={20} />
                <p className="text-dark mb-0 mt-1 pl-1">
                  <strong className="text-sm bold-6">USDT</strong>
                  <small className="text-xs text-grey"> TetherUS</small>
                </p>
              </div>
              <div className="col-4 px-0 pr-1 text-right">
                <p className="text-dark mb-0 mt-1">
                  <strong className="text-sm">$9999.787</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card card-border-c mt-3">
          <div className="p-3">
            <h6 className="text-dark mb-0 sideHeadText">
              <strong>Your fellow members</strong>
            </h6>
          </div>
          <div className="d-flex align-items-center mt-4">
            <div className="col-3 p-0 text-right">
              <Avatar size={50} />
            </div>
            <div className="col-8  ">
              <div>
                <h6 className="mb-0 text-dark text-basic-h7">
                  <strong className="bold-5">John Doe</strong>
                </h6>
                <p className="text-secondary text-xs mb-0">Member Since 2016</p>
              </div>
            </div>
          </div>

          <hr />
          <div className="d-flex align-items-center mt-2">
            <div className="col-3 p-0 text-right">
              <Avatar size={50} />
            </div>
            <div className="col-8  ">
              <div>
                <h6 className="mb-0 text-dark text-basic-h7">
                  <strong className="bold-5">John Doe</strong>
                </h6>
                <p className="text-secondary text-xs  mb-0">Member Since 2016</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center mt-2">
            <div className="col-3 p-0 text-right">
              <Avatar size={50} />
            </div>
            <div className="col-8  ">
              <div>
                <h6 className="mb-0 text-dark text-basic-h7">
                  <strong className="bold-5">John Doe</strong>
                </h6>
                <p className="text-secondary text-xs mb-0">Member Since 2016</p>
              </div>
            </div>
          </div>
          <hr />
          <NavLink
            to={"/"}
            style={{ textDecoration: "underline" }}
            className="pt-0 text-center mb-2"
          >
            View All
          </NavLink>
        </div>
        <div className="card card-border-c mt-3 p-2">
          <div className="p-3">
            <h6 className="text-dark mb-3 sideHeadText">
              <strong>Library - include list of videos</strong>
            </h6>
          </div>
          <div className="d-flex align-items-center mt-2">
            <div className="col-2 p-0 text-right pl-2">
              <PdfIcon size={40} />
            </div>
            <div className="col-8  ">
              <div>
                <p className="mb-0 text-basic text-dark bold-5">
                  Lorem ipsum dolor sit amet, cetur elit...
                </p>
                <p className="text-secondary text-xs mb-0">18 Mb . Updated 4/25/24</p>
              </div>
            </div>
            <div className="col-2 p-0 pr-1">
              <FileDownloadOutlinedIcon sx={{ color: "#ccc" }} />
            </div>
          </div>

          <hr />
          <div className="d-flex align-items-center mt-2">
            <div className="col-2 p-0 text-right pl-2">
              <PdfIcon size={40} />
            </div>
            <div className="col-8  ">
              <div>
                <p className="mb-0 text-basic text-dark bold-5">
                  Lorem ipsum dolor sit amet, cetur elit...
                </p>
                <p className="text-secondary text-xs mb-0">18 Mb . Updated 4/25/24</p>
              </div>
            </div>
            <div className="col-2 p-0 pr-1">
              <FileDownloadOutlinedIcon sx={{ color: "#ccc" }} />
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center mt-2">
            <div className="col-2 p-0 text-right pl-2">
              <DocIcon size={40} />
            </div>
            <div className="col-8  ">
              <div>
                <p className="mb-0 text-basic text-dark bold-5">
                  Lorem ipsum dolor sit amet, cetur elit...
                </p>
                <p className="text-secondary text-xs mb-0">18 Mb . Updated 4/25/24</p>
              </div>
            </div>
            <div className="col-2 p-0 pr-1">
              <FileDownloadOutlinedIcon sx={{ color: "#ccc" }} />
            </div>
          </div>
          <hr />
          <NavLink
            to={"/"}
            style={{ textDecoration: "underline" }}
            className="pt-0 text-center mb-2"
          >
            View All
          </NavLink>
        </div>
        <div className="card card-border-c mt-3 p-4">
          <div className="">
           
            <h6 className="text-dark mb-3 sideHeadText">
              <strong>Latest Articles</strong>
            </h6>
          </div>
          <div className="d-flex align-items-center mt-2">
            <div className="w-auto p-0 text-right ">
              <SidebarImg size={50} />
            </div>
            <div className="col-9  ">
              <div>
               
                <p className="mb-0 text-basic text-dark bold-5">
                  Lorem ipsum dolor sit amet, cetur elit...
                </p>
                <NavLink
                  to={"/"}
                  style={{ textDecoration: "underline" , fontSize:"14px", fontWeight:"500"}}
                  className="p-0  mb-2"
                >
                  Read More
                </NavLink>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center mt-2">
            <div className="w-auto p-0 text-right ">
              <SidebarImg size={50} />
            </div>
            <div className="col-9  ">
              <div>
              <p className="mb-0 text-basic text-dark bold-5">
                  Lorem ipsum dolor sit amet, cetur elit...
                </p>
                <NavLink
                  to={"/"}
                  style={{ textDecoration: "underline", fontSize:"14px", fontWeight:"500" }}
                  className="p-0  mb-2"
                >
                  Read More
                </NavLink>
              </div>
            </div>
          </div>
          <hr />{" "}
          <div className="d-flex align-items-center mt-2">
            <div className="w-auto p-0 text-right ">
              <SidebarImg size={50} />
            </div>
            <div className="col-9  ">
              <div>
              <p className="mb-0 text-basic text-dark bold-5">
                  Lorem ipsum dolor sit amet, cetur elit...
                </p>
                <NavLink
                  to={"/"}
                  style={{ textDecoration: "underline", fontSize:"14px", fontWeight:"500"}}
                  className="p-0  mb-2"
                >
                  Read More
                </NavLink>
              </div>
            </div>
          </div>
          <hr />
          <NavLink
            to={"/"}
            style={{ textDecoration: "underline" }}
            className="pt-0 text-center mb-2"
          >
            View All
          </NavLink>
        </div>
        <div className="card card-border-c mt-3 p-4">
          <div className="">
           
            <h6 className="text-dark mb-3 sideHeadText">
              <strong>Latest News</strong>
            </h6>
          </div>
          <div className="d-flex align-items-center mt-2">
            <div className="w-auto p-0 text-right ">
              <SidebarImg size={50} />
            </div>
            <div className="col-9  ">
              <div>
               
                <p className="mb-0 text-basic text-dark bold-5">
                 <u> Lorem ipsum dolor sit amet, cetur elit...</u>
                </p>
               
                <div className="LightText Opacity" style={{fontSize:"10px"}}>News Now</div>  
              
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center mt-2">
            <div className="w-auto p-0 text-right ">
              <SidebarImg size={50} />
            </div>
            <div className="col-9  ">
              <div>
              <p className="mb-0 text-basic text-dark bold-5">
              <u> Lorem ipsum dolor sit amet, cetur elit...</u>
                </p>
                <div className="LightText Opacity" style={{fontSize:"10px"}}>News Now</div>
              </div>
            </div>
          </div>
          <hr />{" "}
          <div className="d-flex align-items-center mt-2">
            <div className="w-auto p-0 text-right ">
              <SidebarImg size={50} />
            </div>
            <div className="col-9  ">
              <div>
              <p className="mb-0 text-basic text-dark bold-5">
              <u> Lorem ipsum dolor sit amet, cetur elit...</u>
                </p>
                <div className="LightText Opacity" style={{fontSize:"10px"}}>News Now</div>
              </div>
            </div>
          </div>
          <hr />
          <NavLink
            to={"/"}
            style={{ textDecoration: "underline" }}
            className="pt-0 text-center mb-2"
          >
            View All
          </NavLink>
        </div>
        
        <div className="card card-border-c mt-3 p-3">
          <div className="">
            <h6 className="text-dark mb-3 sideHeadText">
              <strong>OpenAI Tokenomics</strong>
            </h6>
            <div style={{fontSize:"13px"}} className="text-black  mb-0 mt-4 mont-font">
              <strong>Number of Tokens</strong>
            </div>
          </div>
          <div className="d-flex align-items-center mt-1 font-italic">
            <div className="col-9 p-0">
              
              <div className=" openAiText DarkText">Maximum Number of Tokens Available</div>
            </div>
            <div className="col-3 text-right">
              <p className="mb-0 openAiText text-warning">
                99999
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center mt-2 font-italic">
            <div className="col-9 p-0">
              <div className=" openAiText DarkText">Tokens in Circulation:</div>
            </div>
            <div className="col-3 text-right">
              <p className="mb-0 openAiText text-warning">
                99999
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center mt-2 font-italic">
            <div className="col-9 p-0">
              
              <div className=" openAiText DarkText">Subscription Price of a token:</div>
            </div>
            <div className="col-3 text-right">
              <p className="mb-0 openAiText text-warning">
                1 ICT
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center mt-2 font-italic">
            <div className="col-9 p-0">
             
              <div className=" openAiText DarkText">Price of ICT currently:</div>
            </div>
            <div className="col-3 text-right">
              <p className="mb-0 openAiText text-warning">
                1 USD
              </p>
            </div>
          </div>
          <hr />
          <div className="text-dark faqLines  mb-0 mt-3 px-3 ">
            Learn More about membership and platform tokens
          </div>
          <div className="text-dark faqLines mb-0 mt-3 px-3">
            FAQs on Memebership Tokens
          </div>
          <div className="text-dark faqLines mb-0 mt-3 px-3 mb-3">
            What are membership tokens?
          </div>
          <hr />
          <h6 className="text-black text-basic mb-0 mt-3 px-3 mont-font">
            <strong className="bold-8 text-dark">Ask a question about Membership Token</strong>
          </h6>
          <p className="mb-0 text-xs text-dark mt-3 px-3">
            <>Write Your Question</>
          </p>
          <div className="px-3">
            <textarea
              className="form-control"
              style={{ height: "150px" }}
            ></textarea>
            <div className="my-5">
            <OutlinedButtonDark text={"Submit"}/>
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

        {/* <ul className="d-flex m-5">
                      <li>
                        <a href="#" className="mr-2">
                          <span className="fab  fa-facebook-f"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="mr-2">
                          <span className="fab fa-instagram"></span>
                          
                        </a>
                      </li>
                      <li>
                        <a href="#" className="mr-2">
                          <span className="fab fa-twitter"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="mr-2">
                          <span className="fab fa-snapchat-ghost"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="fab fa-youtube"></span>
                        </a>
                      </li>
                   
                    </ul> */}
        </div>
    </>
  )
}

export default SideBarMembership