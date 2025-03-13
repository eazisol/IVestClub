import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const DataProvider = ({ children }) => {
 
  const [snackBarData, setSnackBarData] = useState({
    text: "test",
    error: false,
    visibility: false,
  });
 
  const localuserdata = localStorage.getItem('userData') 
  ? JSON.parse(localStorage.getItem('userData')) 
  : {access_token : ""};
  const [userData, setUserData] = useState(localuserdata)
  const [newsData, setNewsData] = useState({})
  const [articalData, setArticalData] = useState({})

const [mainLoader, setmainLoader] = useState(true)
const [showLandingSaction, setShowLandingSaction] = useState(true)
const [showHeader, setShowHeader] = useState(true)
const [showPassword, setShowPassword] = useState(false)
const [walletData, setWalletData] = useState({})
const [openModal, setOpenModal] = useState({
  open : false,
  content : <></>
})


useEffect(() => {   
  const savedWallet = JSON.parse(localStorage.getItem('walletData'));
  if (savedWallet?.address) {
    setWalletData((prev) => ({
      ...prev,
      address: savedWallet.address,
    }));
  }
}, []);

const handleLogout = () => {
  setUserData({access_token : ""})
  localStorage.removeItem("usdtAmount")
  localStorage.removeItem("convertAmount")
  localStorage.removeItem("userWalletAddress")
  localStorage.removeItem("tokenHoldings")
  localStorage.removeItem("walletData")
  localStorage.removeItem("userData")

};


  return (
    <AppContext.Provider
      value={{
        snackBarData,
        setSnackBarData,
      
        mainLoader, setmainLoader,
        openModal, setOpenModal,
        showLandingSaction, setShowLandingSaction,
        userData, setUserData,
        handleLogout,
        newsData, setNewsData,
        articalData, setArticalData,
        showHeader, setShowHeader,
        showPassword, setShowPassword,
        walletData, setWalletData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const appData = () => useContext(AppContext);
