import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TravelSearchForm = () => {
  const [formData, setFormData] = useState({ from: "", to: "", date: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedMode = location.state?.selectedOption || "bus";
  const userId = localStorage.getItem("userId");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const requestData = {
      ...formData,
      from: formData.from.toLowerCase(),
      to: formData.to.toLowerCase(),
      mode: selectedMode,
    };

    try {
      const response = await fetch("http://localhost:3000/transport/get-transport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      const result = await response.json();
      if (response.ok) {
        userId ? navigate("/searchResults", { state: { results: result } }) : navigate("/adminsearchResults", { state: { results: result } });
      }
    } catch (error) {
      alert("Error connecting to the server");
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">{selectedMode} Search</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="from">From:</label>
          <input type="text" id="from" name="from" value={formData.from} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="to">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To:</label>
          <input type="text" id="to" name="to" value={formData.to} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={formData.date} style={{width:'200px'}} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default TravelSearchForm;
