import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TransportCard = ({ transport, onBook }) => {
  const handleBook = (seatType) => {
    onBook(transport, seatType);
  };

  return (
    <div className="transport-card">
      <div className="transport-header">
        <h3 className="transport-name">{transport.number} {transport.name}</h3>
        <span>
          <p className="time">{transport.time}</p>
        </span>
      </div>
      <div className="transport-timing">
        <div className="departure">
          <p className="station">{transport.from}</p>
        </div>
        <hr />
        <div className="duration">
          <p className="date">{new Date(transport.date).toLocaleDateString()}</p>
        </div>
        <hr />
        <div className="arrival">
          <p className="station">{transport.to}</p>
        </div>
      </div>
      <div className="transport-class">
        <div className="class-card">
          <p className="class-name">Normal Seats</p>
          <p className="status">{transport.normalSeats > 0 ? `${transport.normalSeats} Available` : "Not Available"}</p>
          <p className="price">₹{transport.normalSeatAmount || "-"}</p>
          {transport.normalSeats > 0 && <button onClick={() => handleBook("Normal")}>Book Normal</button>}
        </div>
        {transport.mode === "bus" && transport.sleeperSeats > 0 && (
          <div className="class-card">
            <p className="class-name">Sleeper Seats</p>
            <p className="status">{transport.sleeperSeats} Available</p>
            <p className="price">₹{transport.sleeperSeatAmount || "-"}</p>
            <button onClick={() => handleBook("Sleeper")}>Book Sleeper</button>
          </div>
        )}
        {transport.mode === "train" && transport.acSeats > 0 && (
          <div className="class-card">
            <p className="class-name">AC Seats</p>
            <p className="status">{transport.acSeats} Available</p>
            <p className="price">₹{transport.acSeatAmount || "-"}</p>
            <button onClick={() => handleBook("AC")}>Book AC</button>
          </div>
        )}
        {transport.mode === "flight" && transport.businessSeats > 0 && (
          <div className="class-card">
            <p className="class-name">Business Class</p>
            <p className="status">{transport.businessSeats} Available</p>
            <p className="price">₹{transport.businessSeatAmount || "-"}</p>
            <button onClick={() => handleBook("Business")}>Book Business</button>
          </div>
        )}
      </div>
    </div>
  );
};

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];

  const handleBook = (transport, seatType) => {
    navigate("/booking", {
      state: {
        transport,
        seatType,
      },
    });
  };

  return (
    <div className="search-results">
      <h2 style={{ color: "white", fontSize: "40px" }}>Search Results</h2>
      <div className="results-container">
        {results.length > 0 ? (
          results.map((transport) => (
            <TransportCard key={transport._id} transport={transport} onBook={handleBook} />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
