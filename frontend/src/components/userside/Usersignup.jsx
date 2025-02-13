import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    gender: "",
    dob: "",
    aadhaar: "",
    userid: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async () => {
    setError("");
    if (!formData.phone || formData.phone.length !== 10 || isNaN(formData.phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/otp/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("OTP sent to your phone!");
        setOtpSent(true);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Error sending OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/otp/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone, otp }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("OTP Verified! You can now sign up.");
        setOtpVerified(true);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Error verifying OTP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otpVerified) {
      setError("Please verify OTP before signing up.");
      return;
    }

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
    <>
      <Header />
      <div className="container">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
          {/* <button type="button" onClick={handleSendOtp} disabled={otpSent}>Send OTP</button>
          {otpSent && !otpVerified && (
            <>
              <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" required />
              <button type="button" onClick={handleVerifyOtp}>Verify OTP</button>
            </>
          )} */}
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
          <button type="submit" disabled={!otpVerified}>Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
