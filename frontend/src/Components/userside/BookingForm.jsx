import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const user = localStorage.getItem("userId") || localStorage.getItem("adminId");
  const { transport, seatType } = location.state || {};

  const [formData, setFormData] = useState({
    from: transport?.from || "",
    to: transport?.to || "",
    time: transport?.time || "",
    date: transport?.date ? new Date(transport.date).toISOString().split("T")[0] : "",
    amount:
      seatType === "AC"
        ? transport?.acSeatAmount
        : seatType === "Sleeper"
          ? transport?.sleeperSeatAmount
          : seatType === "Business"
            ? transport?.businessSeatAmount
            : transport?.normalSeatAmount || "",
    mode: transport?.mode || "",
    name: transport?.name || "",
    no: transport?.number || "",
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

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (transport && seatType) {
      setFormData((prev) => ({ ...prev, seatId: generateSeatNo() }));
    }
  }, [transport, seatType]);

  const generateSeatNo = () => {
    let seatId = "";
    if (!transport) return "";

    switch (transport.mode) {
      case "bus":
        seatId = `Bus - Row ${Math.floor(Math.random() * 20) + 1}, Seat ${Math.floor(Math.random() * 2) + 1}`;
        break;
      case "train":
        seatId = `Train - Row ${Math.floor(Math.random() * 15) + 1}, Seat ${Math.floor(Math.random() * 3) + 1}`;
        break;
      case "flight":
        seatId = `Flight - Row ${Math.floor(Math.random() * 30) + 1}, Seat ${Math.floor(Math.random() * 3) + 1}`;
        break;
      default:
        seatId = "Seat not assigned";
    }
    return seatId;
  };

  const validateInput = () => {
    if (!formData.passengerName.trim()) return "Passenger name is required.";
    if (!/^[6-9]\d{9}$/.test(formData.phoneNo)) return "Invalid phone number.";
    if (!formData.dob) return "Date of birth is required.";
    if (!formData.age || formData.age <= 0) return "Invalid age.";
    if (!/\d{12}$/.test(formData.aadhaar)) return "Aadhaar number must be 12 digits.";
    if (!formData.gender) return "Gender is required.";
    return "";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateInput();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const currentDateTime = new Date().toISOString();
    const formattedDate = formData.date ? new Date(formData.date).toISOString().split("T")[0] : "";
    const updatedFormData = { ...formData, date: formattedDate, bookingDateTime: currentDateTime, seatId: generateSeatNo() };

    try {
      const response = await fetch("http://localhost:3000/booking/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit the booking");
      }

      const seatUpdateData = {
        from: transport.from,
        to: transport.to,
        date: transport.date,
        number: transport.number,
        seatType: seatType,
      };

      const response1 = await fetch("http://localhost:3000/transport/decreaseseat", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seatUpdateData),
      });

      if (!response1.ok) {
        const errorData = await response1.json();
        throw new Error(errorData.error || "Failed to decrease seats");
      }

      if (userId) {
        navigate("/confirmation", { state: { bookingDetails: updatedFormData } });
      } else {
        navigate("/adminconfirmation", { state: { bookingDetails: updatedFormData } });
      }
    } catch (error) {
      setErrorMessage(`Booking failed! Please try again. Error: ${error.message}`);
    }
  };

  return (
    <div className="booking-form">
      <h2>Enter Passenger Details</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}

        <table>
          <tbody>
            <tr>
              <td><label>From:</label></td>
              <td><input type="text" value={formData.from} readOnly /></td>
              <td><label>To:</label></td>
              <td><input type="text" value={formData.to} readOnly /></td>
            </tr>
            <tr>
              <td><label>Time:</label></td>
              <td><input type="text" value={formData.time} readOnly /></td>
              <td><label>Date:</label></td>
              <td><input type="text" value={formData.date} readOnly /></td>
            </tr>
            <tr>
              <td><label>Seat No:</label></td>
              <td><input type="text" value={formData.seatId} readOnly /></td>
              <td><label>Amount:</label></td>
              <td><input type="text" value={`₹${formData.amount}`} readOnly /></td>
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
              <td><label>Age:</label></td>
              <td><input type="number" name="age" value={formData.age} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label>Aadhaar:</label></td>
              <td><input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} required /></td>
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

