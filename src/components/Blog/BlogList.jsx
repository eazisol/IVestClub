import React, { useEffect, useState } from "react";
import useApi from "../Hooks/useApi";
import { appData } from "../Context/AppContext";
import BlogCard from "./BlogCard";
import { CustomizedLoader, TextUnderWrap } from "../Common/MiniComponents";
import about from "../../assets/image/about.png";
import { encryptNumber } from "../Common/Utills";
import { useNavigate, useLocation } from "react-router-dom";
const BlogList = () => {
  const { handleLogout } = appData();
  const { mutate: getData, isPending: isBlogsLoading, error } = useApi();
  const [blogList, setBlogList] = useState([]);
 const navigate = useNavigate();
  useEffect(() => {
    getData(
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
          <h2 className="bannerHead">Blog</h2>
        </div>

        <ul className="bread-crumb clearfix mt-0">
          <li>
            <a
             onClick={() => {
              navigate("/");
            }}
              style={{ textDecoration: "none" }}
            >
              Home
            </a>
          </li>
          <li className="active">Blog</li>
        </ul>
      </section>
      <div className="container mt-5" style={{ minHeight: "20em" }}>
        <h2
          className="bold-sec-title ml-3 mt-3  px-5"
          style={{ color: "#202327", fontSize: "36px" }}
        >
          <div>
            <TextUnderWrap padding={7}>Blog</TextUnderWrap>
          </div>
        </h2>
        <div className="row w-100 justify-content-center px-5">
          <div className="row  justify-content-center">
            {isBlogsLoading ? (
              <div className="col-12 w-100 d-flex justify-content-center text-center">
                <CustomizedLoader />
              </div>
            ) : (
              <>
                {blogList.map((blog, index) => (
                  <BlogCard
                    key={index}
                    text={blog.excerpt}
                    heading={blog.title}
                    image={blog.thumnnail}
                    to={`/Blog/View?id=${encryptNumber(blog.id)}`}
                    time={blog.updated_at}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogList;