import React, { useEffect, useState } from "react";
import { decryptNumber, encryptNumber, formatdateHeading } from "../Common/Utills";
import useApi from "../Hooks/useApi";
import { CustomizedLoader } from "../Common/MiniComponents";
import { SactionContainer } from "../Common/Containers";
import { imgUrl } from "../../../apiConfig";
import { NavLink, useNavigate } from "react-router-dom";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

const BlogView = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const idParam = queryParams.get("id");

  const navigate = useNavigate();

  const { mutate: getData, isPending: isBlogLoading, error } = useApi();
  const [articalsLimit, setArticalsLimit] = useState(3);
  const [data, setData] = useState({})

  useEffect(() => {
    getData(
      {
        url: `blog/${decryptNumber(idParam)/1}`,
        method: "GET",
        sendHeaders: true,
      },
      {
        onSuccess: (data) => {
          setData(data)
        },
        onError: (error) => {
        },
      }
    );
  }, [idParam]);

  const { mutate: getBlogsData, isPending: isBlogsLoading } = useApi();
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    getBlogsData(
      {
        url: `blogs`,
        method: "GET",
        sendHeaders: false,
      },
      {
        onSuccess: (data) => {
          console.log("blog data", data);
          setBlogList(data);
        },
        onError: (error) => {
          console.log("mempership error", error);
          if (error.status == 401) {
            handleLogout();
          }
        },
      }
    );
  }, []);

  if (isBlogLoading ||isBlogsLoading) {
    return <CustomizedLoader />;
  } else {
    return (
      <SactionContainer bgColor="#F5F8FF" container={false}>
        <div className="col-md-8  col-sm-12 extraMg pt-5 mb-5 pb-5 px-1 px-xl-4">
          <div className="card card-border-c ">
            <div className="card-body p-2 px-xl-5 pt-xl-4">
              <h3 className="mb-3 px-1 pt-3">
                <strong>{data.title}</strong>
              </h3>
              <div className="d-flex align-items-center mb-3 ">
                <p className="text-basic  mb-0 ml-1 Opacity">
                  {" "}
                  Author:{" "}
                  <strong className="DarkText bold-5">
                    {data?.author?.FirstName} {data?.author?.LastName}
                  </strong>{" "}
                  <span>&#8226;</span>
                </p>
                <CalendarTodayOutlinedIcon
                  sx={{ color: "#888", ml: 1, fontSize: "15px" }}
                />
                <p className="text-basic  mb-0 ml-1 Opacity">
                  {" "}
                  {formatdateHeading(data.updated_at)} 
                </p>{" "}
              
              </div>

              <img
                style={{ objectFit: "cover", width: "100%", height: "auto", borderRadius : "15px" }}
                src={imgUrl + data.thumnnail}
                alt=""
                className=" mt-2 mb-3"
              />
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-12 extraMg px-1 pt-5 mb-5">
          <div className="card card-border-c  p-4">
            <div className="">
              <h6 className="text-dark mb-3 sideHeadText">
                <>Latest Blog</>
              </h6>
            </div>
            {blogList?.slice(0, articalsLimit)?.map((data, index) => (
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
                        to={`/Blog/View?id=${encryptNumber(data.id)}`}
                        style={{
                          textDecoration: "underline",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                        className="p-0  mb-2"
                        onClick={() => {
                          navigate(`/Blog/View?id=${encryptNumber(data.id)}`);
                        }}
                      >
                        Read More
                      </NavLink>
                    </div>
                  </div>
                </div>
                {index !== blogList?.slice(0, articalsLimit).length - 1 && (
                  <hr />
                )}
              </React.Fragment>
            ))}

            {articalsLimit < blogList?.length ? (
              <>
                <hr />
                <NavLink
                  to={"/"}
                  style={{ textDecoration: "underline" }}
                  className="pt-0 text-center mb-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setArticalsLimit(blogList?.length);
                  }}
                >
                  View All
                </NavLink>
              </>
            ) : null}
          </div>
        </div>
      </SactionContainer>
    );
  }
};

export default BlogView;
