import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails } = location.state || {};

  const handleDownload = () => {
    const ticketContent = `
      HAPPY JOURNEY
      ---------------------
      From: ${bookingDetails.from}
      To: ${bookingDetails.to}
      Time: ${bookingDetails.time}
      Date: ${new Date(bookingDetails.date).toLocaleDateString()}
      Amount: ₹${bookingDetails.amount}
      Mode: ${bookingDetails.mode}
      ${bookingDetails.mode} Name: ${bookingDetails.name}
      ${bookingDetails.mode} No: ${bookingDetails.no}
      Class: ${bookingDetails.Class}
      Passenger Name: ${bookingDetails.passengerName}
      Phone No: ${bookingDetails.phoneNo}
      Date of Birth: ${bookingDetails.dob}
      Aadhaar No: ${bookingDetails.aadhaar}
      Age: ${bookingDetails.age}
      Gender: ${bookingDetails.gender}
    `;

    const element = document.createElement("a");
    const file = new Blob([ticketContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "ticket.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!bookingDetails) {
    return <h2>No booking details available.</h2>;
  }

  return (
    <div className="ticket">
      <h2>YOUR TICKET</h2>
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
      <div className="button-container">
        <button className="button" onClick={handleDownload}>
          Download
        </button>
        <button className="button" onClick={() => navigate('/TravelSearchForm')}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Ticket;
