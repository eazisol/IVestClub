import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import logo from "../../src/assets/images/HeaderLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import MapIcon from "@mui/icons-material/Map";
import HomeIcon from "@mui/icons-material/Home";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import { OutlinedButtonLight } from "./Common/Buttons";

const MobileDrawer = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="mobile-nav-toggler d-block d-lg-none">
        <span
          className="icon flaticon-menu-2"
          style={{ color: isHovered ? "#343a40" : "#ffff", fontSize: "24px" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => {
            toggleDrawer();
          }}
        ></span>
      </div>
      <Drawer
        sx={{
          zIndex: 99999,
          backgroundColor: "#17122B",
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
         
        }}
        open={open}
        // onClick={() => {
        //   toggleDrawer();
        // }}
        onClose={handleClose}
        anchor={"right"}
      >
        <div
          style={{ backgroundColor: "#17122B" ,}}
          className="d-flex flex-column justify-content-between h-100"
        >
          <List style={{ backgroundColor: "#17122B" }}>
            <ListItem
              disablePadding
              onClick={() => {
                toggleDrawer();
                navigate("/");
              }}
            >
              <div
                className="d-flex justify-content-center mb-3"
                style={{ width: "100%", textAlign: "center" }}
              >
                <img src={logo} alt="" className="mt-2" />
              </div>
            </ListItem>
            <Divider />

            <ListItem
              disablePadding
              onClick={() => {
                toggleDrawer();
                navigate("/");
              }}
            >
              <ListItemButton className="list-item-button">
                <ListItemIcon>
                  <HomeIcon className="list-item-icon" />
                </ListItemIcon>
                <ListItemText primary={"Home"} className="list-item-text" />
              </ListItemButton>
            </ListItem>

            <Divider />
            <ListItem
              disablePadding
              onClick={() => {
                toggleDrawer();
                navigate("/About");
              }}
            >
              <ListItemButton className="list-item-button">
                <ListItemIcon>
                  <FlagOutlinedIcon className="list-item-icon" />
                </ListItemIcon>
                <ListItemText primary={"About Us"} className="list-item-text" />
              </ListItemButton>
            </ListItem>

            <Divider />
            <ListItem
              disablePadding
              onClick={() => {
                toggleDrawer();
                navigate("/Membership");
              }}
            >
              <ListItemButton className="list-item-button">
                <ListItemIcon>
                  <PeopleOutlineOutlinedIcon className="list-item-icon" />
                </ListItemIcon>
                <ListItemText
                  primary={"Membership Club"}
                  className="list-item-text"
                />
              </ListItemButton>
            </ListItem>

            <Divider />

            {/* <Accordion
            sx={{
              backgroundColor: "#17122B",
              padding: 0,
              borderBottom: "none",
              boxShadow: "none",
            }}
          >
            <AccordionSummary
              sx={{
                backgroundColor: "#17122B",
                padding: 0,
                borderBottom: "none",
                height: "50px",
              }}
              expandIcon={<ExpandMoreIcon sx={{color : "#fff"}}/>}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <ListItemButton className="list-item-button">
                <ListItemIcon>
                  <LocalFireDepartmentOutlinedIcon className="list-item-icon" />
                </ListItemIcon>
                <ListItemText
                  primary={"Past Wars"}
                  className="list-item-text"
                />
              </ListItemButton>
            </AccordionSummary>
            <AccordionDetails sx={{ borderBottom: "none" }}>
              <ListItem
                disablePadding
                onClick={() => {
                  navigate("/");
                  toggleDrawer();
                  if(location.pathname == "/PastWars"){
                    window.location.reload();
                  }
                }}
              >
                <ListItemButton className="list-item-button">
                  <ListItemIcon>
                    <LocalFireDepartmentOutlinedIcon className="list-item-icon" />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Past Wars"}
                    className="list-item-text"
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                onClick={() => {
                  navigate("/");
                  toggleDrawer();
                  if(location.pathname == "/warsandconflict"){
                    window.location.reload();
                  }
                }}
              >
                <ListItemButton className="list-item-button">
                  <ListItemIcon>
                    <LocalFireDepartmentOutlinedIcon className="list-item-icon" />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Current Wars"}
                    className="list-item-text"
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </AccordionDetails>
          </Accordion> */}
            <Divider />

            <ListItem
              disablePadding
              onClick={() => {
                toggleDrawer();
                navigate("/");
              }}
            >
              <ListItemButton className="list-item-button">
                <ListItemIcon>
                  <Diversity1OutlinedIcon className="list-item-icon" />
                </ListItemIcon>
                <ListItemText primary={"Blogs"} className="list-item-text" />
              </ListItemButton>
            </ListItem>

            <Divider />
            <ListItem
              disablePadding
              onClick={() => {
                toggleDrawer();
                navigate("/");
              }}
            >
              <ListItemButton className="list-item-button">
                <ListItemIcon>
                  <MapIcon className="list-item-icon" />
                </ListItemIcon>
                <ListItemText
                  primary={"Contact Us"}
                  className="list-item-text"
                />
              </ListItemButton>
            </ListItem>

            <Divider />

            {/* <Accordion
            sx={{
              backgroundColor: "#17122B",
              padding: 0,
              borderBottom: "none",
              boxShadow: "none",
            }}
          >
            <AccordionSummary
              sx={{
                backgroundColor: "#17122B",
                padding: 0,
                borderBottom: "none",
                height: "50px",
              }}
              expandIcon={<ExpandMoreIcon sx={{color : "#fff"}}/>}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <ListItemButton className="list-item-button">
                <ListItemIcon>
                <PermMediaOutlinedIcon className="list-item-icon" />
                </ListItemIcon>
                <ListItemText
                  primary={"Media"}
                  className="list-item-text"
                />
              </ListItemButton>
            </AccordionSummary>
            <AccordionDetails sx={{ borderBottom: "none" }}>
              <ListItem
                disablePadding
                onClick={() => {
                  navigate("/");
                  toggleDrawer();
                }}
              >
                <ListItemButton className="list-item-button">
                  <ListItemIcon>
                  <PermMediaOutlinedIcon className="list-item-icon" />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Press Releases"}
                    className="list-item-text"
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem
                disablePadding
                onClick={() => {
                  navigate("/");
                  toggleDrawer();
                }}
              >
                <ListItemButton className="list-item-button">
                  <ListItemIcon>
                  <PermMediaOutlinedIcon className="list-item-icon" />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Blog"}
                    className="list-item-text"
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </AccordionDetails>
          </Accordion> */}
          <div className="p-2">
            {isAuthenticated ? (
              <>
                <div className="donate-link">
                  <a
                    onClick={() => {
                      toggleDrawer();
                      navigate("/Dashboard");
                    }}
                    className="theme-btn btn-style-one text-center"
                    style={{
                      textDecoration: "none",
                      fontSize: "12px",
                      fontWeight: "500",
                      width: "100%",

                      fontFamily: "'Poppins',san-serif",
                    }}
                  >
                    <span className="btn-title">Connect Wallet</span>
                  </a>
                </div>
                <OutlinedButtonLight
                  onClick={() => {
                    navigate("/");
                    toggleDrawer();
                   
                    handleLogout()
                  }}
                  text={
                    <>
                      <span className="outBtn"> Logout </span>
                    </>
                  }
                />
              </>
            ) : (
              <div>
                <OutlinedButtonLight
                  onClick={() => {
                    toggleDrawer();
                    navigate("/Login");
                  }}
                  text={
                    <>
                      <span className="outBtn"> Login </span>
                    </>
                  }
                />
                <div className="donate-link mt-2">
                  <a
                    onClick={() => {
                      toggleDrawer();
                      navigate("/SignUp");
                    }}
                    className="theme-btn btn-style-one text-center"
                    style={{
                      textDecoration: "none",
                      fontSize: "12px",
                      fontWeight: "500",
                      width: "100%",

                      fontFamily: "'Poppins',san-serif",
                    }}
                  >
                    <span className="btn-title">Register</span>
                  </a>
                </div>
              </div>
            )}
          </div>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default MobileDrawer;
