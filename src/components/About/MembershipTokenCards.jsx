import React from 'react'
import about4 from "../../assets/image/about4.png";
import { useNavigate } from 'react-router-dom';

const MembershipTokenCards = ({header, text}) => {
  const navigate =  useNavigate()
  return (
    <div className="col-md-4 col-sm-6 col-xs-6" style={{ minWidth: "17em" }}>
    <div className="card " style={{ minHeight: "18em" }}>
      <div className="card-body">
        <img src={about4} style={{height : "35px", width : "35px"}} />
        <h6 className='mt-3'>
          <div className='tokenHead '>{header}</div>
        </h6>
        <p className="text-basic mt-3  text-compact LightText">
         {text}
        </p>
        <a href="" className='pop-font' style={{ textDecoration: "underline", color:"#150D30" }}
                  to={`/`}
        onClick={() => {navigate("/Membership")}}
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
  )
}

export default MembershipTokenCards