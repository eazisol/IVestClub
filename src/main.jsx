import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './MuiTheme.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </>,
)
