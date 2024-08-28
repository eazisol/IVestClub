import * as React from "react";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Divider from "@mui/material/Divider";

const TLItem = ({ last = false, heading, text, icon,num }) => {
  return (
    <>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            color="success"
            variant="outlined"
            sx={{
              height: "50px",
              width: "50px",
              padding: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={icon}
              alt="icon"
              style={{
                width: 100,
                height: 50,
                borderRadius: "50%",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </TimelineDot>
          {!last && (
            <TimelineConnector
              sx={{
                border: "1px dashed #F5F8FF",
              }}
            />
          )}
        </TimelineSeparator>
        <TimelineContent sx={{ marginBottom: 0, marginTop: 2 }}>
          <p className="text-basic text-black  d-flex justify-content-between mb-2">
            <div className="timeline-head">{heading}</div>
            <div className="timeline-number">{num}</div>
          </p>
          <p className="pointText text-dark text-compact ">
            {text.split("/").map((line, index, arr) => (
              <span key={index}>
                {line}

                {index < arr.length - 1 && (
                  <>
                    <br />
                   
                  </>
                )}
              </span>
            ))}
          </p>
          {!last && <Divider />}
        </TimelineContent>
      </TimelineItem>
    </>
  );
};

export default TLItem;
