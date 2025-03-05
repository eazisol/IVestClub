import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { BsInfoCircle } from "react-icons/bs";
import { TokenInput } from "../Common/Inputs";
import { LargeButton } from "../Common/Buttons";
import { appData } from "../Context/AppContext";
import { baseUrl, imgUrl } from "../../../apiConfig";
import { Ethereum, Bitcoin, Usdt, IVC } from "../Common/CurrencyIcons";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
const EXCHANGE_RATE = 0.02;

const ADMIN_WALLET = "0xc244351E16a5c04b1fc9d8808b1A66F5Fe2dB66d";
const backendUrl = "http://192.168.18.14:8000/api/coinpayments";
const Shop = () => {
  const [tokenDataList, setTokenDataList] = useState([]); // List of tokens from API
  const [selectedToken, setSelectedToken] = useState(null);
  const [userWallet, setUserWallet] = useState("");
  const { walletData ,userData} = appData();
 const [status, setStatus] = useState(null);
   const [usdtAmount, setusdtAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [txHash, setTxHash] = useState("");
  const [balance, setBalance] = useState(null);
  const [invoicesId, setinvoicesId] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [usdtData, setUSDTData] = useState("");
  // Add connection status state
  const [connectionStatus, setConnectionStatus] = useState("");
   //GET USDT PRICE FROM API
   const getUSDTprice = async () => {
    const { data } = await axios.get(
      `https://api.diadata.org/v1/assetQuotation/Ethereum/0xdAC17F958D2ee523a2206206994597C13D831ec7`
    );
    setUSDTData(data);
  };
  const getBnbAmount = (usdtAmount) => {
    if (!usdtAmount || !selectedToken) return ""; // Ensure selected token is available

    const price = parseFloat(usdtData?.Price) || 0;
    const transactionFee = parseFloat(selectedToken?.transaction_fee) || 0;
    const conversionRate =
      parseFloat(selectedToken?.token_conversion_rate) || 1; // Avoid division by zero

    if (conversionRate === 0) return "0.0000"; // Prevent division by zero
const persentageTransactionFee=transactionFee/100
    return Math.abs(
      ((parseFloat(usdtAmount) * price * persentageTransactionFee)-price*parseFloat(usdtAmount)) / conversionRate
    ).toFixed(4);
  };

 const handlePay = async (e) => {
     e.preventDefault();
 
    
     const usernameRegex = /^[a-zA-Z0-9 ]+$/;
     if (!usernameRegex.test(!userData?.username)) {
       setSnackBarData({
         visibility: true,
         error: "error",
         text: "Username should not contain special characters (only letters, numbers).",
       });
       return;
     }
     if (!userData?.username) {
       setSnackBarData({
         visibility: true,
         error: "error",
         text: "Username must be required.",
       });
       return;
     }
     setIsLoading(true);
     const requestData = {
       "currency": "1002",
       "items": [
           {
               "name": "test item",
               "description": "1738751764",
               "quantity": {
                   "value": "1",
                   "type": "2"
               },
               "amount": `${usdtAmount}`
           }
       ],
       "amount": {
           "breakdown": {
               "subtotal": `${usdtAmount}`
           },
           "total": `${usdtAmount}`
       },
       "buyer": {
           "name": {
               "firstName": "Test",
               "lastName": "Test"
           },
           "emailAddress": "test@test.com",
           "phoneNumber": "1111111111",
           "address": {
               "address1": "Test str",
               "city": "Warsaw",
               "countryCode": "PL",
               "postalCode": "01-001"
           }
       },
       "payment": {
           "paymentCurrency": "1002",
           "refundEmail": "test@test.com"
       },
       // Format numeric values with fixed precision
       "amountusdt":usdtAmount,
       "amounttoken": +getBnbAmount(usdtAmount),
       "token":   selectedToken?.name,
       "currency1": "LTCT",
       "currency2": "LTCT",
       "buyer_email": userData?.email,
       "username": userData?.username,
       "user_wallet_address": userWallet,
       "user_id": `${userData?.user_id}`,
      //  "network": network,
   };
  
     
     
 
     try {
     
       const response = await fetch(`${baseUrl}coinpayments/invoices`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json'
         },
         body: JSON.stringify(requestData)
     });
     
     const data = await response.json();
     const newCurrencyId = data?.response?.invoices[0]?.payment?.paymentCurrencies[0]?.currency?.id;
     const newInvoicesId = data?.response?.invoices[0]?.id;
     
     setCurrencyId(newCurrencyId);
     setinvoicesId(newInvoicesId);
     
     //  Save the new values immediately
   
     
     if (data?.response?.invoices[0]?.checkoutLink) {
       const cleanUrl = data.response.invoices[0].checkoutLink.replace(/\\/g, '');
       
       // Create a new anchor element
       const link = document.createElement('a');
       link.href = cleanUrl;
       link.target = '_blank';
       link.rel = 'noopener noreferrer';
       
       // Append to the document, click it, and remove it
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
     }
     setusdtAmount('')
     setUserWallet('')
     setIsLoading(false);
     } catch (error) {
      setIsLoading(false);
     }
   };

 
  const handleTokenApi = async () => {
    const { data } = await axios.get(`${baseUrl}token/getAllTokenData`);
    setTokenDataList(data?.data);

    // Set the first token as the selected token initially
    if (data?.data?.length > 0) {
      setSelectedToken(data?.data[0]);
    }
  };
  useEffect(() => {
    if (!invoicesId) return;
    // Function to periodically check the transaction status from CoinPayments API
    const checkTransactionStatus = async () => {
      try {
        const response = await axios.get(`${baseUrl}coinpayments/invoice/${invoicesId}/currency/${currencyId}/status`  );
       
        if (response?.data?.status === "completed") {
          setStatus("completed");
          setAllStatusData(response?.data)
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error while checking transaction status:", error);
      }
    };
    // If the transaction is completed (status == 100), stop checking
    const intervalId = setInterval(checkTransactionStatus, 5000);

    return () => clearInterval(intervalId);
  }, [invoicesId]);
// ✅ Trigger handlePin only when status is "completed"
useEffect(() => {
  if (status !== "completed") return;

  console.log("coinpayments/Tokenator");

  const handlePin = async () => {
    try {
      await axios.post(`${baseUrl}coinpayments/Tokenator`, {
        status: status,
        txn_id: invoicesId,
        amountusdt: statusData?.payment?.expectedAmount?.breakdown?.[0]?.displayValue,
        amounttoken: getBnbAmount(statusData?.payment?.expectedAmount?.breakdown?.[0]?.displayValue),
        currency: selectedToken?.name,
        user_email: userData?.email,
        user_wallet_address: userWallet,
        custom: 1,
        token_contract_address: selectedToken?.token_contract_address
      });

      setStatus(null); // ✅ Reset status
      setinvoicesId(null)
    } catch (error) {
      console.error("Error handling pin:", error);
    }
  };

  handlePin();
}, [status]);
  useEffect(() => {
    handleTokenApi();
    getUSDTprice()
  }, []);

  return (
    <div className="min-vh-100  text-white p-4 d-flex justify-content-center align-items-center">
      <div
        className="container-fluid  rounded p-4 border "
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <div className="section4-head text-dark text-center">Buy Tokens</div>
        <div className="row">
          <div className="converter1 mt-4 col">
            <div className="mb-1 con-head text-dark">
              {" "}
              You Pay{" "}
              <Tooltip
                title="Enter the amount of USDT you want to spend to buy tokens. The equivalent token amount will be calculated automatically."
                placement="top"
                arrow
                className="ml-1"
              >
                <span style={{ cursor: "pointer" }}>
                  <BsInfoCircle />
                </span>
              </Tooltip>
            </div>
            <div className="input-group shop-form mb-3">
              <div className="con-dropDown dropdown">
                <button
                  className="btn btn-secondary mt-1 dropdown-toggle"
                  // type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Usdt size={30} />
                  <span> USDT </span>
                </button>
              </div>

              <input
                value={usdtAmount}
                onChange={(e) => setusdtAmount(e.target.value)}
                placeholder="Enter USDT amount"
                type="number"
                className="form-control con-input"
                aria-label="Text input with checkbox"
                style={{ padding: "1.375rem 0.75rem" }}
              />
            </div>
            <div className="con-head mb-1  text-dark">
              {" "}
              You Get{" "}
              <Tooltip
                title="This shows the number of tokens you will receive based on the entered USDT amount and the current exchange rate."
                placement="top"
                arrow
                className="ml-1"
              >
                <span style={{ cursor: "pointer" }}>
                  <BsInfoCircle />
                </span>
              </Tooltip>
            </div>

            <div className="input-group shop-form mb-3">
              <div>
                <button
                  className="btn mt-1 btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* Display the logo and symbol of the selected token */}
                  <img
                    src={`${imgUrl}/${selectedToken?.logo}`}
                    alt="Logo"
                    style={{
                      width: "29px",
                      height: "29px",
                      borderRadius: "50px",
                    }}
                  />{" "}
                  <span>{selectedToken?.symbol}</span>
                </button>
                {/* Dropdown menu to select a different token */}
                <ul
                  className="dropdown-menu overflow-auto"
                  style={{ maxHeight: "200px" }}
                >
                  {tokenDataList.map((token, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item d-flex align-items-center"
                        onClick={() => setSelectedToken(token)} // Change selected token
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={`${imgUrl}/${token.logo}`}
                          alt="Logo"
                          style={{
                            width: "29px",
                            height: "29px",
                            borderRadius: "50px",
                            marginRight: "8px",
                          }}
                        />
                        <span>{token.symbol}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* BNB calculation input field */}
              <input
                value={getBnbAmount(usdtAmount)} // Display BNB equivalent for the selected token
                onChange={() => {}}
                type="number"
                className="form-control"
                aria-label="Text input with checkbox"
                placeholder="You will receive"
                style={{ padding: "1.375rem 0.75rem" }}
              />
            </div>
            <div className="mb-1 con-head  text-dark">
              {" "}
              Enter your wallet address{" "}
              <Tooltip
                title="Enter the wallet address where you want to receive the tokens. You can find your wallet address in your crypto wallet app under 'Receive'"
                placement="top"
                arrow
                className="ml-1"
              >
                <span style={{ cursor: "pointer" }}>
                  <BsInfoCircle />
                </span>
              </Tooltip>
            </div>
            <div className="input-group shop-form mb-5 ">
              {/* BNB calculation input field */}
              <input
                // value={}
                onChange={(e) => {
                  setUserWallet(e.target.value);
                }}
                type="text"
                className="form-control"
                aria-label="Text input with checkbox"
                placeholder="You will receive"
              />
            </div>
            <LargeButton
              disabled={!userWallet || !usdtAmount}
              //   disabled={!ustdAmount || isLoading || !signer}
              onClick={handlePay}
              text={isLoading ? "Processing..." : "Buy Now"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shop;
