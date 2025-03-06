import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // ✅ Icon for copied status

import { SactionContainer } from "../Common/Containers";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../Dashboard/ProfileCard";
import { CircularProgress, IconButton, Box } from "@mui/material";
import { baseUrl } from "../../../apiConfig";

// Function to get status color
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "#4CAF50"; // Green
    case "created":
      return "#FFC107"; // Yellow
    default:
      return "#2196F3"; // Blue (Default for unknown statuses)
  }
};

// Function to format status text to Title Case
const formatStatus = (status) => {
  if (!status) return "Unknown";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

// Function to check if a value is valid
const isValidValue = (text) => {
  return text && text !== "N/A" && text !== "" && text !== null && text !== undefined;
};

// Function to shorten long text fields (Txn ID, TX Hash)
const shortenText = (text) => {
  if (!isValidValue(text) || text.length < 10) return text;
  return `${text.substring(0, 4)}***${text.substring(text.length - 3)}`;
};

export const TransactionHistory = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState({}); // State to track copied status

  useEffect(() => {
    setLoading(true);
    const getTransactionHistory = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}coinpayments/getAllTransactions`);
        setTransactionData(data?.data || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    getTransactionHistory();
  }, []);

  // Function to copy text to clipboard and show "Copied!"
  const handleCopy = (text, id) => {
    if (!isValidValue(text)) return; // Prevent copying empty values

    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [id]: true })); // Show "Copied!"

    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [id]: false })); // Reset after 2 seconds
    }, 2000);
  };

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
              <div className="row justify-content-between mx-0 p-3">
                <div className="currency">
                  <div className="currName mb-3">Transaction History</div>
                </div>
              </div>
              <div className="section2">
                <TableContainer className="tableContainer" sx={{ maxHeight: 400, overflow: "auto" }}>
                  <Table className="tableText" sx={{ minWidth: 650 }}>
                    <TableHead className="tHead">
                      <TableRow>
                        {["S.N", "Txn ID", "Status", "USDT Amount", "Token Amount", "TX Hash", "Created At"].map(
                          (header) => (
                            <TableCell
                              key={header}
                              align="center"
                              className="pb-0 availNum"
                              sx={{ position: "sticky", top: 0, backgroundColor: "#fff" }}
                            >
                              {header}
                            </TableCell>
                          )
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            <CircularProgress />
                          </TableCell>
                        </TableRow>
                      ) : transactionData.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            <span className="tableHeadText">No Transaction History</span>
                          </TableCell>
                        </TableRow>
                      ) : (
                        transactionData.reverse().map((row, index) => {
                          let fullDate = row?.created_at ? new Date(row.created_at).toLocaleString("en-GB") : "N/A";
                          let shortDate = row?.created_at ? new Date(row.created_at).toLocaleDateString("en-GB") : "N/A";

                          return (
                            <TableRow key={index} className="tableRow">
                              <TableCell align="center">
                                <span className="tableHeadText">{index + 1}</span>
                              </TableCell>
                              <TableCell align="center">
                                {isValidValue(row?.transaction_id) ? (
                                  <Tooltip title={row.transaction_id} placement="top">
                                    <span className="tableHeadText">
                                      {shortenText(row.transaction_id)}
                                      <IconButton
                                        size="small"
                                        onClick={() => handleCopy(row.transaction_id, `txid-${index}`)}
                                      >
                                        {copied[`txid-${index}`] ? (
                                          <CheckCircleIcon color="success" fontSize="small" />
                                        ) : (
                                          <ContentCopyIcon fontSize="small" />
                                        )}
                                      </IconButton>
                                    </span>
                                  </Tooltip>
                                ) : (
                                  "N/A"
                                )}
                              </TableCell>
                              <TableCell align="center">
                                <Box
                                  sx={{
                                    backgroundColor: getStatusColor(row?.status),
                                    color: "#fff",
                                    padding: "5px 10px",
                                    borderRadius: "12px",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    display: "inline-block",
                                  }}
                                >
                                  {formatStatus(row?.status)}
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <span className="tableHeadText">{parseFloat(row?.amount_usdt || 0).toFixed(2)}</span>
                              </TableCell>
                              <TableCell align="center">
                                <span className="tableHeadText">{parseFloat(row?.amount_token || 0).toFixed(2)}</span>
                              </TableCell>
                              <TableCell align="center">
                                {isValidValue(row?.tx_hash) ? (
                                  <Tooltip title={row.tx_hash} placement="top">
                                    <span className="tableHeadText">
                                      {shortenText(row.tx_hash)}
                                      <IconButton
                                        size="small"
                                        onClick={() => handleCopy(row.tx_hash, `txhash-${index}`)}
                                      >
                                        {copied[`txhash-${index}`] ? (
                                          <CheckCircleIcon color="success" fontSize="small" />
                                        ) : (
                                          <ContentCopyIcon fontSize="small" />
                                        )}
                                      </IconButton>
                                    </span>
                                  </Tooltip>
                                ) : (
                                  "N/A"
                                )}
                              </TableCell>
                              <TableCell align="center">
                                <Tooltip title={fullDate} placement="top">
                                  <span className="tableHeadText">{shortDate}</span>
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