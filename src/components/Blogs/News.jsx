import React, { useState, useEffect } from "react";
import avatar from "../../assets/image/avatar.png";
import { SactionContainer, ImgBgSactionContainer } from "../Common/Containers";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { formatdateHeading } from "../Common/Utills";
import { imgUrl } from "../../../apiConfig";
import { appData } from "../Context/AppContext";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useNavigate } from "react-router-dom";

const News = () => {
    const { newsData } = appData();
  const navigate = useNavigate();
    
    
  return (
    <>
    <SactionContainer container={false}>
          <div className="card card-border-c w-100 px-1 pt-3 mb-3  ml-3 mt-5">
            <h2 className="mx-4 mt-3">
            <ArrowBackOutlinedIcon
              className="cursor-pointer"
              sx={{ fontSize: 40 }}
              onClick={() => {navigate(-1)}}
            />{" "}
            <strong> {newsData.title}</strong>
            </h2>
            <div className="d-flex align-items-center mx-0 mx-xl-4 mt-3 mb-2">
              <img
                src={avatar}
                alt=""
                style={{ width: "40px", height: "40px", borderRadius: "35px" }}
              />{" "}
              <p className="text-basic mb-0 ml-1">
                {" "}
                By <strong className=" DarkText bold-4">
                  {newsData.username}
                </strong>{" "}
                &nbsp;&nbsp;
                <span>&#8226;</span>
              </p>
              <CalendarTodayOutlinedIcon
                sx={{ color: "#888", ml: 1, fontSize: "15px" }}
              />
              <p className="text-basic mb-0 ml-1">
                {" "}
                {formatdateHeading(newsData.created_at)} &nbsp;&nbsp;
                <span>&#8226;</span>{" "}
              </p>{" "}
              <GroupsOutlinedIcon
                sx={{ color: "#888", ml: 1, fontSize: "25px" }}
              />
              <p className="text-basic mb-0 ml-1"> {newsData.members} Members </p>{" "}
            </div>
            <h3 className="mx-4 mt-2 ">
                <strong className="bold-6">
                {newsData.articalTitle}
                </strong>
              </h3>
            <div className="mt-2 mx-4">
              <img
                src={imgUrl + newsData.thumbnail}
                style={{ objectFit: "cover", width: "100%", height: "auto" }}
                alt=""
                className=""
              />
              <div dangerouslySetInnerHTML={{ __html: newsData.content }} />
            </div>
           
          </div>
        </SactionContainer>
    </>
  )
}

export default News
