import React, { useState,useEffect } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import useApi from "../Hooks/useApi";
import { appData } from "../Context/AppContext";
import MaterialModal from "./MaterialModal";
import { LargeButton, OutlinedButtonDark } from "../Common/Buttons";
import { SimpleInput } from "./Inputs";
import { decryptNumber } from "../Common/Utills";
import { CustomizedLoader } from "./MiniComponents";
import { baseUrl } from "../../../apiConfig";

const JoinMembership = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const idParam = queryParams.get("id");
  console.log("🚀 ~ JoinMembership ~ idParam:", idParam)
 


  const navigate = useNavigate();
  const { mutate: joinMembership, isPending: isJoinClubLoading } = useApi();
  const { mutate: sendDiscordId, isPending: sendingDiscordId } = useApi();
  const { mutate: clubToken, isPending: sendingClubToken } = useApi();
  const { mutate: getData } = useApi();
  const { userData, setShowHeader, setSnackBarData } = appData();
  const [profiledata, setProfileData] = useState({});
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [formData, setFormData] = useState({});
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [loading, setloading] = useState(false);
  const [adminWallet , setAdminWallet] = useState("")
  const [tokenContractAddress, setTokenContractAddress] = useState("")
  const [membershipClubAmount, setmembershipClubAmount] = useState("")
  const memberShipClubidDycripted=decryptNumber(idParam)/1
  useEffect(() => {
    getData(
      {
        url: "profile",
        method: "GET",
        sendHeaders: true,
      },
      {
        onSuccess: (data) => {
          setProfileData(data);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  }, []);
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

  const getMembershipClubChargeInfo = async () => {
    try {
      const response = await fetch(`${baseUrl}membership/getChargeInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ membershipclubid: decryptNumber(idParam)/1 }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setAdminWallet(data.data.token.admin_wallet_address);
        setTokenContractAddress(data.data.token.token_contract_address);
        setmembershipClubAmount(data.data.price);
        console.log("Membership Club Charge Info:", data.data);
      } else {
        console.error("Error fetching membership charge info:", data);
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };


  useEffect(() => {
    getMembershipClubChargeInfo();
  }, []);
  

  const sendTokenTransaction = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed");
      return false;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(tokenContractAddress, [
        "function transfer(address to, uint256 amount) public returns (bool)"
      ], signer);
      const amount = ethers.utils.parseUnits(membershipClubAmount.toString(), 18);
      const tx = await tokenContract.transfer(adminWallet, amount);
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Transaction failed", error);
      return false;
    }
  };

  const processPayment = async () => {
    setloading(true);
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
        setloading(false);
        setOpenModal1(false);
        window.open("https://discord.gg/MfXhJasq4W", "_blank");
        setOpenModal2(true);
      }
    }
    else {
      setloading(false);
      setOpenModal1(false);
      setSnackBarData({
        visibility: true,
        error: "error",
        text: "Please Connect to Wallet First!",
      });
      return;
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
    // window.open("https://discord.gg/MfXhJasq4W", "_blank");
    setSubmitClicked(true);
    if (!formData.userId) {
      return;
    }

    sendDiscordId(
      {
        url: `user-join-club`,
        method: "POST",
        sendHeaders: true,
        data: { membership_club_id:memberShipClubidDycripted,discord_userid:formData.userId,user_id:profiledata?.id },
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
const handleClick=()=>{
 console.log('data')
  joinMembership(
    {
      url: `user-has-club-token`,
      method: "POST",
      sendHeaders: true,
      data: { user_id: `${profiledata.id}`,membership_club_id: memberShipClubidDycripted },
    },
    {
      onSuccess: (data) => {
        if (data?.has_club_token) {
          setOpenModal2(true);
        } else {
          if (userData?.access_token && !data?.has_club_token) {
            setSnackBarData({
              visibility: true,
              error: "error",
              text: "You don't have required tokens to join this membership club",
            });
          } else {
            navigate(`/Dashboard`);
          }
        }
        
      },
      onError: (error) => {
        console.error("Membership joining error", error);
      },
    }
  );
}
  return (
    <>
      <OutlinedButtonDark
        text={
          isJoinClubLoading || sendingDiscordId
            ? "Processing..."
            : "Buy Membership Token & Join"
        }
        loading={isJoinClubLoading || sendingDiscordId}
        // onClick={() => {
        //   // setShowHeader(false);
        //   // setOpenModal1(true);
        // }}
        // onClick={() => {
        //   navigate(userData?.access_token?`/Dashboard`:`/shop`);
        // }}
        onClick={handleClick}
      />

      {/* Discord Server Join Modal */}
      <MaterialModal open={openModal1}>
        <div className="ModalContainer p-3 z-index-0">
          {loading ? <CustomizedLoader /> : 
          <>
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
              // loading={loading}
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
          </>
          }
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
                  : "Continue"
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