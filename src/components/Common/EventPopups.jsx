import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { appData } from "../../components/Context/AppContext.jsx";
import zIndex from "@mui/material/styles/zIndex.js";
import { Margin } from "@mui/icons-material";
import { fontSize } from "@mui/system";

const EventPopups = () => {

  const { snackBarData,setSnackBarData } = appData();


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
  });

  const handleClick = () => {
    setSnackBarData({...snackBarData,visibility : false });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarData({...snackBarData,visibility : false });
  };

  return (
    <Stack spacing={6} sx={{ width: "100%", }}>
      <Snackbar
        open={snackBarData.visibility}
        autoHideDuration={20000}
        onClose={handleClose}
        sx={{ marginTop: "35em", marginLeft: '50em', display: 'flex'  , alignItems: 'center'}}
        anchorOrigin={{ vertical: "top", horizontal: "left" }} // Set position to top right
        transformOrigin={{ vertical: "top", horizontal: "left" }} // Set position to top right
        
        
      >
        <Alert
          onClose={handleClose}
          severity={snackBarData.error? "error": "success"}
          sx={{ display: 'flex'  , alignItems: 'center', minWidth: "30em", height:'5em', marginTop: "17em", marginLeft: '2em', backgroundColor : "#fff", fontWeight : "bold" , zIndex: 9999999,}}
        >
          {snackBarData.text}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default EventPopups;
