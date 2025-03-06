import React, { useState, useEffect } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Menu from "@mui/material/Menu";
import { Divider } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import useApi from "../Hooks/useApi";
import { timeAgo } from "./Utills";

const Notifications = () => {
  const {
    mutate: getData,
    isPending: isNotificationsLoading,
    error,
  } = useApi();
  const {
    mutate: markAllAsRead,
    isPending: isMarkAllAsReadLoading,
  
  } = useApi();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getNotifications = () => {
    getData(
      {
        url: `unread-notifications`,
        method: "GET",
        sendHeaders: true,
      },
      {
        onSuccess: (data) => {
          console.log("setNotifications", data);
          setNotifications(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };
  const markAsRead = () => {
    markAllAsRead(
        {
          url: `mark-all-notifications`,
          method: "POST",
          sendHeaders: true,
        },
        {
          onSuccess: (data) => {
            console.log("setNotifications", data);
            handleClose()
            getNotifications()
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <>
      <span
        className="cursor-pointer"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <NotificationsOutlinedIcon sx={{ color: "#fff" }} />
      </span>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        sx={{ marginTop: 7 }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className="p-3 " style={{ width: "20em" }}>
          <div className="row justify-content-between">
            <h6>Notifications</h6>
            <p className="text-basic-sm text-dark cursor-pointer"
            onClick={markAsRead}
            >
              Mark all as read
            </p>
          </div>
          <Divider />
          {notifications.length <= 0 && (
            <p className="section5-sub-text pb-0 mb-0 text-center pt-2">
              No Notification to show
            </p>
          )}
          {notifications.map((noti, index) => (
            <React.Fragment key={index}>
              <div className="row">
                <div className="col-2 p-0 align-items-center d-flex">
                  <ErrorOutlineOutlinedIcon
                    sx={{ color: "#f7b617", fontSize: 30 }}
                  />
                </div>
                <div className="col-10 p-0">
                  <p className="section5-sub-text pb-0 mb-0 pt-2">
                    {noti.data.message}
                  </p>
                  <p className="text-dark" style={{ fontSize: 9 }}>
                    {timeAgo(noti.data.time)}
                  </p>
                </div>
              </div>
              <Divider />
            </React.Fragment>
          ))}
        </div>
      </Menu>
    </>
  );
};

export default Notifications;
