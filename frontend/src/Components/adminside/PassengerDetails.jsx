import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from 'jspdf';

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails } = location.state || {};

  const handleDownload = () => {
    if (!bookingDetails) return;
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setFont( "bold");
    doc.text("Your Ticket", 105, 20, "center");
    doc.setLineWidth(0.3);
    doc.line(10, 25, 200, 25);
    doc.setFontSize(12);
    doc.setFont( "normal");
    doc.text(`From: ${bookingDetails.from}`, 10, 40);
    doc.text(`To: ${bookingDetails.to}`, 10, 50);
    doc.text(`Time: ${bookingDetails.time}`, 10, 60);
    doc.text(`Date: ${new Date(bookingDetails.date).toLocaleDateString()}`, 10, 70);
    doc.text(`Amount: ${bookingDetails.amount}`, 10, 80);
    doc.text(`Mode: ${bookingDetails.mode}`, 10, 90);
    doc.text(`${bookingDetails.mode} Name: ${bookingDetails.name}`, 10, 100);
    doc.text(`${bookingDetails.mode} No: ${bookingDetails.no}`, 10, 110);
    doc.text(`Class: ${bookingDetails.Class}`, 10, 120);
    doc.text(`Seat: ${bookingDetails.seatId}`, 10, 130);
    doc.text(`Passenger Name: ${bookingDetails.passengerName}`, 10, 140);
    doc.text(`Phone No: ${bookingDetails.phoneNo}`, 10, 150);
    doc.text(`Date of Birth: ${bookingDetails.dob}`, 10, 160);
    doc.text(`Aadhaar No: ${bookingDetails.aadhaar}`, 10, 170);
    doc.text(`Age: ${bookingDetails.age}`, 10, 180);
    doc.text(`Gender: ${bookingDetails.gender}`, 10, 190);
    doc.text(`Booked Date: ${new Date(bookingDetails.bookingDateTime).toLocaleDateString()}`, 10, 200);
    doc.setFontSize(10);
    doc.setFont( "italic");
    doc.text("Thank you for choosing our service.",100,215, "center");
    doc.save('ticket.pdf');
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
        <p><strong>Seat:</strong> {bookingDetails.seatId}</p>
        <p><strong>Passenger Name:</strong> {bookingDetails.passengerName}</p>
        <p><strong>Phone No:</strong> {bookingDetails.phoneNo}</p>
        <p><strong>Date of Birth:</strong> {bookingDetails.dob}</p>
        <p><strong>Aadhaar No:</strong> {bookingDetails.aadhaar}</p>
        <p><strong>Age:</strong> {bookingDetails.age}</p>
        <p><strong>Gender:</strong> {bookingDetails.gender}</p>
        <p><strong>Booked Date :</strong> {new Date(bookingDetails.bookingDateTime).toLocaleDateString()}</p>
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
