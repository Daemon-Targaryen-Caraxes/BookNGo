import React, { useState, useEffect } from "react";

const EditAdmin = () => {
  const [adminData, setAdminData] = useState({
    adminName: "",
    phone: "",
    email: "",
    gender: "",
    aadharNo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (!adminId) {
      setError("No admin found");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/admin/${adminId}/profile`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setAdminData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch admin data");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminId = localStorage.getItem("adminId");

    try {
      const response = await fetch(`http://localhost:3000/admin/${adminId}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      alert("Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Edit Admin Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="adminName"
            value={adminData.adminName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={adminData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Aadhar No:</label>
          <input
            type="text"
            name="aadharNo"
            value={adminData.aadharNo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditAdmin;
