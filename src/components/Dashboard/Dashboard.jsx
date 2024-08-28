import React from "react";
import "./Dashboard.css";
// import "./App.css";

import CardActions from "@mui/joy/CardActions";

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

const rows = [
  createData({ name: "BTC", des: "Bitcoin" }, 3, " $4536", "Convert"),
  createData({ name: "ETH", des: "Ethereum" }, 6, " $4536", "Convert"),
  createData({ name: "USDT", des: "TetherUS" }, 1, " $4536", "Convert"),
  createData({ name: "BTC", des: "Bitcoin" }, 12, " $4536", "Convert"),
  createData({ name: "ETH", des: "Ethereum" }, 4, " $4536", "Convert"),
  createData({ name: "USDT", des: "TetherUS" }, 2, " $4536", "Convert"),
];

const Dashboard = () => {
  return (
    <SactionContainer>
      <div className="d-flex ">
        <h3 className="dashHead ml-3">
          Dashboard
        </h3>
      </div>
      <div className=" row">
        <div className=" col-md-3 col-sm-12">
          <ProfileCard />
        </div>
        <div className="col-sm-12 col-md-9">
          <div className="card card-border-c">
            <div className="row justify-content-between mx-0 p-3">
              <div className="currency">
                <div className="currName mb-3">My IVC Token Balance</div>
                <div className="currDetail row align-items-center">
                  <VectorIcon size={40} rounded={true} />
                  <h4 className="mb-0 pl-2">
                    {" "}
                    <strong className="currDigit">10.251469</strong>
                  </h4>
                  <p className="currDollar mt-2 LightText w-100 pl-3">$64,349.99</p>
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
                        Amount <i className="fa-solid fa-up-down sortIcon"></i>
                      </TableCell>
                      <TableCell align="right" className="pb-0 tableHeadText">
                        Action <i className="fa-solid fa-up-down sortIcon"></i>
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
                            &nbsp;<span className="tableCellText pop-font LightText bold-5"> {row.currObj.name}</span>
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
                            <u className="LightText actionText">{row.action}</u>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="row mt-3 p-3 ">
             
 
<div className="col-4">
<div className="card card-border-c mb-3">
                 <div className="card-body">
                    <div className="cardHeadText d-flex justify-content-between">
                      <div className="d-flex">
                       <div className="mt-1"> <IVC size={20} /></div>
                        <div className="token  ml-3">
                          
                           <p className="tokenText"> Ivest Club Token
                           <p className="text-basic">IVC</p> </p>
                          
                          
                        </div>
                      </div>

                      <div className="tokenText arrowIcon">
                        <i className="fa-solid fa-caret-up"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 p-0">
                        <div className="cardNumber mb-2 ">
                          $932343
                        </div>
                        <p className="card-text bold-5">+0.25 %</p>
                      </div>
                      <div className="col-6">
                       <MiniGraph size={50}/>
                      </div>
                    </div>
                  </div>
</div>
<div className="card card-border-c">
                 <div className="card-body">
                    <div className="cardHeadText d-flex justify-content-between">
                      <div className="d-flex">
                       <div className="mt-1"> <IVC size={20} /></div>
                        <div className="token  ml-3">
                          
                           <p className="tokenText"> Ivest Club Token
                           <p className="text-basic">IVC</p> </p>
                          
                          
                        </div>
                      </div>

                      <div className="tokenText arrowIcon">
                        <i className="fa-solid fa-caret-up"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 p-0">
                        <div className="cardNumber mb-2 ">
                          $932343
                        </div>
                        <p className="card-text bold-5">+0.25 %</p>
                      </div>
                      <div className="col-6">
                       <MiniGraph size={50}/>
                      </div>
                    </div>
                  </div>
</div>

</div>
                
<div className="col-8" >
                <div className=" card card-border-c">
                 <LargeGraph size={300} />
                </div>
              </div>


            </div>

            <div className="row mt-3 p-3  ">
             
            <div className="col-4 ">
            <div className="card card-border-c">
                 <div className="card-body">
                    <div className="cardHeadText d-flex justify-content-between">
                      <div className="d-flex">
                       <div className="mt-1"> <IVC size={20} /></div>
                        <div className="token  ml-3">
                          
                           <p className="tokenText"> Ivest Club Token
                           <p className="text-basic">IVC</p> </p>
                          
                          
                        </div>
                      </div>

                      <div className="tokenText arrowIcon">
                        <i className="fa-solid fa-caret-up"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 p-0">
                        <div className="cardNumber mb-2 ">
                          $932343
                        </div>
                        <p className="card-text bold-5">+0.25 %</p>
                      </div>
                      <div className="col-6">
                       <MiniGraph size={50}/>
                      </div>
                    </div>
                  </div>
</div>
                </div>
                <div className="col-4">
                <div className="card card-border-c">
                 <div className="card-body">
                    <div className="cardHeadText d-flex justify-content-between">
                      <div className="d-flex">
                       <div className="mt-1"> <IVC size={20} /></div>
                        <div className="token  ml-3">
                          
                           <p className="tokenText"> Ivest Club Token
                           <p className="text-basic">IVC</p> </p>
                          
                          
                        </div>
                      </div>

                      <div className="tokenText arrowIcon">
                        <i className="fa-solid fa-caret-up"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 p-0">
                        <div className="cardNumber mb-2 ">
                          $932343
                        </div>
                        <p className="card-text bold-5">+0.25 %</p>
                      </div>
                      <div className="col-6">
                       <MiniGraph size={50}/>
                      </div>
                    </div>
                  </div>
</div>
                </div>
                <div className="col-4 ">
                <div className="card card-border-c">
                 <div className="card-body">
                    <div className="cardHeadText d-flex justify-content-between">
                      <div className="d-flex">
                       <div className="mt-1"> <IVC size={20} /></div>
                        <div className="token  ml-3">
                          
                           <p className="tokenText"> Ivest Club Token
                           <p className="text-basic">IVC</p> </p>
                          
                          
                        </div>
                      </div>

                      <div className="tokenText arrowIcon">
                        <i className="fa-solid fa-caret-up"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 p-0">
                        <div className="cardNumber mb-2 ">
                          $932343
                        </div>
                        <p className="card-text bold-5">+0.25 %</p>
                      </div>
                      <div className="col-6">
                       <MiniGraph size={50}/>
                      </div>
                    </div>
                  </div>
</div>
                </div>


               

 
             
            </div>




            <div className="section4 rounded-3 m-4 p-4">
              <div className="text-center">
                
                  <div className="section4-head">Buy IVC</div>
                
              </div>
              <div className="currConverter ">
                <div className="converter1 mt-4">
                <div className="mb-1 con-head"> You Pay </div>
                  <div className="input-group mb-3">
                    
                    <div className="con-dropDown dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <Bitcoin /><span> BTC </span>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-dark">
                        <li>
                          <a className="dropdown-item active" href="#">
                            BTC
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            USDT
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            ETH
                          </a>
                        </li>
                      </ul>
                    </div>
                    <input
                      type="text"
                      className="form-control con-input"
                      aria-label="Text input with checkbox"
                    />
                  </div>
                
                </div>
                <div className="converter2 mt-4">
                  
                  <div className="con-head mb-1"> You Get </div>
                  
                  <div className="input-group mb-3">
                    <div>
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <IVC /> <span> IVC </span>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-dark">
                        <li>
                          <a className="dropdown-item active" href="#">
                            BTC
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            USDT
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            ETH
                          </a>
                        </li>
                      </ul>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Text input with checkbox"
                    />
                  </div>
                  
                </div>
              </div>
              <div className="convDes LightText" align="center">
                The price will be recalculated in 4.5s
              </div>
              <div className="conBtn">Buy Now</div>
            </div>
          </div>
        </div>
      </div>
    </SactionContainer>
  );
};

export default Dashboard;
