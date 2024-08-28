import React from "react";
import avatar from "../../assets/image/avatar.png";
import pdf from "../../assets/image/icons/pdficon.png";
import doc from "../../assets/image/icons/docicon.png";
import articalimg from "../../assets/image/articalimg.png";
import likeicon from "../../assets/image/icons/likeicon.png";
import Dislikeicon from "../../assets/image/icons/dislikeicon.png";
import vector from "../../assets/image/icons/vector.png";

export function Avatar({ size = 20, rounded = true }) {
  return (
    <img
      src={avatar}
      style={{
        height: `${size}px`,
        width: `${size}px`,
        borderRadius: rounded ? "500px" : "0px",
      }}
    />
  );
}
export function PdfIcon({ size = 20, rounded = false }) {
    return (
      <img
        src={pdf}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          borderRadius: rounded ? "500px" : "0px",
        }}
      />
    );
  }
  export function DocIcon({ size = 20, rounded = false }) {
    return (
      <img
        src={doc}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          borderRadius: rounded ? "500px" : "0px",
        }}
      />
    );
  }
  export function SidebarImg({ size = 20, rounded = false }) {
    return (
      <img
        src={articalimg}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          borderRadius: rounded ? "500px" : "0px",
        }}
      />
    );
  }
  
  export function LikeIcon({ size = 20, rounded = false }) {
    return (
      <img
        src={likeicon}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          borderRadius: rounded ? "500px" : "0px",
        }}
      />
    );
  }

  export function DislikeIcon({ size = 20, rounded = false }) {
    return (
      <img
        src={Dislikeicon}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          borderRadius: rounded ? "500px" : "0px",
        }}
      />
    );
  }

  export function VectorIcon({ size , rounded = false }) {
    return (
      <div 
      style={{
        height: `${size}px`,
        width: `${size}px`,
        borderRadius: rounded ? "500px" : "0px",
        alignItems:"center",
        backgroundColor : "#000"
      }}>
      <img
        src={vector}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          borderRadius: rounded ? "500px" : "0px",
        }}
      /></div>
    );
  }