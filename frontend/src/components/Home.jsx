import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home1">
      <Header />
      <div style={headerStyle}>
        <h1 style={titleStyle}>
            WELCOME TO BOOKNGO
        </h1>
      </div>
      <h3 style={{color:'rgb(255, 250, 250)',fontSize:'31px',marginTop:'80px'}}>
      <span style={{marginLeft:'130px'}}></span>
        Your one-stop solution for seamless travel booking. 
       Plan your journey with ease. 
       Book buses, trains, and flights effortlessly. 
       Fast, reliable, and user-friendly platform. 
       Explore multiple travel options in one place. 
       Get the best deals on tickets. 
       24/7 customer support to assist you. 
       Safe and secure booking experience. 
       Instant ticket confirmation. 
       Check real-time availability. 
       Modify or cancel bookings with ease. 
       Track your journey status in real-time. 
       Trusted by thousands of happy customers. 
       Navigate through our simple and intuitive UI. 
       Book your next trip in just a few clicks. 
       Start your journey with BookNGo today! </h3>
  

      <div className="container-button">
        <button onClick={() => navigate("/login")} style={{fontSize:"27px",borderRadius:'10px'}}>Start Booking &nbsp;&nbsp;&gt;</button>
      </div>
    </div>
  );
};
const headerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "25px 0 0 0",
    marginTop:'30px',
    color: "white",
  };
  
  const titleStyle = {
    margin: 0,
    fontSize: "60px",
    textShadow: "3px 5px 0px rgba(161, 154, 154, 0.6)"
  };

export default Home;
