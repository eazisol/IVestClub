import React from "react";

export function LargeButton({ text, onClick = () => {} }) {
  return (
    <button className="btn btn-primary btn-rounded w-100 d-flex justify-content-center align-items-center btn-py" onClick={onClick}>
     <div className="global-btn bold-4 loginFormBtn">{text}</div>
    </button>
  );
}

export function FilledButtonLight({ text, onClick = () => {} }) {
  return (
    <button
      className="btn btn-light btn-rounded w-100 text-black d-flex justify-content-center align-items-center btn-py"
      onClick={onClick}
    >
      < >{text}</>
    </button>
  );
}

export function OutlinedButtonLight({ text, onClick = () => {} }) {
  return (
    <button
      className="btn btn-outline-light btn-rounded w-100 d-flex justify-content-center align-items-center btn-py"
      onClick={onClick}
    >
      <>{text}</>
    </button>
  );
}

export function OutlinedButtonWarning({ text, onClick = () => {} }) {
  return (
    <button
      className="btn btn-outline-warning btn-rounded w-100 d-flex justify-content-center align-items-center pop-font py-2 px-1 bold-3" 
      onClick={onClick}
    >
      <small className="text-warning">{text}</small>
    </button>
  );
}

export function OutlinedButtonDark({ text, onClick = () => {} }) {
  return (
    <button
      className=" btn btn-outline-primary btn-rounded w-100 d-flex justify-content-center align-items-center btn-py"
      onClick={onClick}
    >
      <div className="global-btn2">{text}</div>
    </button>
  );
}

