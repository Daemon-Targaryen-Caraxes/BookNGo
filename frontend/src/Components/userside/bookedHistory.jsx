import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookedHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [showdeleteModal, setShowDeleteModal] = useState(false); // Fixed typo: flase -> false
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, [navigate]);

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

  const handleDelete = async (bookingId, seatId, mode, from, to, date, no, Class) => {
    try {
      const response = await fetch(`http://localhost:3000/booking/delete/${bookingId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetch("http://localhost:3000/transport/increaseseat", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ from, to, date, number: no, seatType: Class }),
        });

        setBookings(bookings.filter((booking) => booking._id !== bookingId));
      } else {
        const data = await response.json();
        alert(data.error || "Error deleting booking.");
      }
    } catch (err) {
      alert("Error deleting booking.");
    }
  };

  return (
    <div className="booked-history-container">
      <h2 className="title">Booking History</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="bookings-grid">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div className="booking-card" key={booking._id}>
              <h3>{booking.name} ({booking.no})</h3>
              <div className="booking-details">
                <p><strong>Passenger:</strong> {booking.passengerName}</p>
                <p><strong>Passenger gmail:</strong> {booking.gmail}</p>
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
              {showdeleteModal && (
                <div className="popup1" onClick={() => setShowDeleteModal(false)}>
                  <div className="popup-con1">
                    <h2>Are you sure you want to delete this ticket?</h2>
                    <div className="yesnobuttton">
                      <button onClick={() => setShowDeleteModal(false)}>No</button>
                      <button onClick={()=>handleDelete(booking._id, booking.seatId, booking.mode, booking.from, booking.to, booking.date, booking.no, booking.Class)}>Yes</button> 
                    </div>
                  </div>
                </div>
              )}
              </div>
              <button 
                className="delete-button" 
                onClick={() => setShowDeleteModal(true)} 
              >
                Delete Ticket
              </button>
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
