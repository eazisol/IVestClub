import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import icon1 from "../../assets/image/icons/tlicon1.png";
import icon2 from "../../assets/image/icons/tlicon2.png";
import icon3 from "../../assets/image/icons/tlicon3.png";
import icon4 from "../../assets/image/icons/tlicon4.png";
import icon5 from "../../assets/image/icons/tlicon5.png";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import TLItem from "./TLItem";
import { orange } from "@mui/material/colors";

const customTheme = createTheme({
  palette: {
    success: {
      main: "#fff",
    },
  },
});
function LandingTimeLine() {
  return (
    <ThemeProvider theme={customTheme}>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: "10px 0px 0px 10px",
          },
          backgroundColor: "#F5F8FF",
          
        }}
      >
        <TLItem
          icon={icon1}
          heading={"Limited Number of Members"}
          text={
            "Each membership club has a capped number of membership tokens created at the outset. The more tokens you own, the more exclusive the club"
          }
          num={"01"}
        />
        <TLItem
          icon={icon1}
          heading={"Rewarding your membership"}
          text={
            "Earn rewards as you and the club achieves key milestones to celebrate significant company events.//Additional rewards for continuous learning and strengthening the community's collective knowledge.//Get rewarded that increases the value of your membership!"
          }
          num={"02"}
        />
        <TLItem
          icon={icon2}
          heading={"Unlocking Exclusive Access to Pre-IPO Companies"}
          text={
            "iVest Club grants you access to exclusive insights about your chosen  company to enhance your understanding and allows for the exchange of ideas with interested peers./Gain exclusive access to Pre-IPo Companies!"
          }
          num={"03"}
        />
        <TLItem
          icon={icon3}
          heading={"Information Sharing Community"}
          text={
            "Join inclusive membership clubs where you can collaborate with peers, share knowledge, and gain valuable insights into the companies that interest you most"
          }
          num={"04"}
        />
        <TLItem
          icon={icon4}
          heading={"Verified Member Access"}
          text={
            "Accurate, verified member information ensures account integrity. Shared insights are traceable to authenticated users, fostering transparency and accountability"
          }
          num={"05"}
        />
        <TLItem
          icon={icon5}
          last={true}
          heading={"Knowledge-Enriching Experiences"}
          text={
            "Participate in events, competitions, and collect unique digital assets designed to deepen your understanding of Pre-IPO companies and expand your knowledge base"
          }
          num={"06"}
        />
      </Timeline>
    </ThemeProvider>
  );
}

export default LandingTimeLine;
