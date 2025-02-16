import React from "react";
import { Link, useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";

const ConfirmationPage = () => {
  const { state } = useLocation();
  const { bookingDetails } = state || {};

  const generatePDF = () => {
    if (!bookingDetails) return;

    const doc = new jsPDF();
    doc.text("Booking Confirmation", 20, 20);
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
    doc.save("ticket.pdf");
  };

  return (
    <div>
      <h2>Booking Confirmation</h2>
      {bookingDetails && (
        <>
          <p>Train Name: {bookingDetails.name}</p>
          <p>Train No: {bookingDetails.no}</p>
          <p>From: {bookingDetails.from}</p>
          <p>To: {bookingDetails.to}</p>
          <p>Date: {new Date(bookingDetails.date).toLocaleDateString()}</p>
          <p>Time: {bookingDetails.time}</p>
          <p>Class: {bookingDetails.Class}</p>
          <p>Passenger Name: {bookingDetails.passengerName}</p>
          <p>Phone No: {bookingDetails.phoneNo}</p>
          <p>Seat No: {bookingDetails.seatId}</p>
          <p>Amount: ₹{bookingDetails.amount}</p>
          <button onClick={generatePDF}>Download Ticket as PDF</button>
        </>
      )}
      <Link to='/selecttraveloption'><button>Okay</button></Link>
    </div>
  );
};

export default ConfirmationPage;
