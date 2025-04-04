import React, { useEffect, useRef, useState } from "react";
import "./Dashboard.css";
// import "./App.css";
import { BsInfoCircle } from "react-icons/bs";
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
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  FormControlLabel,
  IconButton,
  Link,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material"; // Add this import"
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { Avatar, VectorIcon } from "../Common/Icons";
import { SactionContainer } from "../Common/Containers";
import { Ethereum, Bitcoin, Usdt, IVT, spaceX } from "../Common/CurrencyIcons";
import { MiniGraph, LargeGraph } from "../Common/CurrencyIcons";
import ProfileCard from "./ProfileCard";
import { FilledButtonLight } from "../Common/Buttons";
import { LargeButton } from "../Common/Buttons";
import { BtcIcon } from "react-line-awesome";
import useApi from "../Hooks/useApi";
import { appData } from "../Context/AppContext";
import axios from "axios";
import { baseUrl, imgUrl } from "../../../apiConfig";
import MaterialModal from "../Common/MaterialModal";
import CloseIcon from "@mui/icons-material/Close";
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
    case "ISPX":
      Icon = spaceX;
      break;
    case "IVT":
      Icon = IVT;
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
  const { mutate: getData, isPending: isProfileLoading } = useApi();
  const [profiledata, setProfileData] = useState({});
  const { userData, walletData, setWalletData, setSnackBarData } = appData();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [balance, setBalance] = useState("");
  const navigate = useNavigate();
  const [invoicesId, setinvoicesId] = useState(null);
  const [currencyId, setCurrencyId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usdtAmount, setustdAmount] = useState("");
  const [userWallet, setUserWallet] = useState("");
  const [tokenDataList, setTokenDataList] = useState([]); // List of tokens from API
  const [selectedToken, setSelectedToken] = useState(null);

  const [usdtData, setUSDTData] = useState("");
  const [usdcData, setUSDCData] = useState("");

  const [usdtBalance, setUsdtBalance] = useState(null);
  const [statusData, setAllStatusData] = useState(null);
  const [tokenHoldings, setTokenHoldings] = useState(null);
  const [network, setNetwork] = useState("");
  const imgSrc =
    network === "Testnet"
      ? "/assets/imgs/litecoin-ltc-logo-png_seeklogo-329320.png" // Testnet image
      : "https://api.coinpayments.com/api/v1/currencies/4:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48/logosvg?time=1741330018143"; // Mainnet image

  const currencyName = network === "Testnet" ? "LTCT" : "USDC"; // Testnet currency name
  // let usdtAmountCalculate = usdtAmount * usdtData?.Price;
  let myWalletAmount = usdcData?.Price * usdtBalance; //caluculate USDT which is write in input with today USDT price
  //SHOW USERS TOKEN ON IN THE TABLE
  const rows = [
    createData(
      { name: "USDT", des: "TetherUS" },
      0,
      `${myWalletAmount}`,
      "Convert"
    ),

    createData(
      { name: "IVT", des: "IVT" },
      balance?.[0]?.balance,
      `${myWalletAmount}`,
      "Convert"
    ),
    createData(
      { name: "ISPX", des: "Spacextoken" },
      balance?.[1]?.balance,
      `${myWalletAmount}`,
      "Convert"
    ),
  ];
  // Function to calculate the equivalent BNB amount for a given USDT amount
  const getBnbAmount = (usdtAmount) => {
    if (!usdtAmount || !selectedToken) return ""; // Ensure selected token is available

    const price = parseFloat(usdcData?.Price) || 0;
    const transactionFee = parseFloat(selectedToken?.transaction_fee) || 0;
    const conversionRate =
      parseFloat(selectedToken?.token_conversion_rate) || 1; // Avoid division by zero

    if (conversionRate === 0) return "0.0000"; // Prevent division by zero
    const persentageTransactionFee = transactionFee / 100;
    return Math.abs(
      (parseFloat(usdtAmount) * price * persentageTransactionFee -
        price * parseFloat(usdtAmount)) /
        conversionRate
    ).toFixed(4);
  };
  const getNetworkStatus = async () => {
    const { data } = await axios.get(`${baseUrl}network-status`);
    setNetwork(data?.network_setting);
  };

  // Function to handle the payment process (creating a transaction via CoinPayments API)
  const handlePay = async (e) => {
    e.preventDefault();
    if (!profiledata?.email_verified_at) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Cannot perform transaction – Your email verification is pending!",
      });
      return; // Stop execution here
    }
    if (userWallet.length > 42) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Incorrect Wallet Address, Please Enter a Valid Wallet Address!",
      });

      return;
    }
    const usernameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!usernameRegex.test(!profiledata?.username)) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Username should not contain special characters (only letters, numbers).",
      });
      return;
    }
    if (!profiledata?.username) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Username must be required.",
      });
      return;
    }
    setLoading(true);

    const networkCurrencyMap = {
      Mainnet: "USDC.ERC20",
      Testnet: "LTCT",
      BSC: "BNB",
      Ethereum: "ETH",
      // Add more networks and their respective currencies if needed
    };

    // Get currency based on the network, default to "LTCT" if not found
    const selectedCurrency = networkCurrencyMap[network] || "LTCT";

    const requestData = {
      currency:
        selectedCurrency == "USDC.ERC20"
          ? "4:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
          : "1002",
      items: [
        {
          name: "test item",
          description: "1738751764",
          quantity: {
            value: "1",
            type: "2",
          },
          amount: `${usdtAmount}`,
        },
      ],
      amount: {
        breakdown: {
          subtotal: `${usdtAmount}`,
        },
        total: `${usdtAmount}`,
      },
      buyer: {
        name: {
          firstName: "Test",
          lastName: "Test",
        },
        emailAddress: "test@test.com",
        phoneNumber: "1111111111",
        address: {
          address1: "Test str",
          city: "Warsaw",
          countryCode: "PL",
          postalCode: "01-001",
        },
      },
      payment: {
        paymentCurrency:
          selectedCurrency == "USDC.ERC20"
            ? "4:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
            : "1002",
        refundEmail: "test@test.com",
      },
      // Format numeric values with fixed precision
      amountusdt: usdtAmount,
      amounttoken: +getBnbAmount(usdtAmount),
      token: selectedToken?.tokenId,
      currency1: selectedCurrency,
      currency2: selectedCurrency,
      buyer_email: profiledata?.email,
      username: profiledata?.username,
      user_wallet_address: userWallet,
      user_id: `${profiledata?.id}`,
      network: network,
    };

    try {
      const response = await fetch(`${baseUrl}coinpayments/invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestData),
      });

      setustdAmount(localStorage.removeItem("usdtAmount"));
      getBnbAmount(localStorage.removeItem("convertAmount"));
      const data = await response.json();
      if (data?.error) {
        console.error("🚀 ~ handlePay ~ data.error:", data.error);
      } else {
        console.log("Success:", data);
      }
      const newCurrencyId =
        data?.response?.invoices[0]?.payment?.paymentCurrencies[0]?.currency
          ?.id;
      const newInvoicesId = data?.response?.invoices[0]?.id;

      setCurrencyId(newCurrencyId);
      setinvoicesId(newInvoicesId);
      //  Save the new values immediately

      if (data?.response?.invoices[0]?.checkoutLink) {
        const cleanUrl = data.response.invoices[0].checkoutLink.replace(
          /\\/g,
          ""
        );

        // Create a new anchor element
        const link = document.createElement("a");
        link.href = cleanUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        // Append to the document, click it, and remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setustdAmount("");
      localStorage.setItem("recipentWalletAddress", JSON.stringify(userWallet));
      // setWalletData('');
      setUserWallet("");
      localStorage.removeItem("userWalletAddress");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchTokenHoldings = async (provider, address) => {
    const tokens = [
      { name: "iVT", address: "0xB34c841F79c2626260cd1657c9f5c10Be4339D1B" },
      { name: "iSPX", address: "0x324d720f13764d6BE02ef1329D6a3e4dd8ec1e64" },
    ];

    const erc20Abi = [
      "function balanceOf(address owner) view returns (uint256)",
      "function decimals() view returns (uint8)",
    ];

    let tokenHoldings = {};

    for (const token of tokens) {
      const contract = new ethers.Contract(token.address, erc20Abi, provider);
      const balance = await contract.balanceOf(address);
      const decimals = await contract.decimals();

      tokenHoldings[token.name] = ethers.utils.formatUnits(balance, decimals);
    }

    return tokenHoldings; // Return the holdings
  };

  // Modify your wallet connection function
  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Please install MetaMask!",
      });
      return;
    }
    setLoading(true);
    setError("");
    try {
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let network = await provider.getNetwork();

      if (network.chainId !== 11155111) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }],
        });
        await new Promise((resolve) =>
          window.ethereum.on("chainChanged", resolve)
        );
        provider = new ethers.providers.Web3Provider(window.ethereum);
        network = await provider.getNetwork();
      }

      if (network.chainId !== 11155111) {
        throw new Error(
          "Failed to switch to Sepolia Testnet. Please switch manually in MetaMask."
        );
      }

      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const ethBalance = await provider.getBalance(address);

      // Fetch token holdings
      const holdings = await fetchTokenHoldings(provider, address);
      console.log("holdings", holdings);
      setBalance(holdings["iVT"] || "0"); // Set IVT balance
      await getUSDTBalance(provider, address);

      setWalletData({ provider, signer, address });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
  const getUSDCprice = async () => {
    const { data } = await axios.get(
      `https://api.diadata.org/v1/assetQuotation/Ethereum/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`
    );
    setUSDCData(data);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        handleConnectWallet();
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }

    handleTokenApi();
    getNetworkStatus();
    getUSDTprice();
    getUSDCprice();
  }, []);
  useEffect(() => {
    const savetokenHoldingsdWallet = JSON.parse(
      localStorage.getItem("tokenHoldings")
    );
    setBalance(savetokenHoldingsdWallet);
  }, [balance]);
  useEffect(() => {
    const usdtAmount = JSON.parse(localStorage.getItem("usdtAmount"));
    const userWalletAddress = JSON.parse(
      localStorage.getItem("userWalletAddress")
    );
    const convertAmount = JSON.parse(localStorage.getItem("convertAmount"));
    setustdAmount(usdtAmount);
    getBnbAmount(convertAmount);
    setUserWallet(userWalletAddress);
  }, []);
  useEffect(() => {
    getData(
      {
        url: "profile",
        method: "GET",
        sendHeaders: true,
      },
      {
        onSuccess: (data) => {
          let verify=data?.email_verified_at
          localStorage.setItem("verify", JSON.stringify(verify));
          setProfileData(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }, []);

  return (
    <>
      <SactionContainer container={false}>
  
        <div className="w-100 mt-5  mb-3 pt-5 pl-3">
          <h3 className="dashHead mt-2 mb-3 pb-1">Dashboard</h3>
        </div>

        <div className="w-100 mb-5 pb-5">
          <div className="row mb-5">
            <div className="col-lg-3 col-sm-12 col-md-12 mb-4 p-3 p-xl-0">
              <ProfileCard  />
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
                        <strong className="currDigit">
                          {balance?.[0]?.balance ? balance?.[0]?.balance : 0}
                        </strong>
                      </h4>
                      <p className="currDollar mt-2 LightText w-100 pl-3">
                        $
                        {isNaN(usdcData?.Price * balance?.[0]?.balance)
                          ? "0.0000"
                          : (usdcData?.Price * balance?.[0]?.balance).toFixed(
                              4
                            )}
                      </p>
                    </div>
                  </div>
                  <div className="currBtnContainer">
                    <button className="d-flex currBtn">Deposit</button>
                    <button className="d-flex currBtn">Withdraw</button>

                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate("/Dashboard/TransactionHistory");
                      }}
                    >
                      {" "}
                      <i className="fa-regular LightText-1 dashCardIcon fas fa-history"></i>
                    </div>
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
                          <TableCell
                            align="right"
                            className="pb-0 tableHeadText"
                          >
                            Available{" "}
                            <i className="fa-solid fa-up-down sortIcon"></i>
                          </TableCell>
                          {/* <TableCell align="right" className="pb-0 tableHeadText">
                          Amount{" "}
                          <i className="fa-solid fa-up-down sortIcon"></i>
                        </TableCell> */}
                          <TableCell
                            align="right"
                            className="pb-0 tableHeadText"
                          >
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
                                <span className="availNum">
                                  {" "}
                                  {row.avail || "0"}{" "}
                                </span>
                              </TableCell>
                              {/* <TableCell align="right">
                              {" "}
                              <span className="availNum">{row.amount}</span>
                            </TableCell> */}
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

                <div className="section4 rounded-3 m-3 p-3 ">
                  <div className="text-center ">
                 {profiledata?.kyc_status !== "Approved"&& <Alert
  variant="filled"
  severity="warning"
  sx={{
    backgroundColor: "#f7d05e", // Light yellow background
    color: "#333333", // Dark gray text
    cursor: "pointer",
  }}
>
  Please{" "}
  <Typography
    component="a"
    href="/Dashboard/MyAccount"
    sx={{
      color: "#333333", // Dark gray for link
      textDecoration: "underline",
      cursor: "pointer",
      fontSize: "small",
      "&:hover": { color: "#222222" }, // Slightly darker on hover
    }}
  >
    verify your identity
  </Typography>{" "}
  before purchasing tokens.
</Alert>}


                    {/* <Stack sx={{ width: '100%' }} spacing={2}>
    
      <Alert sx={{
    backgroundColor: "#f7d05e", // Light yellow background
    color: "#ffffff", // Darker text for contrast
    cursor: "pointer",
  }}
        severity="warning"
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
     Please <strong>verify your identity</strong> before purchasing tokens.
      </Alert>
    </Stack> */}
                    <div className="section4-head mt-3">Buy Token</div>
                    <div>
                      {network === "Testnet" && (
                        <div className="text-warning">Network : Testnet.</div>
                      )}
                      {network === "Mainnet" && (
                        <div className="text-warning">You are on Mainnet.</div>
                      )}
                      <div className="text-warning">
                        Token transfer process could take upto 1 hour.
                      </div>
                    </div>
                  </div>
                  <div className="currConverter col-sm-12  col-lg-12 col-md-12">
                    <div className="row">
                      <div className="converter1 mt-4 ">
                        {/* <div className="usdtPrice LightText z-3">
                        {`USDT Current Price : ${usdtData?.Price?.toFixed(3)}`}
                      </div> */}

                        <div className="mb-1 con-head">
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
                        <div className="input-group mb-3">
                          <div className="con-dropDown dropdown">
                            <button
                              className="btn btn-secondary mt-1 dropdown-toggle"
                              // type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              style={{ width: "102px", marginRight: "22px" }}
                            >
                              <img
                                src={imgSrc}
                                alt="Example"
                                style={{
                                  width: "21px",
                                  height: "21px",
                                  objectFit: "cover",
                                  marginRight: "3px",
                                }}
                              />

                              <span>
                                {currencyName}
                                {network === "Mainnet" ? (
                                  <span style={{ fontSize: "9px" }}>
                                    {" "}
                                    {""}(ERC20)
                                  </span>
                                ) : (
                                  <span style={{ fontSize: "9px" }}> {""}</span>
                                )}
                              </span>
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
                            type="number"
                            className="form-control con-input"
                            aria-label="Text input with checkbox"
                          />
                        </div>
                        <div className="con-head mb-1">
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
                              style={{ width: "102px", marginRight: "22px" }}
                            >
                              {/* Display the logo and symbol of the selected token */}
                              <img
                                src={`${imgUrl}/${selectedToken?.logo}`}
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
                                      src={`${imgUrl}/${token.logo}`}
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
                            type="number"
                            className="form-control"
                            aria-label="Text input with checkbox"
                            placeholder="You will receive"
                          />
                        </div>
                        <div className="mb-1 con-head">
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
                        <div className="input-group ">
                          {/* BNB calculation input field */}
                          <input
                            value={userWallet}
                            onChange={(e) => {
                              setUserWallet(e.target.value);
                            }}
                            type="text"
                            className="form-control"
                            aria-label="Text input with checkbox"
                            placeholder="You will receive"
                          />
                        </div>
                        {/* {usdtAmount && (
                        <p
                          style={{
                            fontSize: "10px",
                            marginTop: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => setDropDownOpen(!dropDownOpen)}
                        >
                          {dropDownOpen ? "Show less" : "Show more"}
                        </p>
                      )} */}
                        {usdtAmount && (
                          <div
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "10px",
                              border: "1px solid rgba(92, 91, 92, 0.4)",
                              marginTop: "20px",
                              overflow: "hidden",
                              transition:
                                "max-height 0.4s ease-in-out, padding 0.3s ease-in-out",
                              maxHeight: dropDownOpen ? "300px" : "35px", // Reduced collapsed height
                              padding: dropDownOpen ? "10px" : "3px", // Adjust padding for smoother closing
                            }}
                          >
                            <p
                              style={{
                                fontSize: "10px",
                                cursor: "pointer",
                                marginLeft: "16px",
                                padding: "4px",
                              }}
                              onClick={() => setDropDownOpen(!dropDownOpen)}
                            >
                              {dropDownOpen ? "Show less" : "Show more"}
                            </p>

                            <div
                              style={{
                                opacity: dropDownOpen ? 1 : 0, // Fade effect for smoother transition
                                transition: "opacity 0.3s ease-in-out",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  paddingRight: "10px",
                                  paddingLeft: "6%",
                                }}
                              >
                                <p style={{ fontSize: "12px" }}>
                                  Transaction fee
                                </p>
                                <p style={{ fontSize: "12px" }}>
                                  {`${selectedToken.transaction_fee} %`}
                                </p>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  paddingRight: "10px",
                                  paddingLeft: "6%",
                                }}
                              >
                                <p style={{ fontSize: "12px" }}>
                                  Conversion rate
                                </p>
                                <p style={{ fontSize: "12px" }}>
                                  {`${selectedToken.token_conversion_rate} USD`}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="converter2 col-sm-12 col-lg-6 col-md-12">
                        {/* <div className="con-head mb-1"> You Get </div> */}
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

                        {/* <div className="input-group mb-3">
                        <div>
                          <button
                            className="btn mt-1 btn-secondary dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <img
                              src={`${imgUrl}/${selectedToken?.logo}`}
                              alt="Logo"
                              style={{
                                width: "21px",
                                height: "21px",
                                borderRadius: "50px",
                              }}
                            />{" "}
                            <span>{selectedToken?.symbol}</span>
                          </button>
                          <ul
                            className="dropdown-menu overflow-auto"
                            style={{ maxHeight: "200px" }}
                          >
                            {tokenDataList.map((token, index) => (
                              <li key={index}>
                                <a
                                  className="dropdown-item d-flex align-items-center"
                                  onClick={() => setSelectedToken(token)} 
                                  style={{ cursor: "pointer" }}
                                >
                                  <img
                                    src={`${imgUrl}/${token.logo}`}
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

                        <input
                          value={getBnbAmount(usdtAmount)} 
                          onChange={() => {}}
                          type="number"
                          className="form-control"
                          aria-label="Text input with checkbox"
                          placeholder="You will receive"
                        />
                      </div> */}
                        {/* <div className="input-group mb-3">
                      

                        <input
                          
                          onChange={(e) => {setUserWallet(e.target.value)}}
                          type="text"
                          className="form-control"
                          aria-label="Text input with checkbox"
                          placeholder="You will receive"
                        />
                      </div> */}
                      </div>
                    </div>
                  </div>
                  <div className="convDes LightText z-3" align="center">
                    The price will be recalculated in 4.5s
                  </div>
                  {/* <div className="text-center mb-3">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={network === "mainnet"}
                        onChange={() => setNetwork(network === "testnet" ? "mainnet" : "testnet")}
                      />
                    }
                    label={network === "testnet" ? "Testnet" : "Mainnet"}
                  />
                </div>             */}
                  {/* <div className="conBtn">Buy Now</div> */}
                  <div className="largeButtonContainer   pt-3 mb-5 col-lg-4 col-md-4 col-sm-2">
                    <LargeButton
                      disabled={!userWallet || !usdtAmount||profiledata?.kyc_status!== "Approved"}
                      text={loading ? "Processing..." : "Buy Now"}
                      onClick={handlePay}
                      // onClick={handlePin}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SactionContainer>
    </>
  );
};

export default Dashboard;
