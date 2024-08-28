import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const DataProvider = ({ children }) => {
  const [allWarsData, setAllWarsData] = useState({});
  const [snackBarData, setSnackBarData] = useState({
    text: "test",
    error: false,
    visibility: false,
  });
  const [warId, setWarId] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  const [showSingleWarData, setShowSingleWarData] = useState(true);
  const [childGraphData, setChildGraphData] = useState([])
const [mainLoader, setmainLoader] = useState(true)

const [openModal, setOpenModal] = useState({
  open : false,
  content : <></>
})


  return (
    <AppContext.Provider
      value={{
        snackBarData,
        setSnackBarData,
        allWarsData,
        setAllWarsData,
        warId,
        setWarId,
        showSingleWarData, setShowSingleWarData,
        childGraphData, setChildGraphData,
        mainLoader, setmainLoader,
        openModal, setOpenModal,
        isAuthenticated,
        setIsAuthenticated

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const appData = () => useContext(AppContext);
