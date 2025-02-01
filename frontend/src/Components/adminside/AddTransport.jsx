import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTransport = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    number: '',
    name: '',
    totalSeats: '',
    acSeats: '',
    normalSeats: '',
    acSeatAmount: '',
    normalSeatAmount: '',
    date: '',
    time: '',
    mode: 'bus',
  });

  const [showPopup, setShowPopup] = useState(false); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      ...formData,
      from: formData.from.toLowerCase(),
      to: formData.to.toLowerCase(),
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

  return (
    <>
      <div className="admin-container">
        <h1>Add Train, Bus, and Flight</h1>
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
              <td><label>Mode:</label></td>
              <td>
                <select name="mode" value={formData.mode} onChange={handleChange} required>
                  <option value="bus">Bus</option>
                  <option value="train">Train</option>
                  <option value="flight">Flight</option>
                </select>
              </td>
              <td><label>Total Seats:</label></td>
              <td><input type="text" name="totalSeats" value={formData.totalSeats} onChange={handleChange} /></td>
            </tr>
            <tr className="form-group">
              <td><label>AC Seats:</label></td>
              <td><input type="text" name="acSeats" value={formData.acSeats} onChange={handleChange} /></td>
              <td><label>AC Seat Amount:</label></td>
              <td><input type="text" name="acSeatAmount" value={formData.acSeatAmount} onChange={handleChange} /></td>
            </tr>
            <tr className="form-group">
              <td><label>Normal Seats:</label></td>
              <td><input type="text" name="normalSeats" value={formData.normalSeats} onChange={handleChange} /></td>
              <td><label>Normal Seat Amount:</label></td>
              <td><input type="text" name="normalSeatAmount" value={formData.normalSeatAmount} onChange={handleChange} /></td>
            </tr>
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
