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
    <div className="add-admin-container">
      <div className="form-card">
        <h2 className="form-title">Add New Admin</h2>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <table className="admin-table">
            <tbody>
              <tr>
                <td><label>Admin Name</label></td>
                <td><input type="text" name="adminName" value={formData.adminName} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Email</label></td>
                <td><input type="email" name="email" value={formData.email} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Gender</label></td>
                <td>
                  <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label>Aadhaar No</label></td>
                <td><input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Admin ID</label></td>
                <td><input type="text" name="adminId" value={formData.adminId} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Password</label></td>
                <td><input type="password" name="password" value={formData.password} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label>Confirm Password</label></td>
                <td><input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td colSpan="2" className="button-row">
                  <button type="submit" className="submit-button">Add Admin</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
