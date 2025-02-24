import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookedHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/booking/history/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setBookings(data);
        } else {
          setError(data.error || "Error fetching booking history.");
        }
      } catch (err) {
        setError("Error fetching booking history.");
      }
    };

    fetchBookings();
  }, [navigate]);

  return (
    <div className="booked-history-container">
      <h2 className="title">Booking History</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="bookings-grid">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div className="booking-card" key={index}>
              <h3>{booking.name} ({booking.no})</h3>
              <div className="booking-details">
                <p><strong>Passenger:</strong> {booking.passengerName}</p>
                <p><strong>Age:</strong> {booking.age}</p>
                <p><strong>Gender:</strong> {booking.gender}</p>
                <p><strong>Phone No:</strong> {booking.phoneNo}</p>
                <p><strong>From:</strong> {booking.from}</p>
                <p><strong>To:</strong> {booking.to}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Class:</strong> {booking.Class}</p>
                <p><strong>Seat:</strong> {booking.seatId}</p>
                <p><strong>Amount:</strong> ₹{booking.amount}</p>
                <p><strong>Mode:</strong> {booking.mode}</p>
                <p><strong>Aadhaar:</strong> {booking.aadhaar}</p>
                <p><strong>Booking Date:</strong> {new Date(booking.bookingDateTime).toLocaleString()}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-bookings">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default BookedHistory;
