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
        <div className="card card-border-c  p-0 overflow-hidden">
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
                <h5 className="mb-0">2.06268</h5>
              </div>
              <div className="">
                <p className="text-basic mb-0">Joined on</p>
                <p className="text-basic text-light">4/22/2024</p>
              </div>
            </div>
            <div className="w-100 mb-4 mt-2">
              <OutlinedButtonWarning
                text={"Buy More OpenAI Membership Tokens"}
              />
            </div>
          </div>
          <div className="px-3 mt-3 ">
            <h6 className="text-dark mb-3">
              <strong>Your Current Holdings</strong>
            </h6>
            <div className="d-flex align-items-center mt-2">
              <div className="col-1 text-center">
                <p className="text-secondary text-xs mb-0">1</p>
              </div>
              <div className="col-7 d-flex pr-0 align-items-center">
                <Bitcoin size={20} />
                <p className="text-dark mb-0 mt-1 pl-1">
                  <strong className="text-sm">BTC</strong>
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
                  <strong className="text-sm">ETH</strong>
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
                  <strong className="text-sm">USDT</strong>
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
            <h6 className="text-dark mb-0">
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
                  <strong>John Doe</strong>
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
                  <strong>John Doe</strong>
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
                  <strong>John Doe</strong>
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
            <h6 className="text-dark mb-0">
              <strong>Library - include list of videos</strong>
            </h6>
          </div>
          <div className="d-flex align-items-center mt-2">
            <div className="col-2 p-0 text-right pl-2">
              <PdfIcon size={40} />
            </div>
            <div className="col-8  ">
              <div>
                <p className="mb-0 text-basic text-dark">
                  <strong>Lorem ipsum dolor sit amet, cetur elit... </strong>
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
                <p className="mb-0 text-basic text-dark">
                  <strong>Lorem ipsum dolor sit amet, cetur elit... </strong>
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
                <p className="mb-0 text-basic text-dark">
                  <strong>Lorem ipsum dolor sit amet, cetur elit... </strong>
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
            <h6 className="text-dark mb-0">
              <strong>Latest Articles</strong>
            </h6>
          </div>
          <div className="d-flex align-items-center mt-2">
            <div className="w-auto p-0 text-right ">
              <SidebarImg size={50} />
            </div>
            <div className="col-9  ">
              <div>
                <p className="mb-0 text-basic ">
                  <strong>Lorem ipsum dolor sit amet, cetur elit... </strong>
                </p>
                <NavLink
                  to={"/"}
                  style={{ textDecoration: "underline" }}
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
                <p className="mb-0 text-basic ">
                  <strong>Lorem ipsum dolor sit amet, cetur elit... </strong>
                </p>
                <NavLink
                  to={"/"}
                  style={{ textDecoration: "underline" }}
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
                <p className="mb-0 text-basic ">
                  <strong>Lorem ipsum dolor sit amet, cetur elit... </strong>
                </p>
                <NavLink
                  to={"/"}
                  style={{ textDecoration: "underline" }}
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
            <h6 className="text-dark mb-0">
              <strong>Latest News</strong>
            </h6>
          </div>
          <div className="d-flex align-items-center mt-2">
            <div className="w-auto p-0 text-right ">
              <SidebarImg size={50} />
            </div>
            <div className="col-9  ">
              <div>
                <p className="mb-0 text-basic ">
                  <strong>Lorem ipsum dolor sit amet, cetur elit... </strong>
                </p>
                <p className="text-basic mb-0">News Now</p>
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
                <p className="mb-0 text-basic ">
                  <strong>Lorem ipsum dolor sit amet, cetur elit... </strong>
                </p>
                <p className="text-basic mb-0">News Now</p>
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
                <p className="mb-0 text-basic ">
                  <strong>Lorem ipsum dolor sit amet, cetur elit... </strong>
                </p>
                <p className="text-basic mb-0">News Now</p>
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
            <h6 className="text-dark mb-0">
              <strong>OpenAI Tokenomics</strong>
            </h6>
            <h6 className="text-black text-basic-h7 mb-0 mt-4">
              <strong>Number of Tokens</strong>
            </h6>
          </div>
          <div className="d-flex align-items-center mt-1">
            <div className="col-8 p-0">
              <p className="mb-0  text-xs text-dark">
                <strong>Maximum number of Tokens available:</strong>
              </p>
            </div>
            <div className="col-4 text-right">
              <p className="mb-0 text-basic text-warning">
                <strong>99999</strong>
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center mt-2">
            <div className="col-8 p-0">
              <p className="mb-0 text-xs text-dark">
                <strong>Tokens in Circulation:</strong>
              </p>
            </div>
            <div className="col-4 text-right">
              <p className="mb-0 text-basic text-warning">
                <strong>99999</strong>
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center mt-2">
            <div className="col-8 p-0">
              <p className="mb-0 text-xs text-dark">
                <strong>Subscription Price of a token:</strong>
              </p>
            </div>
            <div className="col-4 text-right">
              <p className="mb-0 text-basic text-warning">
                <strong>1 ICT</strong>
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center mt-2">
            <div className="col-8 p-0">
              <p className="mb-0 text-xs text-dark">
                <strong>Price of ICT currently:</strong>
              </p>
            </div>
            <div className="col-4 text-right">
              <p className="mb-0 text-basic text-warning">
                <strong>1 USD</strong>
              </p>
            </div>
          </div>
          <hr />
          <h6 className="text-dark mb-0 mt-3 px-3">
            Learn More about membership and platform tokens
          </h6>
          <h6 className="text-dark mb-0 mt-3 px-3">
            FAQs on Memebership Tokens
          </h6>
          <h6 className="text-dark mb-0 mt-3 px-3 mb-3">
            What are membership tokens?
          </h6>
          <hr />
          <h6 className="text-black text-basic-h7 mb-0 mt-3 px-3">
            <strong>Ask a question about Membership Token</strong>
          </h6>
          <p className="mb-0 text-basic text-dark mt-3 px-3">
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
    </>
  )
}

export default SideBarMembership