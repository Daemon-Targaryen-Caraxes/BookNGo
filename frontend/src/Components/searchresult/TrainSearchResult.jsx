import React, { useState } from "react";
import "./TrainSearchResult.css";
import { Link } from "react-router-dom";
const SearchForm = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="search-form">
      <h1>WELCOME TO BOOKNGO</h1>
      <div className="form-group">
        <label>From</label>
        <input
          type="text"
          placeholder="Enter source station"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>
      <div className="swap-icon" onClick={handleSwap}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#2196f3"
          width="24px"
          height="24px"
        >
          <path d="M7 10l5-5 5 5H7zm10 4l-5 5-5-5h10z" />
        </svg>
      </div>
      <div className="form-group">
        <label>To</label>
        <input
          type="text"
          placeholder="Enter destination station"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div className="date-selection">
        <label>Departure Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="date-input"
        />
      </div>
      <div className="date-buttons">
        <button onClick={() => setDate(new Date().toISOString().split("T")[0])}>
          Today
        </button>
        <button
          onClick={() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            setDate(tomorrow.toISOString().split("T")[0]);
          }}
        >
          Tomorrow
        </button>
      </div>
      <Link to={'/trainResult'} >
      <button className="search-button">Search</button>
      </Link>
    </div>
  );
};

export default SearchForm;
