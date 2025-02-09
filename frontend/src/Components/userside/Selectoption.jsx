import React from "react";
import './userstyles.css'
import { useNavigate } from "react-router-dom";

const SelectOptionPage = () => {
  const navigate = useNavigate();

  const handleSelection = (option) => {
    navigate("/TravelSearchForm", { state: { selectedOption: option } });
  };

  return (
    <div className="overallcontainer">
      <div className="home">
        <h1>Select Travel Mode</h1>
        <div className="options">
          <button onClick={() => handleSelection("bus")}>Bus</button>
          <button onClick={() => handleSelection("train")}>Train</button>
          <button onClick={() => handleSelection("flight")}>Flight</button>
        </div>
      </div>
    </div>
  );
};

export default SelectOptionPage;
