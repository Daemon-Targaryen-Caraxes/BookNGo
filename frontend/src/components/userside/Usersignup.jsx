import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    gmail: "",
    gender: "",
    dob: "",
    aadhaar: "",
    userid: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateGmail = (gmail) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(gmail);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.gmail || !formData.gender || !formData.dob || !formData.aadhaar || !formData.userid || !formData.password || !formData.confirmPassword) {
      setError("All fields are required.");
      return;
    }
    
    if (!validateGmail(formData.gmail)) {
      setError("Enter a valid Gmail address (example@gmail.com).");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.aadhaar.length !== 12 || isNaN(formData.aadhaar)) {
      setError("Aadhaar number must be 12 digits.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Sign-Up Successful!");
        navigate("/selecttraveloption");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Error signing up.");
    }
  };

  return (
    <div className="usersignup">
      <Header />
      <div className="container">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
          <input type="text" name="gmail" value={formData.gmail} onChange={handleChange} placeholder="Gmail" required />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange} placeholder="Aadhaar Number" required />
          <input type="text" name="userid" value={formData.userid} onChange={handleChange} placeholder="User ID" required />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
