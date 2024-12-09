import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0052cc",
    },},
  components: {
    MuiAlert: {
      styleOverrides: {
        filledSuccess: {
          backgroundColor: '#009933', // or any other green color you prefer
        },
        filledInfo: {
            backgroundColor: '#0052cc', // or any other green color you prefer
          },
      },
    },
  },
});

