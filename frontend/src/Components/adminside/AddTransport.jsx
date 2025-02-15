import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AddTransport = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    number: '',
    name: '',
    totalSeats: '',
    normalSeats: '', // normal seats for all modes
    sleeperSeats: '', // for bus mode
    acSeats: '',      // for train and flight mode
    businessSeats: '', // for flight mode
    normalSeatAmount: '', // normal seat amount for all modes
    sleeperSeatAmount: '', // for bus mode
    acSeatAmount: '',     // for train and bus mode
    businessSeatAmount: '', // for flight mode
    date: '',
    time: '',
    mode: 'bus',
  });

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedMode = location.state?.selectedOption || 'bus';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      ...formData,
      from: formData.from.toLowerCase(),
      to: formData.to.toLowerCase(),
      mode: selectedMode,
    };
    try {
      const response = await fetch('http://localhost:3000/transport/add-transport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      const result = await response.json();
      if (response.ok) {
        setShowPopup(true);
      } else {
        alert(result.message || 'Error adding transport');
      }
    } catch (error) {
      alert('Error connecting to the server');
      console.error(error);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/enquiry');
  };

  const renderModeSpecificFields = () => {
    if (selectedMode === 'bus') {
      return (
        <>
          <tr className="form-group">
            <td><label>Sleeper Seats:</label></td>
            <td><input type="text" name="sleeperSeats" value={formData.sleeperSeats} onChange={handleChange} /></td>
            <td><label>Sleeper Seat Amount:</label></td>
            <td><input type="text" name="sleeperSeatAmount" value={formData.sleeperSeatAmount} onChange={handleChange} /></td>
          </tr>
        </>
      );
    } else if (selectedMode === 'train') {
      return (
        <>
          <tr className="form-group">
            <td><label>AC Seats:</label></td>
            <td><input type="text" name="acSeats" value={formData.acSeats} onChange={handleChange} /></td>
            <td><label>AC Seat Amount:</label></td>
            <td><input type="text" name="acSeatAmount" value={formData.acSeatAmount} onChange={handleChange} /></td>
          </tr>
        </>
      );
    } else if (selectedMode === 'flight') {
      return (
        <>
          <tr className="form-group">
            <td><label>Business Class Seats:</label></td>
            <td><input type="text" name="businessSeats" value={formData.businessSeats} onChange={handleChange} /></td>
            <td><label>Business Class Seat Amount:</label></td>
            <td><input type="text" name="businessSeatAmount" value={formData.businessSeatAmount} onChange={handleChange} /></td>
          </tr>
        </>
      );
    }
  };

  return (
    <>
      <div className="admin-container">
        <h1>{selectedMode} add</h1>
        <form className="popup-content" onSubmit={handleSubmit}>
          <table>
            <tr className="form-group">
              <td><label>From:</label></td>
              <td><input type="text" name="from" value={formData.from} onChange={handleChange} /></td>
              <td><label>No:</label></td>
              <td><input type="text" name="number" value={formData.number} onChange={handleChange} /></td>
            </tr>
            <tr className="form-group">
              <td><label>To:</label></td>
              <td><input type="text" name="to" value={formData.to} onChange={handleChange} /></td>
              <td><label>Name:</label></td>
              <td><input type="text" name="name" value={formData.name} onChange={handleChange} /></td>
            </tr>
            <tr className="form-group">
              <td><label>Normal Seats:</label></td>
              <td><input type="text" name="normalSeats" value={formData.normalSeats} onChange={handleChange} /></td>
              <td><label>Normal Seat Amount:</label></td>
              <td><input type="text" name="normalSeatAmount" value={formData.normalSeatAmount} onChange={handleChange} /></td>
            </tr>
            {renderModeSpecificFields()}
            <tr className="form-group">
              <td><label>Date:</label></td>
              <td><input type="date" name="date" value={formData.date} onChange={handleChange} /></td>
              <td><label>Time:</label></td>
              <td><input type="time" name="time" value={formData.time} onChange={handleChange} /></td>
            </tr>
          </table>
          <button type="submit" className="submit-button">Add</button>
        </form>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-con">
            <h2>Added Successfully!</h2>
            <button onClick={handlePopupClose} className="popup-button">OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTransport;
