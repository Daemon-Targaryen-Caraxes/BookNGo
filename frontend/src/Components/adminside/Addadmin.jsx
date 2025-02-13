import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AddAdmin = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    adminName: '',
    phone: '',
    email: '',
    gender: '',
    aadharNo: '',
    adminId: '',
    password: ''
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
          phone: '',
          email: '',
          gender: '',
          aadharNo: '',
          adminId: '',
          password: ''
        });
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="adminName">Admin Name:</label>
          <input
            type="text"
            id="adminName"
            name="adminName"
            value={formData.adminName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="aadharNo">Aadhar No:</label>
          <input
            type="text"
            id="aadharNo"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="adminId">Admin ID:</label>
          <input
            type="text"
            id="adminId"
            name="adminId"
            value={formData.adminId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit" onClick={()=>Navigate('/selecttraveloption')}>Add Admin</button>
        </div>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </div>
  );
};

export default AddAdmin;
