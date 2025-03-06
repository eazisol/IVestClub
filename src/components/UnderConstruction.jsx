import React from "react";
import { GiCargoCrane } from "react-icons/gi";

const UnderConstruction = () => {
  return (
    <div className="d-flex justify-content-center text-center align-items-center" style={{ marginTop: "190px", height: "20em" }}>
 
     <GiCargoCrane size={"5em"} />
      <h1 className="mb-4 text-bold mt-5 w-auto ml-3">
        <>Page under construction</>
      </h1>
    </div>
  );
};

export default UnderConstruction;
