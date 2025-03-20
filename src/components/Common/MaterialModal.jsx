import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useMediaQuery } from "@mui/material";
import EventPopups from "./EventPopups";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  p: 4,
};

export default function MaterialModal({ children, open,onClose }) {
  const isSmallScreen = useMediaQuery("(max-width: 422px)");

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        style={{ zIndex: 99999 }} 
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            zIndex: 99999,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              ...style,
              width: isSmallScreen ? 400 : 500, // Adjust width based on screen size
            }}
          >
            {/* <EventPopups marginTop="0em"/> */}
            {children}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
