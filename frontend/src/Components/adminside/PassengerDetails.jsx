import React from "react";
import { useLocation } from "react-router-dom";

const Ticket = () => {
  const location = useLocation();
  const { bookingDetails } = location.state || {};

  return (
    <div className="ticket">
      <h2>HAPPY JOURNEY</h2>
      <div className="ticket-details">
        <p><strong>From:</strong> {bookingDetails.from}</p>
        <p><strong>To:</strong> {bookingDetails.to}</p>
        <p><strong>Time:</strong> {bookingDetails.time}</p>
        <p><strong>Date:</strong> {new Date(bookingDetails.date).toLocaleDateString()}</p>
        <p><strong>Amount:</strong> ₹{bookingDetails.amount}</p>
        <p><strong>Mode:</strong> {bookingDetails.mode}</p>
        <p><strong>{bookingDetails.mode} Name:</strong> {bookingDetails.name}</p>
        <p><strong>{bookingDetails.mode} No:</strong> {bookingDetails.no}</p>
        <p><strong>Class:</strong> {bookingDetails.Class}</p>
        <p><strong>Passenger Name:</strong> {bookingDetails.passengerName}</p>
        <p><strong>Phone No:</strong> {bookingDetails.phoneNo}</p>
        <p><strong>Date of Birth:</strong> {bookingDetails.dob}</p>
        <p><strong>Aadhaar No:</strong> {bookingDetails.aadhaar}</p>
        <p><strong>Age:</strong> {bookingDetails.age}</p>
        <p><strong>Gender:</strong> {bookingDetails.gender}</p>
      </div>
    </div>
  );
};

export default Ticket;
