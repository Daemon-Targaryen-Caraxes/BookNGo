import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = localStorage.getItem("userId");
  const { train, seatType } = location.state || {};

  const [formData, setFormData] = useState({
    from: train?.from || "",
    to: train?.to || "",
    time: train?.time || "",
    date: train?.date || "",
    amount:
      seatType === "AC"
        ? train?.acSeatAmount
        : seatType === "Sleeper"
        ? train?.sleeperSeatAmount
        : seatType === "Business"
        ? train?.businessSeatAmount
        : train?.normalSeatAmount || "",
    mode: train?.mode || "",
    name: train?.name || "",
    no: train?.number || "",
    Class: seatType || "",
    passengerName: "",
    phoneNo: "",
    dob: "",
    aadhaar: "",
    age: "",
    gender: "",
    bookingDateTime: "",
    seatId: "",
    userId: user,
  });

  useEffect(() => {
    if (train && seatType) {
      generateSeatNo();
    }
  }, [train, seatType]);

  const generateSeatNo = () => {
    let seatId = "";
    if (!train) return;

    switch (train.mode) {
      case "bus":
        const busRow = Math.floor(Math.random() * 20) + 1;
        const busSeat = Math.floor(Math.random() * 2) + 1;
        seatId = `Bus - Row ${busRow}, Seat ${busSeat}`;
        break;

      case "train":
        const trainRow = Math.floor(Math.random() * 15) + 1;
        const trainSeat = Math.floor(Math.random() * 3) + 1;
        seatId = `Train - Row ${trainRow}, Seat ${trainSeat}`;
        break;

      case "flight":
        const flightRow = Math.floor(Math.random() * 30) + 1;
        const flightSeat = Math.floor(Math.random() * 3) + 1;
        seatId = `Flight - Row ${flightRow}, Seat ${flightSeat}`;
        break;

      default:
        seatId = "Seat not assigned";
    }

    setFormData((prevData) => ({ ...prevData, seatId }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!train || !seatType) {
    return <p>Invalid booking details</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDateTime = new Date().toISOString();
    const updatedFormData = { ...formData, bookingDateTime: currentDateTime };

    try {
      console.log("Submitting data:", updatedFormData);
      const response = await fetch("http://localhost:3000/booking/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit the booking");
      }

      const data = await response.json();
      console.log("Booking response:", data);
      navigate("/confirmation", { state: { bookingDetails: updatedFormData } });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="booking-form">
      <h2>Enter Passenger Details</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><label>From:</label></td>
              <td><input type="text" value={train.from} readOnly /></td>
              <td><label>To:</label></td>
              <td><input type="text" value={train.to} readOnly /></td>
            </tr>
            <tr>
              <td><label>Time:</label></td>
              <td><input type="text" value={train.time} readOnly /></td>
              <td><label>Date:</label></td>
              <td><input type="text" value={new Date(train.date).toLocaleDateString()} readOnly /></td>
            </tr>
            <tr>
              <td><label>Amount:</label></td>
              <td><input type="text" value={formData.amount} readOnly /></td>
              <td><label>Mode:</label></td>
              <td><input type="text" value={train.mode} readOnly /></td>
            </tr>
            <tr>
              <td><label>{train.mode} Name:</label></td>
              <td><input type="text" value={train.name} readOnly /></td>
              <td><label>{train.mode} No:</label></td>
              <td><input type="text" value={train.number} readOnly /></td>
            </tr>
            <tr>
              <td><label>Class:</label></td>
              <td><input type="text" value={seatType} readOnly /></td>
              <td><label>Seat No:</label></td>
              <td><input type="text" value={formData.seatId} readOnly /></td>
            </tr>
            <tr>
              <td><label>Passenger Name:</label></td>
              <td><input type="text" name="passengerName" value={formData.passengerName} onChange={handleChange} required /></td>
              <td><label>Phone No:</label></td>
              <td><input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>DOB:</label></td>
              <td><input type="date" name="dob" value={formData.dob} onChange={handleChange} required /></td>
              <td><label>Aadhaar No:</label></td>
              <td><input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Age:</label></td>
              <td><input type="number" name="age" value={formData.age} onChange={handleChange} required /></td>
              <td><label>Gender:</label></td>
              <td>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default BookingForm;
