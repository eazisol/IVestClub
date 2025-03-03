import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { SactionContainer } from "../Common/Containers";
import { Ethereum, Bitcoin, Usdt, IVC } from "../Common/CurrencyIcons";
import { useEffect, useState } from "react";
import axios from "axios";
import { appData } from "../Context/AppContext";
import ProfileCard from "../Dashboard/ProfileCard";
import { CircularProgress } from "@mui/material";
import { baseUrl } from "../../../apiConfig";


export const TransactionHistory = () => {
  const { userData } = appData();
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const gettranscationHistory = async () => {
      const { data } = await axios.get(
        `${baseUrl}coinpayments/getAllTransactions?user_id=${userData?.user_id}`
      );
      setTransactionData(data?.data);
      setLoading(false);
    };
    gettranscationHistory();
  }, []);

  return (
    <SactionContainer container={false}>
      <div className="w-100 mt-5  mb-3 pt-5 pl-3">
        <h3 className="dashHead mt-2 mb-3 pb-1">Dashboard</h3>
      </div>
      <div className="w-100 mb-5 pb-5">
        <div className="row mb-5">
          <div className="col-lg-3 col-md-12 p-0 col-sm-12 mb-4">
            <ProfileCard />
          </div>
          <div className="col-lg-9 col-md-12  col-sm-12">
            <div className="card card-border-c p-3">
              <div className="row justify-content-between mx-0 p-3">
                <div className="currency">
                  <div className="currName mb-3">Transaction History</div>
                </div>
              </div>
              <div className="section2">
                <TableContainer className="tableContainer"  sx={{ maxHeight: 400, overflow: 'auto' }}>
                  <Table className="tableText" sx={{ minWidth: 650 }}>
                    <TableHead className="tHead">
                      <TableRow>
                        <TableCell className="pb-0  availNum" sx={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>
                          S.N
                          {/* <i className="fa-solid fa-up-down sortIcon"></i> */}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="pb-0 availNum"
                          sx={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}
                        >
                          Status
                          {/* <i className="fa-solid fa-up-down sortIcon"></i> */}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="pb-0 availNum"
                          sx={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}
                        >
                          USDT Amount
                          {/* <i className="fa-solid fa-up-down sortIcon"></i> */}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="pb-0 availNum"
                          sx={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}
                        >
                          Token Amount
                          {/* <i className="fa-solid fa-up-down sortIcon"></i> */}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="pb-0 availNum"
                          sx={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}
                        >
                          Transcation ID
                          {/* <i className="fa-solid fa-up-down sortIcon"></i> */}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="pb-0 availNum"
                          sx={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}
                        >
                          TX.Hash
                          {/* <i className="fa-solid fa-up-down sortIcon"></i> */}
                        </TableCell>
                        <TableCell
                          align="center"
                          className="pb-0 availNum"
                          sx={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}
                        >
                          Created
                          {/* <i className="fa-solid fa-up-down sortIcon"></i> */}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            <CircularProgress />
                          </TableCell>
                        </TableRow>
                      ) : transactionData.length ===0 ? (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                          
                            <span className="tableHeadText">   No Transactions History </span>
                          </TableCell>
                        </TableRow>
                      ) : (
                        transactionData.map((row, index) => {
                          let date = new Date(row?.created_at);
                          let formattedDate = date.toLocaleDateString("en-GB");

                          return (
                            <TableRow key={index} className="tableRow">
                              <TableCell component="th" scope="row">
                                <span className="tableHeadText"> {index + 1} </span>
                              </TableCell>
                              <TableCell align="start">
                                <span className="tableHeadText">
                                  {parseFloat(row?.amount_usdt).toFixed(2)}
                                </span>
                              </TableCell>
                              <TableCell align="start">
                                <span className="tableHeadText">
                                  {parseFloat(row?.amount_token).toFixed(2)}
                                </span>
                              </TableCell>
                              <TableCell align="start">
                                <span className="tableHeadText">{row?.status}</span>
                              </TableCell>
                              <TableCell align="start">
                                <span className="tableHeadText">
                                  {row?.transaction_id}
                                </span>
                              </TableCell>
                              <TableCell align="start">
                                <span className="tableHeadText">
                                  {row?.tx_hash &&
                                  typeof row.tx_hash === "string" ? (
                                    <>
                                      {row.tx_hash.substring(
                                        0,
                                        row.tx_hash.length / 2
                                      )}
                                      <br />
                                      {row.tx_hash.substring(
                                        row.tx_hash.length / 2
                                      )}
                                    </>
                                  ) : (
                                    "N/A"
                                  )}
                                </span>
                              </TableCell>
                              <TableCell align="start">
                                <span className="tableHeadText">
                                  {formattedDate}
                                </span>
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
