import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TrainCard = ({ train, onBook }) => {
  const handleBook = (seatType) => {
    onBook(train, seatType);
  };

  return (
    <div className="train-card">
      <div className="train-header">
        <h3 className="train-name">{train.number} {train.name}</h3>
        {/* <p className="train-type">{train.mode}</p> */}
         <span>
          <p className="time">{train.time}</p>
          </span> 
      </div>

      <div className="train-timing">
        <div className="departure">
          <p className="station">{train.from}</p>
        </div>
        <>------------------------------------------------------------------------------------------------------</>
        <div className="duration">
          <p className="date">{new Date(train.date).toLocaleDateString()}</p>
          {/* <p>{train.totalSeats} Total Seats</p> */}
        </div>
        <>------------------------------------------------------------------------------------------------------</>
        <div className="arrival">
          <p className="station">{train.to}</p>
        </div>
      </div>
      <div className="train-class">
        <div className="class-card">
          <p className="class-name">AC Seats</p>
          <p className="status">{train.acSeats} Available</p>
          <p className="price">₹{train.acSeatAmount}</p>
          <button onClick={() => handleBook("AC")}>Book AC</button>
        </div>
        <div className="class-card">
          <p className="class-name">Normal Seats</p>
          <p className="status">{train.normalSeats} Available</p>
          <p className="price">₹{train.normalSeatAmount}</p>
          <button onClick={() => handleBook("Normal")}>Book Normal</button>
        </div>
      </div>
    </div>
  );
};

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];

  const handleBook = (train, seatType) => {
    navigate("/booking", {
      state: {
        train,
        seatType,
      },
    });
  };

  return (
    <div className="search-results">
      <h2 style={{ color: "white", fontSize: "40px" }}>Search Results</h2>
      <div className="results-container">
        {results.length > 0 ? (
          results.map((train) => (
            <TrainCard key={train._id} train={train} onBook={handleBook} />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
