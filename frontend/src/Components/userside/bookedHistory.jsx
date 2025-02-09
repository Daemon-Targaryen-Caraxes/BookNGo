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
    <div className="booked-history">
      <h2>Booking History</h2>
      {error && <p className="error">{error}</p>}
      {bookings.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Train Name</th>
              <th>Date</th>
              <th>Class</th>
              <th>Seat</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.from}</td>
                <td>{booking.to}</td>
                <td>{booking.name}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.Class}</td>
                <td>{booking.seatId}</td>
                <td>{booking.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default BookedHistory;
