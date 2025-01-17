import React, { useState } from "react";
import Header from "../Header";

const TravelSearchForm = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    mode: "bus",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/transport/get-transport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
          console.log(result)
      } else {
        alert(result.message || 'Error adding transport');
      }
    } catch (error) {
      alert('Error connecting to the server');
      console.error(error);
    }
  };
  return (
    <>
      <Header/>
      <form className="popup-content" onSubmit={handleSubmit}>
        <h3>Train, Bus & Flight Search</h3>
        <table>
        <tr className="form-group">
          <td><label htmlFor="from">From:</label></td>
          <td><input type="text" id="from" name="from" value={formData.from} onChange={handleInputChange} required /></td>
        </tr>
        <tr className="form-group">
         <td> <label htmlFor="to"> To:</label></td>
         <td> <input type="text" id="to" name="to" value={formData.to} onChange={handleInputChange} required /></td>
        </tr>
        <tr className="form-group">
          <td><label htmlFor="date">Date:</label></td>
          <td><input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required /></td>
        </tr>
        <tr className="form-group">
         <td> <label htmlFor="mode">Mode:</label></td>
         <td> <select id="mode" name="mode" value={formData.mode} onChange={handleInputChange} required  >
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="flight">Flight</option>
          </select></td>
        </tr>
        </table>
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default TravelSearchForm;
