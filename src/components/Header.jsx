import React, { useState, useEffect } from "react";
import logo from "../../src/assets/images/HeaderLogo.png";
import { useNavigate, useLocation } from "react-router-dom";
import MobileDrawer from "./MobileDrawer";
import { appData } from "./Context/AppContext";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { CustomizedTooltips, HeaderLink } from "./Common/MiniComponents";
import { TextField, Tooltip } from "@mui/material";
import { ethers } from "ethers";
import { baseUrl } from "../../apiConfig";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import MaterialModal from "./Common/MaterialModal";
import mataMaskImage from "../../src/assets/images/MataMask.png";
import { Button, Box, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { ConnectWallet,   useAddress,
  useDisconnect,
  useBalance,
  useContract,
  useTokenBalance} from "@thirdweb-dev/react";
  
  const Header = ({ setShowSearchInput, showSearchInput }) => {
    
    // const userBalance=useBalance()
    const { data: userBalance } = useBalance();
    const contract=useContract()
    const tokenBalance=useTokenBalance()
    const address=useAddress()
    const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(null);
  const {
    userData,
    setUserData,
    handleLogout,
    setSnackBarData,
    setWalletData,
    walletData,
   setTokenHolding,
  } = appData();
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setShowLandingSaction } = appData();
  const [headerStyles, setHeaderStyles] = useState({});
  const [walletMenuOpen, setWalletMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tokenDataList, setTokenDataList] = useState([]);
  // console.log("🚀 ~ Header ~ tokenDataList:", tokenDataList)
  // const [tokenAddressConstants, setTokenAddressConstants] = useState([]);
  // console.log("🚀 ~ Header ~ tokenAddressConstants:", tokenAddressConstants)

  // useEffect(() => {
  //   if (!tokenDataList || tokenDataList.length === 0) return;
  
  //   const formattedList = tokenDataList.map(token => ({
  //     symbol: token.symbol,
  //     address: token.token_contract_address,
  //   }));
  
  //   setTokenAddressConstants(formattedList);
  // }, [tokenDataList]);
 
   
    // const { balances} = TokenBalances({
    //   tokenAddresses,
    //   address
    // });
  const ERC20_ABI = [
    {
      "constant": true,
      "inputs": [{"name": "owner", "type": "address"}],
      "name": "balanceOf",
      "outputs": [{"name": "", "type": "uint256"}],
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [{"name": "", "type": "uint8"}],
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [{"name": "", "type": "string"}],
      "type": "function"
    }
  ];
  
    useEffect(() => {
      if(!address){
        setTokenHolding([])
      }
      if (!tokenDataList || !tokenDataList.length || !address) return;
      const fetchBalances = async () => {
        setLoading(true);
        setError(null);
        try {
          // Get provider - either from window.ethereum or use a default provider
          const provider = new ethers.providers.Web3Provider(window.ethereum) ||
                           ethers.getDefaultProvider();
          // Get balances for all tokens
          const balancePromises = tokenDataList.map(async (tokenInfo) => {
            try {
              // Create a contract instance without hooks
              const tokenContract = new ethers.Contract(
                tokenInfo.token_contract_address
                ,
                ERC20_ABI,
                provider
              );
              // Get balance and decimals
              const balance = await tokenContract.balanceOf(address);
              const decimals = await tokenContract.decimals();
              // Get token symbol if not provided
              let symbol = tokenInfo.token_contract_address
              ;
              if (!symbol) {
                symbol = await tokenContract.symbol();
              }
              // Format balance with correct decimals
              const formattedBalance = ethers.utils.formatUnits(balance, decimals);
              return {
                ...tokenInfo,
              
                balance: formattedBalance,
               
              };
            } catch (err) {
              console.error(`Error fetching balance for token ${tokenInfo.token_contract_address
              }:`, err);
              // return {
              //   symbol: tokenInfo.symbol || "Unknown",
              //   address: tokenInfo.address,
              //   balance: "Error",
              //   error: err.message
              // };
            }
          });
          const results = await Promise.all(balancePromises);
          setTokenHolding(results);
        } catch (err) {
          setError(`Failed to fetch balances: ${err.message}`);
          console.error("Error fetching balances:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchBalances();
    }, [tokenDataList, address]);
    
  
  // Usage example
  
    
  // const [testState,setTestState]=useState('')
  // console.log("🚀 ~ Header ~ testState:", testState)
  // for(let test of tokenAddressConstants){
  //   console.log("🚀 ~ Header ~ test:", test)
  //   setTestState(test?.address)
  //   // const { contract: iVTContract } = useContract(test?.address);
  // }
  // const getContract=tokenAddressConstants?.map((item)=>{
  //   console.log("🚀 ~ getContract ~ item:", item)
  //   // const { contract: iVTContract } = useContract(item?.address);
  //   // console.log("🚀 ~ getContract ~ iVTContract:", iVTContract)
  
     
  //   })





  const handleClick = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000); // Close after 2 seconds
  };
  const handleCopy = () => {
    const textToCopy = walletData.address;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000); // Reset after 2 sec
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }
  };
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 2)}...${address.slice(-4)}`;
  };
  // const handleCopyAddress = () => {
  //   if (walletData?.address) {
  //     navigator.clipboard.writeText(walletData.address);

  //   }
  // };

  // Function to fetch token balances
  // const fetchTokenHoldings = async () => {
  //   try {
  //     const tokenHoldings = [];

  //     // ERC-20 Token Contract Addresses on Sepolia Testnet
  //     const tokens = [
  //       { name: "iVT", address: "0xB34c841F79c2626260cd1657c9f5c10Be4339D1B" },
  //       { name: "iSPX", address: "0x324d720f13764d6BE02ef1329D6a3e4dd8ec1e64" },
  //     ];

  //     const erc20Abi = [
  //       "function balanceOf(address owner) view returns (uint256)",
  //       "function decimals() view returns (uint8)",
  //     ];

  //     for (const token of tokens) {
  //       console.log("🚀 ~ fetchTokenHoldings ~ token:", token)
        
  //       // const contract = new ethers.Contract(token.address, erc20Abi, provider);
  //       // const balance = await contract.balanceOf(address);
  //       // const decimals = await contract.decimals();

  //       // const formattedBalance = ethers.utils.formatUnits(balance, decimals);

  //       // tokenHoldings.push({
  //       //   name: token.name,
  //       //   balance: formattedBalance,
  //       // });

  //       // console.log(`Token: ${token.name}, Balance: ${formattedBalance}`);
  //     }

  //     // setTokenHoldings(tokenHoldings); // Update state with token holdings
  //     // localStorage.setItem("tokenHoldings", JSON.stringify(tokenHoldings)); // Save to localStorage
  //   } catch (error) {
  //     console.error("Error fetching token holdings:", error);
  //   }
  // };
  // useEffect(() => {
  //   // This effect runs whenever tokenDataList changes
  //   const fetchTokenHoldings = async (provider, address) => {
  //     if (!tokenDataList || tokenDataList.length === 0) {
  //       console.error("No token data available");
  //       return [];
  //     }

  //     const erc20Abi = [
  //       "function balanceOf(address owner) view returns (uint256)",
  //       "function decimals() view returns (uint8)",
  //     ];

  //     let tokenHoldings = [];

  //     for (const token of tokenDataList) {
  //       try {
  //         const contract = new ethers.Contract(
  //           token.token_contract_address,
  //           erc20Abi,
  //           provider
  //         );
  //         const balance = await contract.balanceOf(address);
  //         const decimals = await contract.decimals();
  //         const formattedBalance = ethers.utils.formatUnits(balance, decimals);

  //         tokenHoldings.push({
  //           symbol: token.symbol,
  //           logo: token.logo,
  //           name: token.name,
  //           balance: formattedBalance,
  //         });
  //       } catch (error) {}
  //     }

  //     setUserHoldings(tokenHoldings); // Save the token holdings in state
  //   };

  //   // Only call fetchTokenHoldings if tokenDataList is populated
  //   if (tokenDataList.length > 0 && walletData?.address) {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const address = signer.getAddress();
  //     fetchTokenHoldings(provider, address);
  //   }
  // }, [tokenDataList]);
  useEffect(() => {
    const handleTokenApi = async () => {
      const { data } = await axios.get(`${baseUrl}token/getAllTokenData`);
      setTokenDataList(data?.data);
    };
    handleTokenApi();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        setHeaderStyles({
          height: "5em",
          paddingTop: 0,
          transition: "all 0.3s ease-in-out",
        });
      } else {
        setIsScrolled(false);
        setHeaderStyles({
          paddingTop: "1.3vw",
          transition: "all 0.3s ease-in-out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleWalletOpen = () => {
    setWalletModalOpen(!walletModalOpen);
  };
  const getBackgroundColor = () => {
    if (
      (location.pathname === "/" ||
        location.pathname === "/About" ||
        location.pathname === "/Membership") &&
      !isScrolled
    ) {
      return "transparent";
    }
    return "";
  };
 

 
  // const handleConnectWallet = async () => {
  //   // Prevent reconnection if already connected
  //   if (Object.keys(walletData).length > 0) {
  //     return;
  //   }

  //   // Check if MetaMask is installed
  //   if (!window.ethereum) {
  //     setSnackBarData({
  //       visibility: true,
  //       error: "error",
  //       text: "Please install MetaMask!",
  //     });
  //     return;
  //   }

  //   setLoading(true);
  //   setError("");

  //   try {
  //     // Disconnect any existing connections first
  //     await disconnectWallet();

  //     // Give a small delay to ensure clean state
  //     await new Promise((resolve) => setTimeout(resolve, 500));

  //     // Create provider and request accounts
  //     let provider = new ethers.providers.Web3Provider(window.ethereum);
  //     await provider.send("eth_requestAccounts", []);

  //     // Check and switch network
  //     let network = await provider.getNetwork();
  //     const SEPOLIA_CHAIN_ID = 11155111;
  //     const SEPOLIA_CHAIN_HEX = "0xaa36a7";

  //     if (network.chainId !== SEPOLIA_CHAIN_ID) {
  //       try {
  //         await window.ethereum.request({
  //           method: "wallet_switchEthereumChain",
  //           params: [{ chainId: SEPOLIA_CHAIN_HEX }],
  //         });

  //         // Wait for chain change
  //         await new Promise((resolve, reject) => {
  //           const handleChainChanged = () => {
  //             window.ethereum.removeListener(
  //               "chainChanged",
  //               handleChainChanged
  //             );
  //             resolve();
  //           };
  //           window.ethereum.on("chainChanged", handleChainChanged);

  //           // Fallback timeout
  //           setTimeout(() => {
  //             window.ethereum.removeListener(
  //               "chainChanged",
  //               handleChainChanged
  //             );
  //             reject(new Error("Network switch timeout"));
  //           }, 10000);
  //         });

  //         // Recreate provider after network switch
  //         provider = new ethers.providers.Web3Provider(window.ethereum);
  //         network = await provider.getNetwork();
  //       } catch (switchError) {
  //         console.error("Network switch failed", switchError);
  //         throw new Error(
  //           "Failed to switch to Sepolia Testnet. Please switch manually in MetaMask."
  //         );
  //       }
  //     }

  //     // Verify network one last time
  //     if (network.chainId !== SEPOLIA_CHAIN_ID) {
  //       throw new Error("Not on Sepolia Testnet");
  //     }

  //     // Get signer and address
  //     const signer = provider.getSigner();
  //     const address = await signer.getAddress();

  //     // Fetch balance and token holdings
  //     const balance = await provider.getBalance(address);
  //     //  const tokenRecevied= await fetchTokenHoldings(provider, address);
  //     // setUserHoldings(tokenRecevied)

  //     // Update state
  //     const savedTokenHoldings = JSON.parse(
  //       localStorage.getItem("tokenHoldings")
  //     );
  //     setWalletData({ provider, signer, address });
  //     localStorage.setItem("walletData", JSON.stringify({ address }));
  //     setBalance(savedTokenHoldings);
  //     setWalletModalOpen(false);

  //     // Add event listeners for future changes
  //     window.ethereum.on("accountsChanged", handleAccountsChanged);
  //     window.ethereum.on("chainChanged", handleChainChanged);

  //     // Reload the window after successful connection
  //     window.location.reload();
  //   } catch (err) {
  //     console.error("Wallet connection error:", err);
  //     setError(err.message);
  //     setSnackBarData({
  //       visibility: true,
  //       error: "error",
  //       text: err.message,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleDisconnect = async () => {
  //   try {
  //     // Revoke permissions
  //     await window.ethereum.request({
  //       method: "wallet_revokePermissions",
  //       params: [{ eth_accounts: {} }],
  //     });

  //     // Clear state and local storage
  //     await disconnectWallet();

  //     // Optional: Soft reload to reset state completely
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error disconnecting:", error);
  //   }
  // };

  // Helper function to fully disconnect
  // const disconnectWallet = async () => {
  //   // Remove event listeners
  //   if (window.ethereum && window.ethereum.removeListener) {
  //     window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
  //     window.ethereum.removeListener("chainChanged", handleChainChanged);
  //   }

  //   // Clear state values
  //   setWalletData({});
  //   setBalance("0.0");
  //   setTokenHoldings(null);

  //   // Remove wallet data from localStorage
  //   localStorage.removeItem("walletData");
  //   localStorage.removeItem("tokenHoldings");
  // };

  // Event handlers for future changes
  // const handleAccountsChanged = (accounts) => {
  //   if (accounts.length === 0) {
  //     // No accounts, disconnect
  //     disconnectWallet();
  //   } else {
  //     // Reconnect with new account
  //     handleConnectWallet();
  //   }
  // };

  // const handleChainChanged = () => {
  //   // Reload to reset the app state
  //   window.location.reload();
  // };

  // useEffect to handle wallet connection updates when the account or chain changes
  // useEffect(() => {
  //   if (window.ethereum) {
  //     window.ethereum.on("accountsChanged", () => {
  //       handleConnectWallet();
  //     });
  //     window.ethereum.on("chainChanged", () => {
  //       handleConnectWallet();
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (window.ethereum) {
  //     const handleAccountChange = async (accounts) => {
  //       if (accounts.length > 0) {
  //         const provider = new ethers.providers.Web3Provider(window.ethereum);
  //         const signer = provider.getSigner();
  //         const address = await signer.getAddress();
  //         // const tokenRecevied= await fetchTokenHoldings(provider, address);
  //         // setUserHoldings(tokenRecevied)
  //         const balance = await provider.getBalance(address);
  //         setBalance();
  //         setWalletData({ provider, signer, address });
  //         localStorage.setItem("walletData", JSON.stringify({ address }));

  //         // Fetch balance and token holdings
  //       } else {
  //         handleDisconnect();
  //       }
  //     };

  //     const handleChainChange = async (chainId) => {
  //       // if (walletData?.address) {
  //       //   handleDisconnect(); // Disconnect wallet to prevent issues
  //       // }

  //       // Instead of full reload, try reconnecting
  //       setTimeout(() => {
  //         handleConnectWallet();
  //       }, 1000);
  //     };

  //     window.ethereum.on("accountsChanged", handleAccountChange);
  //     window.ethereum.on("chainChanged", handleChainChange);

  //     // Restore wallet if already connected
  //     const savedWallet = localStorage.getItem("walletData");
  //     if (savedWallet) {
  //       const { address } = JSON.parse(savedWallet);
  //       handleAccountChange([address]);
  //     }

  //     return () => {
  //       window.ethereum.removeListener("accountsChanged", handleAccountChange);
  //       window.ethereum.removeListener("chainChanged", handleChainChange);
  //     };
  //   }
  // }, []);

  return (
    <>
      <MaterialModal
        open={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",

            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: "rgb(0, 0, 0)",
              lineHeight: "22px",
              mb: 2,
            }}
          >
            Connect Wallet
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              width: "80%",
              border: "1px solid lightgray", // Light gray border
              borderRadius: "12px", // Rounded corners
              padding: "8px 12px", // Optional padding for better spacing
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {" "}
              <img
                src={mataMaskImage}
                width="20%"
                alt="MetaMask"
                style={{
                  transition: "opacity 0.3s ease",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  fontSize: "12px",
                  fontWeight: 800,
                  color: "rgb(40, 13, 95)",
                  lineHeight: "18px",
                  ml: 1,
                }}
              >
                MetaMask
              </Typography>
            </Box>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#C2B5E2",
                color: "black",
                textTransform: "none",
                borderRadius: "20px",
                fontSize: "10px", // Smaller font size
                padding: "4px 10px", // Reduced padding
                minWidth: "auto", // Prevents unnecessary width expansion
                "&:hover": {
                  backgroundColor: "#b5a5d2",
                },
              }}
              // onClick={handleConnectWallet}
            >
              Connect
            </Button>
          </Box>

          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              color: "rgb(122, 110, 170)",
              lineHeight: "21px",
              width: "85%",
              mb: 3,
            }}
          >
            Currently, we only support MetaMask for wallet connection. If you
            don't have a MetaMask wallet, you can create one by clicking the
            button below.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#C2B5E2",
              color: "black",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "20px",
              padding: "8px 16px",
              "&:hover": {
                backgroundColor: "#b5a5d2",
              },
            }}
            endIcon={<OpenInNewIcon fontSize="small" />}
            onClick={() =>
              window.open("https://metamask.io/download/", "_blank")
            }
          >
            Learn How to Connect
          </Button>
        </Box>
      </MaterialModal>
      <header className="main-header header-style-one">
        <div
          className="header-upper"
          style={{ backgroundColor: getBackgroundColor() }}
        >
          <div className="auto-container header-container" style={headerStyles}>
            <div className="inner-container clearfix">
              <div className="logo-box">
                <div className="logo">
                  <a
                    onClick={() => {
                      navigate("/");
                      setShowLandingSaction(true);
                    }}
                    title="IVest Club"
                  >
                    <img
                      src={logo}
                      alt="IVest Club"
                      title=""
                      className="header-logo-img"
                    />
                  </a>
                </div>
              </div>

              <div className="nav-outer clearfix d-flex justify-content-center align-items-center">
                {/* <div className="mobile-nav-toggler">
                                    <span className="icon flaticon-menu-1"></span>
                                </div> */}

                <nav className="main-menu navbar-expand-md navbar-light mr-3">
                  <div
                    className="collapse navbar-collapse show clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation clearfix">
                      <li
                        className={
                          location.pathname == "/"
                            ? "current dropdown "
                            : "dropdown "
                        }
                      >
                        <HeaderLink
                          text="Home"
                          onClick={() => {
                            navigate("/");
                            setShowLandingSaction(true);
                          }}
                        />
                      </li>
                      <li
                        className={
                          location.pathname == "/About"
                            ? "current dropdown "
                            : "dropdown "
                        }
                      >
                        <HeaderLink
                          text="About Us"
                          onClick={() => {
                            navigate("/About");
                          }}
                        />
                      </li>
                      <li
                        className={
                          location.pathname == "/token"
                            ? "current dropdown "
                            : "dropdown "
                        }
                      >
                        <HeaderLink
                          text="Tokens"
                          onClick={() => {
                            navigate("/token");
                          }}
                        />
                      </li>
                      <li
                        className={
                          location.pathname == "/Membership"
                            ? "current dropdown "
                            : "dropdown "
                        }
                      >
                        <HeaderLink
                          text="Membership Club"
                          onClick={() => {
                            navigate("/Membership");
                          }}
                        />
                      </li>
                      <li
                        className={
                          location.pathname == "/shop"
                            ? "current dropdown "
                            : "dropdown "
                        }
                      >
                        <HeaderLink
                          text="Shop"
                          onClick={() => {
                            navigate(
                              userData?.access_token ? "/Dashboard" : "/shop"
                            );
                          }}
                        />
                        {/* <HeaderLink
                          text="Shop"
                          onClick={() => {
                            navigate("/shop");
                            
                          }}
                        /> */}
                      </li>
                      {/* <li
                        className={
                          location.pathname == "/warsandconflict"
                            ? "current dropdown "
                            : "dropdown "
                        }
                      >
                        <a>Past Wars</a>
                        <ul>
                          <li>
                            <a
                              onClick={() => {
                                console.log("location.pathname",location.pathname);
                                // setmainLoader(true)
                                // getData(`/get-war-data/${0}`);
                                navigate("/");
                                
                              }}
                            >
                              Past Wars
                            </a>
                          </li>

                          <li>
                            <a
                              onClick={() => {
                                navigate("/");
                               
                              }}
                            >
                              Current Wars
                            </a>
                          </li>
                        </ul>
                      </li> */}

                      <li
                        className={
                          location.pathname == "/manifesto"
                            ? "current dropdown "
                            : "dropdown "
                        }
                      >
                        <HeaderLink
                          text="Blog"
                          onClick={() => {
                            navigate("/Blog");
                          }}
                        />
                      </li>
                      <li
                        className={
                          location.pathname == "/manifesto"
                            ? "current dropdown "
                            : "dropdown "
                        }
                      >
                        <HeaderLink
                          text="Contact Us"
                          onClick={() => {
                            navigate("/ContactUs");
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                </nav>

                <>
                  {/* <div className="px-2 d-none d-xl-flex">
                    <span
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Tooltip on top"
                    >
                      {showSearchInput && (
                        <TextField
                          type="text"
                          size="small"
                          // variant="underlined"
                          value={"Search will available soon"}
                          sx={{
                            backgroundColor: "transparent",
                            // borderRadius: 10,
                            width: "80vh",
                            borderBottom: "1px solid #fff",
                          }}
                          InputProps={{
                            sx: {
                              // fontSize: 9,
                              color: "#ffffff",
                            },
                          }}
                        />
                      )}
                      <SearchIcon
                        sx={{
                          color: "#fff",
                          cursor: "pointer",
                          mt: showSearchInput ? 0.5 : 0,
                        }}
                        onClick={() => {
                          setShowSearchInput(!showSearchInput);
                        }}
                      />
                    </span>
                  </div> */}
                  <div className="px-2 d-none d-xl-flex">
                    <Tooltip
                      title="Search will be available soon"
                      open={showTooltip}
                      onClose={() => setShowTooltip(false)}
                      disableHoverListener
                    >
                      <span>
                        <SearchIcon
                          sx={{ color: "#fff", cursor: "pointer" }}
                          onClick={handleClick}
                        />
                      </span>
                    </Tooltip>
                  </div>
                </>

                {/*This is Conditional rendering based on authentication */}

                {userData?.access_token ? (
                  <>
                  
                    {/* <CustomConnectWallet />  */}
                 
                  <ConnectWallet
                    detailsBtn={false}
                    hideBalance={true}
                    style={{
                      minWidth: '140px',
                      borderRadius: '50px',
                      fontSize: '12px',
                      backgroundColor: '#F7B138'
                    }}
                  />
                
                    {/* <div
                      className="donate-link"
                      style={{ position: "relative", display: "inline-block" }}
                      onMouseEnter={() => {
                        if (walletData.address) setWalletMenuOpen(true);
                      }}
                      onMouseLeave={() => {
                        if (walletData.address) setWalletMenuOpen(false);
                      }}
                    >
                      <a
                        className="theme-btn btn-style-one"
                        onClick={() => {
                          if (!walletData.address) handleWalletOpen(); // Call connect only if NOT connected
                        }}
                        style={{
                          textDecoration: "none",
                          fontSize: "12px",
                          fontWeight: "500",
                          fontFamily: "'Poppins',sans-serif",
                          cursor: "pointer",
                        }}
                      >
                        <span className="btn-title">
                          {walletData?.address
                            ? formatAddress(walletData.address)
                            : "Connect Wallet"}
                          {walletData.address && (
                            <ArrowDropDownIcon sx={{ ml: 1 }} />
                          )}
                        </span>
                      </a>

                      {walletMenuOpen && walletData.address && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            right: 0,
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            borderRadius: "8px",
                            marginTop: "2px",
                            zIndex: 999,
                            minWidth: "180px",
                            padding: "10px",
                          }}
                        >
                          <div
                            style={{
                              padding: "10px",
                              borderBottom: "1px solid #eee",
                              fontSize: "14px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                            }}
                            onClick={handleCopy}
                          >
                            {copied ? (
                              <CheckCircleIcon
                                sx={{ fontSize: 18, mr: 1, color: "green" }}
                              />
                            ) : (
                              <ContentCopyIcon sx={{ fontSize: 18, mr: 1 }} />
                            )}
                            {copied ? "Copied!" : "Copy Address"}
                          </div>
                          <div
                            style={{
                              padding: "10px",
                              fontSize: "14px",
                              cursor: "pointer",
                              color: "red",
                            }}
                            onClick={() => {
                              handleDisconnect();
                            }}
                          >
                            <LogoutIcon sx={{ fontSize: 18, mr: 1 }} />
                            Disconnect
                          </div>
                        </div>
                      )}
                    </div> */}
                    <div className="px-2">
                      <NotificationsOutlinedIcon sx={{ color: "#fff" }} />
                    </div>
                    <div
                      className="mx-3"
                      style={{
                        padding: "3px",
                        backgroundColor: "#282A35",
                        borderRadius: "200px",
                        cursor: "pointer",
                      }}
                      onMouseEnter={() => {
                        setAccountMenuOpen(true);
                      }}
                      onMouseLeave={() => {
                        setAccountMenuOpen(false);
                      }}
                    >
                      <AccountCircleOutlinedIcon sx={{ color: "#fff" }} />
                      {accountMenuOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "87%",
                            right: 0,
                            backgroundColor: "#fff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            borderRadius: "8px",
                            // marginTop: "2px",
                            zIndex: 999,
                            minWidth: "130px",
                            padding: "10px",
                          }}
                        >
                          <div
                            style={{
                              padding: "10px",
                              borderBottom: "1px solid #eee",
                              fontSize: "14px",
                              cursor: "pointer",
                            }}
                            onClick={() => navigate("/Dashboard")}
                          >
                            <AccountCircleOutlinedIcon
                              sx={{ color: "#000", fontSize: 18, mr: 1 }}
                            />
                            Profile
                          </div>
                          <div
                            style={{
                              padding: "10px",
                              fontSize: "14px",
                              cursor: "pointer",
                              color: "red",
                            }}
                            onClick={() => {
                              handleLogout();
                              handleDisconnect();
                              setAccountMenuOpen(false);
                            }}
                          >
                            <LogoutIcon sx={{ fontSize: 18, mr: 1 }} />
                            Logout
                          </div>
                        </div>
                      )}
                    </div>
                    &nbsp;
                  </>
                ) : (
                  <>
                    <nav className="main-menu navbar-expand-md navbar-light mr-3">
                      <div
                        className="collapse navbar-collapse show clearfix"
                        id="navbarSupportedContent"
                      >
                        <ul className="navigation clearfix">
                          <li
                            className={
                              location.pathname == "/Login"
                                ? "current dropdown "
                                : "dropdown "
                            }
                          >
                            <HeaderLink
                              text="Login"
                              onClick={() => {
                                navigate("/Login");
                              }}
                            />
                          </li>
                        </ul>
                      </div>
                    </nav>

                    <div className="donate-link">
                      <a
                        onClick={() => navigate("/SignUp")}
                        className="theme-btn btn-style-one"
                        style={{
                          textDecoration: "none",
                          fontSize: "12px",
                          fontWeight: "500",
                          fontFamily: "'Poppins',san-serif",
                        }}
                      >
                        <span className="btn-title">Register</span>
                      </a>
                    </div>
                  </>
                )}
                <MobileDrawer
                  isAuthenticated={userData?.access_token}
                  setIsAuthenticated={setUserData}
                  handleLogout={handleLogout}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-menu">
          <div className="menu-backdrop"></div>
          <div className="close-btn">
            <span className="icon flaticon-cancel"></span>
          </div>
          <nav className="menu-box">
            <div className="nav-logo">
              <a href="index-2.html">
                <img src={logo} alt="" title="" />
              </a>
            </div>
            <div className="menu-outer"></div>
            <div className="social-links">
              <ul className="clearfix">
                <li>
                  <a href="#">
                    <span className="fab fa-twitter"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="fab fa-facebook-square"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="fab fa-pinterest-p"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="fab fa-instagram"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="fab fa-youtube"></span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <section></section>
    </>
  );
};

export default Header;
