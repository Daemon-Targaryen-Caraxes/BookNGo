import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, seatType } = location.state || {};
  const [formData, setFormData] = useState({
    from: train?.from || "",
    to: train?.to || "",
    time: train?.time || "",
    date: train?.date || "",
    amount: seatType === "AC" ? train?.acSeatAmount : train?.normalSeatAmount || "",
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!train || !seatType) {
    return <p>Invalid booking details</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting data:", formData);
      const response = await fetch("http://localhost:3000/booking/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit the booking");
      }
      const data = await response.json();
      console.log("Booking response:", data);
      navigate("/confirmation", { state: { bookingDetails: formData } });
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
              <td><label htmlFor="from">From:</label></td>
              <td><input type="text" defaultValue={train.from} readOnly /></td>
              <td><label htmlFor="to">To:</label></td>
              <td><input type="text" defaultValue={train.to} readOnly /></td>
            </tr>
            <tr>
              <td><label htmlFor="time">Time:</label></td>
              <td><input type="text" defaultValue={train.time} readOnly /></td>
              <td><label htmlFor="date">Date:</label></td>
              <td><input type="text" defaultValue={new Date(train.date).toLocaleDateString()} readOnly /></td>
            </tr>
            <tr>
              <td><label htmlFor="amount">Amount:</label></td>
              <td><input type="text" defaultValue={formData.amount} readOnly /></td>
              <td><label htmlFor="mode">Mode:</label></td>
              <td><input type="text" defaultValue={train.mode} readOnly /></td>
            </tr>
            <tr>
              <td><label htmlFor="name">{train.mode} Name:</label></td>
              <td><input type="text" defaultValue={train.name} readOnly /></td>
              <td><label htmlFor="no">{train.mode} No:</label></td>
              <td><input type="text" defaultValue={train.number} readOnly /></td>
            </tr>
            <tr>
              <td><label htmlFor="class">Class:</label></td>
              <td><input type="text" defaultValue={seatType} readOnly /></td>
            </tr>
            <tr>
              <td><label htmlFor="passengerName">Passenger Name:</label></td>
              <td><input type="text" name="passengerName" value={formData.passengerName} onChange={handleChange} required id="passengerName" /></td>
              <td><label htmlFor="phoneNo">Phone No:</label></td>
              <td><input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required id="phoneNo" /></td>
            </tr>
            <tr>
              <td><label htmlFor="dob">DOB:</label></td>
              <td><input type="date" name="dob" value={formData.dob} onChange={handleChange} required id="dob" /></td>
              <td><label htmlFor="aadhaar">Aadhaar No:</label></td>
              <td><input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} required id="aadhaar" /></td>
            </tr>
            <tr>
              <td><label htmlFor="age">Age:</label></td>
              <td><input type="number" name="age" value={formData.age} onChange={handleChange} required id="age" /></td>
              <td><label htmlFor="gender">Gender:</label></td>
              <td><select name="gender" value={formData.gender} onChange={handleChange} className=".selectTag" required><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default BookingForm;
