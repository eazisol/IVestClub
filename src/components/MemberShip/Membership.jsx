import React from 'react'
import about from "../../assets/image/about.png";
import MemberShipClubSaction from '../Home/MemberShipClubSaction';
import { useNavigate } from 'react-router-dom';

const Membership = () => {
  const navigate=useNavigate()
  
  return (
    <>
        <section className="page-banner">
        <div
          className="image-layer"
          style={{
            backgroundImage: `url(${about})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

       <div >
          <h2 className="bannerHead">IVest Membership Clubs</h2>
          
        </div>

            <ul className="bread-crumb clearfix mt-0">
              <li>
                <a
                  onClick={() => {
                    navigate("/");
                  }}
                  style={{ textDecoration: "none" }}
                >
                  Home
                </a>
              </li>
              <li className="active">Membership Clubs</li>
            </ul>
         
      </section>
      <MemberShipClubSaction />
    </>
  )
}

export default Membership