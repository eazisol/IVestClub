import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // ✅ Icon for copied status
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { SactionContainer } from "../Common/Containers";
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import ProfileCard from "../Dashboard/ProfileCard";
import { CircularProgress, IconButton, Box, Link } from "@mui/material";
import { baseUrl } from "../../../apiConfig";

// Function to get status color
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "token-sent":
      return "#198754"; // Bootstrap Green
    case "completed":
      return "#FFC107"; // Bootstrap Yellow
    case "created":
      return "#FFC107"; // Bootstrap Yellow
    case "unpaid":
      return "#6C757D"; // Bootstrap Gray
    case "paid":
      return "#198754"; // Bootstrap Green
    default:
      return "#DC3545"; // Bootstrap Red (Default for unknown statuses)
  }
};



// Function to format status text to Title Case
const formatStatus = (status) => {
  if (!status) return "Unknown";

  if (status === "Token-Sent") return "Sent"; // Special case for Token-Sent

  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

// Function to check if a value is valid
const isValidValue = (text) => {
  return (
    text && text !== "N/A" && text !== "" && text !== null && text !== undefined
  );
};

// Function to shorten long text fields (Txn ID, TX Hash)
const shortenText = (text) => {
  if (!isValidValue(text) || text.length < 10) return text;
  return `${text.substring(0, 2)}**${text.substring(text.length - 3)}`;
};

// Sepolia Etherscan base URL
const SEPOLIA_ETHERSCAN_URL = "https://sepolia.etherscan.io/tx/";

export const TransactionHistory = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState({}); // State to track copied status

  useEffect(() => {
    setLoading(true);
    const getTransactionHistory = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData")); // Retrieve and parse user data
        const userId = userData?.user_id; // Get user_id
        const { data } = await axios.get(
          `${baseUrl}coinpayments/getAllTransactions`
        );
        // Filter transactions based on the logged-in user's ID
        const filteredTransactions =
          data?.data?.filter((transaction) => transaction.user_id === userId) ||
          [];
        setTransactionData(filteredTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    getTransactionHistory();
  }, []);

  // Create a memoized reversed version of the data to prevent re-sorting on each render
  const reversedData = useMemo(() => {
    return [...(transactionData || [])].reverse();
  }, [transactionData]);

  // Function to copy text to clipboard and show "Copied!" - using useCallback to ensure stability
  const copyToClipboard = useCallback((text, id) => {
    if (!isValidValue(text)) return;

    // Use a textarea element as a fallback method for clipboard copy
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        // Create a new object instead of modifying the existing one
        setCopied((prevState) => ({
          ...prevState,
          [id]: true,
        }));

        setTimeout(() => {
          setCopied((prevState) => ({
            ...prevState,
            [id]: false,
          }));
        }, 2000);
      } else {
        console.error("Failed to copy text");
      }
    } catch (err) {
      console.error("Error copying text: ", err);
    }

    document.body.removeChild(textarea);
  }, []);

  return (
    <SactionContainer container={false}>
      <div className="w-100 mt-5 mb-3 pt-5 pl-3">
        <h3 className="dashHead mt-2 mb-3 pb-1">Dashboard</h3>
      </div>
      <div className="w-100 mb-5 pb-5">
        <div className="row mb-5">
          <div className="col-lg-3 col-md-12 p-0 col-sm-12 mb-4">
            <ProfileCard />
          </div>
          <div className="col-lg-9 col-md-12 col-sm-12">
            <div className="card card-border-c p-3">
             
                
                  <div className=" mb-3 " style={{fontWeight: "bold", fontSize: "20px"}}>
                    Transaction History
                  </div>
              
          
              <div className="section2">
                <TableContainer
                  className="tableContainer"
                  sx={{ maxHeight: 400, overflow: "auto" }}
                >
                  <Table className="tableText" sx={{ minWidth: 650 }}>
                    <TableHead className="tHead">
                      <TableRow>
                        {[
                          "Txn ID",
                          "Status",
                          "USD Amount",
                          "Token",
                          "Token Amount",
                          "Wallet",
                          "TX Hash",
                          "Created At",
                        ].map((header) => (
                          <TableCell
                            key={header}
                            align="center"
                            className="pb-0 availNum"
                            sx={{
                              position: "sticky",
                              top: 0,
                              backgroundColor: "#fff",
                              fontSize:"14px !important"
                            }}
                          >
                            {header}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            <CircularProgress />
                          </TableCell>
                        </TableRow>
                      ) : reversedData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            <span className="tableHeadText">
                              No Transaction History
                            </span>
                          </TableCell>
                        </TableRow>
                      ) : (
                        reversedData.map((row, index) => {
                          let fullDate = row?.created_at
                            ? new Date(row.created_at).toLocaleString("en-GB")
                            : "N/A";
                          let shortDate = row?.created_at
                            ? new Date(row.created_at).toLocaleDateString(
                                "en-GB"
                              )
                            : "N/A";

                          return (
                            <TableRow key={`row-${index}`} className="tableRow">
                              <TableCell align="center">
                                {isValidValue(row?.transaction_id) ? (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      flexWrap: "nowrap"

                                    }}
                                  >
                                    <Tooltip
                                      title={row.transaction_id}
                                      placement="top"
                                    >
                                      <span className="tableHeadText">
                                        {shortenText(row.transaction_id)}
                                      </span>
                                    </Tooltip>

                                    <Tooltip title="Copy Transaction ID">
                                      <IconButton
                                        size="small"
                                        onClick={() =>
                                          copyToClipboard(
                                            row.transaction_id,
                                            `txid-${index}`
                                          )
                                        }
                                        sx={{ ml: 1 }}
                                      >
                                        {copied[`txid-${index}`] ? (
                                          <CheckCircleIcon
                                            color="success"
                                            fontSize="small"
                                          />
                                        ) : (
                                          <ContentCopyIcon fontSize="small" />
                                        )}
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                ) : (
                                  <span className="tableHeadText"> N/A</span>
                                )}
                              </TableCell>
                            
                              <TableCell
                                align="center"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  justifyContent: "center",
                                  borderBottom: "0px",
                                  marginTop: "12px",
                                }}
                              >
                                <Box
                                  sx={{
                                    backgroundColor: getStatusColor(
                                      row?.status
                                    ),
                                    color: "#fff",
                                    padding: "2px 5px",
                                    borderRadius: "10px",
                                    fontSize: "10px",
                                  }}
                                >
                                  {formatStatus(row?.status)}
                                </Box>
                                {row?.status !== "Token-Sent" && (
                                  <Tooltip title="Token transfer process could take upto 1 hour.Once the token is sent, the status will be updated to 'Sent'">
                                    <InfoOutlinedIcon
                                      sx={{ fontSize: 14, cursor: "pointer" }}
                                    />
                                  </Tooltip>
                                )}
                              </TableCell>
                              <TableCell align="center">
                                <span className="tableHeadText">
                                  {parseFloat(row?.amount_usdt || 0).toFixed(2)}
                                </span>
                              </TableCell>
                              <TableCell align="center">
                                <span className="tableHeadText">
                                  {row?.token_name}
                                </span>
                              </TableCell>
                              <TableCell align="center">
                                <span className="tableHeadText">
                                  {parseFloat(row?.amount_token || 0).toFixed(
                                    2
                                  )}
                                </span>
                              </TableCell>
                              <TableCell align="center">
                                {isValidValue(row?.user_wallet_address) ? (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Tooltip
                                      title={row.user_wallet_address}
                                      placement="top"
                                    >
                                      <span className="tableHeadText">
                                        {shortenText(row.user_wallet_address)}
                                      </span>
                                    </Tooltip>

                                    <Tooltip title="Copy Wallet Address">
                                      <IconButton
                                        size="small"
                                        onClick={() =>
                                          copyToClipboard(
                                            row.user_wallet_address,
                                            `walletAddress-${index}`
                                          )
                                        }
                                        sx={{ ml: 1 }}
                                      >
                                        {copied[`walletAddress-${index}`] ? (
                                          <CheckCircleIcon
                                            color="success"
                                            fontSize="small"
                                          />
                                        ) : (
                                          <ContentCopyIcon fontSize="small" />
                                        )}
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                ) : (
                                  <span className="tableHeadText"> N/A</span>
                                )}
                              </TableCell>
                              <TableCell align="center">
                                {isValidValue(row?.tx_hash) ? (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Tooltip
                                      title={row.tx_hash}
                                      placement="top"
                                    >
                                      <Link
                                        href={`${SEPOLIA_ETHERSCAN_URL}${row.tx_hash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        underline="hover"
                                        sx={{
                                          cursor: "pointer",
                                          color: "primary.main",
                                          display: "inline-block",
                                        }}
                                        className="tableHeadText"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        {shortenText(row.tx_hash)}
                                      </Link>
                                    </Tooltip>

                                    <Tooltip title="Copy TX Hash">
                                      <IconButton
                                        size="small"
                                        onClick={() =>
                                          copyToClipboard(
                                            row.tx_hash,
                                            `txhash-${index}`
                                          )
                                        }
                                        sx={{ ml: 1 }}
                                      >
                                        {copied[`txhash-${index}`] ? (
                                          <CheckCircleIcon
                                            color="success"
                                            fontSize="small"
                                          />
                                        ) : (
                                          <ContentCopyIcon fontSize="small" />
                                        )}
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                ) : (
                                  <span className="tableHeadText">N/A</span>
                                )}
                              </TableCell>
                              <TableCell align="center">
                                <Tooltip title={fullDate} placement="top">
                                  <span className="tableHeadText">
                                    {shortDate}
                                  </span>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SactionContainer>
  );
};
