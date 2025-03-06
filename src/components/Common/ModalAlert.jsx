import React from "react";
import Alert from "@mui/material/Alert";
const ModalAlert = ({ snackBarData, setSnackBarData }) => {
  const onClose = () => {
    setSnackBarData({
      text: "test",
      error: "error",
      visibility: false,
    });
  };

  return (
    <>{snackBarData.visibility&&
      <div>
        <Alert severity={snackBarData.error} onClose={onClose}>
          {snackBarData.text || "An Unknown Error has occured"}
        </Alert>
      </div>}
    </>
  );
};

export default ModalAlert;
