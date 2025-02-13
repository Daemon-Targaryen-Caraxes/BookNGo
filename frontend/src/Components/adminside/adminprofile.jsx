import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const [adminProfile, setAdminProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get admin ID from local storage or from session
    const adminId = localStorage.getItem("adminId");
    if (!adminId) {
      setError("No admin found");
      setLoading(false);
      return;
    }

    // Fetch the admin profile from the backend
    fetch(`http://localhost:3000/admin/${adminId}/profile`)
      .then((response) => response.json())
      .then((data) => {
        setAdminProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch admin profile");
        setLoading(false);
      });
  }, []);

  const handleEdit = () => {
    navigate("/editadmin");
  };

  const handleChangePassword = () => {
    navigate("/changepassword");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Admin Profile</h2>
      <div>
        <p><strong>Name:</strong> {adminProfile.adminName}</p>
        <p><strong>Email:</strong> {adminProfile.email}</p>
        <p><strong>Phone:</strong> {adminProfile.phone}</p>
        <p><strong>Gender:</strong> {adminProfile.gender}</p>
        <p><strong>Aadhar No:</strong> {adminProfile.aadharNo}</p>
        <p><strong>Admin ID:</strong> {adminProfile.adminId}</p>
      </div>
      <div>
        <button onClick={handleEdit}>Edit Profile</button>
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
    </div>
  );
};

export default AdminProfile;
