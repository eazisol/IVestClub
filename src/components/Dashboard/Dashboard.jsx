import React, { useEffect, useState } from "react";
import "./Dashboard.css";
// import "./App.css";

import CardActions from "@mui/joy/CardActions";
import { ethers } from "ethers";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { Avatar, VectorIcon } from "../Common/Icons";
import { SactionContainer } from "../Common/Containers";
import { Ethereum, Bitcoin, Usdt, IVC } from "../Common/CurrencyIcons";
import { MiniGraph, LargeGraph } from "../Common/CurrencyIcons";
import ProfileCard from "./ProfileCard";
import { FilledButtonLight } from "../Common/Buttons";
import { LargeButton } from "../Common/Buttons";
import { BtcIcon } from "react-line-awesome";
import useApi from "../Hooks/useApi";
import { appData } from "../Context/AppContext";
import axios from "axios";
import { baseUrl, imgUrl } from "../../../apiConfig";

function createData(currObj, avail, amount, action) {
  let Icon;
  switch (currObj.name) {
    case "BTC":
      Icon = Bitcoin;
      break;
    case "ETH":
      Icon = Ethereum;
      break;
    case "USDT":
      Icon = Usdt;
      break;
    default:
      Icon = null;
  }
  return { currObj, avail, amount, action, Icon };
}

