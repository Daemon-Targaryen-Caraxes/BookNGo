import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TrainCard = ({ train }) => {
  return (
    <div className="train-card">
      <div className="train-header">
        <h3 className="train-name">{train.number} {train.name}</h3>
        <p className="train-type">{train.mode}</p>
      </div>
  
      <div className="train-timing">
        <div className="departure">
          <p className="time">{train.time}</p>
          <p className="station">{train.from}</p>
          <p className="date">{new Date(train.date).toLocaleDateString()}</p>
        </div>
        <div className="duration">
          <p>{train.totalSeats} Total Seats</p>
        </div>
        <div className="arrival">
          <p className="station">{train.to}</p>
        </div>
      </div>
      <div className="train-class">
        <div className="class-card">
          <p className="class-name">AC Seats</p>
          <p className="status">{train.acSeats} Available</p>
          <p className="price">₹{train.acSeatAmount}</p>
        </div>
        <div className="class-card">
          <p className="class-name">Normal Seats</p>
          <p className="status">{train.normalSeats} Available</p>
          <p className="price">₹{train.normalSeatAmount}</p>
        </div>
      </div>
      <div className="train-actions">
        <button className="availability-btn">book</button>
      </div>
    </div>
  );
};

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || []; 

  return (
    <div className="search-results">
      <h2 style={{color:"white", fontSize:"40px"}}>Search Results</h2>
      <div className="results-container">
        {results.length > 0 ? (
          results.map((train) => <TrainCard key={train._id} train={train} />)
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
