import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, seatType } = location.state || {};

  if (!train || !seatType) {
    return <p>Invalid booking details</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userDetails = Object.fromEntries(formData.entries());
    console.log("Booking Details:", { train, seatType, userDetails });
    navigate("/confirmation", { state: { train, seatType, userDetails } });
  };

  return (
    <div className="booking-form">
      <h2>Enter Passenger Details</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tr>
            <td><label> From:</label></td>
            <td><input type="text" value={train.from} readOnly /> </td>
            <td><label> To: </label></td>
            <td><input type="text" value={train.to} readOnly /></td>
          </tr>
          <tr>
            <td><label> Time:</label></td>
            <td> <input type="text" value={train.time} readOnly /></td>
            <td> <label> Date:  </label></td>
            <td><input type="text" value={new Date(train.date).toLocaleDateString()} readOnly /></td>
          </tr>
          <tr>
            <td><label > Amount: </label></td>
            <td><input type="text" value={seatType === "AC" ? train.acSeatAmount : train.normalSeatAmount} readOnly /></td>
            <td><label> Mode:</label></td>
            <td><input type="text" value={train.mode} readOnly /></td>
          </tr>
          <tr>
            <td><label> {train.mode} Name: </label></td>
            <td><input type="text" value={train.name} readOnly /> </td>
            <td><label> {train.mode} No:</label></td>
            <td><input type="text" value={train.number} readOnly /></td>
          </tr>
          <tr>
            <td><label>  Class: </label></td>
            <td><input type="text" value={seatType} readOnly /> </td>
          </tr>
          <tr>
            <td><label for='passengerName'>Passenger Name: </label></td>
            <td><input type="text" name="passengerName" required  id="passengerName"/></td>
            <td><label for='phoneNo'> Phone No: </label></td>
            <td><input type="text" name="phone" required id="phoneNo"/></td>
          </tr>
          <tr>
            <td><label for="DOB">  DOB: </label></td>
            <td><input type="date" name="dob" required id="DOB"/></td>
            <td><label for="aadhaar"> Aadhaar No: </label></td>
            <td><input type="text" name="aadhaar" required id="aadhaar" /></td>
          </tr>
          <tr>
            <td><label for="age">  Age: </label></td>
            <td><input type="number" name="age" required id="age" /></td>
            <td><label> Gender: </label></td>
            <td>
              <select name="gender" required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </td>
          </tr>
        </table>
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default BookingForm;