import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AddTransport = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    number: '',
    name: '',
    normalSeats: '',
    normalSeatAmount: '',
    sleeperSeats: '',
    sleeperSeatAmount: '',
    acSeats: '',
    acSeatAmount: '',
    businessSeats: '',
    businessSeatAmount: '',
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
        headers: { 'Content-Type': 'application/json' },
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
    navigate('/adminselecttraveloption');
  };

  const renderModeSpecificFields = () => {
    switch (selectedMode) {
      case 'bus':
        return (
          <>
            <tr>
              <td><label>Sleeper Seats:</label></td>
              <td><input type="number" name="sleeperSeats" value={formData.sleeperSeats} onChange={handleChange} /></td>
              <td><label>Sleeper Seat Amount:</label></td>
              <td><input type="number" name="sleeperSeatAmount" value={formData.sleeperSeatAmount} onChange={handleChange} /></td>
            </tr>
          </>
        );
      case 'train':
        return (
          <>
            <tr>
              <td><label>AC Seats:</label></td>
              <td><input type="number" name="acSeats" value={formData.acSeats} onChange={handleChange} /></td>
              <td><label>AC Seat Amount:</label></td>
              <td><input type="number" name="acSeatAmount" value={formData.acSeatAmount} onChange={handleChange} /></td>
            </tr>
          </>
        );
      case 'flight':
        return (
          <>
            <tr>
              <td><label>Business Class Seats:</label></td>
              <td><input type="number" name="businessSeats" value={formData.businessSeats} onChange={handleChange} /></td>
              <td><label>Business Class Seat Amount:</label></td>
              <td><input type="number" name="businessSeatAmount" value={formData.businessSeatAmount} onChange={handleChange} /></td>
            </tr>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="container">
        <h2>{selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)} Add</h2>
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td><label>From:</label></td>
                <td><input type="text" name="from" value={formData.from} onChange={handleChange} required /></td>
                <td><label>To:</label></td>
                <td><input type="text" name="to" value={formData.to} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Number:</label></td>
                <td><input type="text" name="number" value={formData.number} onChange={handleChange} required /></td>
                <td><label>Name:</label></td>
                <td><input type="text" name="name" value={formData.name} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Normal Seats:</label></td>
                <td><input type="number" name="normalSeats" value={formData.normalSeats} onChange={handleChange} required /></td>
                <td><label>Normal Seat Amount:</label></td>
                <td><input type="number" name="normalSeatAmount" value={formData.normalSeatAmount} onChange={handleChange} required /></td>
              </tr>
              {renderModeSpecificFields()}
              <tr>
                <td><label>Date:</label></td>
                <td><input type="date" name="date" value={formData.date} onChange={handleChange} required /></td>
                <td><label>Time:</label></td>
                <td><input type="time" name="time" value={formData.time} onChange={handleChange} required /></td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Add Transport</button>
        </form>
      </div>

      {showPopup && (
        <div className="popup1">
          <div className="popup-con1">
            <h2>Transport Added Successfully!</h2>
            <button onClick={handlePopupClose} className="popup-button">OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTransport;
