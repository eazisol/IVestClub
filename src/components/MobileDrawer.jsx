import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logo from "../../src/assets/images/HeaderLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import MapIcon from "@mui/icons-material/Map";
import HomeIcon from "@mui/icons-material/Home";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
const MobileDrawer = () => {
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
      <div className="mobile-nav-toggler">
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
        }}
        open={open}
        // onClick={() => {
        //   toggleDrawer();
        // }}
        onClose={handleClose}
        anchor={"right"}
      >
        <List style={{ backgroundColor: "#17122B", height: "100%" }}>
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
              navigate("/");
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
              <ListItemText primary={"Contact Us"} className="list-item-text" />
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
        </List>
      </Drawer>
    </>
  );
};

export default MobileDrawer;
