import React from "react";
export function LargeButton({
  text,
  onClick = () => {},
  sx = {},
  mode = "primary",
  disabled = false,
}) {
  return (
    <button
      style={sx}
      className={`btn btn-${mode} btn-rounded w-100 d-flex justify-content-center align-items-center btn-py ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export function FilledButtonLight({ text, onClick = () => {} }) {
  return (
    <button
      className="btn btn-light btn-rounded w-100 text-black d-flex justify-content-center align-items-center btn-py"
      onClick={onClick}
    >
      <>{text}</>
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
      className="btn btn-outline-warning btn-rounded w-100 d-flex justify-content-center align-items-center pop-font py-2 px-2"
      onClick={onClick}
    >
      <div className="text-warning">{text}</div>
    </button>
  );
}

export function OutlinedButtonDark({ text, onClick = () => {} , loading=false}) {
  return (
    <button
      className={`btn btn-outline-primary btn-rounded w-100 d-flex justify-content-center align-items-center ${loading? "py-2" :"btn-py"}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading && <div className="loader" />}{text}
    </button>
  );
}
