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
      <div className="container">
        <h1>Welcome to BookNow</h1>
        <button onClick={handleUserClick}>Are you User?</button>
        <button onClick={() => navigate("AdminLogin")}>Are you Admin?</button>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-button" onClick={closePopup}>
              <h2>Do you have an account?</h2>
              <button onClick={() => navigate("/login")}>Yes</button>
              <button onClick={() => navigate("/signup")}>No</button>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
