import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import useApi from "../Hooks/useApi";
import { appData } from "../Context/AppContext";
import MaterialModal from "./MaterialModal";
import { LargeButton, OutlinedButtonDark } from "../Common/Buttons";
import { SimpleInput } from "./Inputs";
import { decryptNumber } from "../Common/Utills";

const JoinMembership = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const idParam = queryParams.get("id");
  const navigate = useNavigate();
  const { mutate: joinMembership, isPending: isJoinClubLoading } = useApi();
  const { mutate: sendDiscordId, isPending: sendingDiscordId } = useApi();
  const { userData, setShowHeader } = appData();
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [formData, setFormData] = useState({});
  const [paymentComplete, setPaymentComplete] = useState(false);

  const ADMIN_WALLET = "0xc244351E16a5c04b1fc9d8808b1A66F5Fe2dB66d";
  const TOKEN_ADDRESS = "0xB34c841F79c2626260cd1657c9f5c10Be4339D1B";
  const TOKEN_AMOUNT = "1"; // Amount of tokens to send

  const handleChange = (e) => {
    e.preventDefault();
    setSubmitClicked(false);
    const { name, value, type } = e.target;
    
    if (type === "date") {
      const formattedDate = formatDateToDDMMYYYY(value);
      setFormData((prevData) => ({ ...prevData, [name]: formattedDate }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const sendTokenTransaction = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed");
      return false;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(TOKEN_ADDRESS, [
        "function transfer(address to, uint256 amount) public returns (bool)"
      ], signer);
      
      const amount = ethers.utils.parseUnits(TOKEN_AMOUNT, 18);
      const tx = await tokenContract.transfer(ADMIN_WALLET, amount);
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Transaction failed", error);
      return false;
    }
  };

  const processPayment = async () => {
    if (!userData.access_token) {
      navigate("/Login");
      return;
    }
    
    const success = await sendTokenTransaction();
    if (success) {
      setPaymentComplete(true);
      // Check if user already has Discord ID
      if (userData.discord_user_id) {
        joinClub();
      } else {
        setOpenModal1(false);
        setOpenModal2(true);
      }
    }
  };

  const joinClub = () => {
    joinMembership(
      {
        url: `membershipclub/joining/${decryptNumber(idParam)}`,
        method: "GET",
        sendHeaders: true,
      },
      {
        onSuccess: (data) => {
          console.log("Membership joined", data);
          setShowHeader(true);
          setOpenModal2(false);
          navigate(`/Membership/Private?id=${idParam}`);
        },
        onError: (error) => {
          console.error("Membership joining error", error);
        },
      }
    );
  };

  const handleDiscordId = () => {
    setSubmitClicked(true);
    if (!formData.userId) {
      return;
    }
    
    sendDiscordId(
      {
        url: `user/save-discord-username`,
        method: "POST",
        sendHeaders: true,
        data: { discord_userid: formData.userId },
      },
      {
        onSuccess: (data) => {
          console.log("Discord ID saved", data);
          joinClub();
        },
        onError: (error) => {
          console.error("Failed to save Discord ID", error);
        },
      }
    );
  };

  return (
    <>
      <OutlinedButtonDark
        text={
          isJoinClubLoading || sendingDiscordId
            ? "Processing..."
            : "Buy Membership Token & Join"
        }
        loading={isJoinClubLoading || sendingDiscordId}
        onClick={() => {
          setShowHeader(false);
          setOpenModal1(true);
        }}
      />

      {/* Discord Server Join Modal */}
      <MaterialModal open={openModal1}>
        <div className="ModalContainer p-3 z-index-0">
          <div className="row">
            <div className="col-12">
              <div className="text-dark modalHeading">
                Confirm Membership Purchase
              </div>
            </div>

            <div className="modalSection">
              <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
                <p className="text-basic">
                  You need to buy a membership token to join. This will require:
                  <br />
                  1. Completing a token payment
                  <br />
                  2. Joining our Discord server
                  <br />
                  3. Providing your Discord User ID
                </p>
              </div>
            </div>
          </div>

          <div className="modalBtns row text-center mt-3 p-3 justify-content-center">
            <LargeButton
              text={isJoinClubLoading ? "Processing..." : "Pay & Continue"}
              onClick={processPayment}
              loading={isJoinClubLoading}
            />

            <p
              className="text-basic text-dark w-auto mt-3"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenModal1(false);
                setShowHeader(true);
              }}
            >
              Cancel
            </p>
          </div>
        </div>
      </MaterialModal>

      {/* Discord ID Modal */}
      <MaterialModal open={openModal2}>
        <div className="ModalContainer py-3 z-0 container">
          <div className="row">
            <div className="col-12">
              <div className="text-dark modalHeading">
                Enter Your Discord User ID
              </div>
            </div>

            <div className="modalSection">
              <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
                <p className="text-basic">
                  • Go to User Settings (the gear icon near your username).
                  <br />
                  • Scroll to Advanced under the App Settings section.
                  <br />
                  • Enable Developer Mode.
                  <br />
                  • Click on your username(same one as above)
                  <br />
                  • Click on copy user id
                  <br />
                  • Paste user id in the field below
                  <br />
                </p>
              </div>
            </div>
          </div>
          
          <SimpleInput
            lable="Discord User Id"
            name="userId"
            onChange={handleChange}
            value={formData.userId || ""}
            required
            error={submitClicked && !formData.userId}
            helperText={"User Id is Required"}
          />
          
          <div className="modalBtns row text-center mt-3 p-3 justify-content-center">
            <LargeButton
              text={
                sendingDiscordId || isJoinClubLoading
                  ? "Submitting..."
                  : "Submit"
              }
              onClick={handleDiscordId}
              loading={sendingDiscordId || isJoinClubLoading}
            />

            <p
              className="text-basic text-dark w-auto mt-3"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOpenModal2(false);
                setShowHeader(true);
              }}
            >
              Cancel
            </p>
          </div>
        </div>
      </MaterialModal>
    </>
  );
};

export default JoinMembership;