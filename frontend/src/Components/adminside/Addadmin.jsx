import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddAdmin() {
  const navigate = useNavigate();

  const [adminName, setAdminName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const newAdmin = {
      adminName,
      phone,
      email,
      gender,
      aadharNo,
      adminId,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdmin),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Admin added successfully!");
        setError(""); // Reset error
        navigate("/admin/profile"); // Redirect to admin profile or any other page
      } else {
        setError(data.error || "Failed to add admin.");
      }
    } catch (err) {
      console.error("Error adding admin:", err);
      setError("Server error, please try again later.");
    }
  };

  return (
    <div className="add-admin-container">
      <h2>Add New Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="text"
            placeholder="Admin Name"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="Aadhar No"
            value={aadharNo}
            onChange={(e) => setAadharNo(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Add Admin</button>
      </form>
    </div>
  );
}

export default AddAdmin;
