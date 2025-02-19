import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateUserProfile = () => {
  const userid = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userid: "",
    username: "",
    gmail: "",
    gender: "",
    dob: "",
    aadhaar: "",
    password: "",
  });
  const [newUserid, setNewUserid] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/user/details/${userid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setUserData({ ...data, password: "" });
          setNewUserid(data.userid);
        }
      })
      .catch(() => setError("Failed to fetch user details"))
      .finally(() => setLoading(false));
  }, [userid]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUseridChange = (e) => {
    setNewUserid(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/user/update/${userid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, newUserid }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to update user");
      }

      alert("User updated successfully");

      if (newUserid !== userid) {
        localStorage.setItem("userId", newUserid);
        navigate(`/profile/${newUserid}`);
      } else {
        navigate("/selecttraveloption");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Edit User Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input type="text" value={newUserid} onChange={handleUseridChange} required />
        </label>
        <label>
          Name:
          <input type="text" name="username" value={userData.username} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="gmail" value={userData.gmail} onChange={handleChange} required />
        </label>
        <label>
          Gender:
          <select name="gender" value={userData.gender} onChange={handleChange} required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          Date of Birth:
          <input type="date" name="dob" value={userData.dob.split("T")[0]} onChange={handleChange} required />
        </label>
        <label>
          Aadhaar:
          <input type="text" name="aadhaar" value={userData.aadhaar} onChange={handleChange} required />
        </label>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUserProfile;
