import React, { useState, useEffect } from "react";
import about from "../../assets/image/about.png";
import about1 from "../../assets/image/about1.png";
import about2 from "../../assets/image/about2.png";
import landingbg2 from "../../assets/image/membershipimg45.png";
import goldicon9 from "../../assets/image/icons/goldicon9.png";
import avatar from "../../assets/image/avatar.png";
import quotationimg from "../../assets/image/quotationimg.png";
import membershipvideo1 from "../../assets/image/membershipvideo1.png";
import membershipimgpublic1 from "../../assets/image/membershipimgpublic1.png";
import MemberShipClubSaction from "../Home/MemberShipClubSaction";
import { SactionContainer, ImgBgSactionContainer } from "../Common/Containers";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import {
  FilledButtonLight,
  OutlinedButtonLight,
  OutlinedButtonDark,
  LargeButton,
} from "../Common/Buttons";
import ExclusiveAccess from "../Home/ExclusiveAccess";
import { Quotations } from "../Common/Feedbacks";
import { TextUnderWrap } from "../Common/MiniComponents";
import useApi from "../Hooks/useApi";
import { decryptNumber, encryptNumber, formatdateHeading } from "../Common/Utills";
import { imgUrl } from "../../../apiConfig";
import { CustomizedLoader } from "../Common/MiniComponents";
import { useNavigate } from "react-router-dom";
import { appData } from "../Context/AppContext";
import MaterialModal from "./MaterialModal";
import { SimpleInput } from "./Inputs";

const JoinMembership = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const idParam = queryParams.get("id");
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const navigate = useNavigate();
  const { mutate: joinMembership, isPending: isJoinClubLoading } = useApi();
  const { mutate: sendDiscordId, isPending: sendingDiscordId } = useApi();
  const [submitclicked, setSubmitclicked] = useState(false);
  const [formData, setFormData] = useState({});

  const { userData, setShowHeader } = appData();

  const handleChange = (e) => {
    e.preventDefault();
    setSubmitclicked(false);

    // console.log("e.target", e.target);
    const { name, value, type } = e.target;
    if (type == "date") {
      const formattedDate = formatDateToDDMMYYYY(value);
      setFormData((prevData) => ({ ...prevData, [name]: formattedDate }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const joinClub = () => {
    if (!userData.access_token) {
      navigate(`/Login`);
      return;
    }
    joinMembership(
      {
        url: `membershipclub/joining/${decryptNumber(idParam)}`,
        method: "GET",
        sendHeaders: true,
      },
      {
        onSuccess: (data) => {
          console.log("member ship joined", data);
          setShowHeader(true)
          setOpenModal2(false)
          navigate(`/Membership/Private?id=${idParam}`);
        },
        onError: (error) => {
          console.log("member ship joining error",error);
        },
      }
    );
  };

  const handleDiscordId = () => {
    setSubmitclicked(true);
    if (!formData.userId) {
      return;
    }
    sendDiscordId(
      {
        url: `user/save-discord-username`,
        method: "POST",
        sendHeaders: true,
        data: { discord_userid: formData.userId },
      },
      {
        onSuccess: (data) => {
          console.log("get data", data);
          joinClub();
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };
  return (
    <>
      <MaterialModal open={openModal1}>
        <>
          <div className="ModalContainer p-3 z-index-0">
            <div className="row">
              <div className="col-12">
                <div className="text-dark modalHeading">
                  {" "}
                  Join Out Discord server
                </div>
              </div>

              <div className="modalSection">
                <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
                  <p className="text-basic">
                    Please let us know a little bit more about yourself, so that
                    we can start creating your Free Acount:
                  </p>
                </div>
              </div>
            </div>

            <div className="modalBtns row text-center mt-3 p-3 justify-content-center">
              <OutlinedButtonDark
                text={<span className=" bold-5"> {"Already Joined"}</span>}
                loading={false}
                onClick={() => {
                  setShowHeader(false);
                  if (userData.discord_user_id) {
                    joinClub();
                  } else {
                    setOpenModal1(false);
                    setOpenModal2(true);
                  }
                }}
              />
              <LargeButton
                text={"Join Now"}
                onClick={() => {
                  window.open("https://discord.gg/MfXhJasq4W", "_blank");
                }}
              />

              <p
                className="text-basic text-dark w-auto mt-3"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenModal1(false);
                  setShowHeader(true);
                }}
              >
                Cancel
              </p>
            </div>
          </div>
        </>
      </MaterialModal>
      <MaterialModal open={openModal2}>
        <>
          <div className="ModalContainer py-3 z-0 container ">
            <div className="row">
              <div className="col-12">
                <div className="text-dark modalHeading">
                  Enter Your discord User Id!
                </div>
              </div>

              <div className="modalSection">
                <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
                  <p className="text-basic">
                  &#8226; Go to User Settings (the gear icon near your username).
                    <br />
                    &#8226; Scroll to Advanced under the App Settings section.
                    <br />
                    &#8226; Enable Developer Mode.
                    <br />
                    &#8226; Click on your username(same one as above)
                    <br />
                    &#8226; Click on copy user id
                    <br />
                    &#8226; Paste user id in the field above
                    <br />
                  </p>
                </div>
              </div>
            </div>
            <SimpleInput
              lable="Discord User Id"
              name="userId"
              onChange={handleChange}
              value={formData.userId || ""}
              required
              error={submitclicked && !formData.userId}
              helperText={"User Id is Required"}
            />
            <div className="modalBtns row text-center mt-3 p-3 justify-content-center">
              <LargeButton
                text={
                  sendingDiscordId || isJoinClubLoading
                    ? "Submitting..."
                    : "Submit"
                }
                onClick={() => {
                  handleDiscordId();
                }}
                loading={sendingDiscordId || isJoinClubLoading}
              />

              <p
                className="text-basic text-dark w-auto mt-3"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenModal2(false);
                  setShowHeader(true);
                }}
              >
                Cancel
              </p>
            </div>
          </div>
        </>
      </MaterialModal>
      <OutlinedButtonDark
        text={
          <span className=" bold-5">
            {" "}
            {isJoinClubLoading
              ? "Joining Club"
              : "Buy your selected memership club token"}
          </span>
        }
        loading={isJoinClubLoading}
        onClick={() => {
          setShowHeader(false);
          setOpenModal1(true);
        }}
      />
    </>
  );
};

export default JoinMembership;
