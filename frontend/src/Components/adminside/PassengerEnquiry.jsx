import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PassengerEnquiry = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState(null); 
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (phone.length === 10) {
      try {
        const response = await fetch(`http://localhost:3000/booking/search/${phone}`);
        if (!response.ok) {
          throw new Error("No bookings found for this phone number");
        }
        const data = await response.json();
        setBookings(data);
        setError(""); 
      } catch (err) {
        setBookings(null); 
        setError(err.message);
      }
    } else {
      setError("Invalid Number");
      setBookings(null);
    }
  };

  return (
    <div className="container">
      <h2>Passenger Enquiry</h2>
      <div>{error && <p className="error-message">{error}</p>}</div>
      <div>
        <input  type="number" name="phone-number" onChange={(event) => setPhone(event.target.value)}  className="input-phone"  required />
      </div>
      <button onClick={handleSearch} className="button-search">Search</button>
      {bookings && bookings.length > 0 && (
        <div className="booking-details">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-detail-item">
              <p><strong>From:</strong> {booking.from}</p>
              <p><strong>To:</strong> {booking.to}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Amount:</strong> {booking.amount}</p>
              <p><strong>Mode:</strong> {booking.mode}</p>
              <p><strong>Class:</strong> {booking.Class}</p>
              <p><strong>Passenger Name:</strong> {booking.passengerName}</p>
              <p><strong>Phone No:</strong> {booking.phoneNo}</p>
              <p><strong>Date of Birth:</strong> {new Date(booking.dob).toLocaleDateString()}</p>
              <p><strong>Aadhaar:</strong> {booking.aadhaar}</p>
              <p><strong>Age:</strong> {booking.age}</p>
              <p><strong>Gender:</strong> {booking.gender}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PassengerEnquiry;
