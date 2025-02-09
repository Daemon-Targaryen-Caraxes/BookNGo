import React from "react";
import { Link, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
const ConfirmationPage = () => {
  const { state } = useLocation();
  const { bookingDetails } = state || {};

  const generatePDF = () => {
    if (!bookingDetails) {
      alert("No booking details to generate PDF.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Booking Confirmation", 20, 20);
    doc.setFontSize(14);

    doc.text(`Train Name: ${bookingDetails.name}`, 20, 30);
    doc.text(`Train No: ${bookingDetails.no}`, 20, 40);
    doc.text(`From: ${bookingDetails.from}`, 20, 50);
    doc.text(`To: ${bookingDetails.to}`, 20, 60);
    doc.text(`Date: ${new Date(bookingDetails.date).toLocaleDateString()}`, 20, 70);
    doc.text(`Time: ${bookingDetails.time}`, 20, 80);
    doc.text(`Class: ${bookingDetails.Class}`, 20, 90);

    doc.text(`Passenger Name: ${bookingDetails.passengerName}`, 20, 100);
    doc.text(`Phone No: ${bookingDetails.phoneNo}`, 20, 110);
    doc.text(`DOB: ${new Date(bookingDetails.dob).toLocaleDateString()}`, 20, 120);
    doc.text(`Aadhaar No: ${bookingDetails.aadhaar}`, 20, 130);
    doc.text(`Age: ${bookingDetails.age}`, 20, 140);
    doc.text(`Gender: ${bookingDetails.gender}`, 20, 150);

    doc.text(`Seat No: ${bookingDetails.seatId}`, 20, 160);
    doc.text(`Amount: ₹${bookingDetails.amount}`, 20, 170);

    // Booking Date & Time
    doc.text(`Booking Date & Time: ${new Date(bookingDetails.bookingDateTime).toLocaleString()}`, 20, 180);

    doc.save("ticket.pdf");
  };

  if (!bookingDetails) {
    return <div className="confirmation-page">No booking details found.</div>;
  }

  return (
    <div className="confirmation-page">
      <h2 className="confirmation-title">Booking Confirmation</h2>

      {/* Train Details Section */}
      <div className="train-details">
        <h3 className="section-title">Train Details</h3>
        <p><strong>Train Name:</strong> {bookingDetails.name}</p>
        <p><strong>Train No:</strong> {bookingDetails.no}</p>
        <p><strong>From:</strong> {bookingDetails.from}</p>
        <p><strong>To:</strong> {bookingDetails.to}</p>
        <p><strong>Date:</strong> {new Date(bookingDetails.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {bookingDetails.time}</p>
        <p><strong>Class:</strong> {bookingDetails.Class}</p>
      </div>
      <div className="passenger-details">
        <h3 className="section-title">Passenger Details</h3>
        <p><strong>Passenger Name:</strong> {bookingDetails.passengerName}</p>
        <p><strong>Phone No:</strong> {bookingDetails.phoneNo}</p>
        <p><strong>DOB:</strong> {new Date(bookingDetails.dob).toLocaleDateString()}</p>
        <p><strong>Aadhaar No:</strong> {bookingDetails.aadhaar}</p>
        <p><strong>Age:</strong> {bookingDetails.age}</p>
        <p><strong>Gender:</strong> {bookingDetails.gender}</p>
      </div>
      <div className="seat-details">
        <h3 className="section-title">Seat & Amount</h3>
        <p><strong>Seat No:</strong> {bookingDetails.seatId}</p>
        <p><strong>Amount:</strong> ₹{bookingDetails.amount}</p>
      </div>
      <div className="booking-date-time">
        <h3 className="section-title">Booking Date & Time</h3>
        <p>{new Date(bookingDetails.bookingDateTime).toLocaleString()}</p>
      </div>
      <div className="download-button-container">
        <button className="download-btn" onClick={generatePDF}>Download Ticket as PDF</button>
        <Link to='/selecttraveloption'><button>okay</button></Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
