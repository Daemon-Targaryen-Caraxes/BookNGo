import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adminName: '',
    email: '',
    gender: '',
    aadharNo: '',
    adminId: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setSuccessMessage(null);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/admin/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setFormData({
          adminName: '',
          email: '',
          gender: '',
          aadharNo: '',
          adminId: '',
          password: '',
          confirmPassword: ''
        });
        setError(null);
      } else {
        setError(data.error || 'Failed to add new admin');
        setSuccessMessage(null);
      }
    } catch (err) {
      setError('Failed to add new admin');
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <h2>Add New Admin</h2>
      <form onSubmit={handleSubmit} >
        <input type="text" name="adminName" placeholder="Admin Name" value={formData.adminName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" name="aadharNo" placeholder="Aadhar No" value={formData.aadharNo} onChange={handleChange} required />
        <input type="text" name="adminId" placeholder="Admin ID" value={formData.adminId} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <button type="submit">Add Admin</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </div>
  );
};

export default AddAdmin;
