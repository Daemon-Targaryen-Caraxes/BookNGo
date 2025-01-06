import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleUserClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
      <Header />
      <div className="container-button">
        {/* <h1>Welcome to BookNGO</h1> */}
        <button onClick={handleUserClick}>Are you User?</button>
        <button onClick={() => navigate("AdminLogin")}>Are you Admin?</button>
        {showPopup && (
          <div className="popup" onClick={closePopup}>
            <div className="popup-con">
              <h2>Do you have an account?</h2>
              <div className="yesnobuttton">
              <button onClick={() => navigate("/login")}>Yes</button>
              <button onClick={() => navigate("/signup")}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