const USDT_CONTRACT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
];
const Dashboard = () => {
  const { userData, walletData, setWalletData, setSnackBarData } = appData();
  const [status, setStatus] = useState(null);
  const [balance, setBalance] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usdtAmount, setustdAmount] = useState("");
  const [tokenDataList, setTokenDataList] = useState([]); // List of tokens from API
  const [selectedToken, setSelectedToken] = useState(null); // The currently selected token
  const [usdtData, setUSDTData] = useState("");
  const [usdtBalance, setUsdtBalance] = useState(null);
  let usdtAmountCalculate = usdtAmount * usdtData?.Price; //caluculate USDT which is write in input with today USDT price
  let myWalletAmount = usdtData?.Price * usdtBalance; //caluculate USDT which is write in input with today USDT price
  //SHOW USERS TOKEN ON IN THE TABLE
  const rows = [
    createData(
      { name: "USDT", des: "TetherUS" },
      usdtBalance,
      `${myWalletAmount}`,
      "Convert"
    ),
  ];
  // Function to calculate the equivalent BNB amount for a given USDT amount
  const getBnbAmount = (usdtAmount) => {
    if (!usdtAmount || !selectedToken) return ""; // Ensure selected token is available

    const price = parseFloat(usdtData?.Price) || 0;
    const transactionFee = parseFloat(selectedToken?.transaction_fee) || 0;
    const conversionRate =
      parseFloat(selectedToken?.token_conversion_rate) || 1; // Avoid division by zero

    if (conversionRate === 0) return "0.0000"; // Prevent division by zero

    return Math.abs(
      (parseFloat(usdtAmount) * price - transactionFee) / conversionRate
    ).toFixed(4);
  };

  // Function to handle the payment process (creating a transaction via CoinPayments API)
  const handlePay = async (e) => {
    e.preventDefault();

    // Check if MetaMask is installed in the browser
    if (!walletData.address) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Please Connect Wallet!",
      });
      return;
    }

    setLoading(true);

    let obj = {
      amountusdt: usdtAmountCalculate,
      amountivt: getBnbAmount(usdtAmount),
      currency1: "LTCT",
      currency2: "LTCT",
      buyer_email: userData?.email,
      username: userData?.username ? userData?.username : "N/A",
      user_wallet_address: walletData?.address,
      user_id: userData?.user_id,
    };

    try {
      const { data } = await axios.post(
        `${baseUrl}coinpayments/createUSDTTransaction`,
        obj
      );
      setTransactionId(data?.transaction?.transaction_id);
      if (data?.payment_urls?.checkout_url) {
        window.open(data.payment_urls.checkout_url, "_blank");
      }
      setustdAmount("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  // Function to handle wallet connection (requesting user’s MetaMask address and balance)
  const handleConnectWallet = async () => {
    setError("");
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      if (baseUrl === "https://ivestclub.eazisols.com/api/") {
        if (network.chainId !== 1) {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
          });
        } else {
          if (network.chainId !== 97) {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x61" }],
            });
          }
        }
      }

      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
      await getUSDTBalance(provider, address);
      setWalletData({ provider, signer, address });
    } catch (err) {
      setError(err.message);
    }
  };

  //GET USDT TOKEN FROM WALLET
  const getUSDTBalance = async (provider, address) => {
    try {
      const usdtContract = new ethers.Contract(
        USDT_CONTRACT_ADDRESS,
        ERC20_ABI,
        provider
      );
      // Fetch USDT balance
      const balance = await usdtContract.balanceOf(address);
      // Fetch decimals and format balance
      const decimals = await usdtContract.decimals();
      const formattedBalance = balance / Math.pow(10, decimals);
      setUsdtBalance(formattedBalance);
    } catch (error) {
      console.error("Error fetching USDT balance:", error);
      setUsdtBalance(null);
    }
  };
  // Fetch token data and set the first token as the selected token
  const handleTokenApi = async () => {
    const { data } = await axios.get(`${baseUrl}token/getAllTokenData`);
    // Assuming data.data is an array of token objects
    setTokenDataList(data?.data);

    // Set the first token as the selected token initially
    if (data?.data?.length > 0) {
      setSelectedToken(data?.data[0]);
    }
  };
  //GET USDT PRICE FROM API
  const getUSDTprice = async () => {
    const { data } = await axios.get(
      `https://api.diadata.org/v1/assetQuotation/Ethereum/0xdAC17F958D2ee523a2206206994597C13D831ec7`
    );
    setUSDTData(data);
  };
  // useEffect hook that runs once to handle MetaMask account and network changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        handleConnectWallet();
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
    // handleConnectWallet();
    handleTokenApi();
    getUSDTprice();
  }, []);
  // useEffect hook to check the status of the transaction using the transaction ID
  useEffect(() => {
    if (!transactionId) return;
    // Function to periodically check the transaction status from CoinPayments API
    const checkTransactionStatus = async () => {
      try {
        const response = await axios.post(
          `${baseUrl}coinpayments/getTransactionStatus`,
          {
            txid: transactionId,
          }
        );

        if (response?.data?.result?.status == "100") {
          setStatus(response?.data.result.status);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error while checking transaction status:", error);
      }
    };
    // If the transaction is completed (status == 100), stop checking
    const intervalId = setInterval(checkTransactionStatus, 5000);

    return () => clearInterval(intervalId);
  }, [transactionId]);
  // useEffect hook to handle post-payment action when the transaction is successful (status == 100)
  useEffect(() => {
    if (status !== 100) return;

    const handlePin = async () => {
      try {
        await axios.post(`${baseUrl}coinpayments/handleIPN`, {
          status: status,
          txn_id: transactionId,
          amountusdt: usdtAmountCalculate,
          amountivt: getBnbAmount(usdtAmount),
          currency: "IVT",
          user_email: userData?.email,
          user_wallet_address: walletData?.address,
          custom: 1,
        });

        setStatus(null);
      } catch (error) {
        console.error("Error handling pin:", error);
      }
    };

    handlePin();
  }, [status]);
  return (
    <SactionContainer container={false}>
      <div className="w-100 mt-5  mb-3 pt-5 pl-3">
        <h3 className="dashHead mt-2 mb-3 pb-1">Dashboard</h3>
      </div>

      <div className="w-100 mb-5 pb-5">
        <div className="row mb-5">
          <div className="col-lg-3 col-sm-12 col-md-12 mb-4 p-3 p-xl-0">
            <ProfileCard />
          </div>
          <div className="col-lg-9 col-sm-12 col-md-12">
            <div className="card card-border-c p-3">
              <div className="row justify-content-between mx-0 p-3">
                <div className="currency">
                  <div className="currName mb-3">My IVT Token Balance</div>
                  <div className="currDetail row align-items-center">
                    <VectorIcon size={40} rounded={true} />
                    <h4 className="mb-0 pl-2">
                      {" "}
                      <strong className="currDigit">10.251469</strong>
                    </h4>
                    <p className="currDollar mt-2 LightText w-100 pl-3">
                      $64,349.99
                    </p>
                  </div>
                </div>
                <div className="currBtnContainer">
                  <button className="d-flex currBtn">Deposit</button>
                  <button className="d-flex currBtn">Withdraw</button>
                </div>
              </div>
              <div className="section2">
                <TableContainer className="tableContainer">
                  <Table className="tableText" sx={{ minWidth: 650 }}>
                    <TableHead className="tHead">
                      <TableRow>
                        <TableCell className="pb-0  tableHeadText">
                          My Coins{" "}
                          <i className="fa-solid fa-up-down sortIcon"></i>
                        </TableCell>
                        <TableCell align="right" className="pb-0 tableHeadText">
                          Available{" "}
                          <i className="fa-solid fa-up-down sortIcon"></i>
                        </TableCell>
                        <TableCell align="right" className="pb-0 tableHeadText">
                          Amount{" "}
                          <i className="fa-solid fa-up-down sortIcon"></i>
                        </TableCell>
                        <TableCell align="right" className="pb-0 tableHeadText">
                          Action{" "}
                          <i className="fa-solid fa-up-down sortIcon"></i>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => {
                        const Icon = row.Icon;
                        return (
                          <TableRow
                            key={index}
                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            className="tableRow"
                          >
                            <TableCell component="th" scope="row">
                              {Icon && <Icon size={25} />}
                              &nbsp;
                              <span className="tableCellText pop-font LightText bold-5">
                                {" "}
                                {row.currObj.name}
                              </span>
                              <span className="tableDes">
                                {" "}
                                {row.currObj.des}{" "}
                              </span>
                            </TableCell>
                            <TableCell align="right">
                              <span className="availNum"> {row.avail} </span>
                            </TableCell>
                            <TableCell align="right">
                              {" "}
                              <span className="availNum">{row.amount}</span>
                            </TableCell>
                            <TableCell align="right">
                              {" "}
                              <u className="LightText actionText">
                                {row.action}
                              </u>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="row mt-3 p-1 ">
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <div className="card card-border-c mb-3 col-sm-12 col-md-12">
                    <div className="card-body">
                      <div className="cardHeadText d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="mt-1">
                            {" "}
                            <IVC size={20} />
                          </div>
                          <div className="token  ml-3">
                            <p className="tokenText">
                              {" "}
                              Ivest Club Token
                              <p className="text-basic">IVC</p>{" "}
                            </p>
                          </div>
                        </div>

                        <div className="tokenText arrowIcon">
                          <i className="fa-solid fa-caret-up"></i>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6  p-0">
                          <div className="cardNumber mb-2 ">$932343</div>
                          <p className="card-text bold-5">+0.25 %</p>
                        </div>
                        <div className="col-md-6 ">
                          <MiniGraph size={50} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card card-border-c col-md-12 col-sm-12 mb-3">
                    <div className="card-body">
                      <div className="cardHeadText d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="mt-1">
                            {" "}
                            <IVC size={20} />
                          </div>
                          <div className="token  ml-3">
                            <p className="tokenText">
                              {" "}
                              Ivest Club Token
                              <p className="text-basic">IVC</p>{" "}
                            </p>
                          </div>
                        </div>

                        <div className="tokenText arrowIcon">
                          <i className="fa-solid fa-caret-up"></i>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 p-0">
                          <div className="cardNumber mb-2 ">$932343</div>
                          <p className="card-text bold-5">+0.25 %</p>
                        </div>
                        <div className="col-6">
                          <MiniGraph size={50} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-8 col-md-12 col-sm-12">
                  <div className=" card card-border-c">
                    <LargeGraph size={300} />
                  </div>
                </div>
              </div>

              <div className="row mt-3 p-1 col-md-12">
                <div className="col-lg-4  mb-2 col-sm-12 col-md-12">
                  <div className="card card-border-c">
                    <div className="card-body">
                      <div className="cardHeadText d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="mt-1">
                            {" "}
                            <IVC size={20} />
                          </div>
                          <div className="token  ml-3">
                            <p className="tokenText">
                              {" "}
                              Ivest Club Token
                              <p className="text-basic">IVC</p>{" "}
                            </p>
                          </div>
                        </div>

                        <div className="tokenText arrowIcon">
                          <i className="fa-solid fa-caret-up"></i>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 p-0">
                          <div className="cardNumber mb-2 ">$932343</div>
                          <p className="card-text bold-5">+0.25 %</p>
                        </div>
                        <div className="col-6">
                          <MiniGraph size={50} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-2  col-sm-12 col-md-12">
                  <div className="card card-border-c">
                    <div className="card-body">
                      <div className="cardHeadText d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="mt-1">
                            {" "}
                            <IVC size={20} />
                          </div>
                          <div className="token  ml-3">
                            <p className="tokenText">
                              {" "}
                              Ivest Club Token
                              <p className="text-basic">IVC</p>{" "}
                            </p>
                          </div>
                        </div>

                        <div className="tokenText arrowIcon">
                          <i className="fa-solid fa-caret-up"></i>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 p-0">
                          <div className="cardNumber mb-2 ">$932343</div>
                          <p className="card-text bold-5">+0.25 %</p>
                        </div>
                        <div className="col-md-6">
                          <MiniGraph size={50} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-2  col-sm-12 col-md-12">
                  <div className="card card-border-c">
                    <div className="card-body">
                      <div className="cardHeadText d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="mt-1">
                            {" "}
                            <IVC size={20} />
                          </div>
                          <div className="token  ml-3">
                            <p className="tokenText">
                              {" "}
                              Ivest Club Token
                              <p className="text-basic">IVC</p>{" "}
                            </p>
                          </div>
                        </div>

                        <div className="tokenText arrowIcon">
                          <i className="fa-solid fa-caret-up"></i>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6 p-0">
                          <div className="cardNumber mb-2 ">$932343</div>
                          <p className="card-text bold-5">+0.25 %</p>
                        </div>
                        <div className="col-6">
                          <MiniGraph size={50} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section4 rounded-3 m-3 p-3 ">
                <div className="text-center">
                  <div className="section4-head">Buy IVT</div>
                  <div class="text-danger">
                    "Payment Module is under development. It will receive only
                    LTCT currency for now (TestNet only)"
                  </div>
                </div>
                <div className="currConverter col-sm-12  col-lg-12 col-md-12">
                  <div className="row">
                    <div className="converter1 mt-4 col-sm-12  col-lg-6 col-md-12">
                      <div className="usdtPrice LightText z-3">
                        {`USDT Current Price : ${usdtData?.Price?.toFixed(3)}`}
                      </div>

                      <div className="mb-1 con-head"> You Pay </div>
                      <div className="input-group mb-3">
                        <div className="con-dropDown dropdown">
                          <button
                            className="btn btn-secondary mt-1 dropdown-toggle"
                            // type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <Usdt />
                            <span> USDT </span>
                          </button>
                          {/* <ul className="dropdown-menu">
                            <li className="">
                              <a className="dropdown-item">
                                <Bitcoin size={20} /> BTC
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item">
                                <Usdt size={20} /> USDT
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item">
                                <Ethereum size={20} /> ETH
                              </a>
                            </li>
                          </ul> */}
                        </div>

                        <input
                          value={usdtAmount}
                          onChange={(e) => setustdAmount(e.target.value)}
                          placeholder="Enter USDT amount"
                          type="text"
                          className="form-control con-input"
                          aria-label="Text input with checkbox"
                        />
                      </div>
                    </div>
                    <div className="converter2 mt-4 col-sm-12 col-lg-6 col-md-12">
                      <div className="con-head mb-1 mt-3"> You Get </div>
                      {/* <div className="input-group mb-3">
                        <div>
                          <button
                            className="btn mt-1 btn-secondary dropdown-toggle"
                            // type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <img
                              src={`${imgUrl}${tokenData?.logo}`}
                              alt="Logo"
                              style={{
                                width: "21px",
                                height: "21px",
                                borderRadius: "50px",
                              }}
                            />{" "}
                            <span> {tokenData?.symbol} </span>
                          </button>
                          <ul className="dropdown-menu">
                            <li className="">
                              <a className="dropdown-item">
                                <Bitcoin size={20} /> BTC
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item">
                                <Usdt size={20} /> USDT
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item">
                                <Ethereum size={20} /> ETH
                              </a>
                            </li>
                          </ul>
                        </div>
                        <input
                          value={getBnbAmount(usdtAmount)}
                          onChange={() => {}}
                          type="text"
                          className="form-control"
                          aria-label="Text input with checkbox"
                          placeholder="You will receive"
                        />
                      </div> */}

                      <div className="input-group mb-3">
                        <div>
                          <button
                            className="btn mt-1 btn-secondary dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {/* Display the logo and symbol of the selected token */}
                            <img
                              src={`${imgUrl}${selectedToken?.logo}`}
                              alt="Logo"
                              style={{
                                width: "21px",
                                height: "21px",
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
                                    src={`${imgUrl}${token.logo}`}
                                    alt="Logo"
                                    style={{
                                      width: "21px",
                                      height: "21px",
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
                          type="text"
                          className="form-control"
                          aria-label="Text input with checkbox"
                          placeholder="You will receive"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="convDes LightText z-3" align="center">
                  The price will be recalculated in 4.5s
                </div>
                {/* <div className="conBtn">Buy Now</div> */}
                <div className="largeButtonContainer mt-3  pt-3 mb-5 col-lg-4 col-md-4 col-sm-2">
                  <LargeButton
                    text={loading ? "Processing..." : "Buy Now"}
                    onClick={handlePay}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SactionContainer>
  );
};

export default Dashboard;
