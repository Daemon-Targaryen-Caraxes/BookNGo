import React, { useState } from "react";
import Header from "../header";

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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };
  return (
    <>
      <Header />
      <form className="popup-content" onSubmit={handleSubmit}>
        <h3>Train, Bus & Flight Search</h3>
        <div className="form-group">
          <label htmlFor="from">From:</label>
          <input type="text" id="from" name="from" value={formData.from} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="to">To:</label>
          <input type="text" id="to" name="to" value={formData.to} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="mode">Mode:</label>
          <select id="mode" name="mode" value={formData.mode} onChange={handleInputChange} required  >
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="flight">Flight</option>
          </select>
        </div>
        <button type="submit">Search</button>
      </form>
    </>
  );
};

export default TravelSearchForm;
