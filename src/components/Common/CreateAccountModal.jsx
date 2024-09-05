import React, { useState } from "react";
import { FilledButtonLight, OutlinedButtonLight, LargeButton } from "./Buttons";
import { SimpleInput, PasswordInput } from "../Common/Inputs";
import { appData } from "../Context/AppContext";


const CreateAccountModal = ({ text }) => {
  const { openModal, setOpenModal } = appData();

  function LoginModal()
  {
    setOpenModal(
      {
        open: true,
        content: 
        (<>
        <div className='ModalContainer p-3 z-0 container '>
        <div className="row">
        <div className="col-12">
        <div className="text-dark modalHeading">Please Enter Your Email and Username!</div>
        </div>
        
        <div className="modalSection">
        <div
                      className="col-12 modal-des"
                      style={{ marginTop: "10px" }}
                    >
                      <p className="text-basic">
                      Let us know your email so we can verify you and also the username You would like to use on the platform!
                      </p>
                    </div> 
          

         
        
        
        <div className="row">
          <div className="col-12 modal-input">
          <SimpleInput lable={"Username"}/>
          </div>
          <div className="col-12 modal-input">
          <SimpleInput lable={"Email"}/>
          </div>
        </div>
        </div>


        </div>
        <div className="modalBtns row text-center mt-3 p-3 justify-content-center">
                
                <LargeButton text={"Submit"} onClick={VerifyModal}/>


                  <p className="text-basic text-dark w-auto mt-3" style={{cursor:"pointer"}} onClick={()=>{ setOpenModal({open: false, content: null})}}>
                    Cancel
                  </p>
                </div>






        </div>
        </>)
      }
    )
  }

  function VerifyModal()
  {
    setOpenModal(
      {
        open: true,
        content: 
        (<>
        <div className='ModalContainer p-3 z-0'>
    <div className="row">
    <div className="col-12">
                    <div className="text-dark modalHeading"> You’re all set John! <br />
                    Let’s verify your email.</div>
        </div>
      
     <div className="modalSection">
      <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
        <p className="text-basic">Please enter the 4 digit code sent to <br />
        yourmail@example.com</p>
      </div>
  
     <div className="row verify-modal mt-5">
     <div className="col-md-3">
         <input type="text" className="form-control" id="Number1" />
    </div>
    <div className="col-md-3">
         <input type="text" className="form-control" id="Number2" />
    </div>
    <div className="col-md-3">
         <input type="text" className="form-control" id="Number3" />
    </div>
    <div className="col-md-3">
         <input type="text" className="form-control" id="Number4" />
    </div>


 </div>
   
 </div>


  
    </div>

    <div className="modalBtns row text-center mt-3 p-3 justify-content-center">
      

      <LargeButton text={"Verify"} onClick={FinanceModal}/>
      </div>
      <div className="container col-12 verify-btn d-flex justify-content-between ">
      
      <p className="text-basic text-dark w-auto mt-3" style={{cursor:"pointer"}} onClick={()=>{ setOpenModal({open: false, content: null})}}>
                    Cancel
                  </p>
     <p className="text-basic text-dark w-auto mt-3" >
                    Resend Code
                  </p>
      </div>


      








    </div>
        </>)
      }
    )
  }  

  function FinanceModal()
  {
    setOpenModal(
      {
        open: true,
        content: 
        (<>
        <div className='ModalContainer p-3 container z-0'>
    <div className="row">
    


      <div className="col-12">
                    <div className="text-dark modalHeading"> Now tell us about your current Financial knowedge!</div>
        </div>



      <div className="modalSection">
      <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
        <p className="text-basic">Do you currently own any Cyrptocurrencies, Stocks, bonds, real estate or any other investments?</p>
      </div>
    </div>
    
    <div className="row container dash-form-check">
    <div class="form-check  col-3 dash-check d-flex justify-content-around" >
  <input class="form-check-input dash-radio" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label class="form-check-label" for="flexRadioDefault1">
    Yes
  </label>
  
</div>
<div class="form-check  col-3 dash-check d-flex justify-content-around">
  <input class="form-check-input dash-radio" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
  <label class="form-check-label" for="flexRadioDefault2">
  No
  </label>
</div>
    </div>
    
    
    
    </div>
 

    <div className="modalBtns row text-center mt-3 p-3 justify-content-center">
                
                <LargeButton text={"Submit"}onClick={CompanyModal}/>


                  <p className="text-basic text-dark w-auto mt-3" style={{cursor:"pointer"}} onClick={()=>{ setOpenModal({open: false, content: null})}} >
                    Cancel
                  </p>
                </div>





    </div>
        </>)
      }
    )
  }

  function CompanyModal()
  {
    setOpenModal(
      {
        open: true,
        content: 
        (<>
        <div className='CompanyModalContainer container'>
    <div className="row">
      
<div className="col-12">
                    <div className="modalHeading text-dark"> Let’s find out about Pre-IPO companies!</div>
        </div>

        <div className="modalSection">
      <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
        <p className="text-basic">Do you know how and why companies do an IPO (become listed)?</p>
      </div>
    
     <div className="row container dash-form-check">
    <div class="form-check  col-3 dash-check d-flex justify-content-around" >
  <input class="form-check-input dash-radio" type="radio" name="flexRadioDefault-1" id="flexRadioDefault1"/>
  <label class="form-check-label" for="flexRadioDefault1">
    Yes
  </label>
  
</div>
<div class="form-check  col-3 dash-check d-flex justify-content-around">
  <input class="form-check-input dash-radio" type="radio" name="flexRadioDefault-1" id="flexRadioDefault2"/>
  <label class="form-check-label" for="flexRadioDefault2">
  No
  </label>
</div>
    </div>




    <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
        <p className="text-basic">Did you know that Facebook made their backers a 100% return in one year and 1,000% in 3 years before their IPO?</p>
      </div>
    
     <div className="row container dash-form-check">
    <div class="form-check  col-3 dash-check d-flex justify-content-around" >
  <input class="form-check-input dash-radio" type="radio" name="flexRadioDefault-2" id="flexRadioDefault3"/>
  <label class="form-check-label" for="flexRadioDefault3">
    Yes
  </label>
  
</div>
<div class="form-check  col-3 dash-check d-flex justify-content-around">
  <input class="form-check-input dash-radio" type="radio" name="flexRadioDefault-2" id="flexRadioDefault4"/>
  <label class="form-check-label" for="flexRadioDefault4">
  No
  </label>
</div>
    </div>






    <div className="col-12 modal-des" style={{ marginTop: "10px" }}>
        <p className="text-basic">Are you ready to become an exclusive member and start enjoying the same benefits as the ultra-rich?</p>
      </div>
    
     <div className="row container dash-form-check">
    <div class="form-check  col-3 dash-check d-flex justify-content-around" >
  <input class="form-check-input dash-radio" type="radio" name="flexRadioDefault-3" id="flexRadioDefault5"/>
  <label class="form-check-label" for="flexRadioDefault5">
    Yes
  </label>
  
</div>
<div class="form-check  col-3 dash-check d-flex justify-content-around">
  <input class="form-check-input dash-radio" type="radio" name="flexRadioDefault-3" id="flexRadioDefault6"/>
  <label class="form-check-label" for="flexRadioDefault6">
  No
  </label>
</div>
    </div>
 




 
</div>



    </div>


    

   


    <div className="modalBtns row text-center  mt-3 p-3 justify-content-center">
                
                <LargeButton text={"Click here to activate your Free account & start your journey"}/>


                  <p className="text-basic text-dark w-auto mt-3" style={{cursor:"pointer"}} onClick={()=>{ setOpenModal({open: false, content: null})}} >
                    Cancel
                  </p>
                </div>


   
</div>
        </>)
      }
    )
  }

  
  return (
    <FilledButtonLight
      text={text}
      onClick={() => {
        setOpenModal({
          open: true,
          content: (
            <>
              <div className="ModalContainer p-3 z-index-0">
                <div className="row">
                  <div className="col-12">
                    
                    <div className="text-dark modalHeading"> Great - Lets get you started on Your Journey!</div>
                  </div>

                  <div className="modalSection">
                    <div
                      className="col-12 modal-des"
                      style={{ marginTop: "10px" }}
                    >
                      <p className="text-basic">
                        Please let us know a little bit more about yourself, so
                        that we can start creating your Free Acount:
                      </p>
                    </div>

                    <div className="row">
                      <div className="col-md-6 modal-input">
                      <SimpleInput lable={"First Name"}/>
                      </div>
                      <div className="col-md-6 modal-input">
                      <SimpleInput lable={"Surname"}/>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-md-12 modal-input">
                      <SimpleInput lable={"Date of Birth"}/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modalBtns row text-center mt-3 p-3 justify-content-center">
                
                <LargeButton text={"Submit"} onClick={LoginModal}/>


                  <p className="text-basic text-dark w-auto mt-3" style={{cursor:"pointer"}} onClick={()=>{ setOpenModal({open: false, content: null})}}>
                    Cancel
                  </p>
                </div>
              </div>
            </>
            
            
          ),
        });
      }}
    />
  );
};

export default CreateAccountModal;
