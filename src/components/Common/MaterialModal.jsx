import React, { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { appData } from "../Context/AppContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 2,
  p: 4,
  
  
};

export default function MaterialModal({ children, open }) {


  return (
    <>
      <Modal 
      
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}

       
        style={{ zindex: 99999 }} // Modal z-index to ensure it stays on top


       
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
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </>
  );
}
