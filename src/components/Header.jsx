import React, { useState, useEffect } from "react";
import logo from "../../src/assets/images/HeaderLogo.png";
import { useNavigate, useLocation } from "react-router-dom";
import MobileDrawer from "./MobileDrawer";
import { appData } from "./Context/AppContext";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { CustomizedTooltips, HeaderLink } from "./Common/MiniComponents";
import { TextField } from "@mui/material";
import { ethers } from "ethers";
import { baseUrl } from "../../apiConfig";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import MaterialModal from "./Common/MaterialModal";
import mataMaskImage from "../../src/assets/images/MataMask.png";
import { Button, Box, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
const Header = ({ setShowSearchInput, showSearchInput }) => {
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
  } = appData();
  const [isScrolled, setIsScrolled] = useState(false);
  const { setShowLandingSaction } = appData();
  const [headerStyles, setHeaderStyles] = useState({});
  const [walletMenuOpen, setWalletMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [tokenHoldings, setTokenHoldings] = useState(null);
  const [walletModalOpen, setWalletModalOpen] = useState(false);

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
  const fetchTokenHoldings = async (provider, address) => {
    try {
      const tokenHoldings = [];

      // ERC-20 Token Contract Addresses on Sepolia Testnet
      const tokens = [
        { name: "iVT", address: "0xB34c841F79c2626260cd1657c9f5c10Be4339D1B" },
        { name: "iSPX", address: "0x324d720f13764d6BE02ef1329D6a3e4dd8ec1e64" },
      ];

      const erc20Abi = [
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
      ];

      for (const token of tokens) {
        const contract = new ethers.Contract(token.address, erc20Abi, provider);
        const balance = await contract.balanceOf(address);
        const decimals = await contract.decimals();

        const formattedBalance = ethers.utils.formatUnits(balance, decimals);

        tokenHoldings.push({
          name: token.name,
          balance: formattedBalance,
        });

        // console.log(`Token: ${token.name}, Balance: ${formattedBalance}`);
      }

      setTokenHoldings(tokenHoldings); // Update state with token holdings
      localStorage.setItem("tokenHoldings", JSON.stringify(tokenHoldings)); // Save to localStorage
    } catch (error) {
      console.error("Error fetching token holdings:", error);
    }
  };

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
      // Always ask user for confirmation
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      let network = await provider.getNetwork();

      // Ensure user is on Sepolia Testnet
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

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);

      // Set ETH balance and wallet data
      setWalletData({ provider, signer, address });

      // Fetch token holdings
      await fetchTokenHoldings(provider, address);
      const savetokenHoldingsdWallet = JSON.parse(
        localStorage.getItem("tokenHoldings")
      );
      setBalance(savetokenHoldingsdWallet);
      setWalletModalOpen(false);
      // setBalance(tokenHoldings?.[0]?.balance);
    } catch (err) {
      setError(err.message);
      // setSnackBarData({
      //   visibility: true,
      //   error: "error",
      //   text: err.message,
      // });
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      // Clear state values
      setWalletData({});
      setBalance("0.0");
      setTokenHoldings(null);

      // Remove wallet data from localStorage
      localStorage.removeItem("walletData");
      localStorage.removeItem("tokenHoldings");

      // MetaMask workaround: Reset provider (optional)
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleConnectWallet);
        window.ethereum.removeListener("chainChanged", handleConnectWallet);
      }

      // Force MetaMask to require user confirmation next time
      window.ethereum
        .request({
          method: "wallet_revokePermissions",
          params: [{ eth_accounts: {} }],
        })
        .catch((err) =>
          console.log("Ignore if MetaMask doesn't support this:", err)
        );

      // Optionally reload to ensure clean state
      window.location.reload();
    } catch (error) {
      console.error("Error disconnecting:", error);
    }
  };

  // useEffect to handle wallet connection updates when the account or chain changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        handleConnectWallet();
      });
      window.ethereum.on("chainChanged", () => {
        handleConnectWallet();
      });
    }
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountChange = async (accounts) => {
        if (accounts.length > 0) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();

          setWalletData({ provider, signer, address });
          localStorage.setItem("walletData", JSON.stringify({ address }));

          // Fetch balance and token holdings
          const balance = await provider.getBalance(address);
          fetchTokenHoldings(provider, address);
          setBalance();
        } else {
          handleDisconnect();
        }
      };

      const handleChainChange = async (chainId) => {
        console.log("Network changed to:", chainId);

        if (walletData?.address) {
          handleDisconnect(); // Disconnect wallet to prevent issues
        }

        // Instead of full reload, try reconnecting
        setTimeout(() => {
          handleConnectWallet();
        }, 1000);
      };

      window.ethereum.on("accountsChanged", handleAccountChange);
      window.ethereum.on("chainChanged", handleChainChange);

      // Restore wallet if already connected
      const savedWallet = localStorage.getItem("walletData");
      if (savedWallet) {
        const { address } = JSON.parse(savedWallet);
        handleAccountChange([address]);
      }

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
        window.ethereum.removeListener("chainChanged", handleChainChange);
      };
    }
  }, []);

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
              onClick={handleConnectWallet}
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
                  <div className="px-2 d-none d-xl-flex">
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
                  </div>
                </>

                {/*This is Conditional rendering based on authentication */}

                {userData?.access_token ? (
                  <>
                    <div
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
                          {walletData.address
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
                            }}
                            onClick={() => {
                              if (
                                navigator.clipboard &&
                                navigator.clipboard.writeText
                              ) {
                                navigator.clipboard
                                  .writeText(walletData.address)
                                  .then(() => {});
                              } else {
                                // Fallback for older browsers
                                const textArea =
                                  document.createElement("textarea");
                                textArea.value = walletData.address;
                                document.body.appendChild(textArea);
                                textArea.select();
                                document.execCommand("copy");
                                document.body.removeChild(textArea);
                              }
                            }}
                          >
                            <ContentCopyIcon sx={{ fontSize: 18, mr: 1 }} />
                            Copy Address
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
                    </div>
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

      <section>
     
      </section>
    </>
  );
};

export default Header;
