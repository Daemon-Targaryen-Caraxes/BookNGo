import React, { useState } from "react";
import Header from "../header";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate =useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    gender: "",
    dob: "",
    aadhaar: "",
    userid:"",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!formData.username || !formData.phone || !formData.gender || !formData.dob || !formData.aadhaar || !formData.password || !formData.confirmPassword) {
      setError("All fields are required.");
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
    if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      setError("Phone number must be 10 digits.");
      return;
    }
    alert("Sign-Up Successful!");
    navigate("/TravelSearchForm")
    console.log("User Data:", formData);
    setFormData({
      username: "",
      phone: "",
      gender: "",
      dob: "",
      aadhaar: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
    <Header/>
    <div className="container">
      <h2>Sign Up Page</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username"  value={formData.username} onChange={handleChange} required/>
        <input type="number" name="phone"   placeholder="Phone Number" value={formData.phone}  onChange={handleChange} required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="date"  name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} required />
        <input type="text" name="aadhaar" placeholder="Aadhaar Number"  value={formData.aadhaar}  onChange={handleChange} required/>
        <input type="text" name="userid" placeholder="UserId"  value={formData.userid} onChange={handleChange} required/>
        <input type="password" name="password"  placeholder="Password"  value={formData.password} onChange={handleChange}  required/>
        <input  type="password"  name="confirmPassword"  placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
    </>
  );
};

export default SignUp;
