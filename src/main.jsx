// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import { ThemeProvider } from '@mui/material/styles';
// import { theme } from './MuiTheme.jsx';
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <>
//   <ThemeProvider theme={theme}>
//     <App />
//   </ThemeProvider>
//   </>,
// )
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './MuiTheme.jsx';
import { coinbaseWallet, metamaskWallet, ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Create a QueryClient instance
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider activeChain={Sepolia} supportedWallets={[metamaskWallet(),coinbaseWallet()]}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ThirdwebProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)