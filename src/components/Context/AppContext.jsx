import React, { createContext, useContext, useState } from "react";

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
  const [walletData, setWalletData] = useState({})

const [mainLoader, setmainLoader] = useState(true)
const [showLandingSaction, setShowLandingSaction] = useState(true)

const [openModal, setOpenModal] = useState({
  open : false,
  content : <></>
})

const handleLogout = () => {
  localStorage.setItem('userData', JSON.stringify({})); 
  setUserData({access_token : ""})
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
        walletData, setWalletData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const appData = () => useContext(AppContext);
