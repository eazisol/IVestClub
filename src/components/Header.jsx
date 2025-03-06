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

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 2)}...${address.slice(-4)}`;
  };
  // const handleCopyAddress = () => {
  //   if (walletData?.address) {
  //     navigator.clipboard.writeText(walletData.address);

  //   }
  // };
  const handleDisconnect = () => {
    localStorage.removeItem("walletData");
    setWalletData({});
  };
  // Function to fetch token balances
const fetchTokenHoldings = async (provider, address) => {
  const tokenHoldings = [];

  // ERC-20 Token Contract Addresses on Sepolia Testnet
  const tokens = [
    { name: "iVT", address: "0xYour_iVT_Token_Address_Here" },
    { name: "iSPX", address: "0xYour_iSPX_Token_Address_Here" }
  ];

  const erc20Abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)"
  ];

  for (const token of tokens) {
    const contract = new ethers.Contract(token.address, erc20Abi, provider);
    const balance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    
    tokenHoldings.push({
      name: token.name,
      balance: ethers.utils.formatUnits(balance, decimals)
    });
  }

  // Store token holdings in state
  // setTokenHoldings(tokenHoldings);
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
  // This function is responsible for connecting the user's wallet and ensuring the correct network is selected.
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
      // Check if wallet is already connected

      // Check if user is on Sepolia
      if (network.chainId !== 11155111) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }], // Sepolia Testnet Chain ID in hex
        });
        // Wait for the network change event
        await new Promise((resolve) =>
          window.ethereum.on("chainChanged", resolve)
        );
        // Reinitialize provider after switching
        provider = new ethers.providers.Web3Provider(window.ethereum);
        network = await provider.getNetwork();
      }
      // Ensure we are now on Sepolia
      if (network.chainId !== 11155111) {
        throw new Error(
          "Failed to switch to Sepolia Testnet. Please switch manually in MetaMask."
        );
      }
      // Request user accounts
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
      const walletInfo = { address };
      setWalletData({ provider, signer, address });
      localStorage.setItem("walletData", JSON.stringify(walletInfo));
    } catch (err) {
      setError(err.message);
      setSnackBarData({
        visibility: true,
        error: "error",
        text: err.message,
      });
    } finally {
      setLoading(false);
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
  return (
    <>
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
                         {/* <HeaderLink
                          text="Shop"
                          onClick={() => {
                            navigate(userData?"/Dashboard":"/Login");
                          }}
                        /> */}
                        <HeaderLink
                          text="Shop"
                          onClick={() => {
                            navigate("/shop");
                            
                          }}
                        />
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
                      {showSearchInput && (
                        <TextField
                          type="text"
                          size="small"
                          value={"Search will available soon"}
                          sx={{
                            backgroundColor: "#f5f5dc52",
                            borderRadius: 10,
                            width: "10em",
                          }}
                          InputProps={{
                            sx: {
                              fontSize: 9,
                              color: "#ffffff",
                            },
                          }}
                        />
                      )}
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
                          if (!walletData.address) handleConnectWallet(); // Call connect only if NOT connected
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
                              navigator.clipboard.writeText(walletData.address);
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
                            <AccountCircleOutlinedIcon sx={{ color: "#000",fontSize: 18, mr: 1 }} />
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
                              setAccountMenuOpen(false)
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
