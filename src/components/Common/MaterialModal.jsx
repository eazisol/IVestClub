import React, { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { appData } from "../Context/AppContext";
import zIndex from "@mui/material/styles/zIndex";

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

export default function MaterialModal({ children }) {
  const { openModal, setOpenModal } = appData();

  return (
    <div>
      <Modal 
      
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal.open}

       
        style={{ zIndex: 99999 }} // Modal z-index to ensure it stays on top


       
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            zIndex: 99999,
           
          },
        }}
      >
        <Fade in={openModal.open}>
          <Box sx={style}>{openModal.content}</Box>
        </Fade>
      </Modal>
    </div>
  );
}
