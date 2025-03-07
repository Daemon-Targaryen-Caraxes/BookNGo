import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home1">
      <Header />
      <div className="container-button">
        <button onClick={() => navigate("/login")}>User login</button>
        <button onClick={() => navigate("AdminLogin")}>Admin login</button>
      </div>
    </div>
  );
};

export default Home;
