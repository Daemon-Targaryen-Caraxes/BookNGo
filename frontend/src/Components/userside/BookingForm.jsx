import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, seatType } = location.state || {};

  if (!train || !seatType) {
    return <p>Invalid booking details</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userDetails = Object.fromEntries(formData.entries());
    console.log("Booking Details:", { train, seatType, userDetails });
    navigate("/confirmation", { state: { train, seatType, userDetails } });
  };

  return (
    <div className="booking-form">
      <h2>Enter Passenger Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Train Details */}
        <div className="form-section">
          <label>
            From:
            <input type="text" value={train.from} readOnly />
          </label>
          <label>
            To:
            <input type="text" value={train.to} readOnly />
          </label>
          <label>
            Time:
            <input type="text" value={train.time} readOnly />
          </label>
          <label>
            Date:
            <input type="text" value={new Date(train.date).toLocaleDateString()} readOnly />
          </label>
          <label>
            Amount:
            <input
              type="text"
              value={seatType === "AC" ? train.acSeatAmount : train.normalSeatAmount}
              readOnly
            />
          </label>
          <label>
            Mode:
            <input type="text" value={train.mode} readOnly />
          </label>
          <label>
            Class:
            <input type="text" value={seatType} readOnly />
          </label>
        </div>

        {/* Passenger Details */}
        <div className="form-section">
          <label>
            Passenger Name:
            <input type="text" name="passengerName" required />
          </label>
          <label>
            Phone No:
            <input type="text" name="phone" required />
          </label>
          <label>
            DOB:
            <input type="date" name="dob" required />
          </label>
          <label>
            Aadhaar No:
            <input type="text" name="aadhaar" required />
          </label>
          <label>
            Age:
            <input type="number" name="age" required />
          </label>
          <label>
            Gender:
            <select name="gender" required>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default BookingForm;
