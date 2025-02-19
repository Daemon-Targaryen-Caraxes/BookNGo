import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TravelSearchForm = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
  });
  const userId=localStorage.getItem("userId");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedMode = location.state?.selectedOption || "bus"; 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const result = await response.json();
      if (response.ok) {
        if (userId) {
          navigate("/searchResults", { state: { results: result } });
        } else {
          navigate("/adminsearchResults", { state: { results: result } });
        }
        // alert(result.message || "Error fetching transports");
      }
    } catch (error) {
      alert("Error connecting to the server");
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      <h1 >{selectedMode} Search</h1>
      <form className="popup-content" onSubmit={handleSubmit}>
        <h3> <br /></h3>
        <table>
          <tbody>
            <tr className="form-group">
              <td><label htmlFor="from">From:</label></td>
              <td><input type="text" id="from" name="from" value={formData.from} onChange={handleInputChange} required /></td>
            </tr>
            <tr className="form-group">
              <td><label htmlFor="to">To:</label></td>
              <td><input type="text" id="to" name="to" value={formData.to} onChange={handleInputChange} required /></td>
            </tr>
            <tr className="form-group">
              <td><label htmlFor="date">Date:</label></td>
              <td><input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </>
  );
};

export default TravelSearchForm;
