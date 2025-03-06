import React from "react";
import { BiError } from "react-icons/bi";
const ErrorPage = () => {
  return (
    <div className="d-flex justify-content-center text-center align-items-center" style={{ marginTop: "190px", height: "20em" }}>
 
     <BiError size={"5em"} />
      <h1 className=" text-bold  w-auto ml-3">
        <>Page Not Found</>
      </h1>
    </div>
  );
};

export default ErrorPage